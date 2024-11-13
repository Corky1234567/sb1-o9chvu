import React from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  SimpleGrid,
  Box,
  useColorModeValue,
  Tag,
  TagLabel,
  TagCloseButton,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { FaPlus, FaSave, FaEdit } from 'react-icons/fa';

interface ProfileFormProps {
  data: any;
  isEditing: boolean;
  onSubmit: (data: any) => void;
  onEditToggle: () => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  data,
  isEditing,
  onSubmit,
  onEditToggle,
}) => {
  const [formData, setFormData] = React.useState(data);
  const [newInterest, setNewInterest] = React.useState('');
  const [newSkill, setNewSkill] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addInterest = () => {
    if (newInterest && !formData.interests.includes(newInterest)) {
      setFormData({
        ...formData,
        interests: [...formData.interests, newInterest]
      });
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter((i: string) => i !== interest)
    });
  };

  const addSkill = () => {
    if (newSkill && !formData.skills.includes(newSkill)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s: string) => s !== skill)
    });
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      bg={useColorModeValue('white', 'gray.700')}
      p={6}
      borderRadius="lg"
      boxShadow="md"
    >
      <VStack spacing={6} align="stretch">
        <Button
          leftIcon={isEditing ? <FaSave /> : <FaEdit />}
          colorScheme="teal"
          alignSelf="flex-end"
          onClick={isEditing ? handleSubmit : onEditToggle}
        >
          {isEditing ? '保存' : '编辑'}
        </Button>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <FormControl>
            <FormLabel>用户名</FormLabel>
            <Input
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              isReadOnly={!isEditing}
            />
          </FormControl>

          <FormControl>
            <FormLabel>邮箱</FormLabel>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              isReadOnly={!isEditing}
            />
          </FormControl>
        </SimpleGrid>

        <FormControl>
          <FormLabel>个人简介</FormLabel>
          <Textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            isReadOnly={!isEditing}
            rows={4}
          />
        </FormControl>

        <FormControl>
          <FormLabel>所在地</FormLabel>
          <Input
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            isReadOnly={!isEditing}
          />
        </FormControl>

        <FormControl>
          <FormLabel>兴趣爱好</FormLabel>
          <HStack mb={4}>
            <Input
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              placeholder="添加新兴趣"
              isDisabled={!isEditing}
            />
            <IconButton
              icon={<FaPlus />}
              aria-label="添加兴趣"
              onClick={addInterest}
              isDisabled={!isEditing}
            />
          </HStack>
          <Box>
            {formData.interests.map((interest: string) => (
              <Tag
                key={interest}
                size="lg"
                colorScheme="teal"
                borderRadius="full"
                m={1}
              >
                <TagLabel>{interest}</TagLabel>
                {isEditing && (
                  <TagCloseButton onClick={() => removeInterest(interest)} />
                )}
              </Tag>
            ))}
          </Box>
        </FormControl>

        <FormControl>
          <FormLabel>擅长领域</FormLabel>
          <HStack mb={4}>
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="添加新技能"
              isDisabled={!isEditing}
            />
            <IconButton
              icon={<FaPlus />}
              aria-label="添加技能"
              onClick={addSkill}
              isDisabled={!isEditing}
            />
          </HStack>
          <Box>
            {formData.skills.map((skill: string) => (
              <Tag
                key={skill}
                size="lg"
                colorScheme="blue"
                borderRadius="full"
                m={1}
              >
                <TagLabel>{skill}</TagLabel>
                {isEditing && (
                  <TagCloseButton onClick={() => removeSkill(skill)} />
                )}
              </Tag>
            ))}
          </Box>
        </FormControl>
      </VStack>
    </Box>
  );
};