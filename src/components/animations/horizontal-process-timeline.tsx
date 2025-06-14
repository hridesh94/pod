"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from 'framer-motion';
import { cn } from '@/lib/utils';
import { PROCESS_STEPS } from '@/lib/constants';

export const HorizontalProcessTimeline = ({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const audioTime = useMotionValue(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "85% center"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 90,
    mass: 0.8
  });

  // Animate audio timeline
  useAnimationFrame(() => {
    audioTime.set(audioTime.get() + 0.02);
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(value => {
      const newActiveStep = Math.min(
        Math.floor(value * (PROCESS_STEPS.length + 0.5)), 
        PROCESS_STEPS.length - 1
      );
      setActiveStep(newActiveStep);
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);

  const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // Audio waveform component
  const AudioWaveform = ({ isActive, stepIndex }: { isActive: boolean, stepIndex: number }) => {
    const bars = Array.from({ length: 8 }, (_, i) => ({
      height: Math.random() * 16 + 4,
      delay: i * 0.1
    }));

    return (
      <div className="flex items-end space-x-px h-5">
        {bars.map((bar, index) => (
          <motion.div
            key={index}
            className={cn(
              "w-1 rounded-full origin-bottom",
              isActive 
                ? "bg-gradient-to-t from-primary-500 to-accent-500" 
                : "bg-neutral-300 dark:bg-neutral-600"
            )}
            initial={{ height: 3 }}
            animate={isActive ? {
              height: [bar.height, bar.height * 1.5, bar.height],
            } : { height: 3 }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: isActive ? Infinity : 0,
              repeatType: "reverse",
              delay: bar.delay,
            }}
          />
        ))}
      </div>
    );
  };

  // Get step icon based on icon name
  const getStepIcon = (iconName: string) => {
    const icons = {
      mic: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
        </svg>
      ),
      strategy: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
        </svg>
      ),
      settings: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
        </svg>
      ),
      edit: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/>
        </svg>
      ),
      chart: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5,12L2,15L5,18V15.5H9.5V12.5H5V12M19,7V4L16,7H18.5V11.5H21.5V7H19M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"/>
        </svg>
      ),
      distribution: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21,16V14L13,9V7.5L16,4.5L15.29,3.79L13,6.08L10.71,3.79L10,4.5L13,7.5V9L5,14V16L13,12.5V14L9,17V18.5L13,16.5L17,18.5V17L13,14V12.5L21,16Z"/>
        </svg>
      )
    };
    return icons[iconName as keyof typeof icons] || null;
  };

  return (
    <div ref={containerRef} className={cn("w-full py-20", className)}>
      {/* Desktop Timeline */}
      <div className="hidden md:block relative max-w-7xl mx-auto px-6">
        <div className="relative">
          {/* Timeline container with exact width */}
          <div className="relative mx-[8.33%]">
            {/* Background line - starting from first dot */}
            <div className="absolute top-[29px] left-[10px] right-[10px] h-[2px] bg-neutral-200 dark:bg-neutral-700" />
            
            {/* Animated progress line */}
            <motion.div 
              className="absolute top-[29px] left-[10px] h-[2px] bg-primary-500/30 dark:bg-primary-400/30"
              style={{ width: progressWidth }}
            />
          </div>
          
          {/* Steps container */}
          <div className="grid grid-cols-6 gap-4">
            {PROCESS_STEPS.map((step, index) => {
              const isActive = index <= activeStep;
              
              return (
                <div key={step.id} className="relative">
                  {/* Step marker */}
                  <motion.div 
                    className="absolute left-1/2 -translate-x-1/2"
                    initial={false}
                    animate={{
                      scale: isActive ? 1 : 0.8,
                      opacity: isActive ? 1 : 0.7
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Circle design from previous version */}
                    <div className={cn(
                      "w-[20px] h-[20px] rounded-full border-2 relative top-[20px] bg-white dark:bg-neutral-900",
                      isActive 
                        ? "border-primary-500 dark:border-primary-400" 
                        : "border-neutral-300 dark:border-neutral-600"
                    )}>
                      <motion.div 
                        className={cn(
                          "absolute top-1/2 left-1/2 w-[8px] h-[8px] rounded-full",
                          isActive 
                            ? "bg-primary-500 dark:bg-primary-400" 
                            : "bg-neutral-300 dark:bg-neutral-600"
                        )}
                        initial={false}
                        animate={{
                          scale: isActive ? 1 : 0.5,
                          opacity: isActive ? 1 : 0.3
                        }}
                        style={{
                          x: "-50%",
                          y: "-50%"
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>

                  {/* Content Box - Styled like service cards */}
                  <motion.div 
                    className="mt-16 mx-2"
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0.7,
                      y: isActive ? 0 : 4
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className={cn(
                        "p-6 rounded-lg h-[240px] flex flex-col",
                        "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm",
                        "border border-neutral-200/50 dark:border-neutral-800/50",
                        "shadow-lg shadow-neutral-100/50 dark:shadow-neutral-900/50",
                        "transition-all duration-300"
                      )}
                      whileHover={{ 
                        y: -2,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {/* Step number */}
                      <div className={cn(
                        "text-sm font-medium mb-3",
                        isActive 
                          ? "text-primary-500 dark:text-primary-400" 
                          : "text-neutral-400 dark:text-neutral-500"
                      )}>
                        Step {step.id}
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-lg font-semibold text-neutral-900 dark:text-white mb-3">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-6">
                        {step.description}
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Timeline - with matching styles */}
      <div className="block md:hidden px-4">
        <div className="relative pl-10 space-y-6">
          {/* Vertical line with gradient */}
          <div className="absolute left-[19px] top-[28px] bottom-[28px] w-[2px] bg-neutral-200 dark:bg-neutral-700" />
          
          {PROCESS_STEPS.map((step, index) => {
            const isActive = index <= activeStep;
            
            return (
              <motion.div 
                key={step.id}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                {/* Timeline marker */}
                <motion.div 
                  className="absolute left-[-19px] top-[28px]"
                  initial={false}
                  animate={{
                    scale: isActive ? 1 : 0.8,
                    opacity: isActive ? 1 : 0.7
                  }}
                >
                  <div className={cn(
                    "w-[16px] h-[16px] rounded-full border-2 relative bg-white dark:bg-neutral-900",
                    isActive 
                      ? "border-primary-500 dark:border-primary-400" 
                      : "border-neutral-300 dark:border-neutral-600"
                  )}>
                    <motion.div 
                      className={cn(
                        "absolute top-1/2 left-1/2 w-[6px] h-[6px] rounded-full",
                        isActive 
                          ? "bg-primary-500 dark:bg-primary-400" 
                          : "bg-neutral-300 dark:bg-neutral-600"
                      )}
                      initial={false}
                      animate={{
                        scale: isActive ? 1 : 0.5,
                        opacity: isActive ? 1 : 0.3
                      }}
                      style={{
                        x: "-50%",
                        y: "-50%"
                      }}
                    />
                  </div>
                </motion.div>

                {/* Content Box - Matching desktop styling */}
                <motion.div 
                  className={cn(
                    "p-5 rounded-lg",
                    "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm",
                    "border border-neutral-200/50 dark:border-neutral-800/50",
                    "shadow-lg shadow-neutral-100/50 dark:shadow-neutral-900/50",
                    "transition-all duration-300"
                  )}
                  animate={{
                    opacity: isActive ? 1 : 0.7,
                    y: isActive ? 0 : 4
                  }}
                >
                  <div className={cn(
                    "text-sm font-medium mb-2",
                    isActive 
                      ? "text-primary-500 dark:text-primary-400" 
                      : "text-neutral-400 dark:text-neutral-500"
                  )}>
                    Step {step.id}
                  </div>
                  <h3 className="font-display text-base font-semibold text-neutral-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
