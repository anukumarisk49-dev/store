import type { MetadataRoute } from 'next';
import catalog from '../../public/data/products.json';

const baseUrl = 'https://www.99storepe.in';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/categories`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/deals`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/compare`, lastModified: now, changeFrequency: 'weekly', priority: 0.5 },
  ];

  for (const [slug] of Object.entries(catalog.categories)) {
    entries.push({
      url: `${baseUrl}/categories/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  }

  for (const category of Object.values(catalog.categories)) {
    for (const product of category.products) {
      entries.push({
        url: `${baseUrl}/product/${encodeURIComponent(product.id)}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
