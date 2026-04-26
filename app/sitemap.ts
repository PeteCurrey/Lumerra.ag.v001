import { MetadataRoute } from 'next';
import { allProducts } from '@/data/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lumerra.co.uk';

  // Static routes
  const routes = [
    '',
    '/hot-tubs',
    '/swim-spas',
    '/mini-pools',
    '/saunas',
    '/journal',
    '/the-lumerra-promise',
    '/concierge',
    '/tools/hot-tub-match',
    '/tools/sauna-sizer',
    '/tools/running-cost-calculator',
    '/tools/garden-fit',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Product routes
  const productRoutes = allProducts.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // SEO Size routes
  const sizeRoutes = ['3-4', '5', '6', '7-plus'].map((size) => ({
    url: `${baseUrl}/hot-tubs/by-size/${size}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...productRoutes, ...sizeRoutes];
}
