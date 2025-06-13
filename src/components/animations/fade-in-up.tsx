"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FadeInUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

export const FadeInUp = ({
  children,
  className,
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  once = true,
}: FadeInUpProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: threshold }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
};