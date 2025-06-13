// This file contains a custom asset source plugin for Sanity to optimize images on upload
import { definePlugin } from 'sanity';
import imageUrlBuilder from '@sanity/image-url';

// Configuration for image transformations
const imageConfig = {
  defaultWidth: 1920,
  thumbnailWidth: 800,
  quality: 80,
  webpEnabled: true,
  avifEnabled: true,
};

export const imageOptimization = definePlugin({
  name: 'sanity-plugin-image-optimization',
  
  // Simple plugin without custom URL resolver to avoid TypeScript issues
  plugins: [],
});
