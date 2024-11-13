import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useColorModeValue,
  Image,
  SimpleGrid,
} from '@chakra-ui/react';
import { PageHeader } from '../components/PageHeader';

export const GuidePage: React.FC = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.700');

  const guides = [
    {
      title: '如何开始使用',
      content: [
        '注册账号',
        '完善个人资料',
        '设置隐私选项',
        '开始探索平台',
      ],
    },
    {
      title: '寻找好友',
      content: [
        '浏览推荐好友',
        '使用搜索功能',
        '查看共同兴趣',
        '发送好友请求',
      ],
    },
    {
      title: '参与活动',
      content: [
        '浏览活动列表',
        '筛选感兴趣的活动',
        '报名参加',
        '与其他参与者交流',
      ],
    },
    {
      title: '发布跑腿任务',
      content: [
        '选择任务类型',
        '填写详细信息',
        '设置报酬',
        '等待接单',
      ],
    },
  ];

  return (
    <Box minH="100vh" bg={bgColor}>
      <PageHeader
        title="使用指南"
        subtitle="了解如何更好地使用找搭子"
        imageSrc="https://images.unsplash.com/photo-1434030216411-0b793f4b4173"
      />

      <Container maxW="container.xl" py={12}>
        <VStack spacing={12} align="stretch">
          <Box>
            <Heading mb={6}>快速入门</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              <Box>
                <Text fontSize="lg" lineHeight="tall">
                  找搭子是一个帮助你找到志同道合的朋友、参与有趣活动、获得生活帮助的平台。
                  通过这份指南，你可以快速了解平台的主要功能和使用方法。
                </Text>
              </Box>
              <Box>
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                  alt="使用指南"
                  borderRadius="lg"
                />
              </Box>
            </SimpleGrid>
          </Box>

          <Box>
            <Heading mb={6}>详细指南</Heading>
            <Accordion allowMultiple>
              {guides.map((guide, index) => (
                <AccordionItem key={index}>
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: 'teal.500', color: 'white' }}
                    >
                      <Box flex="1" textAlign="left">
                        <Text fontSize="lg" fontWeight="bold">
                          {guide.title}
                        </Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <VStack align="stretch" spacing={4}>
                      {guide.content.map((item, idx) => (
                        <Box
                          key={idx}
                          p={4}
                          bg={cardBg}
                          borderRadius="md"
                          boxShadow="sm"
                        >
                          <Text>{`${idx + 1}. ${item}`}</Text>
                        </Box>
                      ))}
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Box>

          <Box>
            <Heading mb={6}>使用技巧</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              <Box
                p={6}
                bg={cardBg}
                borderRadius="lg"
                boxShadow="md"
              >
                <Heading size="md" mb={4}>
                  个人资料优化
                </Heading>
                <Text>
                  完善的个人资料能帮助你更好地展示自己，吸引志同道合的朋友。
                </Text>
              </Box>
              <Box
                p={6}
                bg={cardBg}
                borderRadius="lg"
                boxShadow="md"
              >
                <Heading size="md" mb={4}>
                  活动参与
                </Heading>
                <Text>
                  积极参与活动不仅能扩展社交圈，还能获得更多推荐和展示机会。
                </Text>
              </Box>
              <Box
                p={6}
                bg={cardBg}
                borderRadius="lg"
                boxShadow="md"
              >
                <Heading size="md" mb={4}>
                  安全提示
                </Heading>
                <Text>
                  在线下见面时注意人身安全，建议选择人流量大的公共场所。
                </Text>
              </Box>
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};