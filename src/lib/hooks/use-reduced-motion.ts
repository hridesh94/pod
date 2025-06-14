"use client";

import { useState, useEffect } from 'react';

/**
 * Hook to detect if the user prefers reduced motion
 * or if the device might benefit from reduced animations
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isLowPowerDevice, setIsLowPowerDevice] = useState(false);

  useEffect(() => {
    // Check if user has set a preference for reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    // Simple heuristic to detect low-power or low-memory devices
    const checkDeviceCapabilities = () => {
      // Check for low memory
      if ('deviceMemory' in navigator) {
        // @ts-ignore - deviceMemory is not in the standard TS types yet
        const memory = navigator.deviceMemory;
        if (memory && memory < 4) {
          setIsLowPowerDevice(true);
          return;
        }
      }

      // Check for battery status if available
      if ('getBattery' in navigator) {
        // @ts-ignore - getBattery is not in the standard TS types
        navigator.getBattery().then(battery => {
          // If battery is discharging and below 20%, reduce animations
          if (!battery.charging && battery.level < 0.2) {
            setIsLowPowerDevice(true);
          }
        }).catch(() => {
          // Battery API not available, fallback to other checks
        });
      }

      // Check for low-end devices based on screen size and pixel ratio
      // Heuristic: smaller screens with lower pixel ratios often indicate budget devices
      const isLowEndDevice = 
        window.innerWidth * window.innerHeight < 480 * 800 && 
        window.devicePixelRatio < 2;
      
      setIsLowPowerDevice(isLowEndDevice);
    };

    checkDeviceCapabilities();
  }, []);

  // Return true if we should reduce motion for any reason
  return prefersReducedMotion || isLowPowerDevice;
}
