# Hridesh Sapkota - Podcast Producer Portfolio

A modern, professional portfolio website for Hridesh Sapkota, a freelance podcast producer with 4+ years of experience.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS + Tailwind UI
- Framer Motion for animations
- Headless UI + Radix UI for components
- Sanity CMS for content management
- Vercel for deployment

## Project Structure

The project follows a clean, organized structure:

```
src/
├── app/               # App Router pages
├── components/        # UI components
├── lib/               # Utility functions and configs
└── styles/            # Global styles
```

## Development

### Setup

1. Clone the repository
2. Install dependencies
```bash
npm install
```
3. Set up environment variables by copying `.env.local.example` to `.env.local` and filling in the values
```bash
cp .env.local.example .env.local
```
4. Start the development server
```bash
npm run dev
```

### Features

- **Modern Design**: Premium, Webflow/Framer-level visual design with smooth animations
- **Optimized Performance**: Optimized images, fonts, and assets for fast loading
- **Responsive**: Mobile-first approach, looks great on all device sizes
- **SEO-friendly**: Proper metadata, structured data, and sitemap
- **Accessible**: WCAG 2.1 AA compliance with proper ARIA attributes
- **CMS Integration**: Sanity CMS for easy content management
- **Animations**: Framer Motion for smooth, professional animations
- **Dark Mode Support**: Automatic and manual dark mode switching

### Key Components

- **Header/Navigation**: Responsive navigation with mobile menu
- **Hero Section**: Main landing section with CTA
- **Services**: Core services display with cards
- **Portfolio**: Showcase of podcast work with audio/video samples
- **Pricing**: Transparent pricing packages
- **Process Steps**: Visual workflow representation
- **Testimonials**: Client feedback display
- **Contact Form**: Lead capture form with validation

### Performance Optimizations

- Image optimization with Next.js Image component
- Font optimization with proper loading strategies
- Code splitting and lazy loading
- Resource hints (preconnect, preload)
- Core Web Vitals optimization

### SEO Enhancements

- Comprehensive metadata
- Open Graph and Twitter card support
- JSON-LD structured data
- Sitemap and robots.txt
- Semantic HTML structure
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=
NEXT_PUBLIC_SITE_URL=
```

## Deployment

The site is configured for deployment on Vercel. Connect the repository to Vercel for automatic deployments.

## Content Management

The content is managed through Sanity CMS. Access the Sanity Studio at `/studio` to update content.
