import React from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Button,
  VStack,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import { FaCalendarPlus } from 'react-icons/fa';
import { SearchBar } from '../components/SearchBar';
import { PageHeader } from '../components/PageHeader';
import { ActivityCard } from '../components/ActivityCard';

export const ActivitiesPage: React.FC = () => {
  const activities = [
    {
      id: '1',
      title: '周末徒步活动',
      date: '2024-02-10 09:00',
      location: '香山',
      participants: 8,
      maxParticipants: 15,
      tags: ['运动', '户外', '交友'],
      description:
        '周末一起去香山徒步，欣赏美景，认识新朋友。路线已规划好，全程约4小时，难度适中。',
      organizer: {
        name: '户外达人',
        avatar: '',
      },
      images: ['https://images.unsplash.com/photo-1551632811-561732d1e306'],
    },
    {
      id: '2',
      title: '读书分享会',
      date: '2024-02-15 14:00',
      location: '市图书馆',
      participants: 12,
      maxParticipants: 20,
      tags: ['读书', '分享', '文化'],
      description:
        '每月一次的读书分享会，这次主题是科幻小说。欢迎带上你最近读过的好书来分享！',
      organizer: {
        name: '爱书人',
        avatar: '',
      },
      images: ['https://images.unsplash.com/photo-1481627834876-b7833e8f5570'],
    },
    {
      id: '3',
      title: '篮球友谊赛',
      date: '2024-02-18 15:00',
      location: '市体育中心',
      participants: 15,
      maxParticipants: 24,
      tags: ['运动', '篮球', '比赛'],
      description:
        '周末篮球友谊赛，3v3比赛制，每队4-6人，打满8队。场地已预订，欢迎各位球友参加！',
      organizer: {
        name: '篮球队长',
        avatar: '',
      },
      images: ['https://images.unsplash.com/photo-1546519638-68e109498ffc'],
    },
    // Adding more activities to reach 16
    {
      id: '4',
      title: '瑜伽晨练',
      date: '2024-02-20 07:00',
      location: '市公园',
      participants: 10,
      maxParticipants: 20,
      tags: ['运动', '健康', '瑜伽'],
      description: '晨练瑜伽，唤醒身体，迎接美好的一天。',
      organizer: {
        name: '瑜伽教练',
        avatar: '',
      },
      images: ['https://images.unsplash.com/photo-1518611012118-f67b24e2402b'],
    },
    {
      id: '5',
      title: '摄影外拍',
      date: '2024-02-22 10:00',
      location: '老城区',
      participants: 5,
      maxParticipants: 10,
      tags: ['摄影', '艺术', '交友'],
      description: '一起去老城区拍摄风景和人文，提升摄影技巧。',
      organizer: {
        name: '摄影达人',
        avatar: '',
      },
      images: ['https://images.unsplash.com/photo-1504198458649-a4a2ed02b76b'],
    },
    {
      id: '6',
      title: '手工艺制作',
      date: '2024-02-25 13:00',
      location: '社区活动中心',
      participants: 7,
      maxParticipants: 15,
      tags: ['手工', '创意', '文化'],
      description: '学习制作手工艺品，享受创作的乐趣，结识同样喜欢手工的朋友。',
      organizer: {
        name: '手工达人',
        avatar: '',
      },
      images: ['https://images.unsplash.com/photo-1512757776216-8d3d85dbf1a6'],
    },
    {
      id: '7',
      title: '羽毛球友谊赛',
      date: '2024-03-01 16:00',
      location: '市体育馆',
      participants: 8,
      maxParticipants: 16,
      tags: ['运动', '羽毛球', '比赛'],
      description: '羽毛球友谊赛，欢迎所有羽毛球爱好者参加，展示你的技巧！',
      organizer: {
        name: '羽毛球爱好者',
        avatar: '',
      },
      images: ['https://images.unsplash.com/photo-1526412112602-0a1df3e090d6'],
    },
    {
      id: '8',
      title: '电影观赏会',
      date: '2024-03-05 19:00',
      location: '社区影院',
      participants: 20,
      maxParticipants: 30,
      tags: ['电影', '社交', '娱乐'],
      description: '一起观赏经典电影，观影后交流观后感。',
      organizer: {
        name: '电影爱好者',
        avatar: '',
      },
      images: ['https://images.unsplash.com/photo-1512427691650-9946c040e206'],
    },
    // Additional activities to reach 16 in total...
    {
      id: '9',
      title: '烹饪工作坊',
      date: '2024-03-10 10:00',
      location: '烹饪学校',
      participants: 6,
      maxParticipants: 12,
      tags: ['美食', '烹饪', '学习'],
      description: '学习烹饪技巧，分享美食，感受烹饪的乐趣。',
      organizer: {
        name: '大厨',
        avatar: '',
      },
      images: ['https://images.unsplash.com/photo-1556910103-1c954f6b198d'],
    },
    {
      id: '10',
      title: '插花艺术',
      date: '2024-03-12 15:00',
      location: '花店',
      participants: 4,
      maxParticipants: 8,
      tags: ['艺术', '插花', '创意'],
      description: '学习插花艺术，制作属于自己的花艺作品。',
      organizer: {
        name: '花艺师',
        avatar: '',
      },
      images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30'],
    },
    {
      id: '11',
      title: '社区音乐会',
      date: '2024-03-15 18:00',
      location: '社区广场',
      participants: 30,
      maxParticipants: 50,
      tags: ['音乐', '娱乐', '社交'],
      description: '社区音乐会，一起欣赏现场音乐表演，感受音乐的魅力。',
      organizer: {
        name: '音乐达人',
        avatar: '',
      },
      images: ['https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4'],
    },
    {
      id: '12',
      title: '骑行活动',
      date: '2024-03-20 09:00',
      location: '郊外骑行道',
      participants: 10,
      maxParticipants: 20,
      tags: ['运动', '骑行', '户外'],
      description: '骑行郊外，呼吸新鲜空气，享受运动的快乐。',
      organizer: {
        name: '骑行爱好者',
        avatar: '',
      },
      images: ['https://images.unsplash.com/photo-1516762689617-f38b45d2a5a5'],
    },
    {
      id: '13',
      title: '桌游聚会',
      date: '2024-03-25 14:00',
      location: '桌游吧',
      participants: 6,
      maxParticipants: 12,
      tags: ['桌游', '娱乐', '社交'],
      description: '桌游聚会，轻松愉快的下午，一起来玩桌游吧！',
      organizer: {
        name: '桌游玩家',
        avatar: '',
      },
      images: ['https://images.unsplash.com/photo-1516455590571-18256e5bb9ff'],
    },
    {
      id: '14',
      title: '茶道体验',
      date: '2024-03-30 10:00',
      location: '茶艺馆',
      participants: 5,
      maxParticipants: 10,
      tags: ['茶道', '文化', '体验'],
      description: '学习茶道，体验中国传统茶文化的魅力。',
      organizer: {
        name: '茶艺师',
        avatar: '',
      },
      images: ['https://images.unsplash.com/photo-1556740738-b6a63e27c4df'],
    },
    {
      id: '15',
      title: '绘画工作坊',
      date: '2024-04-05 13:00',
      location: '艺术工作室',
      participants: 8,
      maxParticipants: 12,
      tags: ['绘画', '艺术', '创意'],
      description: '一起学习绘画技巧，创作自己的艺术作品。',
      organizer: {
        name: '画家',
        avatar: '',
      },
      images: ['https://images.unsplash.com/photo-1522202176988-66273c2fd55f'],
    },
    {
      id: '16',
      title: '园艺讲座',
      date: '2024-04-10 10:00',
      location: '市植物园',
      participants: 15,
      maxParticipants: 25,
      tags: ['园艺', '植物', '学习'],
      description: '学习园艺知识，掌握植物养护技巧，绿化家居环境。',
      organizer: {
        name: '园艺师',
        avatar: '',
      },
      images: ['https://images.unsplash.com/photo-1496769336828-c522a3a7e33c'],
    },
  ];

  const handleSearch = (value: string) => {
    console.log('Searching for activities:', value);
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <PageHeader
        title="活动列表"
        subtitle="发现有趣的活动，认识志同道合的朋友"
        imageSrc="https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80"
      />

      <Container maxW="container.xl" py={8}>
        <VStack spacing={8}>
          <Flex w="full" justify="space-between" align="center">
            <Button
              leftIcon={<FaCalendarPlus />}
              colorScheme="teal"
              size="lg"
              _hover={{
                transform: 'translateY(-2px)',
                shadow: 'lg',
              }}
              transition="all 0.2s"
              onClick={() => navigate('/createactivity')}
            >
              发起活动
            </Button>
          </Flex>

          <SearchBar placeholder="搜索活动..." onSearch={handleSearch} />

          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 4 }}
            spacing={6}
            width="full"
          >
            {activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};
