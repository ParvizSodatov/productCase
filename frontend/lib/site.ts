/**
 * Адрес сайта без слеша в конце.
 *
 * На Vercel задаётся переменной NEXT_PUBLIC_SITE_URL. Нужен там, где
 * требуется полная ссылка, а не путь: карта сайта, robots.txt, мета-теги,
 * кнопка «Поделиться».
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(
  /\/+$/,
  '',
);

/**
 * Контакты площадки.
 *
 * TODO: ник в Telegram и домен ещё не заняты (см. PROJECT.md).
 * Пока здесь общие адреса: ставить сюда чужой ник нельзя — ссылка
 * в подвале уведёт людей в чужой канал.
 */
export const contacts = {
  telegramChannel: 'https://t.me',
  email: 'hello@example.com',
} as const;

/** Путь к странице проекта. Один источник, чтобы ссылки не разъехались. */
export function projectPath(slug: string): string {
  return `/projects/${slug}`;
}
