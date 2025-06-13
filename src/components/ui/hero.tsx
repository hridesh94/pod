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
    <Section className="pt-36 pb-24 bg-gradient-to-b from-primary-50 to-white dark:from-neutral-900 dark:to-neutral-800">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <FadeInUp>
            <h1 className="text-hero font-display font-bold text-primary-600 dark:text-white mb-8 relative">
              {title}
              <span className="absolute -bottom-4 left-0 w-24 h-1.5 bg-accent-500 rounded-full"></span>
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <p className="text-xl mb-10 text-neutral-700 dark:text-neutral-200 leading-relaxed max-w-lg">
              {subtitle}
            </p>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <div className="flex flex-wrap gap-5">
              <Link href={primaryCTA.href}>
                <Button isAnimated size="lg" className="font-medium">{primaryCTA.text}</Button>
              </Link>
              <Link href={secondaryCTA.href}>
                <Button isAnimated variant="outline" size="lg" className="font-medium">{secondaryCTA.text}</Button>
              </Link>
            </div>
          </FadeInUp>
        </div>
        <div className="relative">
          <FadeInUp delay={0.3}>
            <div className="relative w-full h-[440px] bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(16,46,80,0.3)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-primary-400/10">
              <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_70%)]"></div>
              <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-accent-500/20 blur-3xl"></div>
              <div className="absolute bottom-6 left-0 w-full px-8">
                {showAudioWaveform && (
                  <AudioWaveform
                    className="h-28"
                    color="rgba(255, 255, 255, 0.8)"
                    barCount={56}
                    barWidth={3}
                    barGap={2}
                    barMinHeight={5}
                    barMaxHeight={48}
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
