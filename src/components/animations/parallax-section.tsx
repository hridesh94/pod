"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  offset?: number;
  direction?: "up" | "down";
  as?: React.ElementType;
}

export const ParallaxSection = ({
  children,
  className,
  offset = 100,
  direction = "up",
  as = "div",
}: ParallaxSectionProps) => {
  const Component = motion[as as keyof typeof motion] || motion.div;
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  // Calculate the offset direction
  const yOffset = direction === "up" ? -offset : offset;
  
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [yOffset, 0]
  );

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <Component
        style={{ y }}
        className="will-change-transform"
      >
        {children}
      </Component>
    </div>
  );
};