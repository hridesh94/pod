"use client";

import { useEffect, useRef, useState, useCallback } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  root?: Element | null;
  once?: boolean;
}

export function useIntersectionObserver<T extends Element>({
  threshold = 0.1,
  rootMargin = '0px',
  root = null,
  once = true
}: UseIntersectionObserverOptions = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<T>(null);

  const callback = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    
    // If already triggered once and once flag is set, don't update state
    if (hasTriggered && once) return;
    
    setIsIntersecting(entry.isIntersecting);
    
    // If element has entered viewport and once is true, mark as triggered
    if (entry.isIntersecting && once) {
      setHasTriggered(true);
    }
  }, [hasTriggered, once]);

  useEffect(() => {
    // Bail if no browser or no ref
    if (typeof window === 'undefined' || !ref.current) return;
    
    // Create observer
    const observer = new IntersectionObserver(callback, {
      threshold,
      rootMargin,
      root
    });
    
    // Start observing
    observer.observe(ref.current);
    
    // Cleanup
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, threshold, rootMargin, root, callback]);

  return { ref, isIntersecting };
}
