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
  useColorModeValue,
  HStack,
  Checkbox,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';

export const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: '密码不一致',
        description: '请确保两次输入的密码相同',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    toast({
      title: '注册成功',
      description: '欢迎加入我们！',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    navigate('/login');
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
      <Container maxW="lg" position="relative" zIndex={1}>
        <Box
          as={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          bg={cardBg}
          p={8}
          borderRadius="xl"
          boxShadow="xl"
          border="1px"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
        >
          <VStack spacing={6}>
            <Heading size="xl" color="teal.500">
              注册账号
            </Heading>
            <Text color="gray.600">加入找搭子，开启你的社交新生活</Text>

            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>用户名</FormLabel>
                  <Input placeholder="请输入用户名" />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>邮箱地址</FormLabel>
                  <Input type="email" placeholder="请输入邮箱" />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>密码</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="请输入密码"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label={showPassword ? '隐藏密码' : '显示密码'}
                        icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                        variant="ghost"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>确认密码</FormLabel>
                  <InputGroup>
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="请再次输入密码"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label={
                          showConfirmPassword ? '隐藏密码' : '显示密码'
                        }
                        icon={showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        variant="ghost"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <Checkbox colorScheme="teal">
                    我同意服务条款和隐私政策
                  </Checkbox>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="teal"
                  size="lg"
                  width="full"
                  mt={6}
                  _hover={{
                    transform: 'scale(1.05)',
                    boxShadow: 'xl',
                  }}
                  transition="all 0.2s"
                >
                  注册
                </Button>
              </VStack>
            </form>

            <HStack spacing={2}>
              <Text>已有账号？</Text>
              <Button
                variant="link"
                colorScheme="teal"
                onClick={() => navigate('/login')}
              >
                立即登录
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};
