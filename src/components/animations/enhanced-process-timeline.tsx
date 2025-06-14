"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from 'framer-motion';
import { cn } from '@/lib/utils';
import { PROCESS_STEPS } from '@/lib/constants';

interface EnhancedProcessTimelineProps {
  className?: string;
}

export const EnhancedProcessTimeline: React.FC<EnhancedProcessTimelineProps> = ({ 
  className 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 90,
    mass: 0.8
  });

  // Mouse tracking for magnetic effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Update active step based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(value => {
      const newActiveStep = Math.min(
        Math.floor(value * (PROCESS_STEPS.length + 0.5)), 
        PROCESS_STEPS.length - 1
      );
      setActiveStep(newActiveStep);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  // Magnetic movement calculation
  const calculateMagneticMovement = (index: number) => {
    const stepElement = document.getElementById(`step-${index}`);
    if (!stepElement) return { x: 0, y: 0 };
    
    const rect = stepElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from mouse to element center
    const distX = (mouseX.get() - centerX) / 15;
    const distY = (mouseY.get() - centerY) / 15;
    
    // Magnetic effect is stronger when closer to the element
    const maxDistance = 100;
    const distance = Math.sqrt(distX * distX + distY * distY);
    
    if (distance > maxDistance) return { x: 0, y: 0 };
    
    const strength = (maxDistance - distance) / maxDistance;
    return { x: distX * strength, y: distY * strength };
  };

  // Calculate dot positions (only for mobile)
  const getStartDotPosition = (index: number) => {
    if (!isMobile) return {};
    return { top: 0 };
  };

  const getEndDotPosition = (index: number) => {
    if (!isMobile) return {};
    return { bottom: 0 };
  };

  // Audio waveform bars for the timeline
  const WaveformBars = ({ isActive, stepIndex }: { isActive: boolean, stepIndex: number }) => {
    const bars = Array.from({ length: 5 }, (_, i) => {
      const height = Math.random() * 20 + 5;
      return { height, delay: i * 0.1 };
    });

    return (
      <div className="flex items-end space-x-px h-6">
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
              height: [bar.height, bar.height * 0.6, bar.height * 1.2, bar.height],
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

  // Magnetic step component
  const MagneticStep = ({ step, index, isActive }: { 
    step: any, 
    index: number, 
    isActive: boolean 
  }) => {
    const stepRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    
    const magneticX = useMotionValue(0);
    const magneticY = useMotionValue(0);

    useAnimationFrame(() => {
      if (stepRef.current && isHovered) {
        const rect = stepRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = mouseX.get() - (centerX - containerRef.current!.getBoundingClientRect().left);
        const deltaY = mouseY.get() - (centerY - containerRef.current!.getBoundingClientRect().top);
        
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxDistance = 100;
        
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          magneticX.set(deltaX * force * 0.2);
          magneticY.set(deltaY * force * 0.2);
        } else {
          magneticX.set(0);
          magneticY.set(0);
        }
      } else {
        magneticX.set(0);
        magneticY.set(0);
      }
    });

    return (
      <motion.div
        ref={stepRef}
        className="relative"
        style={{ x: magneticX, y: magneticY }}
        onHoverStart={() => {
          setIsHovered(true);
          setHoveredStep(index);
        }}
        onHoverEnd={() => {
          setIsHovered(false);
          setHoveredStep(null);
        }}
      >
        {/* Step marker with audio visualization */}
        <motion.div 
          className="absolute left-1/2 -translate-x-1/2 top-[30px]"
          initial={false}
          animate={{
            scale: isActive ? 1.1 : isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
        >
          {/* Pulse rings for active step */}
          {isActive && (
            <>
              <motion.div 
                className="absolute inset-0 w-8 h-8 rounded-full bg-primary-500/20"
                animate={{ 
                  scale: [1, 1.8, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
              <motion.div 
                className="absolute inset-0 w-8 h-8 rounded-full bg-accent-500/30"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0, 0.3]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: 0.5
                }}
              />
            </>
          )}
          
          {/* Main step circle */}
          <div className={cn(
            "w-8 h-8 rounded-full border-3 relative bg-white dark:bg-neutral-900 z-10",
            "shadow-lg transition-all duration-300",
            isActive 
              ? "border-primary-500 shadow-primary-200 dark:shadow-primary-800" 
              : isHovered
              ? "border-accent-500 shadow-accent-200 dark:shadow-accent-800"
              : "border-neutral-300 dark:border-neutral-600"
          )}>
            {/* Inner dot with gradient */}
            <motion.div 
              className={cn(
                "absolute top-1/2 left-1/2 w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2",
                isActive 
                  ? "bg-gradient-to-br from-primary-500 to-accent-500" 
                  : isHovered
                  ? "bg-accent-500"
                  : "bg-neutral-400 dark:bg-neutral-500"
              )}
              animate={{
                scale: isActive ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 1,
                repeat: isActive ? Infinity : 0,
                repeatType: "reverse"
              }}
            />
            
            {/* Step number overlay */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
              <span className={cn(
                "text-xs font-bold px-2 py-1 rounded-full",
                isActive 
                  ? "bg-primary-500 text-white" 
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
              )}>
                {step.id}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Enhanced content card */}
        <motion.div 
          className="mt-20 mx-2"
          initial={false}
          animate={{
            y: isHovered ? -5 : 0,
            opacity: isActive ? 1 : 0.8,
          }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
        >
          <motion.div 
            className={cn(
              "p-8 rounded-2xl h-[280px] flex flex-col relative overflow-hidden",
              "backdrop-blur-sm border transition-all duration-500",
              isActive
                ? "bg-gradient-to-br from-white via-primary-50/50 to-accent-50/30 dark:from-neutral-900 dark:via-primary-950/50 dark:to-accent-950/30"
                : "bg-white/90 dark:bg-neutral-900/90",
              isActive
                ? "border-primary-200/50 dark:border-primary-800/50 shadow-xl shadow-primary-100/50 dark:shadow-primary-900/50"
                : "border-neutral-200/50 dark:border-neutral-800/50 shadow-lg"
            )}
          >
            {/* Animated background pattern */}
            <motion.div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, ${isActive ? '#3b82f6' : '#6b7280'} 2px, transparent 2px)`,
                backgroundSize: '30px 30px'
              }}
            />
            
            {/* Audio waveform indicator */}
            <div className="absolute top-4 right-4">
              <WaveformBars isActive={isActive} stepIndex={index} />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <motion.div 
                className={cn(
                  "text-sm font-semibold mb-4 tracking-wide",
                  isActive 
                    ? "text-primary-600 dark:text-primary-400" 
                    : "text-neutral-500 dark:text-neutral-400"
                )}
                animate={{
                  opacity: isActive ? 1 : 0.7
                }}
              >
                STEP {step.id}
              </motion.div>

              <h3 className="font-display text-xl font-bold text-neutral-900 dark:text-white mb-4 leading-tight">
                {step.title}
              </h3>

              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-4 flex-1">
                {step.description}
              </p>

              {/* Progress indicator */}
              <div className="mt-4 pt-4 border-t border-neutral-200/50 dark:border-neutral-700/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    {isActive ? 'In Progress' : index <= activeStep ? 'Completed' : 'Upcoming'}
                  </span>
                  <motion.div 
                    className="w-16 h-1 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden"
                  >
                    <motion.div 
                      className={cn(
                        "h-full rounded-full",
                        isActive 
                          ? "bg-gradient-to-r from-primary-500 to-accent-500" 
                          : index <= activeStep
                          ? "bg-primary-500"
                          : "bg-transparent"
                      )}
                      initial={{ width: "0%" }}
                      animate={{ 
                        width: index <= activeStep ? "100%" : "0%" 
                      }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div 
      ref={containerRef} 
      className={cn("relative min-h-[700px] md:min-h-[900px] py-12", className)}
    >
      {/* Progress line */}
      <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-neutral-200 to-transparent">
        <motion.div 
          className="absolute left-0 top-0 w-full bg-primary-500"
          style={{ 
            height: useTransform(smoothProgress, [0, 1], ['0%', '100%']) 
          }}
        />
      </div>
      
      {/* Process steps */}
      {PROCESS_STEPS.map((step, index) => {
        // Calculate if step should be on left or right side
        const isLeft = index % 2 === 0;
        const isActive = activeStep >= index;
        const isHovered = hoveredStep === index;
        
        return (
          <motion.div 
            key={step.id}
            id={`step-${index}`}
            className={cn(
              "relative mb-16 md:mb-24 last:mb-0 flex md:block",
              isMobile ? "ml-10" : isLeft ? "md:pr-[50%] md:pl-0" : "md:pl-[50%] md:pr-0"
            )}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onMouseEnter={() => setHoveredStep(index)}
            onMouseLeave={() => setHoveredStep(null)}
            style={isHovered && !isMobile ? {
              x: calculateMagneticMovement(index).x,
              y: calculateMagneticMovement(index).y
            } : {}}
          >
            {/* Mobile timeline dot - START */}
            {isMobile && (
              <div 
                className={cn(
                  "absolute left-[-14px] top-0 w-7 h-7 rounded-full border-2 flex items-center justify-center",
                  isActive 
                    ? "bg-white border-primary-500 text-primary-500" 
                    : "bg-white border-neutral-300 text-neutral-400"
                )}
              >
                <span className="text-xs font-bold">{index + 1}</span>
              </div>
            )}

            {/* Timeline content */}
            <div 
              className={cn(
                "bg-white rounded-xl p-5 md:p-6 shadow-md transition-all duration-300 flex-1 border",
                isActive ? "border-primary-200" : "border-neutral-200",
                isHovered && "shadow-lg"
              )}
            >
              <div className="flex items-center mb-4">
                {/* Desktop timeline dot */}
                {!isMobile && (
                  <div 
                    className={cn(
                      "mr-3 w-8 h-8 rounded-full border-2 flex items-center justify-center",
                      isActive 
                        ? "bg-white border-primary-500 text-primary-500" 
                        : "bg-white border-neutral-300 text-neutral-400"
                    )}
                  >
                    <span className="text-xs font-bold">{index + 1}</span>
                  </div>
                )}
                <h3 
                  className={cn(
                    "font-display font-semibold text-lg md:text-xl transition-colors",
                    isActive ? "text-primary-500" : "text-neutral-600"
                  )}
                >
                  {step.title}
                </h3>
              </div>
              <p className="text-sm md:text-base text-neutral-600">{step.description}</p>
            </div>
            
            {/* Mobile timeline dot - END */}
            {isMobile && (
              <div 
                className={cn(
                  "absolute left-[-14px] bottom-0 w-7 h-7 rounded-full border-2 flex items-center justify-center",
                  isActive 
                    ? "bg-white border-primary-500 text-primary-500" 
                    : "bg-white border-neutral-300 text-neutral-400"
                )}
              >
                <span className="text-xs font-bold">{index + 1}</span>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
