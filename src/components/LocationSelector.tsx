import React, { useState, useEffect } from 'react';
import {
  Box,
  Input,
  VStack,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import AMapLoader from '@amap/amap-jsapi-loader';

interface LocationSelectorProps {
  onSelect: (location: { address: string; latitude: number; longitude: number }) => void;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({ onSelect }) => {
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [autoComplete, setAutoComplete] = useState<any>(null);

  useEffect(() => {
    const initAMap = async () => {
      const AMap = await AMapLoader.load({
        key: 'your-amap-key',
        version: '2.0',
        plugins: ['AMap.AutoComplete', 'AMap.PlaceSearch']
      });

      const auto = new AMap.AutoComplete({
        city: '全国'
      });

      setAutoComplete(auto);
    };

    initAMap();
  }, []);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    if (autoComplete && value.length > 0) {
      autoComplete.search(value, (status: string, result: any) => {
        if (status === 'complete') {
          setSuggestions(result.tips);
        }
      });
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (item: any) => {
    onSelect({
      address: item.name + item.district,
      latitude: item.location?.lat || 0,
      longitude: item.location?.lng || 0
    });
    setSearchValue(item.name);
    setSuggestions([]);
  };

  return (
    <Box position="relative" width="100%">
      <Input
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="搜索地址..."
      />
      {suggestions.length > 0 && (
        <List
          position="absolute"
          top="100%"
          left={0}
          right={0}
          maxH="200px"
          overflowY="auto"
          bg={useColorModeValue('white', 'gray.700')}
          borderRadius="md"
          boxShadow="lg"
          zIndex={1000}
        >
          {suggestions.map((item, index) => (
            <ListItem
              key={index}
              p={2}
              cursor="pointer"
              _hover={{ bg: useColorModeValue('gray.100', 'gray.600') }}
              onClick={() => handleSelect(item)}
            >
              <Text>{item.name}</Text>
              <Text fontSize="sm" color="gray.500">
                {item.district}
              </Text>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};