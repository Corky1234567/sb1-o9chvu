import prisma from './db';

export const createActivity = async (data: {
  title: string;
  description: string;
  date: Date;
  location: string;
  maxParticipants: number;
  organizerId: string;
  tags: string[];
  images: string[];
}) => {
  return prisma.activity.create({
    data: {
      ...data,
      tags: {
        connectOrCreate: data.tags.map(tag => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
      images: {
        create: data.images.map(url => ({ url })),
      },
    },
    include: {
      organizer: true,
      tags: true,
      images: true,
    },
  });
};

export const getActivities = async () => {
  return prisma.activity.findMany({
    include: {
      organizer: true,
      participants: true,
      tags: true,
      images: true,
    },
  });
};

export const joinActivity = async (activityId: string, userId: string) => {
  return prisma.activity.update({
    where: { id: activityId },
    data: {
      participants: {
        connect: { id: userId },
      },
    },
  });
};