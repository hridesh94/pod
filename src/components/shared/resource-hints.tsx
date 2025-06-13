"use client";

import React from 'react';
import Head from 'next/head';

interface ResourceHintProps {
  fonts?: string[];
  preconnect?: string[];
  preload?: Array<{
    href: string;
    as: 'script' | 'style' | 'image' | 'font' | 'fetch';
    type?: string;
    crossOrigin?: 'anonymous' | 'use-credentials';
  }>;
}

export const ResourceHints = ({
  fonts = [],
  preconnect = [],
  preload = []
}: ResourceHintProps) => {
  return (
    <>
      {/* Font preloading for critical fonts */}
      {fonts.map((font, index) => (
        <link
          key={`font-${index}`}
          rel="preload"
          href={font}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      ))}

      {/* Preconnect to critical origins */}
      {preconnect.map((url, index) => (
        <link
          key={`preconnect-${index}`}
          rel="preconnect"
          href={url}
          crossOrigin="anonymous"
        />
      ))}

      {/* Preload critical resources */}
      {preload.map((item, index) => (
        <link
          key={`preload-${index}`}
          rel="preload"
          href={item.href}
          as={item.as}
          type={item.type}
          crossOrigin={item.crossOrigin}
        />
      ))}
    </>
  );
};
