import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Select,
  VStack,
  HStack,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
  Center,
  Button,
  Text,
  Heading,
  Avatar,
  Image,
  Stack,
  Badge,
} from '@chakra-ui/react';
import { PartnerList } from '../components/PartnerList';
import { Partner } from '../types/Partner';
import { SearchBar } from '../components/SearchBar';
import { PageHeader } from '../components/PageHeader';
import { LocationMap } from '../components/LocationMap';
import { RecommendedPartners } from '../components/RecommendedPartners';
import { RecommendationSystem } from '../lib/recommendation';

export const FindFriendsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [recommendedPartners, setRecommendedPartners] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const samplePartners: Partner[] = [
    {
      id: '1',
      name: '张三',
      age: 25,
      interests: ['运动', '读书', '旅行'],
      location: '北京',
      description: '热爱生活，喜欢结交新朋友',
    },
    {
      id: '2',
      name: '李四',
      age: 28,
      interests: ['摄影', '音乐', '美食'],
      location: '上海',
      description: '摄影爱好者，喜欢探索城市美食',
    },
    {
      id: '3',
      name: '王五',
      age: 23,
      interests: ['游戏', '动漫', '编程'],
      location: '广州',
      description: '技术宅，喜欢二次元文化',
    },
  ];

  const locations = [
    {
      id: '1',
      latitude: 39.90923,
      longitude: 116.397428,
      title: '张三 - 北京',
    },
    {
      id: '2',
      latitude: 31.230416,
      longitude: 121.473701,
      title: '李四 - 上海',
    },
    {
      id: '3',
      latitude: 23.129163,
      longitude: 113.264435,
      title: '王五 - 广州',
    },
  ];

  useEffect(() => {
    const fetchRecommendedPartners = async () => {
      try {
        setLoading(true);
        // 在实际应用中，这里应该使用真实的用户ID
        const mockUserId = '1';
        const recommendations = await RecommendationSystem.getRecommendedUsers(
          mockUserId
        );

        if (recommendations && recommendations.length > 0) {
          const formattedRecommendations = recommendations.map((user) => ({
            id: user.id,
            username: user.username,
            avatar: user.avatar,
            matchScore: Math.random(), // 在实际应用中，这应该是真实的匹配分数
            interests: user.interests,
            activities: user.activities,
          }));
          setRecommendedPartners(formattedRecommendations);
        } else {
          console.warn('No recommendations available');
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedPartners();
  }, []);

  const handlePartnerClick = (partner: Partner) => {
    console.log('Clicked partner:', partner);
    // 记录用户交互
    RecommendationSystem.updateUserInterests(
      'currentUserId',
      'view',
      partner.id
    );
  };

  const handleRecommendedPartnerClick = (partnerId: string) => {
    console.log('Clicked recommended partner:', partnerId);
    RecommendationSystem.updateUserInterests(
      'currentUserId',
      'view',
      partnerId
    );
  };

  const handleMarkerClick = (location: { id: string; title: string }) => {
    console.log('Clicked location:', location);
  };

  const handleSearch = (value: string) => {
    console.log('Searching for:', value);
    // TODO: Implement search functionality to filter partners based on value
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvince(e.target.value);
    setSelectedCity(''); // Reset city selection when province changes
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <PageHeader
        title="寻找好友"
        subtitle="找到志同道合的伙伴，扩展你的社交圈"
        imageSrc="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=2089&q=80"
      />

      <Container maxW="container.xl" py={8}>
        <VStack spacing={8}>
          <SearchBar placeholder="搜索好友..." onSearch={handleSearch} />

          <HStack w="full" spacing={4}>
            <Select placeholder="兴趣筛选" w="200px">
              <option value="sports">运动</option>
              <option value="reading">读书</option>
              <option value="travel">旅行</option>
              <option value="photography">摄影</option>
              <option value="music">音乐</option>
              <option value="cooking">烹饪</option>
              <option value="gaming">游戏</option>
              <option value="hiking">徒步</option>
              <option value="dancing">舞蹈</option>
              <option value="art">艺术</option>
              <option value="writing">写作</option>
              <option value="yoga">瑜伽</option>
              <option value="gardening">园艺</option>
              <option value="movies">电影</option>
              <option value="technology">科技</option>
              <option value="fashion">时尚</option>
              <option value="fitness">健身</option>
              <option value="volunteering">志愿者</option>
              <option value="boardgames">桌游</option>
              <option value="fishing">钓鱼</option>
              <option value="astronomy">天文学</option>
              <option value="crafts">手工制作</option>
              <option value="collecting">收藏</option>
              <option value="languages">语言学习</option>
              <option value="cycling">骑行</option>
              <option value="swimming">游泳</option>
              <option value="camping">露营</option>
              <option value="meditation">冥想</option>
              <option value="martialarts">武术</option>
              <option value="puzzles">拼图</option>
              <option value="history">历史</option>
              <option value="baking">烘焙</option>
              <option value="animalcare">动物护理</option>
              <option value="birdwatching">观鸟</option>
              <option value="kayaking">皮划艇</option>
              <option value="painting">绘画</option>
              <option value="scuba">潜水</option>
            </Select>

            <Select
              placeholder="省份筛选"
              w="200px"
              onChange={handleProvinceChange}
              value={selectedProvince}
            >
              <option value="beijing">北京</option>
              <option value="tianjin">天津</option>
              <option value="shanghai">上海</option>
              <option value="chongqing">重庆</option>
              <option value="hebei">河北省</option>
              <option value="shanxi">山西省</option>
              <option value="liaoning">辽宁省</option>
              <option value="jilin">吉林省</option>
              <option value="heilongjiang">黑龙江省</option>
              <option value="jiangsu">江苏省</option>
              <option value="zhejiang">浙江省</option>
              <option value="anhui">安徽省</option>
              <option value="fujian">福建省</option>
              <option value="jiangxi">江西省</option>
              <option value="shandong">山东省</option>
              <option value="henan">河南省</option>
              <option value="hubei">湖北省</option>
              <option value="hunan">湖南省</option>
              <option value="guangdong">广东省</option>
              <option value="hainan">海南省</option>
              <option value="sichuan">四川省</option>
              <option value="guizhou">贵州省</option>
              <option value="yunnan">云南省</option>
              <option value="shaanxi">陕西省</option>
              <option value="gansu">甘肃省</option>
              <option value="qinghai">青海省</option>
              <option value="taiwan">台湾省</option>
              <option value="neimenggu">内蒙古自治区</option>
              <option value="guangxi">广西壮族自治区</option>
              <option value="xizang">西藏自治区</option>
              <option value="ningxia">宁夏回族自治区</option>
              <option value="xinjiang">新疆维吾尔自治区</option>
              <option value="hongkong">香港特别行政区</option>
              <option value="macau">澳门特别行政区</option>
            </Select>

            {selectedProvince && (
              <Select
                placeholder="城市筛选"
                w="200px"
                onChange={handleCityChange}
                value={selectedCity}
              >
                {selectedProvince === 'guangdong' && (
                  <>
                    <option value="guangzhou">广州</option>
                    <option value="shenzhen">深圳</option>
                    <option value="zhuhai">珠海</option>
                    <option value="foshan">佛山</option>
                  </>
                )}
                {selectedProvince === 'zhejiang' && (
                  <>
                    <option value="hangzhou">杭州</option>
                    <option value="ningbo">宁波</option>
                    <option value="wenzhou">温州</option>
                    <option value="jiaxing">嘉兴</option>
                  </>
                )}
                {selectedProvince === 'jiangsu' && (
                  <>
                    <option value="nanjing">南京</option>
                    <option value="suzhou">苏州</option>
                    <option value="wuxi">无锡</option>
                    <option value="changzhou">常州</option>
                  </>
                )}
                {/* 根据其他省份继续添加城市 */}
              </Select>
            )}
          </HStack>

          <Tabs
            isFitted
            variant="enclosed"
            width="100%"
            index={activeTab}
            onChange={(index) => setActiveTab(index)}
          >
            <TabList mb="1em">
              <Tab>推荐</Tab>
              <Tab>列表视图</Tab>
              <Tab>地图视图</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {loading ? (
                  <Center py={8}>
                    <Spinner size="xl" color="teal.500" />
                  </Center>
                ) : (
                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
                    {recommendedPartners.map((partner) => (
                      <Box
                        key={partner.id}
                        p={6}
                        bg={useColorModeValue('white', 'gray.700')}
                        rounded="lg"
                        shadow="lg"
                        _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
                        transition="all 0.3s"
                        onClick={() =>
                          handleRecommendedPartnerClick(partner.id)
                        }
                        cursor="pointer"
                      >
                        <Stack direction="row" spacing={4} align="center">
                          <Avatar
                            src={partner.avatar}
                            name={partner.username}
                            size="lg"
                          />
                          <Stack>
                            <Text fontWeight="bold" fontSize="lg">
                              {partner.username}
                            </Text>
                            <Badge colorScheme="teal">{`匹配度: ${(
                              partner.matchScore * 100
                            ).toFixed(0)}%`}</Badge>
                          </Stack>
                        </Stack>
                        <Text
                          mt={4}
                          color={useColorModeValue('gray.600', 'gray.400')}
                        >
                          兴趣：{partner.interests.join(', ')}
                        </Text>
                      </Box>
                    ))}
                  </SimpleGrid>
                )}
              </TabPanel>
              <TabPanel>
                <PartnerList
                  partners={samplePartners}
                  onPartnerClick={handlePartnerClick}
                />
              </TabPanel>
              <TabPanel>
                <LocationMap
                  locations={locations}
                  onMarkerClick={handleMarkerClick}
                />
                <Box
                  mt={8}
                  p={6}
                  bg={useColorModeValue('white', 'gray.700')}
                  rounded="lg"
                  shadow="lg"
                >
                  <Text fontSize="xl" fontWeight="bold" mb={4}>
                    热门地点推荐
                  </Text>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                    {locations.map((location) => (
                      <Box
                        key={location.id}
                        p={4}
                        bg={useColorModeValue('gray.100', 'gray.800')}
                        rounded="md"
                        shadow="md"
                      >
                        <Heading size="md">{location.title}</Heading>
                        <Text mt={2}>
                          坐标: ({location.latitude}, {location.longitude})
                        </Text>
                      </Box>
                    ))}
                  </SimpleGrid>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>
    </Box>
  );
};
