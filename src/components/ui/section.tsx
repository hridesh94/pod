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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  if (animate) {
    return (
      <motion.section
        id={id}
        className={cn("py-section", className)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <Container size={containerSize}>{children}</Container>
      </motion.section>
    );
  }

  return (
    <section id={id} className={cn("py-section", className)}>
      <Container size={containerSize}>{children}</Container>
    </section>
  );
};

export { Section };