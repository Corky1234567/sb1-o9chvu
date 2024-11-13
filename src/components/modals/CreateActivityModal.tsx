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
  useToast,
} from '@chakra-ui/react';
import { LocationSelector } from '../LocationSelector';

interface CreateActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateActivityModal: React.FC<CreateActivityModalProps> = ({
  isOpen,
  onClose
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    latitude: 0,
    longitude: 0,
    maxParticipants: 10
  });
  const toast = useToast();

  const handleSubmit = () => {
    // Here you would typically make an API call to create the activity
    toast({
      title: '活动已创建',
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>创建新活动</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>活动标题</FormLabel>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="输入活动标题"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>活动描述</FormLabel>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="详细描述活动内容"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>日期</FormLabel>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>时间</FormLabel>
              <Input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>地点</FormLabel>
              <LocationSelector onSelect={handleLocationSelect} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>最大参与人数</FormLabel>
              <NumberInput
                value={formData.maxParticipants}
                onChange={(_, value) => setFormData({ ...formData, maxParticipants: value })}
                min={1}
                max={100}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            取消
          </Button>
          <Button colorScheme="teal" onClick={handleSubmit}>
            创建活动
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};