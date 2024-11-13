import { User } from '@prisma/client';
import prisma from './db';

interface UserPreference {
  userId: string;
  interests: string[];
  activityTypes: string[];
  locationPreference: string;
  ageRange: { min: number; max: number };
}

interface SimilarityScore {
  userId: string;
  score: number;
}

export class RecommendationSystem {
  // 计算用户间的兴趣相似度
  private static calculateInterestSimilarity(
    userInterests: string[],
    otherInterests: string[]
  ): number {
    const intersection = userInterests.filter(interest => 
      otherInterests.includes(interest)
    );
    const union = new Set([...userInterests, ...otherInterests]);
    return intersection.length / union.size;
  }

  // 计算位置相似度（基于地理距离）
  private static calculateLocationSimilarity(
    userLocation: string,
    otherLocation: string
  ): number {
    // 简单实现：相同城市返回1，不同城市返回0.5
    return userLocation === otherLocation ? 1 : 0.5;
  }

  // 计算年龄匹配度
  private static calculateAgeCompatibility(
    userAge: number,
    otherAge: number,
    preferredRange: { min: number; max: number }
  ): number {
    if (otherAge >= preferredRange.min && otherAge <= preferredRange.max) {
      return 1;
    }
    const minDiff = Math.min(
      Math.abs(otherAge - preferredRange.min),
      Math.abs(otherAge - preferredRange.max)
    );
    return Math.max(0, 1 - minDiff / 10); // 每差10岁降低1分
  }

  // 获取用户的活动历史
  private static async getUserActivityHistory(userId: string) {
    return await prisma.activity.findMany({
      where: {
        OR: [
          { organizerId: userId },
          { participants: { some: { id: userId } } }
        ]
      },
      include: {
        tags: true
      }
    });
  }

  // 计算协同过滤推荐分数
  private static async calculateCollaborativeScore(
    userId: string,
    otherId: string
  ): Promise<number> {
    const userActivities = await this.getUserActivityHistory(userId);
    const otherActivities = await this.getUserActivityHistory(otherId);

    const userTags = new Set(
      userActivities.flatMap(activity => 
        activity.tags.map(tag => tag.name)
      )
    );
    const otherTags = new Set(
      otherActivities.flatMap(activity => 
        activity.tags.map(tag => tag.name)
      )
    );

    const intersection = [...userTags].filter(tag => otherTags.has(tag));
    const union = new Set([...userTags, ...otherTags]);

    return intersection.length / union.size;
  }

  // 获取用户的综合推荐得分
  private static async calculateOverallScore(
    userPreference: UserPreference,
    otherUser: User & { interests: { name: string }[] }
  ): Promise<number> {
    const interestScore = this.calculateInterestSimilarity(
      userPreference.interests,
      otherUser.interests.map(i => i.name)
    );

    const locationScore = this.calculateLocationSimilarity(
      userPreference.locationPreference,
      otherUser.location || ''
    );

    const collaborativeScore = await this.calculateCollaborativeScore(
      userPreference.userId,
      otherUser.id
    );

    // 权重配置
    const weights = {
      interest: 0.4,
      location: 0.3,
      collaborative: 0.3
    };

    return (
      interestScore * weights.interest +
      locationScore * weights.location +
      collaborativeScore * weights.collaborative
    );
  }

  // 获取推荐用户列表
  public static async getRecommendedUsers(
    userId: string,
    limit: number = 10
  ): Promise<User[]> {
    // 获取当前用户信息和偏好
    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        interests: true
      }
    });

    if (!currentUser) {
      throw new Error('User not found');
    }

    // 获取用户偏好设置
    const userPreference: UserPreference = {
      userId: currentUser.id,
      interests: currentUser.interests.map(i => i.name),
      activityTypes: [], // 从用户历史活动中获取
      locationPreference: currentUser.location || '',
      ageRange: { min: 18, max: 60 } // 默认年龄范围
    };

    // 获取其他用户
    const otherUsers = await prisma.user.findMany({
      where: {
        id: { not: userId }
      },
      include: {
        interests: true
      }
    });

    // 计算每个用户的匹配分数
    const userScores: SimilarityScore[] = await Promise.all(
      otherUsers.map(async (user) => ({
        userId: user.id,
        score: await this.calculateOverallScore(userPreference, user)
      }))
    );

    // 按分数排序并获取前N个用户
    const recommendedUserIds = userScores
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(score => score.userId);

    // 获取推荐用户的完整信息
    return await prisma.user.findMany({
      where: {
        id: { in: recommendedUserIds }
      },
      include: {
        interests: true,
        activities: {
          take: 3,
          orderBy: { createdAt: 'desc' }
        }
      }
    });
  }

  // 更新用户兴趣权重
  public static async updateUserInterests(
    userId: string,
    interactionType: 'view' | 'like' | 'message',
    targetUserId: string
  ): Promise<void> {
    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserId },
      include: { interests: true }
    });

    if (!targetUser) return;

    // 根据交互类型设置权重
    const weights = {
      view: 0.1,
      like: 0.3,
      message: 0.5
    };

    // 更新用户兴趣权重
    const weight = weights[interactionType];
    const interests = targetUser.interests.map(interest => ({
      name: interest.name,
      weight
    }));

    // 在实际应用中，这里应该更新用户的兴趣权重表
    console.log(`Updating interests for user ${userId}:`, interests);
  }
}