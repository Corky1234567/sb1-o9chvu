import React from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  Select,
  Box,
  useColorModeValue,
  Button,
  Text,
  Divider,
} from '@chakra-ui/react';
import { FaShieldAlt } from 'react-icons/fa';

interface PrivacySettingsProps {
  settings: {
    profileVisibility: string;
    emailVisibility: string;
    locationVisibility: string;
    photosVisibility: string;
  };
  onUpdate: (settings: any) => void;
}

export const PrivacySettings: React.FC<PrivacySettingsProps> = ({
  settings,
  onUpdate,
}) => {
  const [formData, setFormData] = React.useState(settings);

  const handleChange = (field: string, value: string) => {
    const newSettings = { ...formData, [field]: value };
    setFormData(newSettings);
  };

  const handleSubmit = () => {
    onUpdate(formData);
  };

  return (
    <Box
      bg={useColorModeValue('white', 'gray.700')}
      p={6}
      borderRadius="lg"
      boxShadow="md"
    >
      <VStack spacing={6} align="stretch">
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            隐私设置
          </Text>
          <Text color="gray.500" mb={4}>
            控制你的个人信息对其他用户的可见性
          </Text>
        </Box>

        <Divider />

        <FormControl>
          <FormLabel>个人资料可见性</FormLabel>
          <Select
            value={formData.profileVisibility}
            onChange={(e) => handleChange('profileVisibility', e.target.value)}
          >
            <option value="public">所有人可见</option>
            <option value="friends">仅好友可见</option>
            <option value="private">仅自己可见</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>邮箱可见性</FormLabel>
          <Select
            value={formData.emailVisibility}
            onChange={(e) => handleChange('emailVisibility', e.target.value)}
          >
            <option value="public">所有人可见</option>
            <option value="friends">仅好友可见</option>
            <option value="private">仅自己可见</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>位置信息可见性</FormLabel>
          <Select
            value={formData.locationVisibility}
            onChange={(e) => handleChange('locationVisibility', e.target.value)}
          >
            <option value="public">所有人可见</option>
            <option value="friends">仅好友可见</option>
            <option value="private">仅自己可见</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>照片墙可见性</FormLabel>
          <Select
            value={formData.photosVisibility}
            onChange={(e) => handleChange('photosVisibility', e.target.value)}
          >
            <option value="public">所有人可见</option>
            <option value="friends">仅好友可见</option>
            <option value="private">仅自己可见</option>
          </Select>
        </FormControl>

        <Button
          leftIcon={<FaShieldAlt />}
          colorScheme="teal"
          onClick={handleSubmit}
          size="lg"
        >
          保存隐私设置
        </Button>
      </VStack>
    </Box>
  );
};