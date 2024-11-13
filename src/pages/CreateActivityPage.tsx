import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
  Select,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const CreateActivityPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [maxParticipants, setMaxParticipants] = useState(0);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && date && location && maxParticipants && description) {
      toast({
        title: '活动创建成功',
        description: `您的活动 "${title}" 已成功创建。`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      navigate('/activities');
    } else {
      toast({
        title: '创建失败',
        description: '请填写所有必填字段',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box minH="100vh" bg={bgColor} py={12}>
      <Container maxW="container.md">
        <Box
          p={8}
          bg={cardBg}
          borderRadius="xl"
          boxShadow="xl"
          border="1px"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
        >
          <VStack spacing={6} align="stretch">
            <VStack spacing={2} align="center" mb={4}>
              <Heading size="lg" color="teal.500">
                创建新活动
              </Heading>
            </VStack>

            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>活动名称</FormLabel>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="请输入活动名称"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>日期和时间</FormLabel>
                  <Input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>地点</FormLabel>
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="请输入活动地点"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>最大参与人数</FormLabel>
                  <Input
                    type="number"
                    value={maxParticipants}
                    onChange={(e) => setMaxParticipants(Number(e.target.value))}
                    placeholder="请输入最大参与人数"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>活动描述</FormLabel>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="请输入活动描述"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>标签</FormLabel>
                  <Select
                    placeholder="选择活动标签"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  >
                    <option value="运动">运动</option>
                    <option value="文化">文化</option>
                    <option value="艺术">艺术</option>
                    <option value="社交">社交</option>
                  </Select>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="teal"
                  size="lg"
                  width="full"
                  mt={6}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                  transition="all 0.2s"
                >
                  创建活动
                </Button>
              </VStack>
            </form>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default CreateActivityPage;
