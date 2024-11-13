import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Icon,
  useColorModeValue,
  useToast,
  Flex,
  Badge,
  Avatar,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {
  FaUserFriends,
  FaUsers,
  FaRunning,
  FaArrowRight,
  FaFire,
  FaStar,
  FaStreetView,
} from 'react-icons/fa';
import { ImageUploadBox } from '../components/ImageUploadBox';
import { MessageCenter } from '../components/MessageCenter';
import { LocationMap } from '../components/LocationMap';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface FeatureProps {
  title: string;
  text: string;
  icon: any;
  onClick: () => void;
}

const Feature: React.FC<FeatureProps> = ({ title, text, icon, onClick }) => {
  return (
    <VStack
      p={6}
      bg={useColorModeValue('white', 'gray.700')}
      rounded="xl"
      shadow="md"
      borderWidth="1px"
      spacing={4}
      _hover={{
        transform: 'translateY(-8px)',
        shadow: 'xl',
        borderColor: 'teal.500',
      }}
      transition="all 0.3s"
      onClick={onClick}
      cursor="pointer"
    >
      <Icon as={icon} w={10} h={10} color="teal.500" />
      <Heading size="md">{title}</Heading>
      <Text
        textAlign="center"
        color={useColorModeValue('gray.600', 'gray.300')}
      >
        {text}
      </Text>
    </VStack>
  );
};

