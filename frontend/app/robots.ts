import type { MetadataRoute } from 'next';

/**
 * robots.txt — что поисковикам можно обходить.
 *
 * Закрываем страницы, которым в поиске делать нечего: форму публикации
 * и вход. Они не несут содержания, а в выдаче только мешают.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/submit', '/login'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
