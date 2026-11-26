/**
 * Проверка форм в браузере.
 *
 * ВАЖНО: это подсказки для человека, а не защита. Любую проверку здесь
 * обходят одним запросом напрямую к серверу. Те же правила обязаны
 * выполняться на сервере. Когда появится бэкенд, эти функции заменит
 * схема zod (решение из PROJECT.md): одна схема на форму и на сервер,
 * чтобы правила не разъехались.
 *
 * Каждая функция возвращает объект «поле → текст ошибки».
 * Пустой объект — ошибок нет.
 */

export type FieldErrors = Record<string, string>;

/** Те же ошибки без ошибки одного поля — когда человек его исправил */
export function withoutError(errors: FieldErrors, key: string): FieldErrors {
  const next = { ...errors };
  delete next[key];
  return next;
}

/** Пропускаем только http(s): ссылка javascript:… в href — это XSS */
export function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

/* ---------- Публикация проекта ---------- */

export const PROJECT_LIMITS = {
  name: 80,
  tagline: 60,
  aboutMin: 50,
  about: 4000,
  categories: 3,
} as const;

export type ProjectDraft = {
  name: string;
  tagline: string;
  about: string;
  link: string;
  categories: string[];
};

export function validateProject(draft: ProjectDraft): FieldErrors {
  const errors: FieldErrors = {};
  const name = draft.name.trim();
  const tagline = draft.tagline.trim();
  const about = draft.about.trim();
  const link = draft.link.trim();

  if (!name) errors.name = 'Укажите название проекта';
  else if (name.length > PROJECT_LIMITS.name)
    errors.name = `Не длиннее ${PROJECT_LIMITS.name} символов`;

  if (!tagline) errors.tagline = 'Опишите проект одной строкой';
  else if (tagline.length > PROJECT_LIMITS.tagline)
    errors.tagline = `Не длиннее ${PROJECT_LIMITS.tagline} символов`;

  if (about.length < PROJECT_LIMITS.aboutMin)
    errors.about = `Расскажите подробнее: минимум ${PROJECT_LIMITS.aboutMin} символов, сейчас ${about.length}`;

  if (!link) errors.link = 'Добавьте ссылку на проект';
  else if (!isHttpUrl(link))
    errors.link = 'Ссылка должна начинаться с https:// — например, https://t.me/my_bot';

  if (draft.categories.length === 0) errors.categories = 'Выберите хотя бы одну категорию';
  else if (draft.categories.length > PROJECT_LIMITS.categories)
    errors.categories = `Не больше ${PROJECT_LIMITS.categories} категорий`;

  return errors;
}

/* ---------- Настройки профиля ---------- */

export const PROFILE_LIMITS = {
  name: 60,
  usernameMin: 3,
  usernameMax: 30,
  about: 300,
  links: 5,
  /** Аватар до 2 МБ */
  avatarBytes: 2 * 1024 * 1024,
} as const;

/**
 * Ники, которые совпадают с адресами сайта или вводят в заблуждение.
 * Человек с ником «admin» выглядел бы как администрация площадки.
 */
const RESERVED_USERNAMES = new Set([
  'admin',
  'moderator',
  'productcase',
  'settings',
  'login',
  'submit',
  'search',
  'rules',
  'about',
  'privacy',
  'me',
  'api',
]);

export type ProfileDraft = {
  name: string;
  username: string;
  about: string;
  links: { label: string; href: string }[];
};

export function validateProfile(draft: ProfileDraft): FieldErrors {
  const errors: FieldErrors = {};
  const name = draft.name.trim();
  const username = draft.username.trim();

  if (!name) errors.name = 'Укажите имя — его видят на странице проекта';
  else if (name.length > PROFILE_LIMITS.name)
    errors.name = `Не длиннее ${PROFILE_LIMITS.name} символов`;

  if (username.length < PROFILE_LIMITS.usernameMin || username.length > PROFILE_LIMITS.usernameMax)
    errors.username = `От ${PROFILE_LIMITS.usernameMin} до ${PROFILE_LIMITS.usernameMax} символов`;
  else if (!/^[a-z0-9_]+$/.test(username))
    errors.username = 'Только строчные латинские буквы, цифры и «_»';
  else if (RESERVED_USERNAMES.has(username)) errors.username = 'Этот ник занят системой';

  if (draft.about.length > PROFILE_LIMITS.about)
    errors.about = `Не длиннее ${PROFILE_LIMITS.about} символов`;

  draft.links.forEach((link, index) => {
    const href = link.href.trim();
    if (!href && !link.label.trim()) return; // пустую строку просто не сохраним
    if (!link.label.trim()) errors[`link-label-${index}`] = 'Подпишите ссылку';
    if (!isHttpUrl(href)) errors[`link-href-${index}`] = 'Нужен адрес с https://';
  });

  return errors;
}

/**
 * Проверка картинки аватара до загрузки.
 *
 * Тип и размер здесь берутся из того, что сообщил браузер, — подделать
 * их тривиально. Сервер должен проверять настоящий тип по первым байтам
 * файла и пересохранять картинку (это вычищает спрятанный в ней код).
 */
export function validateAvatar(file: File): string | undefined {
  if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type))
    return 'Подойдёт PNG, JPG или WebP';
  if (file.size > PROFILE_LIMITS.avatarBytes) return 'Файл больше 2 МБ';
  return undefined;
}
