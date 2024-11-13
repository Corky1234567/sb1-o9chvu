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
  Button,
} from '@chakra-ui/react';
import { PageHeader } from '../components/PageHeader';
import { useNavigate } from 'react-router-dom';

export const FAQPage: React.FC = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  const faqs = [
    {
      category: '账号相关',
      questions: [
        {
          q: '如何注册账号？',
          a: '点击网站右上角的"注册"按钮，填写邮箱、用户名和密码即可完成注册。',
        },
        {
          q: '忘记密码怎么办？',
          a: '点击登录页面的"忘记密码"链接，通过验证邮箱来重置密码。',
        },
        {
          q: '如何修改个人信息？',
          a: '登录后进入"个人中心"，点击"编辑资料"即可修改个人信息。',
        },
      ],
    },
    {
      category: '活动相关',
      questions: [
        {
          q: '如何发起活动？',
          a: '登录后点击"发起活动"按钮，填写活动信息即可发布。',
        },
        {
          q: '如何参加活动？',
          a: '浏览活动列表，找到感兴趣的活动后点击"参加"按钮即可。',
        },
        {
          q: '活动费用如何支付？',
          a: '根据活动具体要求，可以线上支付或现场支付。',
        },
      ],
    },
    {
      category: '跑腿服务',
      questions: [
        {
          q: '如何发布跑腿任务？',
          a: '点击"发布任务"按钮，填写任务详情和报酬即可。',
        },
        {
          q: '报酬如何设置？',
          a: '根据任务难度和时间自行设置，建议参考平台的推荐区间。',
        },
        {
          q: '如何确保安全？',
          a: '平台会对接单者进行实名认证，同时提供交易担保服务。',
        },
      ],
    },
    {
      category: '安全与隐私',
      questions: [
        {
          q: '个人信息是否安全？',
          a: '平台采用加密技术保护用户信息，严格遵守隐私政策。',
        },
        {
          q: '如何举报不良行为？',
          a: '点击相关内容的"举报"按钮，填写举报原因即可。',
        },
        {
          q: '如何设置隐私选项？',
          a: '在"个人中心"的"隐私设置"中可以自定义各项隐私选项。',
        },
      ],
    },
  ];

  return (
    <Box minH="100vh" bg={bgColor}>
      <PageHeader
        title="常见问题"
        subtitle="快速解答您的疑问"
        imageSrc="https://images.unsplash.com/photo-1557804506-669a67965ba0"
      />

      <Container maxW="container.xl" py={12}>
        <VStack spacing={8} align="stretch">
          {faqs.map((category, index) => (
            <Box key={index}>
              <Heading size="lg" mb={4}>
                {category.category}
              </Heading>
              <Accordion allowMultiple>
                {category.questions.map((item, idx) => (
                  <AccordionItem key={idx}>
                    <h2>
                      <AccordionButton
                        _expanded={{ bg: 'teal.500', color: 'white' }}
                      >
                        <Box flex="1" textAlign="left">
                          <Text fontSize="lg">{item.q}</Text>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Text fontSize="md" color="gray.600">
                        {item.a}
                      </Text>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </Box>
          ))}

          <Box textAlign="center" py={8}>
            <Text fontSize="lg" mb={4}>
              没有找到您想问的问题？
            </Text>
            <Button
              colorScheme="teal"
              size="lg"
              onClick={() => navigate('/feedback')}
            >
              联系客服
            </Button>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};
