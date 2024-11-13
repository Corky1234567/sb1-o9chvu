import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Button,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
  Avatar,
  AvatarBadge,
  IconButton,
  Heading,
  Text,
} from '@chakra-ui/react';
import { FaCamera, FaEdit, FaLock, FaUserCircle } from 'react-icons/fa';
import { PageHeader } from '../components/PageHeader';
import { ProfileForm } from '../components/profile/ProfileForm';
import { PrivacySettings } from '../components/profile/PrivacySettings';
import { PhotoGallery } from '../components/profile/PhotoGallery';
import { ProfilePreview } from '../components/profile/ProfilePreview';

export const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: '荆通',
    email: '13655338595@163.com',
    avatar: '',
    bio: '热爱生活，喜欢结交新朋友！',
    location: '山东青岛',
    interests: ['运动', '读书', '旅行'],
    skills: ['摄影', '烹饪'],
    photos: [],
    privacySettings: {
      profileVisibility: 'public',
      emailVisibility: 'friends',
      locationVisibility: 'public',
      photosVisibility: 'public',
    },
  });

  const toast = useToast();
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  const handleProfileUpdate = (newData: any) => {
    setProfileData({ ...profileData, ...newData });
    toast({
      title: '个人资料已更新',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    setIsEditing(false);
  };

  const handlePrivacyUpdate = (newSettings: any) => {
    setProfileData({
      ...profileData,
      privacySettings: { ...profileData.privacySettings, ...newSettings },
    });
    toast({
      title: '隐私设置已更新',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handlePhotoUpload = (newPhotos: string[]) => {
    setProfileData({
      ...profileData,
      photos: [...profileData.photos, ...newPhotos],
    });
    toast({
      title: '照片上传成功',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleAvatarUpdate = (newAvatar: string) => {
    setProfileData({
      ...profileData,
      avatar: newAvatar,
    });
    toast({
      title: '头像已更新',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box minH="100vh" bg={bgColor}>
      <PageHeader
        title="个人资料"
        subtitle="管理你的个人信息和隐私设置"
        imageSrc="https://images.unsplash.com/photo-1496302662116-35cc4f36df92"
      />

      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* 头像和基本信息 */}
          <Box
            bg={useColorModeValue('white', 'gray.700')}
            p={6}
            borderRadius="lg"
            boxShadow="md"
          >
            <VStack spacing={4} align="center">
              <Box position="relative">
                <Avatar
                  size="2xl"
                  name={profileData.username}
                  src={profileData.avatar}
                >
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="teal"
                    aria-label="更换头像"
                    icon={<FaCamera />}
                    onClick={() =>
                      document.getElementById('avatar-input')?.click()
                    }
                  />
                </Avatar>
                <input
                  id="avatar-input"
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      // 在实际应用中，这里应该处理文件上传
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        handleAvatarUpdate(e.target?.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </Box>
              <Heading size="lg">{profileData.username}</Heading>
              <Text color="gray.500">{profileData.email}</Text>
            </VStack>
          </Box>

          {/* 标签页内容 */}
          <Tabs variant="enclosed" colorScheme="teal">
            <TabList>
              <Tab>
                <HStack>
                  <FaUserCircle />
                  <Text>基本信息</Text>
                </HStack>
              </Tab>
              <Tab>
                <HStack>
                  <FaCamera />
                  <Text>照片墙</Text>
                </HStack>
              </Tab>
              <Tab>
                <HStack>
                  <FaLock />
                  <Text>隐私设置</Text>
                </HStack>
              </Tab>
              <Tab>
                <HStack>
                  <FaEdit />
                  <Text>预览</Text>
                </HStack>
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <ProfileForm
                  data={profileData}
                  isEditing={isEditing}
                  onSubmit={handleProfileUpdate}
                  onEditToggle={() => setIsEditing(!isEditing)}
                />
              </TabPanel>

              <TabPanel>
                <PhotoGallery
                  photos={profileData.photos}
                  onUpload={handlePhotoUpload}
                  visibility={profileData.privacySettings.photosVisibility}
                />
              </TabPanel>

              <TabPanel>
                <PrivacySettings
                  settings={profileData.privacySettings}
                  onUpdate={handlePrivacyUpdate}
                />
              </TabPanel>

              <TabPanel>
                <ProfilePreview profile={profileData} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>
    </Box>
  );
};
