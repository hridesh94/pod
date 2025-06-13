"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary-500 text-white hover:bg-primary-500/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-accent-500 text-white hover:bg-accent-600",
        ghost:
          "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary-500",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
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
    const buttonClasses = cn(buttonVariants({ variant, size, className }));
    
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
