import React, { useState } from 'react';
import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Container,
  IconButton,
  HStack,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FaArrowLeft,
  FaHome,
  FaUserFriends,
  FaCalendarAlt,
  FaRunning,
  FaSearch,
  FaSun,
  FaMoon,
  FaUser,
  FaSignInAlt,
  FaUserPlus,
} from 'react-icons/fa';
import { useColorMode } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';

export const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const { colorMode, toggleColorMode } = useColorMode();
  const { isAuthenticated } = useAuth();
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const iconColor = useColorModeValue('gray.600', 'gray.200');

  const getPageTitle = (pathname: string) => {
    switch (pathname) {
      case '/':
        return '首页';
      case '/home':
        return '主页';
      case '/find-friends':
        return '寻找好友';
      case '/activities':
        return '组局活动';
      case '/errands':
        return '跑腿服务';
      case '/login':
        return '登录';
      case '/register':
        return '注册';
      case '/profile':
        return '个人中心';
      default:
        return '找搭子';
    }
  };

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      console.log('Searching for:', searchQuery);
      // 实现搜索逻辑
    }
  };

  const isMainPage = ['/', '/home'].includes(location.pathname);

  return (
    <Box
      position="sticky"
      top={0}
      zIndex={1000}
      bg={bg}
      borderBottom="1px"
      borderColor={borderColor}
      shadow="sm"
    >
      <Container maxW="container.xl">
        <Flex h="60px" alignItems="center" justifyContent="space-between">
          <HStack spacing={4} flex={1}>
            {!isMainPage && (
              <IconButton
                aria-label="返回"
                icon={<FaArrowLeft />}
                variant="ghost"
                onClick={() => navigate(-1)}
              />
            )}
            <Text fontSize="lg" fontWeight="bold" color="teal.500">
              {getPageTitle(location.pathname)}
            </Text>
          </HStack>

          {isAuthenticated && (
            <HStack spacing={4} flex={2} justifyContent="center">
              <InputGroup maxW="400px">
                <InputLeftElement pointerEvents="none">
                  <FaSearch color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="搜索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearch}
                  bg={useColorModeValue('gray.50', 'gray.700')}
                  _focus={{
                    borderColor: 'teal.500',
                    boxShadow: '0 0 0 1px var(--chakra-colors-teal-500)',
                  }}
                />
              </InputGroup>
            </HStack>
          )}

          <HStack spacing={4} flex={1} justifyContent="flex-end">
            <IconButton
              aria-label="切换颜色模式"
              icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
              variant="ghost"
              onClick={toggleColorMode}
              color={iconColor}
            />

            <Button
              leftIcon={<FaHome />}
              variant="ghost"
              colorScheme="teal"
              onClick={() => navigate('/home')}
            >
              主页
            </Button>

            {isAuthenticated ? (
              <>
                <Button
                  leftIcon={<FaUserFriends />}
                  variant="ghost"
                  colorScheme="teal"
                  onClick={() => navigate('/find-friends')}
                >
                  寻友
                </Button>
                <Button
                  leftIcon={<FaCalendarAlt />}
                  variant="ghost"
                  colorScheme="teal"
                  onClick={() => navigate('/activities')}
                >
                  组局
                </Button>
                <Button
                  leftIcon={<FaRunning />}
                  variant="ghost"
                  colorScheme="teal"
                  onClick={() => navigate('/errands')}
                >
                  跑腿
                </Button>
                <Button
                  leftIcon={<FaUser />}
                  variant="ghost"
                  colorScheme="teal"
                  onClick={() => navigate('/profile')}
                >
                  个人中心
                </Button>
              </>
            ) : (
              <>
                <Button
                  leftIcon={<FaSignInAlt />}
                  variant="ghost"
                  colorScheme="teal"
                  onClick={() => navigate('/login')}
                >
                  登录
                </Button>
                <Button
                  leftIcon={<FaUserPlus />}
                  variant="ghost"
                  colorScheme="teal"
                  onClick={() => navigate('/register')}
                >
                  注册
                </Button>
              </>
            )}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};