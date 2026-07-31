import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/features', '/pricing', '/demo', '/contact', '/register-club'],
        disallow: ['/admin/', '/super-admin/', '/dashboard/', '/portal/'],
      },
    ],
    sitemap: 'https://jorgenewbery.org.ar/sitemap.xml',
  };
}
