"use client";

import React from 'react';
import { motion } from 'framer-motio  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -5,
        boxShadow: isActive 
          ? "0 12px 20px rgba(16, 46, 80, 0.1)" 
          : "0 10px 15px rgba(0, 0, 0, 0.05)"
      }}
      transition={{
        duration: 0.5,
        delay: step.id * 0.1,
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
      viewport={{ once: true }}
      className={cn(
        "bg-white dark:bg-neutral-800 border rounded-lg p-4 shadow-sm transition-all",
        isActive 
          ? "border-primary-100 dark:border-primary-900/30 shadow-primary-100/30 dark:shadow-primary-900/10" 
          : "border-neutral-100 dark:border-neutral-800",
        className
      )}
    > from '@/lib/utils';

interface ProcessTimelineStepProps {
  step: {
    id: number;
    title: string;
    description: string;
    icon?: string;
  };
  isActive: boolean;
  className?: string;
}

export const ProcessTimelineStep = ({
  step,
  isActive,
  className
}: ProcessTimelineStepProps) => {
  // Icon renderer based on the step's icon property
  const renderIcon = () => {
    if (!step.icon) return null;
    
    switch (step.icon) {
      case 'mic':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
            <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
          </svg>
        );
      case 'edit':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
            <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
          </svg>
        );
      case 'settings':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348L13.928 3.817c-.151-.904-.933-1.567-1.85-1.567h-1.844z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" clipRule="evenodd" />
          </svg>
        );
      case 'chart':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 008.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clipRule="evenodd" />
          </svg>
        );
      case 'distribution':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        );
      case 'growth':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M15.22 6.268a.75.75 0 01.968-.432l5.942 2.28a.75.75 0 01.431.97l-2.28 5.941a.75.75 0 11-1.4-.537L19.83 11.3l-8.158 8.158a.75.75 0 01-1.061 0L6.75 15.596 2.404 19.942a.75.75 0 01-1.06-1.061l4.875-4.875a.75.75 0 011.06 0L11.14 17.87l8.158-8.158-3.19.845a.75.75 0 01-.537-1.4l5.94-2.28z" clipRule="evenodd" />
          </svg>
        );
      case 'strategy':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: step.id * 0.1,
      }}
      viewport={{ once: true }}
      className={cn(
        "bg-white dark:bg-neutral-800 border rounded-lg p-4 shadow-sm transition-all",
        isActive 
          ? "border-primary-100 dark:border-primary-900/30 shadow-primary-100/30 dark:shadow-primary-900/10" 
          : "border-neutral-100 dark:border-neutral-800",
        className
      )}
      whileHover={{
        y: -5,
        boxShadow: isActive 
          ? "0 12px 20px rgba(16, 46, 80, 0.1)" 
          : "0 10px 15px rgba(0, 0, 0, 0.05)"
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
    >
      {/* Title with icon */}
      <div className="flex items-center space-x-2 mb-3">
        {step.icon && (
          <div className={cn(
            "flex-shrink-0 p-1.5 rounded-full",
            isActive 
              ? "text-primary-500 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/30" 
              : "text-neutral-500 bg-neutral-100 dark:text-neutral-400 dark:bg-neutral-800"
          )}>
            {renderIcon()}
          </div>
        )}
        <h3 className={cn(
          "font-semibold transition-colors",
          isActive 
            ? "text-primary-700 dark:text-primary-300" 
            : "text-neutral-700 dark:text-neutral-300"
        )}>
          {step.title}
        </h3>
      </div>
      
      {/* Description */}
      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
        {step.description}
      </p>
    </motion.div>
  );
};
