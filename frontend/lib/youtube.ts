/**
 * Ссылки на YouTube.
 *
 * ПРО БЕЗОПАСНОСТЬ. Ссылку на видео присылает автор проекта, то есть это
 * чужой ввод. Нельзя подставлять её в <iframe src> как есть: туда можно
 * положить адрес любого сайта (фишинговую форму под видом плеера) или
 * javascript:-ссылку. Поэтому из ссылки достаём только ID ролика — ровно
 * 11 символов из букв, цифр, «-» и «_» — и сами собираем адрес плеера.
 * Всё, что не похоже на YouTube, отбрасываем.
 *
 * Ту же проверку нужно повторить НА СЕРВЕРЕ при сохранении проекта
 * (схема zod), а в базе хранить уже готовый ID, а не ссылку.
 */

const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;

const YOUTUBE_HOSTS = new Set([
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'youtu.be',
  'www.youtube-nocookie.com',
]);

/** ID ролика из ссылки или undefined, если ссылка не на YouTube. */
export function parseYoutubeId(url: string | undefined): string | undefined {
  if (!url) return undefined;

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return undefined;
  }

  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return undefined;
  if (!YOUTUBE_HOSTS.has(parsed.hostname)) return undefined;

  let id: string | null | undefined;

  if (parsed.hostname === 'youtu.be') {
    // youtu.be/ID
    id = parsed.pathname.split('/')[1];
  } else if (parsed.pathname === '/watch') {
    // youtube.com/watch?v=ID
    id = parsed.searchParams.get('v');
  } else {
    // youtube.com/shorts/ID, /embed/ID, /live/ID
    const match = parsed.pathname.match(/^\/(?:shorts|embed|live)\/([^/]+)/);
    id = match?.[1];
  }

  return id && VIDEO_ID.test(id) ? id : undefined;
}

/**
 * Адрес встроенного плеера.
 * youtube-nocookie.com не ставит рекламные cookie, пока человек
 * не нажал «Смотреть», — меньше слежки за посетителями сайта.
 */
export function youtubeEmbedUrl(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
}

/** Превью ролика — картинку отдаёт сам YouTube. */
export function youtubeThumbnailUrl(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}
