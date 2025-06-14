"use client";

import React, { useState, useEffect } from 'react';
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
  // Mobile-specific props
  mobileSize?: 'sm' | 'md' | 'lg' | 'full'; // Controls the size on mobile
  mobileSizes?: string; // Specific sizes attribute for mobile
  loadingStrategy?: 'eager' | 'lazy';
  lowQualityPlaceholder?: boolean; // Use a low quality image placeholder
}

export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  // Default sizes that work better for mobile devices
  sizes = '(max-width: 640px) 95vw, (max-width: 768px) 85vw, (max-width: 1024px) 50vw, 33vw',
  priority = false,
  fill = false,
  quality = 85,
  className,
  animate = false,
  animationDelay = 0,
  animationType = 'fade',
  objectFit = 'cover',
  mobileSize = 'md',
  mobileSizes,
  loadingStrategy,
  lowQualityPlaceholder = false,
}: OptimizedImageProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate responsive dimensions based on mobile size
  const mobileClassName = isMobile ? {
    'sm': 'max-w-[85%] mx-auto',
    'md': 'max-w-[92%] mx-auto',
    'lg': 'max-w-[98%] mx-auto',
    'full': 'w-full',
  }[mobileSize] : '';
  
  // Use specific mobile sizes if provided
  const responsiveSizes = isMobile && mobileSizes ? mobileSizes : sizes;
  
  // Determine loading attribute
  const loading = priority ? 'eager' : loadingStrategy || 'lazy';

  // Base image component with optimization settings
  const imageComponent = (
    <div className={cn("relative", mobileClassName)}>
      <Image 
        src={src} 
        alt={alt}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={responsiveSizes}
        priority={priority}
        fill={fill}
        quality={isMobile ? Math.min(quality, 80) : quality} // Slightly reduce quality on mobile to improve performance
        loading={loading}
        placeholder={lowQualityPlaceholder ? 'blur' : undefined}
        blurDataURL={lowQualityPlaceholder ? "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Cfilter id='b' x='0' y='0'%3E%3CfeGaussianBlur stdDeviation='12' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='%23f0f0f0'/%3E%3Crect width='100%25' height='100%25' filter='url(%23b)' opacity='0.5'/%3E%3C/svg%3E" : undefined}
        className={cn(
          'transition-all duration-300',
          fill && 'object-cover', // Apply object-fit for fill mode
          objectFit === 'contain' && 'object-contain',
          objectFit === 'fill' && 'object-fill',
          objectFit === 'none' && 'object-none',
          !isLoaded && 'opacity-0',
          isLoaded && 'opacity-100',
          className
        )}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
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
            type: isMobile ? 'tween' : 'spring', // Use simpler animation on mobile
            stiffness: isMobile ? 50 : 100 // Less intensive spring on mobile
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
