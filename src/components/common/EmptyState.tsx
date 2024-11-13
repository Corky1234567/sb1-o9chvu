import React from 'react';
import { VStack, Text, Icon, Button } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction
}) => {
  return (
    <VStack
      spacing={4}
      p={8}
      textAlign="center"
    >
      <Icon as={FaPlus} w={12} h={12} color="gray.400" />
      <Text fontSize="xl" fontWeight="bold">{title}</Text>
      <Text color="gray.500">{description}</Text>
      {actionLabel && onAction && (
        <Button
          colorScheme="teal"
          leftIcon={<FaPlus />}
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </VStack>
  );
};