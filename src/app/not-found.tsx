import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { AudioWaveform } from '@/components/animations/audio-waveform';
import { FadeInUp } from '@/components/animations/fade-in-up';

export const metadata = {
  title: 'Page Not Found - Hridesh Sapkota',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <Section className="py-32 md:py-40">
      <Container>
        <div className="flex flex-col items-center text-center">
          <FadeInUp>
            <h1 className="text-display font-display font-bold mb-4">
              404 <span className="text-primary-500">Error</span>
            </h1>
          </FadeInUp>
          
          <FadeInUp delay={0.1}>
            <p className="text-xl text-neutral-700 dark:text-neutral-300 mb-8">
              Oops! It seems the podcast episode you're looking for doesn't exist.
            </p>
          </FadeInUp>
          
          <FadeInUp delay={0.2}>
            <div className="w-full max-w-md h-16 mb-8">
              <AudioWaveform 
                color="#3b82f6"
                barCount={24}
                barWidth={4}
                barGap={2}
                barMinHeight={8}
                barMaxHeight={32}
                playing={true}
                speed={0.8}
              />
            </div>
          </FadeInUp>
          
          <FadeInUp delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" isAnimated>
                <Link href="/">Go Back Home</Link>
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </FadeInUp>
        </div>
      </Container>
    </Section>
  );
}
