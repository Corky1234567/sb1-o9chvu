import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  IconButton,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  HStack,
  Text,
  useColorModeValue,
  Collapse,
} from '@chakra-ui/react';
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaForward,
  FaBackward,
  FaMusic,
} from 'react-icons/fa';

// 音乐数据
const songs = [
  { title: '轻音乐1', url: '/music/song1.mp3' },
  { title: '轻音乐2', url: '/music/song2.mp3' },
  // 添加更多音乐
];

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true); // 初始设置为播放状态
  const [currentSong, setCurrentSong] = useState(0); // 当前播放的歌曲索引
  const [volume, setVolume] = useState(0.5); // 音量
  const [isMuted, setIsMuted] = useState(false); // 静音状态
  const [progress, setProgress] = useState(0); // 播放进度
  const [isControlsVisible, setIsControlsVisible] = useState(false); // 控制面板的显示/隐藏状态
  const audioRef = useRef<HTMLAudioElement | null>(null); // 引用音频元素

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // 初始化音频并监听播放进度
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(songs[currentSong].url);
      audioRef.current.play(); // 自动播放音乐
    } else {
      audioRef.current.src = songs[currentSong].url;
      if (isPlaying) {
        audioRef.current.play(); // 保证在切换歌曲时继续播放
      } else {
        audioRef.current.pause(); // 如果是暂停状态，暂停播放
      }
    }

    audioRef.current.volume = volume;
    audioRef.current.muted = isMuted;

    const handleTimeUpdate = () => {
      if (audioRef.current) {
        const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(progress);
      }
    };

    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);

    // 清理事件监听器
    return () => {
      audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [currentSong, volume, isMuted, isPlaying]); // 当歌曲、音量、静音状态或播放状态变化时更新音频

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const playNext = () => {
    setCurrentSong((prev) => (prev + 1) % songs.length);
  };

  const playPrevious = () => {
    setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const handleProgressChange = (value: number) => {
    if (audioRef.current) {
      const time = (value / 100) * audioRef.current.duration;
      audioRef.current.currentTime = time;
      setProgress(value);
    }
  };

  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      p={4}
      bg={bg}
      borderTop="1px"
      borderColor={borderColor}
      zIndex={1000}
    >
      <HStack spacing={4} justify="center" align="center">
        {/* 音乐图标，点击时展开/收起控制面板 */}
        <IconButton
          aria-label="Toggle Music Controls"
          icon={<FaMusic />}
          onClick={() => setIsControlsVisible(!isControlsVisible)}
          size="sm"
        />

        {/* 显示当前歌曲标题 */}
        <Text fontSize="sm" width="200px" isTruncated>
          {songs[currentSong].title}
        </Text>
      </HStack>

      {/* 控制面板，使用Collapse组件来实现展开与收起 */}
      <Collapse in={isControlsVisible}>
        <HStack spacing={4} justify="center" align="center">
          {/* 上一首按钮 */}
          <IconButton
            aria-label="Previous song"
            icon={<FaBackward />}
            onClick={playPrevious}
            size="sm"
            disabled={songs.length <= 1}
          />
          {/* 播放/暂停按钮 */}
          <IconButton
            aria-label={isPlaying ? 'Pause' : 'Play'}
            icon={isPlaying ? <FaPause /> : <FaPlay />}
            onClick={togglePlay}
            size="sm"
          />
          {/* 下一首按钮 */}
          <IconButton
            aria-label="Next song"
            icon={<FaForward />}
            onClick={playNext}
            size="sm"
            disabled={songs.length <= 1}
          />

          {/* 播放进度条 */}
          <Box width="300px">
            <Slider
              aria-label="progress-bar"
              value={progress}
              onChange={handleProgressChange}
              min={0}
              max={100}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>

          {/* 静音按钮 */}
          <IconButton
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            icon={isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            onClick={toggleMute}
            size="sm"
          />

          {/* 音量控制 */}
          <Box width="100px">
            <Slider
              aria-label="volume-control"
              value={volume}
              onChange={handleVolumeChange}
              min={0}
              max={1}
              step={0.1}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
        </HStack>
      </Collapse>
    </Box>
  );
};
