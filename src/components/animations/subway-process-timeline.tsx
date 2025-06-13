"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MinimalProcessTimelineProps {
  className?: string;
  totalSteps: number;
}

export const SubwayProcessTimeline: React.FC<MinimalProcessTimelineProps> = ({
  className,
  totalSteps,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  
  // Get scroll progress within the process section - improved offset for better activation timing
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"]
  });
  
  // Create smoother animations with adjusted spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  // Map scroll progress to active step
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(value => {
      const newActiveStep = Math.min(
        Math.floor(value * (totalSteps + 0.5)), 
        totalSteps - 1
      );
      setActiveStep(newActiveStep);
    });
    
    return () => unsubscribe();
  }, [scrollYProgress, totalSteps]);

  // Transform for the main timeline line
  const timelineHeight = useTransform(smoothProgress, [0, 0.9], ["0%", "100%"]);

  return (
    <div 
      ref={containerRef}
      className={cn("absolute top-6 bottom-6 left-1/2 transform -translate-x-1/2 w-px z-20", className)}
    >
      {/* Background line - consistent neutral colors */}
      <div className="absolute top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-700" />
      
      {/* Animated progress line - updated to use correct primary color */}
      <motion.div 
        className="absolute top-0 w-px bg-primary-500 origin-top z-10"
        style={{ 
          height: timelineHeight,
          boxShadow: "0 0 8px rgba(16, 46, 80, 0.4)" // Updated shadow color to match primary
        }}
      />
      
      {/* Step indicators with enhanced connection points */}
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isActive = index <= activeStep;
        return (
          <motion.div
            key={index}
            className="absolute w-6 h-6 -translate-x-3 -translate-y-3 z-30 flex items-center justify-center"
            style={{ 
              top: `${(index / (totalSteps - 1)) * 100}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ 
              delay: index * 0.15,
              duration: 0.4,
              ease: "easeOut"
            }}
            viewport={{ once: true }}
          >
            {/* Outer ring for better visibility */}
            <div className={cn(
              "w-4 h-4 rounded-full border-2 bg-white dark:bg-neutral-800 transition-all duration-300 shadow-lg relative",
              isActive 
                ? "border-primary-500 scale-110 shadow-primary-200 dark:shadow-primary-700/50" 
                : "border-neutral-300 dark:border-neutral-600 scale-100"
            )}>
              {/* Inner dot with pulse effect when active */}
              {isActive && (
                <>
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-primary-500 absolute top-0.5 left-0.5"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  />
                  <motion.div 
                    className="w-4 h-4 rounded-full bg-primary-500/20 absolute -top-0 -left-0"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0, 0.3]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  />
                </>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
