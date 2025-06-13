import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-05-03',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
};

export const sanityClient = createClient(config);

// Helper function for generating image URLs
export const urlFor = (source: any) => imageUrlBuilder(sanityClient).image(source);

/**
 * Function to fetch all portfolio items
 */
export async function getPortfolioItems() {
  return sanityClient.fetch(`
    *[_type == "portfolio"] | order(publishedAt desc) {
      _id,
      title,
      client,
      description,
      "audioUrl": audioSample.asset->url,
      "videoUrl": videoSample.asset->url,
      "thumbnailUrl": thumbnail.asset->url,
      tags,
      publishedAt
    }
  `);
}

/**
 * Function to fetch a single portfolio item by ID
 */
export async function getPortfolioItemById(id: string) {
  return sanityClient.fetch(`
    *[_type == "portfolio" && _id == $id][0] {
      _id,
      title,
      client,
      description,
      "audioUrl": audioSample.asset->url,
      "videoUrl": videoSample.asset->url,
      "thumbnailUrl": thumbnail.asset->url,
      tags,
      publishedAt
    }
  `, { id });
}

/**
 * Function to fetch all testimonials
 */
export async function getTestimonials() {
  return sanityClient.fetch(`
    *[_type == "testimonial"] | order(featured desc) {
      _id,
      clientName,
      clientTitle,
      content,
      rating,
      "avatarUrl": avatar.asset->url,
      featured
    }
  `);
}

/**
 * Function to fetch featured testimonials
 */
export async function getFeaturedTestimonials() {
  return sanityClient.fetch(`
    *[_type == "testimonial" && featured == true] | order(_createdAt desc) {
      _id,
      clientName,
      clientTitle,
      content,
      rating,
      "avatarUrl": avatar.asset->url,
      featured
    }
  `);
}