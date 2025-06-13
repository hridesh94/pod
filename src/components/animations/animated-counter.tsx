"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  start?: number;
  end: number;
  duration?: number;
  label?: string;
  prefix?: string;
  suffix?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  once?: boolean;
}

export const AnimatedCounter = ({
  start = 0,
  end,
  duration = 2000,
  label,
  prefix = '',
  suffix = '',
  className,
  size = 'md',
  once = true,
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(start);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once });
  const countRef = useRef(start);
  const animationFrameRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (!isInView) {
      return;
    }
    
    let startTime: number | null = null;
    
    const easeOutQuad = (t: number) => t * (2 - t);
    
    // Animation function
    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutQuad(progress);
      const currentCount = Math.floor(easedProgress * (end - start) + start);
      
      // Only update state if the count has changed
      if (currentCount !== countRef.current) {
        countRef.current = currentCount;
        setCount(currentCount);
      }
      
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animateCount);
      }
    };
    
    // Start animation
    animationFrameRef.current = requestAnimationFrame(animateCount);
    
    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isInView, start, end, duration]);
  
  const getFontSizeClass = () => {
    switch (size) {
      case 'sm': return 'text-3xl';
      case 'lg': return 'text-5xl md:text-6xl';
      case 'md':
      default: return 'text-4xl md:text-5xl';
    }
  };

  return (
    <div ref={ref} className={cn("text-center", className)}>
      <div className={cn("font-display font-bold", getFontSizeClass())}>
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      {label && (
        <div className="text-neutral-600 dark:text-neutral-400 mt-2 font-medium">
          {label}
        </div>
      )}
    </div>
  );
};
