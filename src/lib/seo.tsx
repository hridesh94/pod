import React from 'react';
import { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
  path?: string;
}

// Helper function to generate metadata for pages
export function generateMetadata({
  title,
  description,
  keywords = [],
  image,
  type = 'website',
  noIndex = false,
  path = '',
}: SEOProps): Metadata {
  // Use defaults if not provided
  const pageTitle = title ? `${title} | ${SITE_CONFIG.name}` : SITE_CONFIG.title;
  const pageDescription = description || SITE_CONFIG.description;
  const pageUrl = `https://hrideshsapkota.com${path}`;
  const pageImage = image || 'https://hrideshsapkota.com/images/og-image.jpg';
  
  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      'podcast producer', 
      'audio editing', 
      'video editing', 
      'podcast marketing', 
      'Nepal podcast',
      ...keywords
    ],
    authors: [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
    openGraph: {
      type,
      locale: 'en_US',
      url: pageUrl,
      title: pageTitle,
      description: pageDescription,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      creator: '@hrideshsapkota',
      images: [pageImage],
    },
  };
};
