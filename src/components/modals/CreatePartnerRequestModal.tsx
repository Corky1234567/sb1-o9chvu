import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Tag,
  TagLabel,
  TagCloseButton,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { LocationSelector } from '../LocationSelector';

interface CreatePartnerRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePartnerRequestModal: React.FC<CreatePartnerRequestModalProps> = ({
  isOpen,
  onClose
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    age: 18,
    location: '',
    latitude: 0,
    longitude: 0,
    interests: [] as string[],
    newInterest: ''
  });
  const toast = useToast();

  const handleSubmit = () => {
    // Here you would typically make an API call to create the partner request
    toast({
      title: '交友请求已发布',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    onClose();
  };

  const handleLocationSelect = (location: { address: string; latitude: number; longitude: number }) => {
    setFormData(prev => ({
      ...prev,
      location: location.address,
      latitude: location.latitude,
      longitude: location.longitude
    }));
  };

  const addInterest = () => {
    if (formData.newInterest && !formData.interests.includes(formData.newInterest)) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, prev.newInterest],
        newInterest: ''
      }));
    }
  };

  const removeInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>发布交友请求</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>标题</FormLabel>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="简短描述你的交友意向"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>详细描述</FormLabel>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="详细描述你的兴趣爱好和交友要求"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>年龄</FormLabel>
              <NumberInput
                value={formData.age}
                onChange={(_, value) => setFormData({ ...formData, age: value })}
                min={18}
                max={100}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>地点</FormLabel>
              <LocationSelector onSelect={handleLocationSelect} />
            </FormControl>

            <FormControl>
              <FormLabel>兴趣爱好</FormLabel>
              <HStack mb={2}>
                <Input
                  value={formData.newInterest}
                  onChange={(e) => setFormData({ ...formData, newInterest: e.target.value })}
                  placeholder="添加兴趣爱好"
                />
                <Button onClick={addInterest}>添加</Button>
              </HStack>
              <HStack wrap="wrap" spacing={2}>
                {formData.interests.map((interest, index) => (
                  <Tag
                    key={index}
                    size="md"
                    borderRadius="full"
                    variant="solid"
                    colorScheme="teal"
                  >
                    <TagLabel>{interest}</TagLabel>
                    <TagCloseButton onClick={() => removeInterest(interest)} />
                  </Tag>
                ))}
              </HStack>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            取消
          </Button>
          <Button colorScheme="teal" onClick={handleSubmit}>
            发布请求
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};