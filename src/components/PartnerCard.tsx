import React from 'react';
import {
  Box,
  Text,
  Badge,
  VStack,
  HStack,
  Avatar,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { Partner } from '../types/Partner';
import { FaUserPlus } from 'react-icons/fa';

interface PartnerCardProps {
  partner: Partner;
  onClick: (partner: Partner) => void;
}

export const PartnerCard: React.FC<PartnerCardProps> = ({
  partner,
  onClick,
}) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const subTextColor = useColorModeValue('gray.500', 'gray.400');

  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="lg"
      cursor="pointer"
      onClick={() => onClick(partner)}
      _hover={{ shadow: 'lg' }}
      bg={cardBg}
      transition="all 0.3s"
    >
      <VStack align="start" spacing={4}>
        <HStack justifyContent="space-between" w="full">
          <HStack spacing={3}>
            <Avatar name={partner.name} />
            <VStack align="start" spacing={0}>
              <Text fontSize="xl" fontWeight="bold">
                {partner.name}
              </Text>
              <Text fontSize="sm" color={subTextColor}>
                年龄: {partner.age}
              </Text>
            </VStack>
          </HStack>
          <IconButton
            aria-label="添加好友"
            icon={<FaUserPlus />}
            variant="ghost"
            colorScheme="teal"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Adding friend:', partner.name);
            }}
          />
        </HStack>
        <Text fontSize="sm" color={textColor}>
          地点: {partner.location}
        </Text>
        <HStack wrap="wrap">
          {partner.interests.map((interest, index) => (
            <Badge key={index} colorScheme="teal">
              {interest}
            </Badge>
          ))}
        </HStack>
        <Text noOfLines={2} fontSize="sm" color={textColor}>
          {partner.description}
        </Text>
      </VStack>
    </Box>
  );
};

export default PartnerCard;
