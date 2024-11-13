import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  useColorModeValue,
  Image,
  VStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
} from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  imageSrc: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  imageSrc,
}) => {
  return (
    <Box position="relative" mb={8}>
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        height="300px"
        overflow="hidden"
      >
        <Image
          src={imageSrc}
          alt={title}
          objectFit="cover"
          width="100%"
          height="100%"
          filter="brightness(0.7)"
        />
      </Box>
      <Container maxW="container.xl" position="relative" zIndex={1}>
        <Box pt={20} pb={16} textAlign="center" color="white">
          <VStack spacing={4}>
            <Breadcrumb color="white" separator="/" textAlign="center">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <Icon as={FaHome} mr={2} />
                  主页
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>{title}</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            <Heading size="2xl" mb={4} textShadow="2px 2px 4px rgba(0,0,0,0.4)">
              {title}
            </Heading>
            {subtitle && (
              <Text fontSize="xl" textShadow="1px 1px 2px rgba(0,0,0,0.4)">
                {subtitle}
              </Text>
            )}
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default PageHeader;
