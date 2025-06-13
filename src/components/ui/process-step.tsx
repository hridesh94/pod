"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProcessStepProps {
  stepNumber: number;
  title: string;
  description: string;
  icon?: string;
  imageUrl?: string;
  isActive?: boolean;
  className?: string;
  progress?: number; // Added progress prop (0-100)
}

export const ProcessStep = ({
  stepNumber,
  title,
  description,
  icon,
  imageUrl,
  isActive = false,
  className,
  progress = 0 // Default to 0
}: ProcessStepProps) => {
  const renderIcon = () => {
    switch (icon) {
      case 'mic':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
            <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
          </svg>
        );
      case 'edit':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
            <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
          </svg>
        );
      case 'upload':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M10.5 3.75a6 6 0 00-5.98 6.496A5.25 5.25 0 006.75 20.25H18a4.5 4.5 0 002.206-8.423 3.75 3.75 0 00-4.133-4.303A6.001 6.001 0 0010.5 3.75zm2.03 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v4.94a.75.75 0 001.5 0v-4.94l1.72 1.72a.75.75 0 101.06-1.06l-3-3z" clipRule="evenodd" />
          </svg>
        );
      case 'chart':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "relative",
        className
      )}
    >
      {/* Step Number - more subtle */}
      <div 
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center text-base font-medium mb-5 z-10 relative",
          isActive 
            ? "bg-primary-500 text-white shadow-sm" 
            : "bg-white dark:bg-neutral-800 text-primary-600 dark:text-primary-400 border border-neutral-200 dark:border-neutral-700",
        )}
      >
        {stepNumber}
      </div>
      
      {/* Content Box - focus on content */}
      <motion.div 
        whileHover={{ y: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={cn(
          "bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-sm",
          isActive 
            ? "border-l-4 border-primary-500 dark:border-primary-500 border-t border-r border-b border-neutral-100 dark:border-neutral-700" 
            : "border border-neutral-100 dark:border-neutral-700"
        )}
      >
        {/* No prominent color indicators */}

        <div className="mb-4">
          {/* Title stands out prominently */}
          <h3 className="text-xl font-display font-semibold text-neutral-900 dark:text-white mb-2">
            {title}
          </h3>
          
          {/* Icon integrated into content flow */}
          {icon && (
            <div className="flex items-center mb-3">
              <div className={cn(
                "w-5 h-5 flex items-center justify-center mr-2",
                "text-primary-500 dark:text-primary-400"
              )}>
                {renderIcon()}
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                Step {stepNumber} of 8
              </p>
            </div>
          )}
          
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {description}
          </p>
        </div>
        
        {imageUrl && (
          <div className="mt-4 relative h-40 rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
