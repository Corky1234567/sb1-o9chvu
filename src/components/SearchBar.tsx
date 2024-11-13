import React from 'react';
import {
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = '搜索...',
  onSearch,
}) => {
  const [value, setValue] = React.useState('');

  const handleSearch = () => {
    onSearch?.(value);
  };

  return (
    <HStack w="full" spacing={4}>
      <InputGroup size="lg">
        <InputLeftElement pointerEvents="none">
          <FaSearch color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          bg={useColorModeValue('white', 'gray.700')}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
      </InputGroup>
      <Button colorScheme="teal" size="lg" onClick={handleSearch}>
        搜索
      </Button>
    </HStack>
  );
};
