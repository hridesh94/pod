"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from 'framer-motion';
import { cn } from '@/lib/utils';
import { PROCESS_STEPS } from '@/lib/constants';

interface WaveformTimelineProps {
  className?: string;
}

export const WaveformTimeline: React.FC<WaveformTimelineProps> = ({ 
  className 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const time = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 90,
    mass: 0.8
  });

  // Update active step and playing state
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(value => {
      const newActiveStep = Math.min(
        Math.floor(value * (PROCESS_STEPS.length + 0.5)), 
        PROCESS_STEPS.length - 1
      );
      setActiveStep(newActiveStep);
      setIsPlaying(value > 0.1 && value < 0.9);
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Animate time for waveform
  useAnimationFrame((t) => {
    if (isPlaying) {
      time.set(t / 1000);
    }
  });

  // Waveform generator
  const generateWaveform = (length: number, amplitude: number, frequency: number, phase: number = 0) => {
    return Array.from({ length }, (_, i) => {
      const x = (i / length) * Math.PI * frequency + phase;
      return Math.sin(x) * amplitude + amplitude;
    });
  };

  // Main waveform component
  const WaveformVisualizer = ({ 
    isActive, 
    stepIndex, 
    width = 200,
    height = 60,
    barCount = 40 
  }: { 
    isActive: boolean;
    stepIndex: number;
    width?: number;
    height?: number;
    barCount?: number;
  }) => {
    const waveData = generateWaveform(barCount, height * 0.4, 2 + stepIndex * 0.5, stepIndex);
    
    return (
      <div className="flex items-end justify-center space-x-px" style={{ width, height }}>
        {waveData.map((value, index) => (
          <motion.div
            key={index}
            className={cn(
              "w-1 rounded-full origin-bottom",
              isActive 
                ? "bg-gradient-to-t from-primary-600 via-accent-500 to-primary-400" 
                : "bg-gradient-to-t from-neutral-300 to-neutral-400 dark:from-neutral-600 dark:to-neutral-500"
            )}
            initial={{ height: 2 }}
            animate={isActive ? {
              height: [
                value * 0.3,
                value * 1.2,
                value * 0.7,
                value * 1.4,
                value * 0.5,
                value * 1.1,
                value * 0.3
              ],
              opacity: [0.6, 1, 0.8, 1, 0.7, 0.9, 0.6],
            } : { 
              height: Math.max(2, value * 0.2),
              opacity: 0.4 
            }}
            transition={{
              duration: 1.5 + Math.random() * 0.5,
              ease: "easeInOut",
              repeat: isActive ? Infinity : 0,
              repeatType: "reverse",
              delay: index * 0.02,
            }}
            style={{
              filter: isActive ? 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.6))' : 'none',
              boxShadow: isActive ? `0 0 ${Math.random() * 10 + 5}px rgba(245, 158, 11, 0.3)` : 'none'
            }}
          />
        ))}
      </div>
    );
  };

  // Audio spectrum component
  const AudioSpectrum = ({ isActive, stepIndex }: { isActive: boolean, stepIndex: number }) => {
    const frequencies = Array.from({ length: 20 }, (_, i) => ({
      height: Math.random() * 30 + 5,
      frequency: 0.5 + i * 0.1,
      phase: Math.random() * Math.PI * 2
    }));

    return (
      <div className="flex items-end justify-center space-x-0.5 h-8">
        {frequencies.map((freq, index) => (
          <motion.div
            key={index}
            className={cn(
              "w-0.5 rounded-full origin-bottom",
              isActive 
                ? "bg-gradient-to-t from-accent-600 to-accent-300" 
                : "bg-neutral-400 dark:bg-neutral-600"
            )}
            animate={isActive ? {
              height: [
                freq.height * 0.2,
                freq.height,
                freq.height * 0.6,
                freq.height * 1.3,
                freq.height * 0.4,
                freq.height * 0.9,
                freq.height * 0.2
              ],
              scaleY: [1, 1.2, 0.8, 1.4, 0.7, 1.1, 1],
            } : { 
              height: 2,
              scaleY: 1 
            }}
            transition={{
              duration: 1 + freq.frequency,
              ease: "easeInOut",
              repeat: isActive ? Infinity : 0,
              repeatType: "reverse",
              delay: index * 0.03,
            }}
          />
        ))}
      </div>
    );
  };

  // Step card with integrated waveform
  const WaveformStepCard = ({ step, index }: { step: any, index: number }) => {
    const isActive = index === activeStep;
    const isCompleted = index < activeStep;
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        className="relative group"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 50, rotateX: -10 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: index * 0.1,
          type: "spring",
          stiffness: 100
        }}
        viewport={{ once: true, margin: "-50px" }}
      >
        {/* Waveform connection line */}
        {index < PROCESS_STEPS.length - 1 && (
          <div className="absolute top-1/2 -right-4 w-8 h-16 overflow-hidden">
            <motion.svg
              className="w-full h-full"
              viewBox="0 0 32 64"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: isCompleted || isActive ? 1 : 0.3,
                opacity: isCompleted || isActive ? 1 : 0.5
              }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.path
                d={`M 0 32 Q 16 ${16 + Math.sin(index) * 8} 32 32`}
                fill="none"
                stroke={isCompleted || isActive ? "url(#waveGradient)" : "#cbd5e1"}
                strokeWidth="2"
                strokeLinecap="round"
                animate={isActive ? {
                  d: [
                    `M 0 32 Q 16 ${16 + Math.sin(index) * 8} 32 32`,
                    `M 0 32 Q 16 ${48 + Math.sin(index) * 8} 32 32`,
                    `M 0 32 Q 16 ${16 + Math.sin(index) * 8} 32 32`,
                  ]
                } : {}}
                transition={{
                  duration: 2,
                  repeat: isActive ? Infinity : 0,
                  repeatType: "reverse"
                }}
              />
              <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </motion.svg>
          </div>
        )}

        {/* Main card with waveform integration */}
        <motion.div
          className={cn(
            "relative w-80 rounded-2xl overflow-hidden transition-all duration-500",
            "backdrop-blur-lg border-2 shadow-2xl",
            isActive
              ? "bg-gradient-to-br from-white via-primary-50/90 to-accent-50/70 dark:from-neutral-800 dark:via-primary-950/90 dark:to-accent-950/70"
              : isCompleted
              ? "bg-gradient-to-br from-primary-50/60 to-white dark:from-primary-950/40 dark:to-neutral-800"
              : "bg-white/90 dark:bg-neutral-900/90",
            isActive
              ? "border-primary-300 dark:border-primary-700"
              : isCompleted
              ? "border-primary-200 dark:border-primary-800"
              : "border-neutral-200 dark:border-neutral-700"
          )}
          whileHover={{ 
            scale: 1.02,
            y: -5,
            transition: { duration: 0.2 }
          }}
          animate={{
            boxShadow: isActive 
              ? [
                  "0 20px 40px rgba(59, 130, 246, 0.1)",
                  "0 20px 40px rgba(245, 158, 11, 0.2)",
                  "0 20px 40px rgba(59, 130, 246, 0.1)"
                ]
              : "0 10px 30px rgba(0, 0, 0, 0.1)"
          }}
          transition={{
            boxShadow: { duration: 2, repeat: isActive ? Infinity : 0 }
          }}
        >
          {/* Top waveform header */}
          <div className={cn(
            "h-20 relative overflow-hidden",
            isActive
              ? "bg-gradient-to-r from-primary-500/20 via-accent-500/20 to-primary-500/20"
              : "bg-neutral-100/50 dark:bg-neutral-800/50"
          )}>
            <div className="absolute inset-0 flex items-center justify-center">
              <WaveformVisualizer 
                isActive={isActive} 
                stepIndex={index}
                width={300}
                height={60}
                barCount={60}
              />
            </div>
            
            {/* Step number overlay */}
            <div className="absolute top-2 left-4">
              <motion.div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg",
                  "shadow-lg border-2",
                  isActive
                    ? "bg-gradient-to-br from-primary-500 to-accent-500 border-white text-white"
                    : isCompleted
                    ? "bg-primary-100 dark:bg-primary-800 border-primary-300 dark:border-primary-600 text-primary-700 dark:text-primary-300"
                    : "bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400"
                )}
                animate={{
                  scale: isActive ? [1, 1.1, 1] : 1,
                  rotate: isActive ? [0, 5, -5, 0] : 0,
                }}
                transition={{
                  duration: 2,
                  repeat: isActive ? Infinity : 0,
                  repeatType: "reverse"
                }}
              >
                {step.id}
              </motion.div>
            </div>

            {/* Audio spectrum in corner */}
            <div className="absolute top-2 right-4">
              <AudioSpectrum isActive={isActive} stepIndex={index} />
            </div>
          </div>

          {/* Content area */}
          <div className="p-6">
            {/* Title with audio icon */}
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-display text-xl font-bold text-neutral-900 dark:text-white leading-tight flex-1">
                {step.title}
              </h3>
              
              <motion.div
                className={cn(
                  "ml-3 w-8 h-8 rounded-full flex items-center justify-center",
                  isActive 
                    ? "bg-primary-100 dark:bg-primary-800 text-primary-600 dark:text-primary-400"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500"
                )}
                animate={{
                  scale: isActive ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: 1.5,
                  repeat: isActive ? Infinity : 0,
                  repeatType: "reverse"
                }}
              >
                {isActive ? "🎵" : isCompleted ? "✓" : "⏸"}
              </motion.div>
            </div>
            
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
              {step.description}
            </p>

            {/* Progress waveform */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  {isActive ? 'Recording...' : isCompleted ? 'Completed' : 'Queued'}
                </span>
                <span className="text-xs font-bold text-primary-600 dark:text-primary-400">
                  {isCompleted ? '100%' : isActive ? '67%' : '0%'}
                </span>
              </div>
              
              <div className="relative h-6 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                <motion.div
                  className={cn(
                    "absolute inset-y-0 left-0 rounded-full",
                    isActive 
                      ? "bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500" 
                      : isCompleted
                      ? "bg-primary-500"
                      : "bg-neutral-300 dark:bg-neutral-600"
                  )}
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: isCompleted ? "100%" : isActive ? "67%" : "0%"
                  }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
                
                {/* Mini waveform inside progress bar */}
                {(isActive || isCompleted) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex space-x-px">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-0.5 bg-white/70 rounded-full"
                          animate={isActive ? {
                            height: [2, 12 + Math.random() * 8, 4, 16 + Math.random() * 4, 2],
                          } : { height: 8 }}
                          transition={{
                            duration: 0.8 + Math.random() * 0.4,
                            repeat: isActive ? Infinity : 0,
                            repeatType: "reverse",
                            delay: i * 0.05
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div ref={containerRef} className={cn("w-full py-16", className)}>
      {/* Header with global waveform */}
      <div className="text-center mb-16">
        <motion.h2 
          className="text-4xl font-display font-bold mb-6 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 bg-clip-text text-transparent"
          animate={{
            backgroundPosition: isPlaying ? ['0% 50%', '100% 50%', '0% 50%'] : '0% 50%'
          }}
          transition={{
            duration: 3,
            repeat: isPlaying ? Infinity : 0,
            ease: "linear"
          }}
        >
          Production Workflow
        </motion.h2>
        
        <div className="flex justify-center mb-4">
          <WaveformVisualizer 
            isActive={isPlaying} 
            stepIndex={0}
            width={400}
            height={80}
            barCount={80}
          />
        </div>
        
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Follow the audio journey of your podcast from conception to publication
        </p>
      </div>

      {/* Desktop timeline */}
      <div className="hidden lg:block">
        <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
          {PROCESS_STEPS.map((step, index) => (
            <WaveformStepCard key={step.id} step={step} index={index} />
          ))}
        </div>
      </div>

      {/* Mobile timeline */}
      <div className="block lg:hidden px-4">
        <div className="space-y-8">
          {PROCESS_STEPS.map((step, index) => (
            <WaveformStepCard key={step.id} step={step} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
