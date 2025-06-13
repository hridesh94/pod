import { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { getPersonSchema, getOrganizationSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  keywords: ['podcast producer', 'audio editing', 'video editing', 'podcast marketing', 'Nepal podcast'],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hrideshsapkota.com',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [{
      url: 'https://hrideshsapkota.com/images/og-image.jpg',
      width: 1200,
      height: 630,
      alt: SITE_CONFIG.title,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    creator: '@hrideshsapkota',
    images: ['https://hrideshsapkota.com/images/og-image.jpg'],
  },
};

// JSON-LD structured data for the homepage
export const generateJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      getPersonSchema(),
      getOrganizationSchema(),
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': 'Podcast Production Services',
        'serviceType': 'Podcast Production',
        'provider': {
          '@type': 'Person',
          'name': SITE_CONFIG.name,
        },
        'areaServed': {
          '@type': 'Country',
          'name': 'Worldwide',
        },
        'description': 'Professional podcast production services including audio editing, video editing, and podcast marketing.',
        'offers': {
          '@type': 'Offer',
          'price': '150',
          'priceCurrency': 'USD',
        },
      }
    ]
  };
};
