"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';
import { PROCESS_STEPS } from '@/lib/constants';

interface FloatingTimelineProps {
  className?: string;
}

export const FloatingTimeline: React.FC<FloatingTimelineProps> = ({ 
  className 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 25,
    stiffness: 80,
    mass: 1
  });

  // Update active step
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(value => {
      const newActiveStep = Math.min(
        Math.floor(value * (PROCESS_STEPS.length + 0.3)), 
        PROCESS_STEPS.length - 1
      );
      setActiveStep(newActiveStep);
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);

  // 3D Audio Visualizer Component
  const AudioVisualizer = ({ isActive, stepIndex }: { isActive: boolean, stepIndex: number }) => {
    const bars = Array.from({ length: 12 }, (_, i) => ({
      height: Math.random() * 40 + 10,
      delay: i * 0.05,
      phase: Math.random() * Math.PI * 2
    }));

    return (
      <div className="flex items-end justify-center space-x-0.5 h-12 w-20">
        {bars.map((bar, index) => (
          <motion.div
            key={index}
            className={cn(
              "w-1 rounded-full origin-bottom",
              isActive 
                ? "bg-gradient-to-t from-primary-600 via-primary-400 to-accent-400" 
                : "bg-gradient-to-t from-neutral-400 to-neutral-300 dark:from-neutral-600 dark:to-neutral-500"
            )}
            initial={{ height: 4 }}
            animate={isActive ? {
              height: [
                bar.height * 0.3,
                bar.height,
                bar.height * 0.6,
                bar.height * 1.2,
                bar.height * 0.4,
                bar.height * 0.8,
                bar.height * 0.3
              ],
              opacity: [0.6, 1, 0.8, 1, 0.7, 0.9, 0.6],
            } : { 
              height: 4,
              opacity: 0.4 
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: isActive ? Infinity : 0,
              repeatType: "reverse",
              delay: bar.delay,
            }}
            style={{
              filter: isActive ? 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.4))' : 'none'
            }}
          />
        ))}
      </div>
    );
  };

  // Floating Step Card Component
  const FloatingStepCard = ({ step, index }: { step: any, index: number }) => {
    const isActive = index === activeStep;
    const isCompleted = index < activeStep;
    const cardRef = useRef<HTMLDivElement>(null);
    
    // Create floating animation based on index
    const floatY = useTransform(
      smoothProgress,
      [0, 1],
      [Math.sin(index * 0.5) * 20, Math.sin(index * 0.5) * -20]
    );
    
    const rotateX = useTransform(
      smoothProgress,
      [0, 1],
      [Math.cos(index * 0.3) * 5, Math.cos(index * 0.3) * -5]
    );

    return (
      <motion.div
        ref={cardRef}
        className="relative group"
        style={{ y: floatY, rotateX }}
        onHoverStart={() => setHoveredStep(index)}
        onHoverEnd={() => setHoveredStep(null)}
        initial={{ opacity: 0, scale: 0.8, z: -100 }}
        whileInView={{ opacity: 1, scale: 1, z: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: index * 0.15,
          type: "spring",
          stiffness: 100
        }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Connecting line to next step */}
        {index < PROCESS_STEPS.length - 1 && (
          <motion.div 
            className="absolute top-1/2 -right-8 w-16 h-px"
            initial={{ scaleX: 0 }}
            animate={{ 
              scaleX: isCompleted || isActive ? 1 : 0.3,
            }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className={cn(
              "h-full rounded-full origin-left",
              isCompleted || isActive
                ? "bg-gradient-to-r from-primary-500 to-accent-500"
                : "bg-neutral-300 dark:bg-neutral-600"
            )} />
            
            {/* Animated dot traveling along the line */}
            {(isCompleted || isActive) && (
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-500 shadow-lg"
                animate={{ x: [0, 56] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear"
                }}
              />
            )}
          </motion.div>
        )}

        {/* Main card */}
        <motion.div
          className={cn(
            "relative w-72 p-6 rounded-2xl border-2 transition-all duration-500",
            "backdrop-blur-lg shadow-2xl overflow-hidden",
            isActive
              ? "bg-gradient-to-br from-white via-primary-50/80 to-accent-50/60 dark:from-neutral-800 dark:via-primary-950/80 dark:to-accent-950/60"
              : isCompleted
              ? "bg-gradient-to-br from-primary-50/50 to-white dark:from-primary-950/30 dark:to-neutral-800"
              : "bg-white/80 dark:bg-neutral-900/80",
            isActive
              ? "border-primary-300 dark:border-primary-700 shadow-primary-200/50 dark:shadow-primary-900/50"
              : isCompleted
              ? "border-primary-200 dark:border-primary-800"
              : "border-neutral-200 dark:border-neutral-700",
            "transform-gpu perspective-1000"
          )}
          whileHover={{ 
            scale: 1.02,
            rotateY: 2,
            transition: { duration: 0.2 }
          }}
          animate={{
            y: hoveredStep === index ? -5 : 0,
            rotateY: isActive ? [0, 1, 0, -1, 0] : 0,
          }}
          transition={{
            y: { duration: 0.3 },
            rotateY: { duration: 4, repeat: isActive ? Infinity : 0 }
          }}
        >
          {/* Background pattern */}
          <motion.div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at ${30 + index * 15}% ${40 + index * 10}%, ${isActive ? '#3b82f6' : '#6b7280'} 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
            }}
            animate={{
              backgroundPosition: isActive ? ['0% 0%', '100% 100%'] : '0% 0%'
            }}
            transition={{
              duration: 10,
              repeat: isActive ? Infinity : 0,
              repeatType: "reverse"
            }}
          />

          {/* Status indicator */}
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            <motion.div
              className={cn(
                "w-3 h-3 rounded-full",
                isActive 
                  ? "bg-green-500" 
                  : isCompleted 
                  ? "bg-blue-500" 
                  : "bg-neutral-400"
              )}
              animate={{
                scale: isActive ? [1, 1.3, 1] : 1,
                opacity: isActive ? [1, 0.6, 1] : 1,
              }}
              transition={{
                duration: 1.5,
                repeat: isActive ? Infinity : 0,
                repeatType: "reverse"
              }}
            />
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
              {isActive ? 'Active' : isCompleted ? 'Done' : 'Next'}
            </span>
          </div>

          {/* Step number with 3D effect */}
          <motion.div 
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative",
              "shadow-lg border",
              isActive
                ? "bg-gradient-to-br from-primary-500 to-accent-500 border-primary-400 text-white"
                : isCompleted
                ? "bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-800 dark:to-primary-700 border-primary-300 dark:border-primary-600 text-primary-700 dark:text-primary-300"
                : "bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400"
            )}
            animate={{
              rotateY: isActive ? [0, 360] : 0,
            }}
            transition={{
              duration: 3,
              repeat: isActive ? Infinity : 0,
              ease: "linear"
            }}
          >
            <span className="font-bold text-lg">{step.id}</span>
            
            {/* Completion checkmark */}
            {isCompleted && (
              <motion.svg
                className="absolute inset-0 w-full h-full text-primary-600 dark:text-primary-400"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 12l2 2 4-4" />
              </motion.svg>
            )}
          </motion.div>

          {/* Audio visualizer */}
          <div className="mb-4">
            <AudioVisualizer isActive={isActive} stepIndex={index} />
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h3 className="font-display text-lg font-bold text-neutral-900 dark:text-white leading-tight">
              {step.title}
            </h3>
            
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {step.description}
            </p>

            {/* Progress bar */}
            <div className="pt-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  Progress
                </span>
                <span className="text-xs font-bold text-primary-600 dark:text-primary-400">
                  {isCompleted ? '100%' : isActive ? '50%' : '0%'}
                </span>
              </div>
              <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                <motion.div
                  className={cn(
                    "h-full rounded-full",
                    isActive 
                      ? "bg-gradient-to-r from-primary-500 to-accent-500" 
                      : isCompleted
                      ? "bg-primary-500"
                      : "bg-neutral-300 dark:bg-neutral-600"
                  )}
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: isCompleted ? "100%" : isActive ? "50%" : "0%"
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div ref={containerRef} className={cn("w-full py-20", className)}>
      {/* Desktop floating timeline */}
      <div className="hidden lg:block relative max-w-8xl mx-auto px-8">
        {/* Ambient background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary-500/20 rounded-full"
              animate={{
                x: [0, 100, 200, 300, 400, 500],
                y: [0, -50, 0, 50, 0],
                opacity: [0, 0.6, 0.3, 0.8, 0],
                scale: [0.5, 1.2, 0.8, 1.5, 0.5],
              }}
              transition={{
                duration: 8 + i,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "easeInOut"
              }}
              style={{
                left: `${i * 15}%`,
                top: `${40 + Math.sin(i) * 20}%`
              }}
            />
          ))}
        </div>
        
        {/* Main floating steps */}
        <div className="flex items-center justify-between space-x-8 relative z-10">
          {PROCESS_STEPS.map((step, index) => (
            <FloatingStepCard key={step.id} step={step} index={index} />
          ))}
        </div>
      </div>

      {/* Mobile floating timeline */}
      <div className="block lg:hidden px-4">
        <div className="space-y-12">
          {PROCESS_STEPS.map((step, index) => (
            <FloatingStepCard key={step.id} step={step} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
