"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { motion } from "framer-motion";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  containerSize?: "default" | "small" | "large";
  animate?: boolean;
}

const Section = ({
  children,
  className,
  id,
  containerSize = "default",
  animate = true,
}: SectionProps) => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  if (animate) {
    return (
      <motion.section
        id={id}
        className={cn("py-section relative", className)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-50/20 to-transparent dark:via-neutral-900/10 pointer-events-none opacity-50"></div>
        <Container size={containerSize} className="relative z-10">{children}</Container>
      </motion.section>
    );
  }

  return (
    <section id={id} className={cn("py-section relative", className)}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-50/20 to-transparent dark:via-neutral-900/10 pointer-events-none opacity-50"></div>
      <Container size={containerSize} className="relative z-10">{children}</Container>
    </section>
  );
};

export { Section };