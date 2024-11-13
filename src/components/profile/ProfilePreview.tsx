import React, { useState } from 'react';
import {
  Box,
  VStack,
  Text,
  Avatar,
  Tag,
  SimpleGrid,
  useColorModeValue,
  Heading,
  HStack,
  Divider,
  Image,
  Button,
  Input,
} from '@chakra-ui/react';
import { FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

interface ProfilePreviewProps {
  profile: {
    username: string;
    email: string;
    avatar: string;
    bio: string;
    location: string;
    interests: string[];
    skills: string[];
    photos: string[];
    privacySettings: {
      profileVisibility: string;
      emailVisibility: string;
      locationVisibility: string;
      photosVisibility: string;
    };
  };
}

export const ProfilePreview: React.FC<ProfilePreviewProps> = ({ profile }) => {
  const [photos, setPhotos] = useState(profile.photos);
  const bgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const shouldShow = (field: keyof typeof profile.privacySettings) => {
    return profile.privacySettings[field] === 'public';
  };

  const handleAddPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newPhoto = URL.createObjectURL(event.target.files[0]);
      setPhotos([...photos, newPhoto]); // 更新图片列表
    }
  };

  return (
    <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md">
      <VStack spacing={6} align="stretch">
        {/* 头像和基本信息 */}
        <VStack align="center" spacing={4}>
          <Avatar size="2xl" name={profile.username} src={profile.avatar} />
          <Heading size="lg">{profile.username}</Heading>

          <HStack spacing={4}>
            {shouldShow('emailVisibility') && (
              <HStack>
                <FaEnvelope />
                <Text color={textColor}>{profile.email}</Text>
              </HStack>
            )}

            {shouldShow('locationVisibility') && (
              <HStack>
                <FaMapMarkerAlt />
                <Text color={textColor}>{profile.location}</Text>
              </HStack>
            )}
          </HStack>
        </VStack>

        <Divider />

        {/* 个人简介 */}
        <Box>
          <Heading size="md" mb={2}>
            关于我
          </Heading>
          <Text color={textColor}>{profile.bio}</Text>
        </Box>

        {/* 兴趣爱好 */}
        <Box>
          <Heading size="md" mb={2}>
            兴趣爱好
          </Heading>
          <HStack spacing={2} flexWrap="wrap">
            {profile.interests.map((interest, index) => (
              <Tag key={index} size="lg" colorScheme="teal" borderRadius="full">
                {interest}
              </Tag>
            ))}
          </HStack>
        </Box>

        {/* 擅长领域 */}
        <Box>
          <Heading size="md" mb={2}>
            擅长领域
          </Heading>
          <HStack spacing={2} flexWrap="wrap">
            {profile.skills.map((skill, index) => (
              <Tag key={index} size="lg" colorScheme="blue" borderRadius="full">
                {skill}
              </Tag>
            ))}
          </HStack>
        </Box>

        {/* 照片墙 */}
        {shouldShow('photosVisibility') && (
          <Box>
            <Heading size="md" mb={4}>
              照片墙
            </Heading>
            <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}>
              {photos.map((photo, index) => (
                <Image
                  key={index}
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  borderRadius="lg"
                  objectFit="cover"
                  w="100%"
                  h="200px"
                />
              ))}
            </SimpleGrid>
            <Box mt={4}>
              <Button as="label" colorScheme="teal" size="md">
                添加图片
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleAddPhoto}
                  style={{ display: 'none' }}
                />
              </Button>
            </Box>
          </Box>
        )}
      </VStack>
    </Box>
  );
};
