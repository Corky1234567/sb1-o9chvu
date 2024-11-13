import React from 'react';
import { SimpleGrid, Box, Text } from '@chakra-ui/react';
import { Partner } from '../types/Partner';
import { PartnerCard } from './PartnerCard';

interface PartnerListProps {
  partners: Partner[];
  onPartnerClick: (partner: Partner) => void;
}

export const PartnerList: React.FC<PartnerListProps> = ({
  partners,
  onPartnerClick,
}) => {
  return (
    <Box>
      {partners.length > 0 ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {partners.map((partner) => (
            <PartnerCard
              key={partner.id}
              partner={partner}
              onClick={onPartnerClick}
            />
          ))}
        </SimpleGrid>
      ) : (
        <Text fontSize="xl" textAlign="center" color="gray.500" mt={10}>
          暂无可显示的伙伴
        </Text>
      )}
    </Box>
  );
};

export default PartnerList;
