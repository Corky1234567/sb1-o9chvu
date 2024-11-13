import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Button,
  useColorModeValue,
  Icon,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { FaCheckCircle, FaBriefcase, FaGraduationCap, FaUsers } from 'react-icons/fa';
import { PageHeader } from '../components/PageHeader';

export const JoinUsPage: React.FC = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.700');

  const positions = [
    {
      title: '前端开发工程师',
      department: '技术部',
      type: '全职',
      requirements: [
        '3年以上前端开发经验',
        '精通React、TypeScript',
        '良好的代码风格和团队协作能力',
      ],
    },
    {
      title: '产品经理',
      department: '产品部',
      type: '全职',
      requirements: [
        '2年以上社交产品相关经验',
        '优秀的产品思维和用户洞察能力',
        '出色的沟通协调能力',
      ],
    },
    {
      title: '市场营销专员',
      department: '市场部',
      type: '全职',
      requirements: [
        '1年以上市场营销经验',
        '优秀的文案写作能力',
        '良好的团队协作精神',
      ],
    },
  ];

  return (
    <Box minH="100vh" bg={bgColor}>
      <PageHeader
        title="加入我们"
        subtitle="与优秀的团队一起创造价值"
        imageSrc="https://images.unsplash.com/photo-1521737711867-e3b97375f902"
      />

      <Container maxW="container.xl" py={12}>
        <VStack spacing={12} align="stretch">
          <Box>
            <Heading mb={6}>为什么选择我们？</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              <Box
                p={6}
                bg={cardBg}
                borderRadius="lg"
                boxShadow="md"
                textAlign="center"
              >
                <Icon as={FaBriefcase} w={10} h={10} color="teal.500" mb={4} />
                <Heading size="md" mb={4}>
                  激励人心的工作
                </Heading>
                <Text>
                  参与创新项目，实现个人价值，获得职业发展的广阔空间。
                </Text>
              </Box>
              <Box
                p={6}
                bg={cardBg}
                borderRadius="lg"
                boxShadow="md"
                textAlign="center"
              >
                <Icon as={FaGraduationCap} w={10} h={10} color="teal.500" mb={4} />
                <Heading size="md" mb={4}>
                  持续学习成长
                </Heading>
                <Text>
                  提供专业培训和发展机会，支持员工持续提升能力。
                </Text>
              </Box>
              <Box
                p={6}
                bg={cardBg}
                borderRadius="lg"
                boxShadow="md"
                textAlign="center"
              >
                <Icon as={FaUsers} w={10} h={10} color="teal.500" mb={4} />
                <Heading size="md" mb={4}>
                  优秀的团队文化
                </Heading>
                <Text>
                  开放、包容的工作环境，充满活力的团队氛围。
                </Text>
              </Box>
            </SimpleGrid>
          </Box>

          <Box>
            <Heading mb={6}>当前职位</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              {positions.map((position, index) => (
                <Box
                  key={index}
                  p={6}
                  bg={cardBg}
                  borderRadius="lg"
                  boxShadow="md"
                >
                  <Heading size="md" mb={2}>
                    {position.title}
                  </Heading>
                  <Text color="gray.500" mb={4}>
                    {position.department} · {position.type}
                  </Text>
                  <List spacing={3} mb={6}>
                    {position.requirements.map((req, idx) => (
                      <ListItem key={idx}>
                        <ListIcon as={FaCheckCircle} color="green.500" />
                        {req}
                      </ListItem>
                    ))}
                  </List>
                  <Button colorScheme="teal">申请职位</Button>
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          <Box textAlign="center" py={8}>
            <Heading size="lg" mb={4}>
              没有找到合适的职位？
            </Heading>
            <Text mb={6}>
              发送您的简历到 hr@findpartner.com，我们会持续关注优秀的人才。
            </Text>
            <Button
              size="lg"
              colorScheme="teal"
              onClick={() => window.location.href = 'mailto:hr@findpartner.com'}
            >
              投递简历
            </Button>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};