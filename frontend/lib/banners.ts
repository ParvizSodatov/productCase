/**
 * Слайды баннера на главной.
 *
 * ВАЖНО: заглушка, как и lib/mock.ts. С бэкендом слайды будет собирать
 * сервер: «проект дня» и «топ недели» считаются по голосам, промо-слайды
 * заводит админ. Тип BannerSlide останется.
 */

import { findCategory } from './categories';
import { findProject } from './mock';
import { projectPath } from './site';

/** Какую фейковую картинку рисовать справа — см. BannerArt */
export type BannerArtKind = 'chat' | 'delivery' | 'queue' | 'launch' | 'badge';

/** Цвета слайда: фон градиентом и акцент для свечения и картинки */
export type BannerTheme = {
  from: string;
  to: string;
  glow: string;
};

export type BannerSlide = {
  id: string;
  /** Плашка над заголовком: «Проект дня», «Новое» */
  label: string;
  title: string;
  text: string;
  /** Буква для фейкового логотипа. Нет — логотип не показываем */
  logo?: string;
  /** Мелкая строка под текстом: категории, голоса */
  meta?: string;
  cta: { label: string; href: string };
  art: BannerArtKind;
  theme: BannerTheme;
};

/** Слайд из проекта. Если проекта нет в моках — слайд просто пропускаем */
function projectSlide(
  slug: string,
  label: string,
  art: BannerArtKind,
  theme: BannerTheme,
): BannerSlide | null {
  const project = findProject(slug);
  if (!project) return null;

  const category = findCategory(project.categorySlugs[0])?.name;

  return {
    id: `project-${slug}`,
    label,
    title: project.name,
    text: project.tagline,
    logo: project.initial,
    meta: [category, `${project.votes} голосов`].filter(Boolean).join(' · '),
    cta: { label: 'Смотреть проект', href: projectPath(slug) },
    art,
    theme,
  };
}

export function bannerSlides(): BannerSlide[] {
  const slides: (BannerSlide | null)[] = [
    projectSlide('tarjuma-bot', 'Проект дня', 'chat', {
      from: '#0d2340',
      to: '#1d5fa8',
      glow: '#7cc4ff',
    }),
    {
      id: 'promo-submit',
      label: 'Для авторов',
      title: 'Сделал проект? Покажи его стране',
      text: 'Публикация бесплатная и занимает пару минут. Голоса, отзывы и первые пользователи с первого дня.',
      cta: { label: 'Добавить проект', href: '/submit' },
      art: 'launch',
      theme: { from: '#2a0f04', to: '#b93e0e', glow: '#ffb38a' },
    },
    projectSlide('dastras', 'Топ недели', 'delivery', {
      from: '#0e2e22',
      to: '#1f7a55',
      glow: '#8ee6b8',
    }),
    projectSlide('navbat', 'Новое', 'queue', {
      from: '#1d1246',
      to: '#5a3fc0',
      glow: '#c9b8ff',
    }),
    {
      id: 'promo-badge',
      label: 'Как попасть в топ',
      title: 'Бейдж «Проект дня» для сайта и резюме',
      text: 'Лучшие проекты дня и недели получают бейдж. Голосуют живые люди: один аккаунт — один голос.',
      cta: { label: 'Правила', href: '/rules' },
      art: 'badge',
      theme: { from: '#121418', to: '#3a3f48', glow: '#f5c76b' },
    },
  ];

  return slides.filter((slide): slide is BannerSlide => slide !== null);
}
