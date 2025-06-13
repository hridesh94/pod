"use client";

import React from "react";
import { motion } from "framer-motion";
import { FadeInUp } from "@/components/animations/fade-in-up";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { AudioWaveform } from "@/components/animations/audio-waveform";
import Link from "next/link";

interface HeroProps {
  title: string;
  subtitle: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA: {
    text: string;
    href: string;
  };
  showAudioWaveform?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  showAudioWaveform = true,
}) => {
  return (
    <Section className="pt-32 pb-20 bg-gradient-to-b from-primary-50 to-white dark:from-neutral-900 dark:to-neutral-900">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <FadeInUp>
            <h1 className="text-hero font-display font-bold text-neutral-900 dark:text-white mb-6">
              {title}
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <p className="text-xl mb-8 text-neutral-700 dark:text-neutral-200">
              {subtitle}
            </p>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <div className="flex flex-wrap gap-4">
              <Link href={primaryCTA.href}>
                <Button isAnimated>{primaryCTA.text}</Button>
              </Link>
              <Link href={secondaryCTA.href}>
                <Button isAnimated variant="outline">{secondaryCTA.text}</Button>
              </Link>
            </div>
          </FadeInUp>
        </div>
        <div className="relative">
          <FadeInUp delay={0.3}>
            <div className="relative w-full h-96 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute bottom-6 left-0 w-full px-8">
                {showAudioWaveform && (
                  <AudioWaveform
                    className="h-24"
                    color="rgba(255, 255, 255, 0.7)"
                    barCount={48}
                    barWidth={3}
                    barGap={2}
                    barMinHeight={5}
                    barMaxHeight={40}
                  />
                )}
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </Section>
  );
};
