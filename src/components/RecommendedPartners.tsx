import React from 'react';
import {
  Box,
  VStack,
  Text,
  SimpleGrid,
  useColorModeValue,
  Badge,
  HStack,
  Avatar,
  AvatarGroup,
  Tooltip,
} from '@chakra-ui/react';
import { FaUserFriends, FaStar } from 'react-icons/fa';

interface RecommendedPartner {
  id: string;
  username: string;
  avatar?: string;
  matchScore: number;
  interests: { name: string }[];
  activities: {
    id: string;
    title: string;
  }[];
}

interface RecommendedPartnersProps {
  partners: RecommendedPartner[];
  onPartnerClick: (partnerId: string) => void;
}

export const RecommendedPartners: React.FC<RecommendedPartnersProps> = ({
  partners,
  onPartnerClick,
}) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
      {partners.map((partner) => (
        <Box
          key={partner.id}
          bg={cardBg}
          p={6}
          borderRadius="lg"
          boxShadow="md"
          cursor="pointer"
          onClick={() => onPartnerClick(partner.id)}
          _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
          transition="all 0.3s"
        >
          <VStack spacing={4} align="stretch">
            <HStack spacing={4}>
              <Avatar size="lg" name={partner.username} src={partner.avatar} />
              <VStack align="start" spacing={1}>
                <Text fontWeight="bold" fontSize="lg">
                  {partner.username}
                </Text>
                <HStack>
                  <FaStar color="gold" />
                  <Text color={textColor}>
                    匹配度: {Math.round(partner.matchScore * 100)}%
                  </Text>
                </HStack>
              </VStack>
            </HStack>

            <Box>
              <Text fontWeight="medium" mb={2}>
                共同兴趣
              </Text>
              <HStack spacing={2} flexWrap="wrap">
                {partner.interests.map((interest, index) => (
                  <Badge
                    key={index}
                    colorScheme="teal"
                    variant="subtle"
                    px={2}
                    py={1}
                    borderRadius="full"
                  >
                    {interest.name}
                  </Badge>
                ))}
              </HStack>
            </Box>

            {partner.activities.length > 0 && (
              <Box>
                <Text fontWeight="medium" mb={2}>
                  近期活动
                </Text>
                <AvatarGroup size="sm" max={3}>
                  {partner.activities.map((activity) => (
                    <Tooltip key={activity.id} label={activity.title}>
                      <Avatar icon={<FaUserFriends />} bg="teal.500" />
                    </Tooltip>
                  ))}
                </AvatarGroup>
              </Box>
            )}
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default RecommendedPartners;
