import React, { useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import AMapLoader from '@amap/amap-jsapi-loader';

interface Location {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
}

interface LocationMapProps {
  locations: Location[];
  onMarkerClick?: (location: Location) => void;
}

export const LocationMap: React.FC<LocationMapProps> = ({
  locations,
  onMarkerClick,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    const initMap = async () => {
      if (mapContainer.current) {
        try {
          const AMap = await AMapLoader.load({
            key: 'your-amap-key', // 请替换为您的高德地图 API Key
            version: '2.0',
            plugins: [
              'AMap.ToolBar',
              'AMap.Scale',
              'AMap.HawkEye',
              'AMap.MapType',
              'AMap.Geolocation',
            ],
          });

          // 初始化地图
          mapInstance.current = new AMap.Map(mapContainer.current, {
            zoom: 11,
            center:
              locations.length > 0
                ? [locations[0].longitude, locations[0].latitude]
                : [116.397428, 39.90923], // 使用第一个地点作为地图中心点
            resizeEnable: true,
          });

          // 添加地图控件
          mapInstance.current.addControl(new AMap.ToolBar());
          mapInstance.current.addControl(new AMap.Scale());
          mapInstance.current.addControl(new AMap.HawkEye({ isOpen: true }));
          mapInstance.current.addControl(new AMap.MapType());
          mapInstance.current.addControl(new AMap.Geolocation());

          // 添加标记点
          locations.forEach((location) => {
            const marker = new AMap.Marker({
              position: [location.longitude, location.latitude],
              title: location.title,
              animation: 'AMAP_ANIMATION_DROP',
            });

            marker.on('click', () => {
              onMarkerClick?.(location);
            });

            mapInstance.current.add(marker);
          });
        } catch (error) {
          console.error('地图初始化失败:', error);
        }
      }
    };

    initMap();

    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
      }
    };
  }, [locations, onMarkerClick]);

  return (
    <Box
      ref={mapContainer}
      h="500px"
      w="100%"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="base"
    />
  );
};

export default LocationMap;
