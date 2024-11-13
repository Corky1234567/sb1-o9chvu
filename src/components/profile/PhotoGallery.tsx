import React, { useState } from 'react';
import {
  SimpleGrid,
  Box,
  Image,
  IconButton,
  useColorModeValue,
  Text,
  VStack,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Badge,
} from '@chakra-ui/react';
import { FaTrash, FaPlus, FaEye } from 'react-icons/fa';
import { ImageUploadBox } from '../ImageUploadBox';

interface PhotoGalleryProps {
  photos: string[];
  onUpload: (photos: string[]) => void;
  visibility: string;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos,
  onUpload,
  visibility,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleImageClick = (photo: string) => {
    setSelectedImage(photo);
    onOpen();
  };

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onUpload([e.target.result as string]);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <Box
      bg={useColorModeValue('white', 'gray.700')}
      p={6}
      borderRadius="lg"
      boxShadow="md"
    >
      <VStack spacing={6} align="stretch">
        <Text fontSize="xl" fontWeight="bold">
          照片墙
          {visibility !== 'public' && (
            <Badge ml={2} colorScheme="yellow">
              {visibility === 'friends' ? '仅好友可见' : '仅自己可见'}
            </Badge>
          )}
        </Text>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
          {photos.map((photo, index) => (
            <Box
              key={index}
              position="relative"
              cursor="pointer"
              onClick={() => handleImageClick(photo)}
              _hover={{ transform: 'scale(1.02)' }}
              transition="all 0.2s"
            >
              <Image
                src={photo}
                alt={`Photo ${index + 1}`}
                borderRadius="lg"
                objectFit="cover"
                w="100%"
                h="200px"
              />
              <IconButton
                aria-label="删除照片"
                icon={<FaTrash />}
                position="absolute"
                top={2}
                right={2}
                colorScheme="red"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  // 处理删除照片的逻辑
                }}
              />
              <IconButton
                aria-label="查看照片"
                icon={<FaEye />}
                position="absolute"
                bottom={2}
                right={2}
                colorScheme="teal"
                size="sm"
              />
            </Box>
          ))}
          <Box
            h="200px"
            borderWidth={2}
            borderStyle="dashed"
            borderColor="teal.500"
            borderRadius="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ImageUploadBox index={photos.length + 1} onUpload={handleUpload} />
          </Box>
        </SimpleGrid>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>查看照片</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Selected photo"
                maxH="70vh"
                w="100%"
                objectFit="contain"
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
