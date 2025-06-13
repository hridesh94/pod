"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { PROCESS_STEPS } from '@/lib/constants';

export const HorizontalProcessTimeline = ({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "85% center"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 90,
    mass: 0.8
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
