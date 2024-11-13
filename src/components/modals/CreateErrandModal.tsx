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
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  useToast,
} from '@chakra-ui/react';
import { LocationSelector } from '../LocationSelector';

interface CreateErrandModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateErrandModal: React.FC<CreateErrandModalProps> = ({
  isOpen,
  onClose
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    time: '',
    location: '',
    latitude: 0,
    longitude: 0,
    reward: 0,
    urgencyLevel: 50
  });
  const toast = useToast();

  const handleSubmit = () => {
    // Here you would typically make an API call to create the errand
    toast({
      title: '任务已创建',
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
        <ModalHeader>发布跑腿任务</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>任务标题</FormLabel>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="输入任务标题"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>任务描述</FormLabel>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="详细描述任务要求"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>截止日期</FormLabel>
              <Input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>截止时间</FormLabel>
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
              <FormLabel>报酬 (元)</FormLabel>
              <NumberInput
                value={formData.reward}
                onChange={(_, value) => setFormData({ ...formData, reward: value })}
                min={0}
                precision={2}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl>
              <FormLabel>紧急程度</FormLabel>
              <Slider
                value={formData.urgencyLevel}
                onChange={(value) => setFormData({ ...formData, urgencyLevel: value })}
                min={0}
                max={100}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              <Text textAlign="right" fontSize="sm" color="gray.500">
                {formData.urgencyLevel}%
              </Text>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            取消
          </Button>
          <Button colorScheme="teal" onClick={handleSubmit}>
            发布任务
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};