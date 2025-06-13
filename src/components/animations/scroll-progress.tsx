"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollProgressProps {
  color?: string;
  height?: number;
  position?: 'top' | 'bottom';
  alwaysVisible?: boolean;
  showPercentage?: boolean;
  zIndex?: number;
  className?: string;
}

export const ScrollProgress = ({
  color = '#3b82f6', // primary-500
  height = 3,
  position = 'top',
  alwaysVisible = false,
  showPercentage = false,
  zIndex = 50,
  className,
}: ScrollProgressProps) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(alwaysVisible);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      // Update scroll percentage
      const percent = Math.round(latest * 100);
      setScrollPercentage(percent);
      
      // Show/hide logic
      if (!alwaysVisible) {
        if (latest > 0.02 && !isVisible) {
          setIsVisible(true);
        } else if (latest <= 0.02 && isVisible) {
          setIsVisible(false);
        }
      }
    });
    
    return () => unsubscribe();
  }, [scrollYProgress, alwaysVisible, isVisible]);

  return (
    <>
      <motion.div
        className={cn(
          'fixed left-0 right-0 origin-left',
          position === 'top' ? 'top-0' : 'bottom-0',
          isVisible ? 'opacity-100' : 'opacity-0',
          'transition-opacity duration-300',
          className
        )}
        style={{
          scaleX,
          height,
          backgroundColor: color,
          zIndex,
        }}
      />
      
      {showPercentage && isVisible && (
        <motion.div 
          className={cn(
            'fixed right-4 px-2 py-1 bg-primary-500 text-white text-xs font-medium rounded-md',
            position === 'top' ? 'top-4' : 'bottom-4',
            isVisible ? 'opacity-100' : 'opacity-0',
            'transition-opacity duration-300'
          )}
          style={{ zIndex }}
          initial={{ opacity: 0, y: position === 'top' ? -10 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: position === 'top' ? -10 : 10 }}
        >
          {scrollPercentage}%
        </motion.div>
      )}
    </>
  );
};
