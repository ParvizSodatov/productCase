import type { MetadataRoute } from 'next';
import { categories } from '@/lib/categories';
import { projects } from '@/lib/mock';
import { projectPath, siteUrl } from '@/lib/site';

/**
 * Карта сайта: /sitemap.xml.
 *
 * Next собирает её сам из этого файла. Карту указывают в Google Search
 * Console и Яндекс.Вебмастере — так поисковик быстрее находит все страницы
 * проектов и категорий, не обходя сайт по ссылкам вслепую.
 *
 * priority — подсказка о важности страницы относительно других на сайте.
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    ...['/about', '/rules'].map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    })),
    ...categories.map((category) => ({
      url: `${siteUrl}/category/${category.slug}`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    })),
    ...projects.map((project) => ({
      url: `${siteUrl}${projectPath(project.slug)}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}
