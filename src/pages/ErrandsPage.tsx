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
import { FaMoneyBillWave } from 'react-icons/fa';
import { SearchBar } from '../components/SearchBar';
import { PageHeader } from '../components/PageHeader';
import { ErrandCard } from '../components/ErrandCard';

export const ErrandsPage: React.FC = () => {
  const errands = [
    {
      id: '1',
      title: '快递代取',
      deadline: '今天 18:00前',
      location: '大学城快递站',
      reward: 10,
      status: 'open',
      tags: ['快递', '跑腿'],
      description:
        '帮忙到快递站取一个小件快递，送到6号宿舍楼。快递已经到站，取件码已准备好。',
      requester: {
        name: '小明',
        avatar: '',
        rating: 4.8,
      },
      urgencyLevel: 85,
    },
    {
      id: '2',
      title: '资料打印',
      deadline: '明天 12:00前',
      location: '图书馆打印店',
      reward: 15,
      status: 'in-progress',
      tags: ['打印', '文件'],
      description:
        '帮忙打印30页课件，双面打印，装订。文件已发送到邮箱，打印完成后送到教学楼。',
      requester: {
        name: '小红',
        avatar: '',
        rating: 4.5,
      },
      urgencyLevel: 60,
    },
    {
      id: '3',
      title: '午餐代买',
      deadline: '今天 11:30前',
      location: '学生食堂',
      reward: 20,
      status: 'open',
      tags: ['外卖', '食物'],
      description:
        '帮忙到二楼买两份套餐，送到教学楼。具体菜品已列清单，要求准时送达。',
      requester: {
        name: '小华',
        avatar: '',
        rating: 4.9,
      },
      urgencyLevel: 90,
    },
    {
      id: '4',
      title: '超市购物',
      deadline: '今天 20:00前',
      location: '校园超市',
      reward: 12,
      status: 'open',
      tags: ['购物', '跑腿'],
      description:
        '帮忙到超市购买一些生活用品，购物清单已准备好，送到5号宿舍楼。',
      requester: {
        name: '小刚',
        avatar: '',
        rating: 4.6,
      },
      urgencyLevel: 75,
    },
    {
      id: '5',
      title: '药店代购',
      deadline: '今天 19:00前',
      location: '附近药店',
      reward: 18,
      status: 'open',
      tags: ['药品', '购物'],
      description:
        '帮忙到药店购买感冒药，送到7号宿舍楼。药名已提供，需要尽快购买。',
      requester: {
        name: '小丽',
        avatar: '',
        rating: 4.7,
      },
      urgencyLevel: 80,
    },
    {
      id: '6',
      title: '图书归还',
      deadline: '明天 10:00前',
      location: '市图书馆',
      reward: 8,
      status: 'open',
      tags: ['图书', '跑腿'],
      description: '帮忙将几本借来的图书归还到市图书馆，需在明天上午前完成。',
      requester: {
        name: '小涛',
        avatar: '',
        rating: 4.4,
      },
      urgencyLevel: 50,
    },
    {
      id: '7',
      title: '水果采购',
      deadline: '今天 17:00前',
      location: '水果店',
      reward: 14,
      status: 'open',
      tags: ['水果', '购物'],
      description: '帮忙到水果店购买一些水果，已列好清单，送到9号宿舍楼。',
      requester: {
        name: '小琴',
        avatar: '',
        rating: 4.8,
      },
      urgencyLevel: 70,
    },
    {
      id: '8',
      title: '帮忙搬书',
      deadline: '今天 16:00前',
      location: '教学楼A区',
      reward: 25,
      status: 'open',
      tags: ['搬运', '体力活'],
      description: '需要帮忙将一批书从教学楼A区搬到B区，书量不多，但较重。',
      requester: {
        name: '小强',
        avatar: '',
        rating: 4.9,
      },
      urgencyLevel: 85,
    },
    {
      id: '9',
      title: '宠物食品购买',
      deadline: '明天 15:00前',
      location: '宠物店',
      reward: 20,
      status: 'open',
      tags: ['宠物', '购物'],
      description:
        '帮忙到宠物店购买猫粮，送到10号宿舍楼。具体品牌和规格已注明。',
      requester: {
        name: '小爱',
        avatar: '',
        rating: 4.7,
      },
      urgencyLevel: 65,
    },
  ];

  const handleSearch = (value: string) => {
    console.log('Searching for errands:', value);
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <PageHeader
        title="跑腿任务"
        subtitle="发布或接取跑腿任务，互帮互助"
        imageSrc="https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80"
      />

      <Container maxW="container.xl" py={8}>
        <VStack spacing={8}>
          <Flex w="full" justify="space-between" align="center">
            <Button
              leftIcon={<FaMoneyBillWave />}
              colorScheme="teal"
              size="lg"
              _hover={{
                transform: 'translateY(-2px)',
                shadow: 'lg',
              }}
              transition="all 0.2s"
            >
              发布任务
            </Button>
          </Flex>

          <SearchBar placeholder="搜索任务..." onSearch={handleSearch} />

          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={6}
            width="full"
          >
            {errands.map((errand) => (
              <ErrandCard key={errand.id} errand={errand} />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};
