// sanity.config.ts
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { media } from 'sanity-plugin-media';
import { schemaTypes } from './schemas';
import { imageOptimization } from './sanity/plugins/image-optimization';

export default defineConfig({
  name: 'hridesh-sapkota-portfolio',
  title: 'Hridesh Sapkota Portfolio',
  
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  
  plugins: [
    deskTool(), 
    visionTool(),
    media(),
    imageOptimization,
  ],
  
  schema: {
    types: schemaTypes,
  },
  
  basePath: '/admin',
});
