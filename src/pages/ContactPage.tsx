import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Icon,
  Button,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWeixin,
  FaQq,
} from 'react-icons/fa';
import { PageHeader } from '../components/PageHeader';

export const ContactPage: React.FC = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.700');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 处理表单提交
  };

  return (
    <Box minH="100vh" bg={bgColor}>
      <PageHeader
        title="联系我们"
        subtitle="随时保持联系"
        imageSrc="https://images.unsplash.com/photo-1423666639041-f56000c27a9a"
      />

      <Container maxW="container.xl" py={12}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <VStack align="stretch" spacing={8}>
            <Heading>联系方式</Heading>

            <Box p={6} bg={cardBg} borderRadius="lg" boxShadow="md">
              <VStack align="start" spacing={6}>
                <Box>
                  <Heading size="md" mb={4}>
                    <Icon as={FaPhone} mr={2} />
                    电话
                  </Heading>
                  <Text>400-123-4567</Text>
                </Box>

                <Box>
                  <Heading size="md" mb={4}>
                    <Icon as={FaEnvelope} mr={2} />
                    邮箱
                  </Heading>
                  <Text>contact@findpartner.com</Text>
                </Box>

                <Box>
                  <Heading size="md" mb={4}>
                    <Icon as={FaMapMarkerAlt} mr={2} />
                    地址
                  </Heading>
                  <Text>北京市朝阳区xxx街道xxx大厦</Text>
                </Box>

                <Box>
                  <Heading size="md" mb={4}>
                    <Icon as={FaWeixin} mr={2} />
                    微信公众号
                  </Heading>
                  <Text>FindPartner</Text>
                </Box>

                <Box>
                  <Heading size="md" mb={4}>
                    <Icon as={FaQq} mr={2} />
                    QQ客服
                  </Heading>
                  <Text>123456789</Text>
                </Box>
              </VStack>
            </Box>
          </VStack>

          <VStack align="stretch" spacing={8}>
            <Heading>发送消息</Heading>

            <Box
              as="form"
              onSubmit={handleSubmit}
              p={6}
              bg={cardBg}
              borderRadius="lg"
              boxShadow="md"
            >
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>姓名</FormLabel>
                  <Input placeholder="请输入您的姓名" />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>邮箱</FormLabel>
                  <Input type="email" placeholder="请输入您的邮箱" />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>电话</FormLabel>
                  <Input type="tel" placeholder="请输入您的电话" />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>主题</FormLabel>
                  <Input placeholder="请输入消息主题" />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>消息内容</FormLabel>
                  <Textarea
                    placeholder="请输入您想告诉我们的内容"
                    rows={6}
                  />
                </FormControl>

                <Button type="submit" colorScheme="teal" size="lg" width="full">
                  发送消息
                </Button>
              </VStack>
            </Box>
          </VStack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};