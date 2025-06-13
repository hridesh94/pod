"use client";

import React from 'react';
import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { FadeInUp } from '@/components/animations/fade-in-up';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Section className="py-32 md:py-40">
      <Container>
        <div className="flex flex-col items-center text-center">
          <FadeInUp>
            <h1 className="text-display font-display font-bold mb-4">
              Something Went <span className="text-primary-500">Wrong</span>
            </h1>
          </FadeInUp>
          
          <FadeInUp delay={0.1}>
            <p className="text-xl text-neutral-700 dark:text-neutral-300 mb-8">
              We apologize for the inconvenience. An unexpected error has occurred.
            </p>
          </FadeInUp>
          
          <FadeInUp delay={0.2} className="mb-8 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg max-w-lg mx-auto">
            <p className="text-sm font-mono text-neutral-700 dark:text-neutral-300 overflow-auto">
              {error.message || "Unknown error occurred"}
              {error.digest && <span className="block mt-2 text-xs text-neutral-500">{error.digest}</span>}
            </p>
          </FadeInUp>
          
          <FadeInUp delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={reset} size="lg" isAnimated>
                Try Again
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link href="/">Go Back Home</Link>
              </Button>
            </div>
          </FadeInUp>
        </div>
      </Container>
    </Section>
  );
}
