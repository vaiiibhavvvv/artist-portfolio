import { MetadataRoute } from 'next'

// TODO: replace baseUrl with the production domain before deploying.
const BASE_URL = 'https://colorpalette-studio.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
