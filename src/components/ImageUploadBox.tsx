import React, { useState } from 'react';
import {
  Box,
  AspectRatio,
  Icon,
  Text,
  VStack,
  IconButton,
  Image,
  Progress,
  useToast,
} from '@chakra-ui/react';
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ImageUploadBoxProps {
  index: number;
  onUpload?: (file: File) => void;
}

interface UploadedImage {
  url: string;
  file: File;
}

export const ImageUploadBox: React.FC<ImageUploadBoxProps> = ({
  index,
  onUpload,
}) => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const toast = useToast();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));

    imageFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadstart = () => setUploadProgress(0);
      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          const progress = (e.loaded / e.total) * 100;
          setUploadProgress(progress);
        }
      };
      reader.onload = (e) => {
        const url = e.target?.result as string;
        setImages((prev) => [...prev, { url, file }]);
        setUploadProgress(100);
        onUpload?.(file);
        toast({
          title: '图片上传成功',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      };
      reader.onerror = () => {
        toast({
          title: '图片上传失败',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadstart = () => setUploadProgress(0);
      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          const progress = (e.loaded / e.total) * 100;
          setUploadProgress(progress);
        }
      };
      reader.onload = (e) => {
        const url = e.target?.result as string;
        setImages((prev) => [...prev, { url, file }]);
        setUploadProgress(100);
        onUpload?.(file);
        toast({
          title: '图片上传成功',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      };
      reader.onerror = () => {
        toast({
          title: '图片上传失败',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.onchange = (e) =>
      handleFileSelect(e as unknown as React.ChangeEvent<HTMLInputElement>);
    input.click();
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  return (
    <AspectRatio ratio={16 / 9}>
      <Box
        border="2px dashed"
        borderColor={images.length > 0 ? 'transparent' : 'teal.500'}
        borderRadius="xl"
        cursor={images.length > 0 ? 'default' : 'pointer'}
        onClick={images.length > 0 ? undefined : handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        bg="gray.50"
        overflow="hidden"
        position="relative"
      >
        {uploadProgress > 0 && uploadProgress < 100 && (
          <Progress
            value={uploadProgress}
            size="sm"
            colorScheme="teal"
            position="absolute"
            top={0}
            left={0}
            right={0}
          />
        )}
        {images.length > 0 ? (
          <Box w="full" h="full">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={30}
              slidesPerView={1}
              style={{ width: '100%', height: '100%' }}
            >
              {images.map((image, i) => (
                <SwiperSlide key={i}>
                  <Box position="relative" w="full" h="full">
                    <Image
                      src={image.url}
                      alt={`Uploaded image ${i + 1}`}
                      objectFit="cover"
                      w="full"
                      h="full"
                    />
                    <IconButton
                      aria-label="Remove image"
                      icon={<FaTimes />}
                      position="absolute"
                      top={2}
                      right={2}
                      colorScheme="red"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(i);
                      }}
                    />
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        ) : (
          <VStack spacing="12px">
            <Icon as={FaCloudUploadAlt} w={10} h={10} color="teal.500" />
            <Text color="teal.500" fontSize="lg" fontWeight="medium">
              点击或拖拽上传图片 {index}
            </Text>
            <Text fontSize="sm" color="gray.500">
              支持 JPG、PNG 格式
            </Text>
          </VStack>
        )}
      </Box>
    </AspectRatio>
  );
};

export default ImageUploadBox;
