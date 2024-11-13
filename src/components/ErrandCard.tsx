import React from 'react';
import {
  Box,
  Text,
  Button,
  VStack,
  Badge,
  HStack,
  useColorModeValue,
  Flex,
  Avatar,
  Tag,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  Progress,
} from '@chakra-ui/react';
import {
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaClock,
  FaEllipsisV,
  FaHandshake,
} from 'react-icons/fa';

interface ErrandProps {
  errand: {
    id: string;
    title: string;
    deadline: string;
    location: string;
    reward: number;
    status: string;
    tags: string[];
    description: string;
    requester: {
      name: string;
      avatar: string;
      rating: number;
    };
    urgencyLevel: number;
  };
}

export const ErrandCard: React.FC<ErrandProps> = ({ errand }) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'green';
      case 'in-progress':
        return 'blue';
      case 'completed':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return '待接单';
      case 'in-progress':
        return '进行中';
      case 'completed':
        return '已完成';
      default:
        return '未知状态';
    }
  };

  const getUrgencyColor = (level: number) => {
    if (level >= 80) return 'red';
    if (level >= 50) return 'orange';
    return 'green';
  };

  return (
    <Box
      bg={cardBg}
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      borderWidth="1px"
      _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
      transition="all 0.3s"
      position="relative"
    >
      {errand.urgencyLevel > 70 && (
        <Badge
          colorScheme="red"
          position="absolute"
          top={4}
          right={4}
          px={2}
          py={1}
          borderRadius="full"
        >
          紧急
        </Badge>
      )}

      <Box p={6}>
        <HStack justify="space-between" mb={4}>
          <HStack>
            <Avatar
              size="sm"
              name={errand.requester.name}
              src={errand.requester.avatar}
            />
            <VStack align="start" spacing={0}>
              <Text fontWeight="medium">{errand.requester.name}</Text>
              <Text fontSize="xs" color={textColor}>
                评分: {errand.requester.rating.toFixed(1)}
              </Text>
            </VStack>
          </HStack>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FaEllipsisV />}
              variant="ghost"
              size="sm"
            />
            <MenuList>
              <MenuItem>举报任务</MenuItem>
              <MenuItem>分享任务</MenuItem>
              <MenuItem>收藏任务</MenuItem>
            </MenuList>
          </Menu>
        </HStack>

        <Text fontSize="xl" fontWeight="bold" mb={2}>
          {errand.title}
        </Text>
        <Text color={textColor} noOfLines={2} mb={4}>
          {errand.description}
        </Text>

        <VStack spacing={2} align="stretch" mb={4}>
          <HStack justify="space-between">
            <Text fontSize="sm" color={textColor}>
              紧急程度
            </Text>
            <Progress
              value={errand.urgencyLevel}
              size="sm"
              colorScheme={getUrgencyColor(errand.urgencyLevel)}
              borderRadius="full"
              width="70%"
            />
          </HStack>
        </VStack>

        <HStack spacing={4} mb={4}>
          <HStack>
            <FaClock />
            <Text fontSize="sm">{errand.deadline}</Text>
          </HStack>
          <HStack>
            <FaMapMarkerAlt />
            <Text fontSize="sm">{errand.location}</Text>
          </HStack>
          <HStack>
            <FaMoneyBillWave />
            <Text fontSize="sm" color="orange.500" fontWeight="bold">
              ¥{errand.reward}
            </Text>
          </HStack>
        </HStack>

        <HStack spacing={2} mb={4} flexWrap="wrap">
          {errand.tags.map((tag, index) => (
            <Tag key={index} colorScheme="teal" size="sm">
              {tag}
            </Tag>
          ))}
        </HStack>

        <Divider mb={4} />

        <Flex justify="space-between" align="center">
          <Badge colorScheme={getStatusColor(errand.status)}>
            {getStatusText(errand.status)}
          </Badge>
          <Button
            rightIcon={<FaHandshake />}
            colorScheme="teal"
            size="sm"
            isDisabled={errand.status !== 'open'}
          >
            接单
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default ErrandCard;
