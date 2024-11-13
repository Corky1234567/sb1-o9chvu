import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useColorModeValue,
  useToast,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
} from '@chakra-ui/react';
import { PageHeader } from '../components/PageHeader';
import { LocationSelector } from '../components/LocationSelector';
import { useNavigate } from 'react-router-dom';

export const CreateErrandPage: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    time: '',
    location: '',
    latitude: 0,
    longitude: 0,
    reward: 0,
    urgencyLevel: 50,
    category: '',
  });

  const navigate = useNavigate();
  const toast = useToast();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.700');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: '任务已发布',
      description: '您的跑腿任务已成功发布',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    navigate('/errands');
  };

  const handleLocationSelect = (location: {
    address: string;
    latitude: number;
    longitude: number;
  }) => {
    setFormData({
      ...formData,
      location: location.address,
      latitude: location.latitude,
      longitude: location.longitude,
    });
  };

  return (
    <Box minH="100vh" bg={bgColor}>
      <PageHeader
        title="发布跑腿任务"
        subtitle="发布您的跑腿需求"
        imageSrc="https://images.unsplash.com/photo-1554774853-aae0a22c8aa4"
      />

      <Container maxW="container.md" py={12}>
        <Box
          as="form"
          onSubmit={handleSubmit}
          bg={cardBg}
          p={8}
          borderRadius="lg"
          boxShadow="md"
        >
          <VStack spacing={6}>
            <FormControl isRequired>
              <FormLabel>任务标题</FormLabel>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="请输入任务标题"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>任务类型</FormLabel>
              <Select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                placeholder="选择任务类型"
              >
                <option value="delivery">快递代取</option>
                <option value="shopping">代购</option>
                <option value="food">餐食代买</option>
                <option value="document">文件代办</option>
                <option value="other">其他</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>任务描述</FormLabel>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="详细描述任务要求"
                rows={6}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>截止日期</FormLabel>
              <Input
                type="date"
                value={formData.deadline}
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
                }
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>截止时间</FormLabel>
              <Input
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
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
                onChange={(_, value) =>
                  setFormData({ ...formData, reward: value })
                }
                min={0}
                max={1000}
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
                onChange={(value) =>
                  setFormData({ ...formData, urgencyLevel: value })
                }
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

            <Button
              type="submit"
              colorScheme="teal"
              size="lg"
              width="full"
              mt={4}
            >
              发布任务
            </Button>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};