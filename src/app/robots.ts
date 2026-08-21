import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/products/add'],
    },
    sitemap: 'https://www.99storepe.in/sitemap.xml',
    host: 'https://www.99storepe.in',
  };
}
