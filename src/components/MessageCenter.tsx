import React from 'react';
import {
  Box,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
  Text,
  Badge,
  Heading,
  SimpleGrid,
} from '@chakra-ui/react';
import { ActivityCard } from './ActivityCard';
import { ErrandCard } from './ErrandCard';
import { PartnerCard } from './PartnerCard';

export const MessageCenter: React.FC = () => {
  // 模拟数据 - 实际应用中应从API获取
  const myActivities = [
    {
      id: '1',
      title: '周末徒步',
      date: '2024-02-20',
      location: '香山',
      participants: 5,
      maxParticipants: 10,
      tags: ['运动', '户外'],
      description: '周末一起去香山徒步',
      organizer: {
        name: '当前用户',
        avatar: '',
      },
      images: [],
      status: 'open',
    }
  ];

  const myErrands = [
    {
      id: '1',
      title: '帮取快递',
      deadline: '今天 18:00',
      location: '大学城快递站',
      reward: 10,
      status: 'open',
      tags: ['快递'],
      description: '帮忙取快递',
      requester: {
        name: '当前用户',
        avatar: '',
        rating: 5.0,
      },
      urgencyLevel: 50,
    }
  ];

  const myPartnerRequests = [
    {
      id: '1',
      name: '张三',
      age: 25,
      interests: ['运动', '读书'],
      location: '北京',
      description: '想找运动伙伴'
    }
  ];

  return (
    <Box
      bg={useColorModeValue('white', 'gray.700')}
      borderRadius="lg"
      p={6}
      shadow="md"
    >
      <Heading size="lg" mb={6}>我的消息中心</Heading>
      <Tabs colorScheme="teal" isFitted>
        <TabList mb={4}>
          <Tab>我发布的活动</Tab>
          <Tab>我的跑腿任务</Tab>
          <Tab>我的交友请求</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {myActivities.map(activity => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </SimpleGrid>
          </TabPanel>

          <TabPanel>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {myErrands.map(errand => (
                <ErrandCard key={errand.id} errand={errand} />
              ))}
            </SimpleGrid>
          </TabPanel>

          <TabPanel>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {myPartnerRequests.map(partner => (
                <PartnerCard
                  key={partner.id}
                  partner={partner}
                  onClick={() => {}}
                />
              ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};