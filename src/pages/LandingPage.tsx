import React from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Icon,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {
  FaUserFriends,
  FaUsers,
  FaRunning,
  FaArrowRight,
} from 'react-icons/fa';
import { ImageUploadBox } from '../components/ImageUploadBox';

const Feature = ({
  icon,
  title,
  text,
}: {
  icon: any;
  title: string;
  text: string;
}) => {
  return (
    <VStack
      p={6}
      bg={useColorModeValue('white', 'gray.700')}
      rounded="xl"
      shadow="md"
      borderWidth="1px"
      spacing={4}
      _hover={{
        transform: 'translateY(-8px)',
        shadow: 'xl',
        borderColor: 'teal.500',
      }}
      transition="all 0.3s"
    >
      <Icon as={icon} w={10} h={10} color="teal.500" />
      <Heading size="md">{title}</Heading>
      <Text
        textAlign="center"
        color={useColorModeValue('gray.600', 'gray.300')}
      >
        {text}
      </Text>
    </VStack>
  );
};

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  const handleImageUpload = (file: File) => {
    toast({
      title: '图片上传成功',
      description: `文件 ${file.name} 已上传`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box bg={bgColor}>
      {/* Hero Section */}
      <Container maxW="container.xl" pt={20} pb={16}>
        <VStack spacing={8} alignItems="center" textAlign="center">
          <Heading
            as="h1"
            size="2xl"
            bgGradient="linear(to-r, teal.400, teal.600)"
            bgClip="text"
            letterSpacing="tight"
            _hover={{
              bgGradient: 'linear(to-r, teal.500, teal.700)',
            }}
            transition="all 0.3s"
          >
            找搭子 - 你的生活小帮手
          </Heading>
          <Text
            fontSize="xl"
            color={useColorModeValue('gray.600', 'gray.300')}
            maxW="2xl"
            lineHeight="tall"
          >
            在这里，你可以找到志同道合的朋友，参与有趣的活动，获得生活上的帮助
          </Text>
          <HStack spacing={4}>
            <Button
              size="lg"
              colorScheme="teal"
              rightIcon={<FaArrowRight />}
              onClick={() => navigate('/login')}
              _hover={{
                transform: 'translateY(-2px)',
                shadow: 'lg',
              }}
              transition="all 0.3s"
            >
              立即开始
            </Button>
            <Button
              size="lg"
              variant="outline"
              colorScheme="teal"
              onClick={() => navigate('/about')}
              _hover={{
                transform: 'translateY(-2px)',
                shadow: 'lg',
                bg: 'teal.50',
              }}
              transition="all 0.3s"
            >
              了解更多
            </Button>
          </HStack>
        </VStack>
      </Container>

      {/* Image Upload Section */}
      <Box py={16} bg={useColorModeValue('white', 'gray.800')}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {[1, 2, 3].map((index) => (
              <ImageUploadBox
                key={index}
                index={index}
                onUpload={handleImageUpload}
              />
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={20} bg={useColorModeValue('gray.50', 'gray.900')}>
        <Container maxW="container.xl">
          <VStack spacing={16}>
            <Heading
              textAlign="center"
              bgGradient="linear(to-r, teal.400, teal.600)"
              bgClip="text"
            >
              我们的服务
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} width="full">
              <Box onClick={() => navigate('/find-friends')} cursor="pointer">
                <Feature
                  icon={FaUserFriends}
                  title="寻友"
                  text="找到兴趣相投的伙伴，扩展你的社交圈，让生活更有趣"
                />
              </Box>
              <Box onClick={() => navigate('/activities')} cursor="pointer">
                <Feature
                  icon={FaUsers}
                  title="组局"
                  text="发起或参与各种有趣的活动，认识新朋友，享受美好时光"
                />
              </Box>
              <Box onClick={() => navigate('/errands')} cursor="pointer">
                <Feature
                  icon={FaRunning}
                  title="跑腿"
                  text="提供或寻求生活帮助，让日常事务处理更加便捷"
                />
              </Box>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box py={20} bg={useColorModeValue('white', 'gray.800')}>
        <Container maxW="container.xl">
          <VStack spacing={8} textAlign="center">
            <Heading
              bgGradient="linear(to-r, teal.400, teal.600)"
              bgClip="text"
            >
              准备好开始了吗？
            </Heading>
            <Text
              fontSize="lg"
              color={useColorModeValue('gray.600', 'gray.300')}
            >
              加入我们，开启你的社交新生活
            </Text>
            <Button
              size="lg"
              colorScheme="teal"
              onClick={() => navigate('/register')}
              _hover={{
                transform: 'translateY(-2px)',
                shadow: 'lg',
              }}
              transition="all 0.3s"
            >
              立即注册
            </Button>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};
