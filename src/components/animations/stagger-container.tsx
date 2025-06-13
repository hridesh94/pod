"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
  threshold?: number;
  once?: boolean;
  as?: React.ElementType;
}

export const StaggerContainer = ({
  children,
  className,
  delayChildren = 0.1,
  staggerChildren = 0.1,
  threshold = 0.1,
  once = true,
  as = "div",
}: StaggerContainerProps) => {
  const Component = motion[as as keyof typeof motion] || motion.div;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren,
        staggerChildren,
      },
    },
  };

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={containerVariants}
      className={cn("", className)}
    >
      {children}
    </Component>
  );
};

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  index?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  duration?: number;
  as?: React.ElementType;
}

export const StaggerItem = ({
  children,
  className,
  index = 0,
  direction = "up",
  distance = 20,
  duration = 0.5,
  as = "div",
}: StaggerItemProps) => {
  const Component = motion[as as keyof typeof motion] || motion.div;
  
  const directionOffset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      ...directionOffset[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: "easeOut",
      },
    },
  };

  return (
    <Component
      variants={itemVariants}
      className={cn("will-change-transform", className)}
      custom={index}
    >
      {children}
    </Component>
  );
};