const ActivityCard = ({
  title,
  date,
  participants,
}: {
  title: string;
  date: string;
  participants: number;
}) => {
  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      bg={useColorModeValue('white', 'gray.700')}
      _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
      transition="all 0.2s"
    >
      <HStack spacing={4}>
        <Avatar size="md" name={title} bg="teal.500" />
        <Box flex={1}>
          <Text fontWeight="bold">{title}</Text>
          <Text fontSize="sm" color="gray.500">
            {date}
          </Text>
        </Box>
        <Badge colorScheme="teal">{participants} 人参与</Badge>
      </HStack>
    </Box>
  );
};

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleImageUpload = (file: File) => {
    toast({
      title: '图片上传成功',
      description: `文件 ${file.name} 已上传`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  // 模拟附近的用户位置数据
  const nearbyUsers = [
    {
      id: '1',
      latitude: 39.90923,
      longitude: 116.397428,
      title: '张三 - 5km',
    },
    {
      id: '2',
      latitude: 39.91923,
      longitude: 116.407428,
      title: '李四 - 3km',
    },
    // 添加更多用户位置
  ];

  if (!isLoggedIn) {
    return (
      <Box bg={bgColor} minH="100vh">
        {/* Hero Section */}
        <Container maxW="container.xl" pt={20} pb={16}>
          <VStack spacing={8} alignItems="center" textAlign="center">
            <Heading
              as="h1"
              size="2xl"
              bgGradient="linear(to-r, teal.400, teal.600)"
              bgClip="text"
              letterSpacing="tight"
              _hover={{
                bgGradient: 'linear(to-r, teal.500, teal.700)',
              }}
              transition="all 0.3s"
            >
              找搭子 - 你的生活小帮手
            </Heading>
            <Text
              fontSize="xl"
              color={useColorModeValue('gray.600', 'gray.300')}
              maxW="2xl"
              lineHeight="tall"
            >
              在这里，你可以找到志同道合的朋友，参与有趣的活动，获得生活上的帮助
            </Text>
            <HStack spacing={4}>
              <Button
                size="lg"
                colorScheme="teal"
                rightIcon={<FaArrowRight />}
                onClick={() => setIsLoggedIn(true)}
                _hover={{
                  transform: 'translateY(-2px)',
                  shadow: 'lg',
                }}
                transition="all 0.3s"
              >
                立即开始
              </Button>
              <Button
                size="lg"
                variant="outline"
                colorScheme="teal"
                onClick={() => navigate('/about')}
                _hover={{
                  transform: 'translateY(-2px)',
                  shadow: 'lg',
                  bg: 'teal.50',
                }}
                transition="all 0.3s"
              >
                了解更多
              </Button>
            </HStack>
          </VStack>
        </Container>

        {/* Carousel Section */}
        <Box py={10} bg={useColorModeValue('white', 'gray.800')}>
          <Container maxW="container.xl">
            <Carousel showThumbs={false} autoPlay infiniteLoop dynamicHeight>
              <Box position="relative">
                <img
                  src="/images/5.jpg"
                  alt="Banner 1"
                  style={{
                    height: '600px',
                    width: '600px',
                    objectFit: 'cover',
                    borderRadius: '15px',
                  }}
                />
                <Flex
                  bg="rgba(0, 0, 0, 0.5)"
                  color="white"
                  p={4}
                  position="absolute"
                  bottom={4}
                  left={4}
                  borderRadius="lg"
                >
                  <Text fontSize="2xl" fontWeight="bold">
                    随时随地寻找朋友
                  </Text>
                </Flex>
              </Box>
              <Box position="relative">
                <img
                  src="/images/1.jpg"
                  alt="Banner 2"
                  style={{
                    height: '600px',
                    width: '600px',
                    objectFit: 'cover',
                    borderRadius: '15px',
                  }}
                />
                <Flex
                  bg="rgba(0, 0, 0, 0.5)"
                  color="white"
                  p={4}
                  position="absolute"
                  bottom={4}
                  left={4}
                  borderRadius="lg"
                >
                  <Text fontSize="2xl" fontWeight="bold">
                    志同道合拉近距离
                  </Text>
                </Flex>
              </Box>
              <Box position="relative">
                <img
                  src="/images/2.jpg"
                  alt="Banner 3"
                  style={{
                    height: '600px',
                    width: '600px',
                    objectFit: 'cover',
                    borderRadius: '15px',
                  }}
                />
                <Flex
                  bg="rgba(0, 0, 0, 0.5)"
                  color="white"
                  p={4}
                  position="absolute"
                  bottom={4}
                  left={4}
                  borderRadius="lg"
                >
                  <Text fontSize="2xl" fontWeight="bold">
                    代拿跑腿抢先一步
                  </Text>
                </Flex>
              </Box>
            </Carousel>
          </Container>
        </Box>

        {/* Features Section */}
        <Box py={20} bg={useColorModeValue('gray.50', 'gray.900')}>
          <Container maxW="container.xl">
            <VStack spacing={16}>
              <Heading
                textAlign="center"
                bgGradient="linear(to-r, teal.400, teal.600)"
                bgClip="text"
              >
                我们的服务
              </Heading>
              <SimpleGrid
                columns={{ base: 1, md: 3 }}
                spacing={10}
                width="full"
              >
                <Box onClick={() => navigate('/find-friends')} cursor="pointer">
                  <Feature
                    icon={FaUserFriends}
                    title="寻友"
                    text="找到兴趣相投的伙伴，扩展你的社交圈，让生活更有趣"
                  />
                </Box>
                <Box onClick={() => navigate('/activities')} cursor="pointer">
                  <Feature
                    icon={FaUsers}
                    title="组局"
                    text="发起或参与各种有趣的活动，认识新朋友，享受美好时光"
                  />
                </Box>
                <Box onClick={() => navigate('/errands')} cursor="pointer">
                  <Feature
                    icon={FaRunning}
                    title="跑腿"
                    text="提供或寻求生活帮助，让日常事务处理更加便捷"
                  />
                </Box>
              </SimpleGrid>
            </VStack>
          </Container>
        </Box>

        {/* Image Upload Section */}
        <Box py={16} bg={useColorModeValue('white', 'gray.800')}>
          <Container maxW="container.xl">
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              {[1, 2, 3].map((index) => (
                <ImageUploadBox
                  key={index}
                  index={index}
                  onUpload={handleImageUpload}
                />
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Call to Action */}
        <Box py={20} bg={useColorModeValue('white', 'gray.800')}>
          <Container maxW="container.xl">
            <VStack spacing={8} textAlign="center">
              <Heading
                bgGradient="linear(to-r, teal.400, teal.600)"
                bgClip="text"
              >
                准备好开始了吗？
              </Heading>
              <Text
                fontSize="lg"
                color={useColorModeValue('gray.600', 'gray.300')}
              >
                加入我们，开启你的社交新生活
              </Text>
              <Button
                size="lg"
                colorScheme="teal"
                onClick={() => navigate('/register')}
                _hover={{
                  transform: 'translateY(-2px)',
                  shadow: 'lg',
                }}
                transition="all 0.3s"
              >
                立即注册
              </Button>
            </VStack>
          </Container>
        </Box>
      </Box>
    );
  }

  return (
    <Box bg={bgColor} minH="100vh">
      {/* Carousel Section */}
      <Box py={10} bg={useColorModeValue('white', 'gray.800')}>
        <Container maxW="container.xl">
          <Carousel showThumbs={false} autoPlay infiniteLoop dynamicHeight>
            <Box position="relative">
              <img
                src="/images/1.jpg"
                alt="Banner 1"
                style={{
                  height: '500px',
                  objectFit: 'cover',
                  borderRadius: '15px',
                }}
              />
              <Flex
                bg="rgba(0, 0, 0, 0.5)"
                color="white"
                p={4}
                position="absolute"
                bottom={4}
                left={4}
                borderRadius="lg"
              >
                <Text fontSize="2xl" fontWeight="bold">
                  欢迎回来，Corky！
                </Text>
              </Flex>
            </Box>
            <Box position="relative">
              <img
                src="/images/2.jpg"
                alt="Banner 2"
                style={{
                  height: '500px',
                  objectFit: 'cover',
                  borderRadius: '15px',
                }}
              />
              <Flex
                bg="rgba(0, 0, 0, 0.5)"
                color="white"
                p={4}
                position="absolute"
                bottom={4}
                left={4}
                borderRadius="lg"
              >
                <Text fontSize="2xl" fontWeight="bold">
                  找到志同道合的朋友
                </Text>
              </Flex>
            </Box>
            <Box position="relative">
              <img
                src="/images/3.jpg"
                alt="Banner 3"
                style={{
                  height: '500px',
                  objectFit: 'cover',
                  borderRadius: '15px',
                }}
              />
              <Flex
                bg="rgba(0, 0, 0, 0.5)"
                color="white"
                p={4}
                position="absolute"
                bottom={4}
                left={4}
                borderRadius="lg"
              >
                <Text fontSize="2xl" fontWeight="bold">
                  参与有趣的活动
                </Text>
              </Flex>
            </Box>
          </Carousel>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={20} bg={useColorModeValue('gray.50', 'gray.900')}>
        <Container maxW="container.xl">
          <VStack spacing={16}>
            <Heading
              textAlign="center"
              bgGradient="linear(to-r, teal.400, teal.600)"
              bgClip="text"
            >
              欢迎回来，用户名
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10} width="full">
              <Box onClick={() => navigate('/find-friends')} cursor="pointer">
                <Feature
                  icon={FaUserFriends}
                  title="寻友"
                  text="找到兴趣相投的伙伴，扩展你的社交圈，让生活更有趣"
                />
              </Box>
              <Box onClick={() => navigate('/activities')} cursor="pointer">
                <Feature
                  icon={FaUsers}
                  title="组局"
                  text="发起或参与各种有趣的活动，认识新朋友，享受美好时光"
                />
              </Box>
              <Box onClick={() => navigate('/errands')} cursor="pointer">
                <Feature
                  icon={FaRunning}
                  title="跑腿"
                  text="提供或寻求生活帮助，让日常事务处理更加便捷"
                />
              </Box>
              <Box onClick={() => navigate('/nearby')} cursor="pointer">
                <Feature
                  icon={FaStreetView}
                  title="附近的人"
                  text="发现并认识你周围的人，拉近距离从此刻开始"
                />
              </Box>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* 统计数据 */}
      <Box py={8} bg={bgColor}>
        <Container maxW="container.xl">
          <StatGroup
            w="full"
            bg={useColorModeValue('white', 'gray.700')}
            p={6}
            borderRadius="lg"
            shadow="md"
          >
            <Stat>
              <StatLabel>活跃度</StatLabel>
              <StatNumber>
                <Icon as={FaFire} color="orange.500" /> 98
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>好友数</StatLabel>
              <StatNumber>
                <Icon as={FaUserFriends} color="blue.500" /> 156
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>信用分</StatLabel>
              <StatNumber>
                <Icon as={FaStar} color="yellow.500" /> 4.9
              </StatNumber>
            </Stat>
          </StatGroup>
        </Container>
      </Box>

      {/* 内容标签页 */}
      <Box py={20}>
        <Container maxW="container.xl">
          <Tabs width="full" colorScheme="teal" variant="enclosed">
            <TabList>
              <Tab>我的消息</Tab>
              <Tab>附近的人</Tab>
              <Tab>最近活动</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <MessageCenter />
              </TabPanel>

              <TabPanel>
                <Box height="400px">
                  <LocationMap
                    locations={nearbyUsers}
                    onMarkerClick={(location) => {
                      console.log('Clicked user:', location);
                    }}
                  />
                </Box>
              </TabPanel>

              <TabPanel>
                <VStack spacing={4} align="stretch">
                  <ActivityCard
                    title="周末徒步"
                    date="今天 14:00"
                    participants={12}
                  />
                  <ActivityCard
                    title="篮球友谊赛"
                    date="明天 10:00"
                    participants={8}
                  />
                  <ActivityCard
                    title="读书分享会"
                    date="后天 19:00"
                    participants={15}
                  />
                  <ActivityCard
                    title="音乐节"
                    date="本周六 18:00"
                    participants={50}
                  />
                  <ActivityCard
                    title="社区清洁活动"
                    date="下周一 09:00"
                    participants={20}
                  />
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Box>
    </Box>
  );
};
