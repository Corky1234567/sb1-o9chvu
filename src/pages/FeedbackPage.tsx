import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Select,
  useColorModeValue,
  useToast,
  RadioGroup,
  Radio,
  Stack,
} from '@chakra-ui/react';
import { PageHeader } from '../components/PageHeader';

export const FeedbackPage: React.FC = () => {
  const [feedbackType, setFeedbackType] = useState('suggestion');
  const [satisfaction, setSatisfaction] = useState('3');
  const toast = useToast();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.700');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: '反馈已提交',
      description: '感谢您的反馈，我们会认真处理。',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box minH="100vh" bg={bgColor}>
      <PageHeader
        title="意见反馈"
        subtitle="帮助我们做得更好"
        imageSrc="https://images.unsplash.com/photo-1434626881859-194d67b2b86f"
      />

      <Container maxW="container.md" py={12}>
        <Box
          as="form"
          onSubmit={handleSubmit}
          bg={cardBg}
          p={8}
          borderRadius="lg"
          boxShadow="md"
        >
          <VStack spacing={6} align="stretch">
            <Heading size="lg" mb={4}>
              提交反馈
            </Heading>

            <FormControl isRequired>
              <FormLabel>反馈类型</FormLabel>
              <Select
                value={feedbackType}
                onChange={(e) => setFeedbackType(e.target.value)}
              >
                <option value="suggestion">功能建议</option>
                <option value="bug">问题报告</option>
                <option value="complaint">投诉</option>
                <option value="other">其他</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>满意度评分</FormLabel>
              <RadioGroup value={satisfaction} onChange={setSatisfaction}>
                <Stack direction="row" spacing={4}>
                  <Radio value="1">很不满意</Radio>
                  <Radio value="2">不满意</Radio>
                  <Radio value="3">一般</Radio>
                  <Radio value="4">满意</Radio>
                  <Radio value="5">很满意</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>标题</FormLabel>
              <Input placeholder="请简要描述您的反馈" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>详细描述</FormLabel>
              <Textarea
                placeholder="请详细描述您的建议或遇到的问题"
                rows={6}
              />
            </FormControl>

            <FormControl>
              <FormLabel>联系方式</FormLabel>
              <Input placeholder="请留下您的联系方式，方便我们回复（选填）" />
            </FormControl>

            <FormControl>
              <FormLabel>截图上传</FormLabel>
              <Input type="file" accept="image/*" multiple />
              <Text fontSize="sm" color="gray.500" mt={1}>
                可上传问题截图或相关图片（选填）
              </Text>
            </FormControl>

            <Button
              type="submit"
              colorScheme="teal"
              size="lg"
              width="full"
              mt={4}
            >
              提交反馈
            </Button>

            <Text fontSize="sm" color="gray.500" textAlign="center">
              我们会认真对待每一条反馈，感谢您帮助我们变得更好
            </Text>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};