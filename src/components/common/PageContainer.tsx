import React from 'react';
import { Box, Container, useColorModeValue } from '@chakra-ui/react';

interface PageContainerProps {
  children: React.ReactNode;
  maxW?: string;
  py?: number;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  maxW = "container.xl",
  py = 8
}) => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Box minH="100vh" bg={bgColor}>
      <Container maxW={maxW} py={py}>
        {children}
      </Container>
    </Box>
  );
};