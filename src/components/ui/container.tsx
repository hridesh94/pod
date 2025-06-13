import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  size?: "default" | "small" | "large";
}

const Container = ({
  children,
  className,
  as: Component = "div",
  size = "default",
}: ContainerProps) => {
  return (
    <Component
      className={cn(
        "mx-auto px-4 md:px-6 lg:px-8 w-full",
        {
          "max-w-7xl": size === "default",
          "max-w-5xl": size === "small",
          "max-w-screen-xl": size === "large",
        },
        className
      )}
    >
      {children}
    </Component>
  );
};

export { Container };