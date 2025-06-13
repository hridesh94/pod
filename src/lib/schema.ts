// This is a helper file for adding structured data to pages
import { SITE_CONFIG } from '@/lib/constants';

interface Organization {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  logo: string;
  sameAs: string[];
  contactPoint: {
    "@type": string;
    telephone: string;
    email: string;
    contactType: string;
  };
}

interface Person {
  "@context": string;
  "@type": string;
  name: string;
  jobTitle: string;
  url: string;
  image: string;
  sameAs: string[];
}

interface BreadcrumbList {
  "@context": string;
  "@type": string;
  itemListElement: Array<{
    "@type": string;
    position: number;
    name: string;
    item: string;
  }>;
}

// Generate Organization schema
export const getOrganizationSchema = (): Organization => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: "https://hrideshsapkota.com",
    logo: "https://hrideshsapkota.com/images/logo.png",
    sameAs: [
      SITE_CONFIG.social.twitter,
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.linkedin,
      SITE_CONFIG.social.youtube,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE_CONFIG.contact.phone,
      email: SITE_CONFIG.contact.email,
      contactType: "customer service"
    }
  };
};

// Generate Person schema
export const getPersonSchema = (): Person => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_CONFIG.name,
    jobTitle: "Podcast Producer",
    url: "https://hrideshsapkota.com",
    image: "https://hrideshsapkota.com/images/hridesh.jpg",
    sameAs: [
      SITE_CONFIG.social.twitter,
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.linkedin,
      SITE_CONFIG.social.youtube,
    ]
  };
};

// Generate breadcrumb schema for any page
export const getBreadcrumbSchema = (items: Array<{name: string, path: string}>): BreadcrumbList => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `https://hrideshsapkota.com${item.path}`
      };
    })
  };
};
