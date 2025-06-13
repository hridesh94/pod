"use client";

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  videoUrl: string;
  title?: string;
  thumbnailUrl?: string;
  autoPlay?: boolean;
  loop?: boolean;
  controls?: boolean;
  muted?: boolean;
  className?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1' | '9:16' | 'custom';
  height?: string;
  width?: string;
}

export const VideoPlayer = ({
  videoUrl,
  title,
  thumbnailUrl,
  autoPlay = false,
  loop = false,
  controls = true,
  muted = false,
  className,
  aspectRatio = '16:9',
  height,
  width,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(!!thumbnailUrl && !autoPlay);
  
  // Map aspect ratio to CSS class
  const aspectRatioClasses = {
    '16:9': 'aspect-video', // 16:9
    '4:3': 'aspect-[4/3]',  // 4:3
    '1:1': 'aspect-square',  // 1:1
    '9:16': 'aspect-[9/16]', // 9:16
    'custom': '', // Custom aspect ratio using width/height props
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        setShowThumbnail(false);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleLoadedData = () => {
    setIsLoaded(true);
    if (autoPlay && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      setShowThumbnail(false);
    }
  };

  const containerClasses = cn(
    'relative overflow-hidden rounded-lg shadow-lg bg-neutral-900',
    aspectRatio !== 'custom' && aspectRatioClasses[aspectRatio],
    className
  );

  return (
    <div 
      className={containerClasses}
      style={aspectRatio === 'custom' ? { width, height } : {}}
    >
      {/* Video Player */}
      <video
        ref={videoRef}
        src={videoUrl}
        title={title}
        controls={controls}
        loop={loop}
        muted={muted}
        playsInline
        onLoadedData={handleLoadedData}
        className={cn(
          'w-full h-full object-cover',
          !isLoaded && 'invisible'
        )}
        poster={thumbnailUrl}
      />

      {/* Thumbnail Overlay */}
      {showThumbnail && thumbnailUrl && (
        <div 
          className="absolute inset-0 cursor-pointer"
          onClick={togglePlay}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <img 
            src={thumbnailUrl} 
            alt={title || 'Video thumbnail'} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="w-16 h-16 bg-primary-500/90 rounded-full flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                className="w-8 h-8 text-white ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
              </svg>
            </motion.div>
          </div>
          {title && (
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="font-medium">{title}</h3>
            </div>
          )}
        </div>
      )}

      {/* Custom Play/Pause Button when no Controls */}
      {!controls && isLoaded && !showThumbnail && (
        <button
          onClick={togglePlay}
          className="absolute bottom-4 right-4 bg-primary-500/80 hover:bg-primary-500 p-2 rounded-full transition-colors"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
            </svg>
          )}
        </button>
      )}

      {/* Loading Indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-900/50">
          <div className="w-12 h-12 rounded-full border-4 border-neutral-300 border-t-primary-500 animate-spin"></div>
        </div>
      )}
    </div>
  );
};
