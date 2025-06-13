import { MetadataRoute } from 'next';

// These are the main routes we want to include in the sitemap
const routes = [
  '',
  '/about',
  '/services',
  '/portfolio',
  '/pricing',
  '/contact',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://hrideshsapkota.com';
  
  // Basic routes
  const routesSitemap = routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
  
  // TODO: Add dynamic routes from Sanity CMS
  // For portfolio items, blog posts, etc.
  // Example:
  // const portfolioItems = await getPortfolioItems();
  // const portfolioSitemap = portfolioItems.map((item) => ({
  //   url: `${baseUrl}/portfolio/${item.slug}`,
  //   lastModified: new Date(item.updatedAt),
  //   changeFrequency: 'monthly' as 'monthly',
  //   priority: 0.7,
  // }));
  
  return [...routesSitemap];
}
