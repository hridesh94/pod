"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary-500 text-white hover:bg-primary-600 shadow-md hover:shadow-lg border border-transparent active:bg-primary-700 active:shadow-inner",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg active:bg-red-800 active:shadow-inner",
        outline:
          "border border-primary-200 bg-white text-primary-500 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-300 active:bg-primary-100",
        secondary:
          "bg-accent-500 text-white hover:bg-accent-600 shadow-md hover:shadow-lg active:bg-accent-700 active:shadow-inner",
        ghost:
          "text-primary-500 hover:bg-primary-50 hover:text-primary-600 active:bg-primary-100",
        link: "underline-offset-4 hover:underline text-primary-500 hover:text-primary-600",
      },
      size: {
        default: "h-11 py-2 px-6 text-sm",
        sm: "h-9 px-4 text-xs rounded-md",
        lg: "h-12 px-8 text-base rounded-md",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isAnimated?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isAnimated = false, asChild = false, ...props }, ref) => {
    const buttonClasses = cn(
      buttonVariants({ variant, size, className }),
      "touch-manipulation" // Improves touch response on mobile
    );

    if (asChild) {
      // For asChild, we don't render a button but expect the child to be rendered as the button
      // This is a simplified implementation - in a real app you'd use Radix UI's Slot component
      return React.cloneElement(
        React.Children.only(props.children as React.ReactElement),
        {
          className: cn(buttonClasses, (props.children as React.ReactElement).props.className),
          ref,
        }
      );
    }

    if (isAnimated) {
      // Filter out problematic event handlers that conflict with Framer Motion
      const {
        onAnimationStart,
        onAnimationEnd,
        onDragStart,
        onDragEnd,
        onDrag,
        onTouchStart,
        onTouchEnd,
        onTouchMove,
        ...safeProps
      } = props;

      return (
        <motion.button
          whileHover={{ scale: safeProps.disabled ? 1 : 1.05 }}
          whileTap={{ scale: safeProps.disabled ? 1 : 0.95 }}
          className={buttonClasses}
          ref={ref as any}
          {...safeProps}
        />
      );
    }

    return (
      <button
        className={buttonClasses}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
