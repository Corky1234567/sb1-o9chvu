import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Image,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import { PageHeader } from '../components/PageHeader';

export const AboutPage: React.FC = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Box minH="100vh" bg={bgColor}>
      <PageHeader
        title="关于我们"
        subtitle="了解找搭子的故事和使命"
        imageSrc="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
      />

      <Container maxW="container.xl" py={12}>
        <VStack spacing={12} align="stretch">
          <Box>
            <Heading mb={6}>我们的故事</Heading>
            <Text fontSize="lg" lineHeight="tall">
              找搭子诞生于2024年，是一个致力于帮助人们建立社交连接、组织活动和互助的平台。
              我们相信，在这个数字化时代，人与人之间的真实连接比以往任何时候都更加重要。
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            <Box>
              <Heading size="lg" mb={4}>我们的使命</Heading>
              <Text fontSize="lg" lineHeight="tall">
                通过技术创新和人性化服务，搭建一个安全、友好、高效的社交平台，
                让每个人都能找到志同道合的伙伴，享受美好的社交生活。
              </Text>
            </Box>
            <Box>
              <Heading size="lg" mb={4}>我们的愿景</Heading>
              <Text fontSize="lg" lineHeight="tall">
                成为最受欢迎的社交活动平台，让更多人能够便捷地组织和参与各类活动，
                建立真诚的友谊，实现互帮互助。
              </Text>
            </Box>
          </SimpleGrid>

          <Box>
            <Heading size="lg" mb={6}>我们的团队</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              {/* 添加团队成员信息 */}
              <VStack>
                <Image
                  borderRadius="full"
                  boxSize="200px"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                  alt="CEO"
                />
                <Heading size="md">张三</Heading>
                <Text>首席执行官</Text>
              </VStack>
              <VStack>
                <Image
                  borderRadius="full"
                  boxSize="200px"
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
                  alt="CTO"
                />
                <Heading size="md">李四</Heading>
                <Text>技术总监</Text>
              </VStack>
              <VStack>
                <Image
                  borderRadius="full"
                  boxSize="200px"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
                  alt="COO"
                />
                <Heading size="md">王五</Heading>
                <Text>运营总监</Text>
              </VStack>
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};