"use client";

import { useState, useEffect } from 'react';

/**
 * A hook to track active process steps based on scroll position
 * @param totalSteps The total number of process steps
 * @param sectionId The ID of the section container to monitor (default: "process")
 * @returns Array of boolean values indicating which steps are active
 */
export function useProcessScroll(totalSteps: number, sectionId: string = "process") {
  const [activeSteps, setActiveSteps] = useState<boolean[]>(
    Array(totalSteps).fill(false)
  );

  useEffect(() => {
    // Function to update active steps based on scroll position
    const updateActiveSteps = () => {
      const processSection = document.getElementById(sectionId);
      if (!processSection) return;
      
      const { top, height } = processSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far we've scrolled through the section as a percentage
      const scrollPercentage = Math.min(
        Math.max(
          (windowHeight - top) / (height + windowHeight / 2), 
          0
        ), 
        1
      );
      
      // Map scroll percentage to steps
      const activeIndex = Math.floor(scrollPercentage * (totalSteps + 0.5));
      
      // Update which steps are active
      const newActiveSteps = Array(totalSteps).fill(false).map((_, i) => i <= activeIndex);
      setActiveSteps(newActiveSteps);
    };

    // Initial check
    updateActiveSteps();
    
    // Add scroll event listener
    window.addEventListener('scroll', updateActiveSteps, { passive: true });
    
    // Cleanup
    return () => window.removeEventListener('scroll', updateActiveSteps);
  }, [totalSteps, sectionId]);

  return activeSteps;
}
