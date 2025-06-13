"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PricingCardProps {
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
  className?: string;
  timeUnit?: string;
  ctaText?: string;
  ctaUrl?: string;
}

export const PricingCard = ({
  name,
  price,
  description,
  features,
  popular = false,
  className,
  timeUnit = 'per Episode',
  ctaText = 'Get Started',
  ctaUrl = '/contact',
}: PricingCardProps) => {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      whileHover={{ y: popular ? -12 : -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        "rounded-xl p-6 bg-white dark:bg-neutral-800 transition-all duration-300",
        popular 
          ? "shadow-lg border-2 border-primary-500 dark:border-primary-400 scale-105 z-10" 
          : "shadow-md border border-neutral-200 dark:border-neutral-700",
        className
      )}
    >
      {popular && (
        <div className="absolute top-0 inset-x-0 -translate-y-1/2 flex justify-center">
          <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-xl md:text-2xl font-display font-bold text-neutral-900 dark:text-white">
          {name}
        </h3>
        <div className="mt-3">
          <span className="text-3xl md:text-4xl font-display font-bold text-primary-500">
            {formatPrice(price)}
          </span>
          <span className="text-neutral-500 dark:text-neutral-400 ml-2">
            {timeUnit}
          </span>
        </div>
        <p className="mt-3 text-neutral-600 dark:text-neutral-300">
          {description}
        </p>
      </div>
      
      <div className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start">
            <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            <span className="text-neutral-700 dark:text-neutral-300">
              {feature}
            </span>
          </div>
        ))}
      </div>
      
      <Link href={ctaUrl} className="block">
        <Button 
          variant={popular ? "default" : "outline"} 
          className="w-full"
          isAnimated
        >
          {ctaText}
        </Button>
      </Link>
    </motion.div>
  );
};
