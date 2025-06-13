"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProcessTimelineProps {
  className?: string;
  totalSteps: number;
  position?: 'left' | 'center' | 'right';
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({
  className,
  totalSteps,
  position = 'center',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  
  // Get scroll progress within the process section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Create a smoother animation with spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map scroll progress to the active step
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(value => {
      // Calculate which step should be active based on scroll progress
      // Add a small buffer so steps activate slightly before reaching them
      const newActiveStep = Math.min(
        Math.floor(value * (totalSteps + 0.5)), 
        totalSteps
      );
      
      setActiveStep(newActiveStep);
    });
    
    return () => unsubscribe();
  }, [scrollYProgress, totalSteps]);

  // Position classes based on the timeline position
  const positionClass = {
    left: "left-4",
    center: "left-1/2 transform -translate-x-1/2",
    right: "right-4"
  };

  return (
    <div 
      ref={containerRef}
      className={cn("absolute top-0 bottom-0", positionClass[position], className)}
    >
      {/* Background line - extremely subtle */}
      <div className="absolute top-0 bottom-0 w-px bg-neutral-200/60 dark:bg-neutral-700/20"></div>
      
      {/* Animated progress line - more subtle */}
      <motion.div 
        className="absolute top-0 w-px bg-primary-200 dark:bg-primary-800/30 origin-top"
        style={{ 
          height: useTransform(smoothProgress, [0, 0.95], ["0%", "100%"]),
          opacity: useTransform(smoothProgress, [0, 0.05], [0, 1])
        }}
      />
      
      {/* No end cap for more subtlety */}
    </div>
  );
};
