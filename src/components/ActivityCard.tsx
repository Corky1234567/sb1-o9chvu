import React, { useState } from 'react';
import {
  Box,
  Text,
  Button,
  HStack,
  Avatar,
  Tag,
  IconButton,
  Menu,
  MenuItem,
  Image,
  Icon,
  MenuButton,
  MenuList,
  Divider,
  AvatarGroup,
  useColorMode,
  useToast,
  Badge,
  Progress,
  VStack,
  Input,
  Textarea,
} from '@chakra-ui/react';
import {
  FaCalendarPlus,
  FaMapMarkerAlt,
  FaUsers,
  FaEllipsisV,
  FaHeart,
  FaComment,
  FaShare,
  FaExclamationTriangle,
  FaPaperPlane,
} from 'react-icons/fa';

interface ActivityProps {
  activity: {
    id: string;
    title: string;
    date: string;
    location: string;
    participants: number;
    maxParticipants: number;
    tags: string[];
    description: string;
    organizer: {
      name: string;
      avatar: string;
    };
    images: string[];
    reward?: number;
    status?: string;
    urgencyLevel?: number;
  };
}

export const ActivityCard: React.FC<ActivityProps> = ({ activity }) => {
  const { colorMode } = useColorMode();
  const cardBg = colorMode === 'light' ? 'white' : 'gray.700';
  const textColor = colorMode === 'light' ? 'gray.600' : 'gray.300';
  const [isLiked, setIsLiked] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<string[]>([]);
  const toast = useToast();

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? '已取消喜欢' : '已喜欢该活动',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleJoin = () => {
    setIsJoined(!isJoined);
    toast({
      title: isJoined ? '已取消参加' : '已参加该活动',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment('');
      toast({
        title: '评论已添加',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: '评论不能为空',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const getStatusColor = (status: string | undefined) => {
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

  const getStatusText = (status: string | undefined) => {
    switch (status) {
      case 'open':
        return '开放中';
      case 'in-progress':
        return '进行中';
      case 'completed':
        return '已完成';
      default:
        return '未知状态';
    }
  };

  const getUrgencyColor = (level: number | undefined) => {
    if (level === undefined) return 'gray';
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
      {activity.urgencyLevel !== undefined && activity.urgencyLevel > 70 && (
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
            <Avatar size="sm" name={activity.organizer.name} src={activity.organizer.avatar} />
            <Text fontWeight="medium">{activity.organizer.name}</Text>
          </HStack>
          <Menu>
            <MenuButton as={IconButton} icon={<FaEllipsisV />} variant="ghost" size="sm" />
            <MenuList>
              <MenuItem onClick={() => toast({ title: '活动已分享', status: 'info', duration: 2000, isClosable: true })}>
                分享活动
              </MenuItem>
              <MenuItem onClick={() => toast({ title: '活动已收藏', status: 'info', duration: 2000, isClosable: true })}>
                收藏活动
              </MenuItem>
              <MenuItem onClick={() => toast({ title: '举报已提交', status: 'warning', duration: 2000, isClosable: true })}>
                举报活动
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>

        {!activity.images.length && (
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            {activity.title}
          </Text>
        )}
        <Text color={textColor} noOfLines={2} mb={4}>
          {activity.description}
        </Text>

        {activity.urgencyLevel !== undefined && (
          <VStack spacing={2} align="stretch" mb={4}>
            <HStack justify="space-between">
              <Text fontSize="sm" color={textColor}>紧急程度</Text>
              <Progress
                value={activity.urgencyLevel}
                size="sm"
                colorScheme={getUrgencyColor(activity.urgencyLevel)}
                borderRadius="full"
                width="70%"
              />
            </HStack>
          </VStack>
        )}

        <HStack spacing={4} mb={4}>
          <HStack>
            <Icon as={FaCalendarPlus} />
            <Text fontSize="sm">{activity.date}</Text>
          </HStack>
          <HStack>
            <Icon as={FaMapMarkerAlt} />
            <Text fontSize="sm">{activity.location}</Text>
          </HStack>
          {activity.reward !== undefined && (
            <HStack>
              <Icon as={FaExclamationTriangle} />
              <Text fontSize="sm" color="orange.500" fontWeight="bold">
                ¥{activity.reward}
              </Text>
            </HStack>
          )}
        </HStack>

        <HStack spacing={2} mb={4} flexWrap="wrap">
          {activity.tags.map((tag, index) => (
            <Tag key={index} colorScheme="teal" size="sm">
              {tag}
            </Tag>
          ))}
        </HStack>

        <Divider mb={4} />

        <HStack justify="space-between" align="center">
          <AvatarGroup size="sm" max={3}>
            <Avatar name="参与者1" />
            <Avatar name="参与者2" />
            <Avatar name="参与者3" />
          </AvatarGroup>
          <Text fontSize="sm" color={textColor}>
            {activity.participants}/{activity.maxParticipants} 人参与
          </Text>
        </HStack>

        <Divider my={4} />

        <HStack justify="space-between">
          <Button variant="ghost" size="sm" onClick={handleLike} colorScheme={isLiked ? 'red' : 'gray'}>
            <Icon as={FaHeart} mr={2} /> {isLiked ? '已喜欢' : '喜欢'}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleJoin} colorScheme={isJoined ? 'blue' : 'gray'}>
            <Icon as={FaUsers} mr={2} /> {isJoined ? '已参加' : '参加'}
          </Button>
        </HStack>

        <Divider my={4} />

        <VStack align="stretch" spacing={3}>
          <HStack>
            <Textarea
              placeholder="输入您的评论..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              size="sm"
            />
            <IconButton
              aria-label="发送评论"
              icon={<FaPaperPlane />}
              colorScheme="teal"
              onClick={handleAddComment}
            />
          </HStack>
          {comments.length > 0 && (
            <Box>
              <Text fontWeight="bold" mb={2}>
                评论
              </Text>
              {comments.map((c, index) => (
                <Box key={index} p={2} bg={useColorModeValue('gray.100', 'gray.600')} borderRadius="md" mb={2}>
                  <Text>{c}</Text>
                </Box>
              ))}
            </Box>
          )}
        </VStack>
      </Box>
    </Box>
  );
};

export default ActivityCard;
