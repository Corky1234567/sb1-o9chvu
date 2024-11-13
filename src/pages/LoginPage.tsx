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
  InputGroup,
  InputRightElement,
  IconButton,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  // 配色
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  // 提交表单处理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 简单验证
    if (!email.includes('@') || !email.includes('.')) {
      toast({
        title: '无效的邮箱',
        description: '请输入正确的邮箱地址',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if (!password) {
      toast({
        title: '登录失败',
        description: '请输入密码',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    toast({
      title: '登录成功',
      description: '欢迎回来！',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    navigate('/home');
  };

  return (
    <Box
      minH="100vh"
      bgImage="url('/images/12.jpg')"
      bgPosition="center"
      bgSize="cover"
      bgRepeat="no-repeat"
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: 'rgba(0, 0, 0, 0.6)',
      }}
      py={12}
    >
      <Container maxW="container.xl" position="relative" zIndex={1}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align="center"
          justify="center"
          gap={8}
        >
          {/* 左侧 - 登录表单 */}
          <Box
            w={{ base: 'full', md: '400px' }}
            p={8}
            bg={cardBg}
            borderRadius="xl"
            boxShadow="xl"
            border="1px"
            borderColor={useColorModeValue('gray.200', 'gray.700')}
          >
            <VStack spacing={6} align="stretch">
              <VStack spacing={2} align="center" mb={4}>
                <Heading size="xl" color="teal.500">
                  欢迎回来
                </Heading>
                <Text color={textColor}>请登录您的账号</Text>
              </VStack>

              <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>邮箱地址</FormLabel>
                    <InputGroup>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="请输入邮箱"
                        size="lg"
                        pr="4.5rem"
                        pl="2.5rem"
                        _focus={{
                          borderColor: 'teal.500',
                          boxShadow: '0 0 0 1px teal.500',
                        }}
                      />
                      <Box
                        position="absolute"
                        left="3"
                        top="3"
                        color="gray.400"
                      >
                        <FaEnvelope />
                      </Box>
                    </InputGroup>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>密码</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="请输入密码"
                        size="lg"
                        pr="4.5rem"
                        pl="2.5rem"
                        _focus={{
                          borderColor: 'teal.500',
                          boxShadow: '0 0 0 1px teal.500',
                        }}
                      />
                      <Box
                        position="absolute"
                        left="3"
                        top="3"
                        color="gray.400"
                      >
                        <FaLock />
                      </Box>
                      <InputRightElement h="full">
                        <IconButton
                          aria-label={showPassword ? '隐藏密码' : '显示密码'}
                          h="1.75rem"
                          size="sm"
                          onClick={() => setShowPassword(!showPassword)}
                          icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                          variant="ghost"
                        />
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>

                  <Button
                    type="submit"
                    colorScheme="teal"
                    size="lg"
                    width="full"
                    mt={6}
                    _hover={{
                      transform: 'scale(1.05)',
                      boxShadow: 'lg',
                    }}
                    transition="all 0.2s"
                  >
                    登录
                  </Button>
                </VStack>
              </form>

              <Flex justify="space-between" mt={4}>
                <Button variant="link" colorScheme="teal" size="sm">
                  忘记密码？
                </Button>
                <Button
                  variant="link"
                  colorScheme="teal"
                  size="sm"
                  onClick={() => navigate('/register')}
                >
                  注册账号
                </Button>
              </Flex>
            </VStack>
          </Box>

          {/* 右侧 - 插图和文字介绍部分 */}
          <Box
            as={motion.div}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            display={{ base: 'none', md: 'block' }}
            w={{ base: 'full', md: '500px' }}
            textAlign="center"
            color="white"
          >
            <VStack spacing={4}>
              <Heading size="2xl" color="teal.300">
                找搭子
              </Heading>
              <Text fontSize="2xl" fontWeight="bold">
                你的生活小帮手
              </Text>
              <Text fontSize="lg" maxW="400px">
                在这里，你可以找到志同道合的朋友，
                参与有趣的活动，获得生活上的帮助。
              </Text>
            </VStack>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};
