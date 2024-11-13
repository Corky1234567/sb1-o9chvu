import React, { useState } from 'react';
import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  SimpleGrid,
  useColorModeValue,
  IconButton,
  Tooltip,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import {
  FaWeixin,
  FaWeibo,
  FaQq,
  FaTwitter,
  FaInstagram,
  FaFacebook,
} from 'react-icons/fa';

export const Footer = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSocialClick = (platform: string) => {
    const urls = {
      weixin: 'weixin://',
      weibo: 'https://weibo.com/your-profile',
      qq: 'tencent://message/?uin=your-qq-number',
      twitter: 'https://twitter.com/your-profile',
      instagram: 'https://instagram.com/your-profile',
      facebook: 'https://facebook.com/your-profile',
    };

    if (platform === 'weixin') {
      onOpen();
    } else {
      window.open(urls[platform as keyof typeof urls], '_blank');
    }
  };

  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      borderTop="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Container as={Stack} maxW="container.xl" py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align="flex-start" spacing={3}>
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              关于我们
            </Text>
            <Link
              href="#"
              _hover={{ color: 'teal.500', transform: 'translateX(5px)' }}
              transition="all 0.3s"
            >
              公司介绍
            </Link>
            <Link
              href="#"
              _hover={{ color: 'teal.500', transform: 'translateX(5px)' }}
              transition="all 0.3s"
            >
              加入我们
            </Link>
            <Link
              href="#"
              _hover={{ color: 'teal.500', transform: 'translateX(5px)' }}
              transition="all 0.3s"
            >
              联系方式
            </Link>
          </Stack>

          <Stack align="flex-start" spacing={3}>
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              服务内容
            </Text>
            <Link
              href="/find-friends"
              _hover={{ color: 'teal.500', transform: 'translateX(5px)' }}
              transition="all 0.3s"
            >
              寻找好友
            </Link>
            <Link
              href="/activities"
              _hover={{ color: 'teal.500', transform: 'translateX(5px)' }}
              transition="all 0.3s"
            >
              组局活动
            </Link>
            <Link
              href="/errands"
              _hover={{ color: 'teal.500', transform: 'translateX(5px)' }}
              transition="all 0.3s"
            >
              跑腿服务
            </Link>
          </Stack>

          <Stack align="flex-start" spacing={3}>
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              帮助中心
            </Text>
            <Link
              href="#"
              _hover={{ color: 'teal.500', transform: 'translateX(5px)' }}
              transition="all 0.3s"
            >
              使用指南
            </Link>
            <Link
              href="#"
              _hover={{ color: 'teal.500', transform: 'translateX(5px)' }}
              transition="all 0.3s"
            >
              常见问题
            </Link>
            <Link
              href="#"
              _hover={{ color: 'teal.500', transform: 'translateX(5px)' }}
              transition="all 0.3s"
            >
              意见反馈
            </Link>
          </Stack>

          <Stack align="flex-start" spacing={4}>
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              关注我们
            </Text>
            <Stack direction="row" spacing={4}>
              <Tooltip label="关注微信公众号" placement="top">
                <IconButton
                  aria-label="微信"
                  icon={<FaWeixin />}
                  colorScheme="green"
                  variant="ghost"
                  onClick={() => handleSocialClick('weixin')}
                  _hover={{
                    transform: 'translateY(-2px)',
                    shadow: 'md',
                    bg: 'green.100',
                  }}
                  transition="all 0.3s"
                />
              </Tooltip>
              <Tooltip label="关注微博" placement="top">
                <IconButton
                  aria-label="微博"
                  icon={<FaWeibo />}
                  colorScheme="red"
                  variant="ghost"
                  onClick={() => handleSocialClick('weibo')}
                  _hover={{
                    transform: 'translateY(-2px)',
                    shadow: 'md',
                    bg: 'red.100',
                  }}
                  transition="all 0.3s"
                />
              </Tooltip>
              <Tooltip label="添加QQ" placement="top">
                <IconButton
                  aria-label="QQ"
                  icon={<FaQq />}
                  colorScheme="blue"
                  variant="ghost"
                  onClick={() => handleSocialClick('qq')}
                  _hover={{
                    transform: 'translateY(-2px)',
                    shadow: 'md',
                    bg: 'blue.100',
                  }}
                  transition="all 0.3s"
                />
              </Tooltip>
              <Tooltip label="关注Twitter" placement="top">
                <IconButton
                  aria-label="Twitter"
                  icon={<FaTwitter />}
                  colorScheme="twitter"
                  variant="ghost"
                  onClick={() => handleSocialClick('twitter')}
                  _hover={{
                    transform: 'translateY(-2px)',
                    shadow: 'md',
                    bg: 'twitter.100',
                  }}
                  transition="all 0.3s"
                />
              </Tooltip>
              <Tooltip label="关注Instagram" placement="top">
                <IconButton
                  aria-label="Instagram"
                  icon={<FaInstagram />}
                  colorScheme="pink"
                  variant="ghost"
                  onClick={() => handleSocialClick('instagram')}
                  _hover={{
                    transform: 'translateY(-2px)',
                    shadow: 'md',
                    bg: 'pink.100',
                  }}
                  transition="all 0.3s"
                />
              </Tooltip>
              <Tooltip label="关注Facebook" placement="top">
                <IconButton
                  aria-label="Facebook"
                  icon={<FaFacebook />}
                  colorScheme="facebook"
                  variant="ghost"
                  onClick={() => handleSocialClick('facebook')}
                  _hover={{
                    transform: 'translateY(-2px)',
                    shadow: 'md',
                    bg: 'facebook.100',
                  }}
                  transition="all 0.3s"
                />
              </Tooltip>
            </Stack>
            <Text fontSize="sm" color="gray.500">
              扫描二维码关注我们的公众号，获取最新资讯
            </Text>
          </Stack>
        </SimpleGrid>

        <Box
          borderTopWidth={1}
          borderStyle="solid"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          pt={8}
          mt={8}
        >
          <Text
            textAlign="center"
            fontSize="sm"
            color={useColorModeValue('gray.600', 'gray.400')}
          >
            © {new Date().getFullYear()} 找搭子. All rights reserved
          </Text>
        </Box>
      </Container>

      {/* 微信二维码弹窗 */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>关注我们的微信公众号</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
              src="/path/to/your/wechat-qr-code.png"
              alt="微信二维码"
              mx="auto"
            />
            <Text textAlign="center" mt={4} color="gray.500">
              扫描二维码，获取最新资讯
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              关闭
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Footer;
