import type { MetadataRoute } from 'next';
import { categories } from '@/lib/categories';
import { projects } from '@/lib/mock';

/**
 * Карта сайта: /sitemap.xml.
 *
 * Next собирает её сам из этого файла. Карту указывают в Google Search
 * Console и Яндекс.Вебмастере — так поисковик быстрее находит все страницы
 * проектов и категорий, не обходя сайт по ссылкам вслепую.
 *
 * priority — подсказка о важности страницы относительно других на сайте.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    ...categories.map((category) => ({
      url: `${siteUrl}/category/${category.slug}`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    })),
    ...projects.map((project) => ({
      url: `${siteUrl}/project/${project.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}
