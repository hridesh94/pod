"use client";

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  quality?: number;
  className?: string;
  animate?: boolean;
  animationDelay?: number;
  animationType?: 'fade' | 'zoom' | 'slide';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
}

export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  priority = false,
  fill = false,
  quality = 85,
  className,
  animate = false,
  animationDelay = 0,
  animationType = 'fade',
  objectFit = 'cover',
}: OptimizedImageProps) => {
  // Base image component with optimization settings
  const imageComponent = (
    <Image 
      src={src} 
      alt={alt}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      sizes={sizes}
      priority={priority}
      fill={fill}
      quality={quality}
      className={cn(
        'transition-all duration-300',
        fill && 'object-cover', // Apply object-fit for fill mode
        objectFit === 'contain' && 'object-contain',
        objectFit === 'fill' && 'object-fill',
        objectFit === 'none' && 'object-none',
        className
      )}
    />
  );

  // Apply animations if requested
  if (animate) {
    const animationVariants = {
      fade: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.7, delay: animationDelay } },
      },
      zoom: {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { 
          opacity: 1, 
          scale: 1, 
          transition: { 
            opacity: { duration: 0.7, delay: animationDelay },
            scale: { duration: 1, delay: animationDelay, type: 'spring', stiffness: 100 }
          } 
        },
      },
      slide: {
        hidden: { opacity: 0, y: 30 },
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { 
            duration: 0.7, 
            delay: animationDelay, 
            type: 'spring', 
            stiffness: 100 
          } 
        },
      },
    };

    return (
      <motion.div 
        className={cn('relative', fill && 'w-full h-full')}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={animationVariants[animationType]}
      >
        {imageComponent}
      </motion.div>
    );
  }

  // Return without animation
  return imageComponent;
};
