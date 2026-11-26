import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

/**
 * robots.txt — что поисковикам можно обходить.
 *
 * Закрываем страницы, которым в поиске делать нечего: форму публикации
 * и вход. Они не несут содержания, а в выдаче только мешают.
 */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Формы, кабинет, админка и служебная витрина состояний — в поиске им делать нечего.
      // ВАЖНО: robots.txt — просьба к поисковикам, а не защита. Его читает
      // кто угодно, так что он заодно показывает адреса закрытых разделов.
      // Защищает их только проверка прав на сервере.
      disallow: ['/submit', '/login', '/settings', '/me/', '/admin/', '/ui', '/search'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
