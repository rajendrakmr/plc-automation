import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yourdomain.com'

  const routes = [
    '',
    '/about-us',
    '/blogs',
    '/careers',
    '/contact-us',
    '/disclaimer',
    '/faq',
    '/login',
    '/offer-product-list',
    '/privacy-policy',
    '/terms-conditions',

    // admin pages (optional)
    // remove these if you don't want indexing
    '/admin',
    '/admin/blogs',
    '/admin/dashboard',
    '/admin/enquiries',
    '/admin/import-logs',
    '/admin/products',
    '/admin/users',

    '/backend',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))
}