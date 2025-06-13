"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { randomBetween } from "@/lib/utils";

interface AudioWaveformProps {
  className?: string;
  color?: string;
  barCount?: number;
  barWidth?: number;
  barGap?: number;
  barMinHeight?: number;
  barMaxHeight?: number;
  playing?: boolean;
  speed?: number;
}

export const AudioWaveform = ({
  className,
  color = "#3b82f6",
  barCount = 32,
  barWidth = 4,
  barGap = 2,
  barMinHeight = 10,
  barMaxHeight = 50,
  playing = true,
  speed = 0.6,
}: AudioWaveformProps) => {
  const getHeight = (i: number, total: number) => {
    // Create a pattern that gets higher in the middle
    const position = i / total;
    const middleFactor = Math.sin(position * Math.PI);
    const randomOffset = Math.random() * 0.4 - 0.2; // adds some randomness
    
    const baseHeight = barMinHeight + middleFactor * (barMaxHeight - barMinHeight);
    return Math.max(barMinHeight, baseHeight + randomOffset * baseHeight);
  };

  const bars = Array.from({ length: barCount }, (_, i) => {
    const height = getHeight(i, barCount);
    return { height, delay: i * 0.02 };
  });

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="flex items-end space-x-px h-full">
        {bars.map((bar, index) => (
          <motion.div
            key={index}
            initial={{ height: barMinHeight }}
            animate={playing ? {
              height: [
                bar.height,
                bar.height * 0.6,
                bar.height * 1.1,
                bar.height * 0.8,
                bar.height,
              ],
            } : { height: barMinHeight }}
            transition={{
              duration: speed,
              ease: "easeInOut",
              repeat: playing ? Infinity : 0,
              repeatType: "reverse",
              delay: bar.delay,
            }}
            style={{
              width: barWidth,
              marginRight: barGap,
              backgroundColor: color,
            }}
            className="rounded-full"
          />
        ))}
      </div>
    </div>
  );
};

interface ReactiveAudioWaveformProps extends Omit<AudioWaveformProps, "playing"> {
  audioUrl?: string;
  autoPlay?: boolean;
}

export const ReactiveAudioWaveform = ({
  audioUrl,
  autoPlay = false,
  ...waveformProps
}: ReactiveAudioWaveformProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(autoPlay);
  const [isLoaded, setIsLoaded] = React.useState(false);
  
  useEffect(() => {
    if (!audioUrl) return;
    
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    
    audio.addEventListener("canplaythrough", () => {
      setIsLoaded(true);
      if (autoPlay) {
        audio.play().catch(() => setIsPlaying(false));
      }
    });
    
    audio.addEventListener("play", () => setIsPlaying(true));
    audio.addEventListener("pause", () => setIsPlaying(false));
    audio.addEventListener("ended", () => setIsPlaying(false));
    
    return () => {
      audio.pause();
      audio.src = "";
      audio.removeEventListener("canplaythrough", () => {});
      audio.removeEventListener("play", () => {});
      audio.removeEventListener("pause", () => {});
      audio.removeEventListener("ended", () => {});
    };
  }, [audioUrl, autoPlay]);
  
  const togglePlay = () => {
    if (!audioRef.current || !isLoaded) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  };
  
  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={togglePlay}
        disabled={!isLoaded}
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center",
          "bg-primary-500 text-white transition-all",
          "hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
          !isLoaded && "opacity-50 cursor-not-allowed"
        )}
        aria-label={isPlaying ? "Pause audio" : "Play audio"}
      >
        {isPlaying ? (
          <PauseIcon />
        ) : (
          <PlayIcon />
        )}
      </button>
      
      <AudioWaveform playing={isPlaying} {...waveformProps} />
    </div>
  );
};

const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path
      fillRule="evenodd"
      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
      clipRule="evenodd"
    />
  </svg>
);

const PauseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path
      fillRule="evenodd"
      d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
      clipRule="evenodd"
    />
  </svg>
);