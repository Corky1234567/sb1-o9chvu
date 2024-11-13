import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const ResetPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: '重置链接已发送',
        description: '请检查您的邮箱',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box minH="100vh" bg={bgColor} py={12}>
      <Container maxW="lg">
        <Box
          bg={cardBg}
          p={8}
          borderRadius="xl"
          boxShadow="xl"
          border="1px"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
        >
          <VStack spacing={6}>
            <Heading size="xl" color="teal.500">重置密码</Heading>
            <Text color="gray.600" textAlign="center">
              请输入您的注册邮箱，我们将向您发送密码重置链接
            </Text>

            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>邮箱地址</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="请输入邮箱"
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="teal"
                  size="lg"
                  width="full"
                  mt={6}
                >
                  发送重置链接
                </Button>
              </VStack>
            </form>

            <HStack spacing={2}>
              <Text>记起密码了？</Text>
              <Button
                variant="link"
                colorScheme="teal"
                onClick={() => navigate('/login')}
              >
                返回登录
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};