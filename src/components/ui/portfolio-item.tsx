"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AudioWaveform } from '@/components/animations/audio-waveform';
import { cn } from '@/lib/utils';

interface PortfolioItemProps {
  title: string;
  client?: string;
  description: string;
  thumbnailUrl?: string;
  audioUrl?: string;
  videoUrl?: string;
  tags?: string[];
  className?: string;
  onDetails?: () => void;
}

export const PortfolioItem = ({
  title,
  client,
  description,
  thumbnailUrl,
  audioUrl,
  videoUrl,
  tags = [],
  className,
  onDetails,
}: PortfolioItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 400 225'%3E%3Crect width='400' height='225' fill='%233B82F6' fill-opacity='0.1'/%3E%3Cpath d='M185.125 101.504C168.092 101.504 154.25 115.346 154.25 132.379C154.25 149.412 168.092 163.254 185.125 163.254H214.875C231.908 163.254 245.75 149.412 245.75 132.379C245.75 115.346 231.908 101.504 214.875 101.504H185.125ZM183.887 117.801C183.887 115.807 185.807 114.551 187.555 115.518L211.738 128.372C213.562 129.378 213.562 132.05 211.738 133.056L187.555 145.91C185.807 146.878 183.887 145.621 183.887 143.627V117.801Z' fill='%233B82F6'/%3E%3C/svg%3E";
  
  return (
    <motion.div
      className={cn(
        "bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-md",
        className
      )}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative w-full h-56">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <Image
            src={placeholderImage}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        
        {/* Overlay on hover */}
        <motion.div 
          className="absolute inset-0 bg-primary-900 bg-opacity-70 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={onDetails}
            className="bg-white text-primary-900 rounded-full px-6 py-2 font-medium hover:bg-primary-50"
          >
            View Details
          </button>
        </motion.div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-display font-semibold text-neutral-900 dark:text-white">
            {title}
          </h3>
          
          {/* Audio sample preview */}
          {audioUrl && (
            <button
              className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-500"
              aria-label="Play audio sample"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
        
        {client && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
            Client: {client}
          </p>
        )}
        
        <p className="text-neutral-700 dark:text-neutral-300 mb-4">
          {description}
        </p>
        
        {/* Audio Waveform */}
        {audioUrl && (
          <div className="my-4">
            <AudioWaveform 
              barCount={24}
              barWidth={2}
              barGap={2}
              barMinHeight={4}
              barMaxHeight={16}
              playing={false} 
              color={isHovered ? "#3b82f6" : "#94a3b8"}
              className="h-8"
            />
          </div>
        )}
        
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag, index) => (
              <span 
                key={index}
                className="bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-xs px-2 py-1 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
