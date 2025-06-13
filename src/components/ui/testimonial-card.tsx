"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  clientName: string;
  clientTitle?: string;
  content: string;
  avatarUrl?: string;
  rating?: number;
  className?: string;
}

export const TestimonialCard = ({
  clientName,
  clientTitle,
  content,
  avatarUrl,
  rating = 5,
  className,
}: TestimonialCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        "bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md",
        className
      )}
    >
      {/* Quote icon */}
      <div className="mb-4 text-primary-400">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.3333 16.6667C18.3333 19.4334 16.1 21.6667 13.3333 21.6667C10.5667 21.6667 8.33333 19.4334 8.33333 16.6667C8.33333 13.9 10.5667 11.6667 13.3333 11.6667V8.33334C8.73333 8.33334 5 12.0667 5 16.6667C5 21.2667 8.73333 25 13.3333 25C17.9333 25 21.6667 21.2667 21.6667 16.6667H18.3333ZM35 16.6667C35 19.4334 32.7667 21.6667 30 21.6667C27.2333 21.6667 25 19.4334 25 16.6667C25 13.9 27.2333 11.6667 30 11.6667V8.33334C25.4 8.33334 21.6667 12.0667 21.6667 16.6667C21.6667 21.2667 25.4 25 30 25C34.6 25 38.3333 21.2667 38.3333 16.6667H35Z" fill="currentColor"/>
        </svg>
      </div>
      
      {/* Content */}
      <p className="text-neutral-700 dark:text-neutral-300 mb-6 italic">
        "{content}"
      </p>
      
      {/* Rating */}
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <svg 
            key={index} 
            className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-neutral-300 dark:text-neutral-600'}`}
            fill="currentColor" 
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      
      {/* Client */}
      <div className="flex items-center">
        {avatarUrl ? (
          <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
            <Image
              src={avatarUrl}
              alt={clientName}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white mr-4">
            {clientName.charAt(0)}
          </div>
        )}
        
        <div>
          <h4 className="font-semibold text-neutral-900 dark:text-white">{clientName}</h4>
          {clientTitle && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400">{clientTitle}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
