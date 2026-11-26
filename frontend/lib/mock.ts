/**
 * Условные данные для вёрстки.
 *
 * ВАЖНО: это заглушки, чтобы собрать страницы. Когда появится бэкенд,
 * этот файл удаляется, а страницы начинают получать данные с сервера.
 * Типы Project, Comment и Author останутся — их переиспользуем.
 */

export type Author = {
  username: string;
  name: string;
  initials: string;
  role: string;
  city: string;
  about: string;
  /** Тип профиля: человек или компания — решение из PROJECT.md */
  kind: 'person' | 'company';
  links: { label: string; href: string }[];
  stats: { projects: number; votes: number; topDays: number };
};

export type Comment = {
  id: string;
  name: string;
  /** Ник автора комментария: по нему понимаем, свой это комментарий или чужой */
  username: string;
  when: string;
  text: string;
};

/**
 * Модель оплаты — пометка на странице проекта.
 * Текст подробностей («от 150 сомони в месяц») лежит отдельно в price.
 */
export type Pricing = 'free' | 'freemium' | 'paid';

export const pricingLabels: Record<Pricing, string> = {
  free: 'Бесплатно',
  freemium: 'Есть бесплатный тариф',
  paid: 'Платно',
};

export type Screenshot = {
  /**
   * Адрес картинки. Пока пусто — на месте скриншота заглушка.
   * С бэкендом здесь будет ссылка на файл в хранилище.
   */
  src?: string;
  /** Подпись: она же alt для скринридеров и поисковиков */
  caption: string;
};

export type Project = {
  slug: string;
  name: string;
  /** Первая буква названия — заглушка вместо логотипа */
  initial: string;
  tagline: string;
  /** Подробное описание. Абзацы разделены пустой строкой */
  about: string;
  /** Слаги категорий, до 3 */
  categorySlugs: string[];
  /** Подписи-теги в списке */
  tags: string[];
  votes: number;
  link: string;
  linkLabel: string;
  platform: string;
  pricing: Pricing;
  /** Подробности цены, показываются в карточке сбоку */
  price: string;
  publishedAt: string;
  /** Владелец: тот, кто опубликовал проект */
  authorUsername: string;
  /** Создатели, включая владельца. Порядок = порядок на странице */
  makers: string[];
  screenshots: Screenshot[];
  /** Ссылка на YouTube в любом виде: watch?v=…, youtu.be/…, shorts/… */
  videoUrl?: string;
};

export const authors: Author[] = [
  {
  username: 'farrukh',
  name: 'Фаррух Раҳимов',
  initials: 'ФР',
  role: 'Фулстек-разработчик',
  city: 'Душанбе',
  about:
    'Делаю Telegram-ботов и веб-сервисы для малого бизнеса. Открыт к заказам и интересным командам.',
  kind: 'person',
  links: [
    { label: 'GitHub', href: '#github' },
    { label: 'Telegram', href: '#telegram' },
    { label: 'Сайт', href: '#site' },
  ],
  stats: { projects: 3, votes: 463, topDays: 1 },
  },
  {
    username: 'madina',
    name: 'Мадина Каримова',
    initials: 'МК',
    role: 'Дизайнер интерфейсов',
    city: 'Худжанд',
    about: 'Проектирую интерфейсы ботов и мобильных приложений. Люблю простые формы.',
    kind: 'person',
    links: [
      { label: 'Behance', href: '#behance' },
      { label: 'Telegram', href: '#telegram' },
    ],
    stats: { projects: 2, votes: 560, topDays: 2 },
  },
  {
    username: 'alisher',
    name: 'Алишер Назаров',
    initials: 'АН',
    role: 'Бэкенд-разработчик',
    city: 'Душанбе',
    about: 'Пишу серверную часть и интеграции с платёжными системами.',
    kind: 'person',
    links: [{ label: 'GitHub', href: '#github' }],
    stats: { projects: 2, votes: 283, topDays: 0 },
  },
];

/** Вошедший пользователь в заглушках — шапка раздела участника */
export const author: Author = authors[0];

export const projects: Project[] = [
  {
    slug: 'tarjuma-bot',
    name: 'Tarjuma Bot',
    initial: 'Т',
    tagline: 'Перевод таджикский ↔ русский прямо в Telegram',
    about: [
      'Бот переводит текст и голосовые сообщения между таджикским и русским. Добавьте его в чат или пишите напрямую. Понимает разговорную речь и латиницу, работает бесплатно.',
      'Голосовое сообщение бот сначала превращает в текст, а потом переводит, так что ответ приходит в обоих видах. В групповом чате он переводит только сообщения, на которые ответили командой /t, и не мешает разговору.',
      'Сейчас бот знает около 40 тысяч слов и выражений. Словарь пополняется по исправлениям пользователей: если перевод неточный, нажмите «Исправить» под ответом.',
    ].join('\n\n'),
    categorySlugs: ['bots', 'ai'],
    tags: ['Telegram', 'ИИ'],
    votes: 312,
    link: 'https://t.me/tarjuma_bot',
    linkLabel: 't.me/tarjuma_bot',
    platform: 'Telegram',
    pricing: 'free',
    price: 'бесплатно',
    publishedAt: '24 ноября',
    authorUsername: 'farrukh',
    makers: ['farrukh', 'madina'],
    screenshots: [
      { caption: 'Перевод сообщения в личном чате' },
      { caption: 'Голосовое сообщение превращается в текст' },
      { caption: 'Бот в групповом чате' },
    ],
    // Заглушка: настоящего видео нет
    videoUrl: 'https://youtu.be/XXXXXXXXXXX',
  },
  {
    slug: 'dastras',
    name: 'Дастрас',
    initial: 'Д',
    tagline: 'Заказ доставки из магазинов района через бота',
    about:
      'Бот собирает заказы из соседних магазинов и передаёт их курьеру. Оплата при получении, доставка в пределах района.',
    categorySlugs: ['bots', 'services'],
    tags: ['Telegram', 'Для бизнеса'],
    votes: 248,
    link: 'https://t.me/dastras_bot',
    linkLabel: 't.me/dastras_bot',
    platform: 'Telegram',
    pricing: 'free',
    price: 'бесплатно',
    publishedAt: '22 ноября',
    authorUsername: 'farrukh',
    makers: ['farrukh', 'alisher'],
    screenshots: [
      { caption: 'Каталог магазинов района' },
      { caption: 'Корзина и оформление заказа' },
    ],
  },
  {
    slug: 'navbat',
    name: 'Навбат',
    initial: 'Н',
    tagline: 'Онлайн-очередь для салонов и клиник',
    about:
      'Клиент записывается через WhatsApp и видит своё место в очереди. Салон получает расписание на день без звонков.',
    categorySlugs: ['bots', 'automation'],
    tags: ['WhatsApp', 'Для бизнеса'],
    votes: 187,
    link: 'https://navbat.tj',
    linkLabel: 'navbat.tj',
    platform: 'WhatsApp',
    pricing: 'paid',
    price: 'от 150 сомони в месяц',
    publishedAt: '20 ноября',
    authorUsername: 'farrukh',
    makers: ['farrukh', 'madina', 'alisher'],
    screenshots: [
      { caption: 'Запись через WhatsApp' },
      { caption: 'Расписание салона на день' },
      { caption: 'Статистика визитов' },
    ],
    // Заглушка: настоящего видео нет
    videoUrl: 'https://www.youtube.com/watch?v=XXXXXXXXXXX',
  },
  {
    slug: 'dars-bot',
    name: 'Dars Bot',
    initial: 'Д',
    tagline: 'Тесты и карточки для подготовки к экзаменам',
    about:
      'Готовит к школьным и вступительным экзаменам: тесты, карточки, разбор ошибок. Есть таджикский и русский.',
    categorySlugs: ['bots', 'education'],
    tags: ['Telegram', 'Обучение'],
    votes: 143,
    link: 'https://t.me/dars_bot',
    linkLabel: 't.me/dars_bot',
    platform: 'Telegram',
    pricing: 'freemium',
    price: 'бесплатно',
    publishedAt: '18 ноября',
    authorUsername: 'farrukh',
    makers: ['farrukh'],
    screenshots: [
      { caption: 'Тест по математике' },
      { caption: 'Разбор ошибок' },
    ],
  },
  {
    slug: 'hisob-bot',
    name: 'Хисоб Bot',
    initial: 'Х',
    tagline: 'Учёт расходов голосовыми сообщениями',
    about:
      'Наговорил расход — бот сам разобрал сумму и категорию. В конце месяца присылает отчёт.',
    categorySlugs: ['bots', 'ai'],
    tags: ['Telegram', 'ИИ'],
    votes: 98,
    link: 'https://t.me/hisob_bot',
    linkLabel: 't.me/hisob_bot',
    platform: 'Telegram',
    pricing: 'free',
    price: 'бесплатно',
    publishedAt: '15 ноября',
    authorUsername: 'farrukh',
    makers: ['farrukh'],
    screenshots: [
      { caption: 'Голосовой расход' },
      { caption: 'Отчёт за месяц' },
    ],
  },
  {
    slug: 'guildkeeper',
    name: 'GuildKeeper',
    initial: 'G',
    tagline: 'Модерация и роли для игровых Discord-серверов',
    about:
      'Автоматическая выдача ролей, фильтр спама и журнал наказаний для серверов с большим количеством участников.',
    categorySlugs: ['bots', 'games'],
    tags: ['Discord', 'Игры'],
    votes: 64,
    link: 'https://guildkeeper.app',
    linkLabel: 'guildkeeper.app',
    platform: 'Discord',
    pricing: 'free',
    price: 'бесплатно',
    publishedAt: '12 ноября',
    authorUsername: 'farrukh',
    makers: ['farrukh'],
    screenshots: [
      { caption: 'Журнал наказаний' },
      { caption: 'Настройка ролей' },
    ],
  },
  {
    slug: 'hisobchi',
    name: 'Хисобчи',
    initial: 'Х',
    tagline: 'Простой учёт продаж для малого бизнеса',
    about:
      'Касса, склад и отчёты в одном окне. Работает с телефона, не требует установки.',
    categorySlugs: ['web', 'automation'],
    tags: ['Веб', 'SaaS'],
    votes: 96,
    link: 'https://hisobchi.tj',
    linkLabel: 'hisobchi.tj',
    platform: 'Веб',
    pricing: 'paid',
    price: 'от 200 сомони в месяц',
    publishedAt: '10 ноября',
    authorUsername: 'farrukh',
    makers: ['farrukh', 'alisher'],
    screenshots: [
      { caption: 'Касса' },
      { caption: 'Склад' },
      { caption: 'Отчёт по продажам' },
    ],
  },
  {
    slug: 'oshxona',
    name: 'Ошхона',
    initial: 'О',
    tagline: 'QR-меню и заказы для кафе',
    about:
      'Гость сканирует QR-код на столе, смотрит меню и делает заказ. Кухня видит заказы сразу.',
    categorySlugs: ['web', 'mobile'],
    tags: ['Веб', 'Мобильные'],
    votes: 74,
    link: 'https://oshxona.tj',
    linkLabel: 'oshxona.tj',
    platform: 'Веб',
    pricing: 'freemium',
    price: 'от 100 сомони в месяц',
    publishedAt: '8 ноября',
    authorUsername: 'farrukh',
    makers: ['farrukh', 'madina'],
    screenshots: [
      { caption: 'QR-код на столе' },
      { caption: 'Меню на телефоне гостя' },
      { caption: 'Экран кухни' },
    ],
  },
  {
    slug: 'dastur-ui',
    name: 'Dastur UI',
    initial: 'D',
    tagline: 'Набор React-компонентов с поддержкой таджикского',
    about:
      'Компоненты с правильной типографикой для таджикского и русского: формы, таблицы, даты.',
    categorySlugs: ['dev', 'design'],
    tags: ['Опенсорс', 'React'],
    votes: 51,
    link: 'https://github.com/dastur-ui',
    linkLabel: 'github.com/dastur-ui',
    platform: 'Опенсорс',
    pricing: 'free',
    price: 'бесплатно',
    publishedAt: '5 ноября',
    authorUsername: 'farrukh',
    makers: ['farrukh'],
    screenshots: [
      { caption: 'Формы' },
      { caption: 'Таблицы и даты' },
    ],
  },
];

const tarjumaComments: Comment[] = [
  {
    id: 'c1',
    name: 'Мадина',
    username: 'madina',
    when: '2 часа назад',
    text: 'Пользуюсь каждый день для переписки с клиентами. Голосовые распознаёт хорошо.',
  },
  {
    id: 'c2',
    name: 'Алишер',
    username: 'alisher',
    when: '5 часов назад',
    text: 'Круто! Планируете поддержку узбекского?',
  },
  {
    id: 'c3',
    name: 'Сухроб',
    username: 'suhrob',
    when: 'вчера',
    text: 'Добавьте, пожалуйста, перевод картинок с текстом.',
  },
];

/**
 * Комментарии проекта. Есть только у Tarjuma Bot — у остальных
 * страница показывает пустое состояние «Комментариев пока нет».
 */
export function commentsFor(slug: string): Comment[] {
  return slug === 'tarjuma-bot' ? tarjumaComments : [];
}

/** Найти автора по нику. */
export function findAuthor(username: string): Author | undefined {
  return authors.find((a) => a.username === username);
}

/** Найти проект по слагу. */
export function findProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Проекты категории, по убыванию голосов. */
export function projectsByCategory(categorySlug: string): Project[] {
  return projects
    .filter((p) => p.categorySlugs.includes(categorySlug))
    .sort((a, b) => b.votes - a.votes);
}

/** Топ проектов по голосам. */
export function topProjects(limit: number): Project[] {
  return [...projects].sort((a, b) => b.votes - a.votes).slice(0, limit);
}

/**
 * Место проекта в рейтинге дня: 1, 2, 3…
 *
 * В заглушках «сегодня» нет, поэтому считаем по всем проектам.
 * С бэкендом это будет запрос: проекты, опубликованные сегодня
 * (по времени Душанбе, UTC+5), отсортированные по голосам за сегодня.
 */
export function dailyRank(slug: string): number | undefined {
  const index = [...projects].sort((a, b) => b.votes - a.votes).findIndex((p) => p.slug === slug);
  return index === -1 ? undefined : index + 1;
}

/**
 * Похожие проекты: больше общих категорий и тегов — выше,
 * при равенстве — у кого больше голосов. Совсем непохожие не показываем.
 */
export function similarProjects(project: Project, limit: number): Project[] {
  return projects
    .filter((p) => p.slug !== project.slug)
    .map((p) => {
      const sharedCategories = p.categorySlugs.filter((c) => project.categorySlugs.includes(c));
      const sharedTags = p.tags.filter((t) => project.tags.includes(t));
      // Общая категория весит больше общего тега
      return { project: p, score: sharedCategories.length * 2 + sharedTags.length };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || b.project.votes - a.project.votes)
    .slice(0, limit)
    .map((item) => item.project);
}

/* ============================================================
   Кабинет автора: статусы проектов
   ============================================================ */

/**
 * Жизненный цикл проекта:
 * черновик → на модерации → опубликован или отклонён.
 * Отклонённый автор исправляет и отправляет заново.
 */
export type ProjectStatus = 'draft' | 'pending' | 'published' | 'rejected';

export type MyProject = {
  slug: string;
  name: string;
  tagline: string;
  status: ProjectStatus;
  /** Когда статус поменялся последний раз */
  updatedAt: string;
  /** Причина отказа — только у отклонённых */
  rejectReason?: string;
  votes?: number;
};

/** Проекты вошедшего пользователя во всех статусах */
export const myProjects: MyProject[] = [
  {
    slug: 'tarjuma-bot',
    name: 'Tarjuma Bot',
    tagline: 'Перевод таджикский ↔ русский прямо в Telegram',
    status: 'published',
    updatedAt: '24 ноября',
    votes: 312,
  },
  {
    slug: 'hisob-pro',
    name: 'Хисоб Pro',
    tagline: 'Учёт расходов для семьи с общим бюджетом',
    status: 'pending',
    updatedAt: 'сегодня, 14:20',
  },
  {
    slug: 'kitob',
    name: 'Китоб',
    tagline: 'Каталог книг городских библиотек',
    status: 'draft',
    updatedAt: '21 ноября',
  },
  {
    slug: 'mega-sale',
    name: 'Mega Sale',
    tagline: 'Скидки магазинов Душанбе',
    status: 'rejected',
    updatedAt: '19 ноября',
    rejectReason:
      'Ссылка ведёт на страницу Instagram, а не на сам проект. Добавьте ссылку на сайт или бота и отправьте заново.',
  },
];

/* ============================================================
   Уведомления (колокольчик в шапке)
   ============================================================ */

export type Notice = {
  id: string;
  /** Кто сделал действие; для системных уведомлений — «ProductCase» */
  actor: string;
  text: string;
  when: string;
  href: string;
  unread: boolean;
};

export const notices: Notice[] = [
  {
    id: 'n1',
    actor: 'Мадина Каримова',
    text: 'прокомментировала Tarjuma Bot',
    when: '10 минут назад',
    href: '/projects/tarjuma-bot',
    unread: true,
  },
  {
    id: 'n2',
    actor: 'ProductCase',
    text: 'Tarjuma Bot на 1-м месте в топе дня',
    when: '2 часа назад',
    href: '/projects/tarjuma-bot',
    unread: true,
  },
  {
    id: 'n3',
    actor: 'ProductCase',
    text: 'Проект Mega Sale отклонён. Посмотрите причину',
    when: '19 ноября',
    href: '/me/projects',
    unread: false,
  },
];

/* ============================================================
   Модерация
   ============================================================ */

export type ModerationItem = {
  id: string;
  name: string;
  tagline: string;
  author: string;
  link: string;
  categories: string[];
  submittedAt: string;
};

export const moderationQueue: ModerationItem[] = [
  {
    id: 'm1',
    name: 'Хисоб Pro',
    tagline: 'Учёт расходов для семьи с общим бюджетом',
    author: 'Фаррух Раҳимов',
    link: 'https://hisob.pro',
    categories: ['Веб', 'Автоматизация'],
    submittedAt: 'сегодня, 14:20',
  },
  {
    id: 'm2',
    name: 'Rohnamo',
    tagline: 'Офлайн-карты Памира для туристов',
    author: 'Алишер Назаров',
    link: 'https://rohnamo.app',
    categories: ['Мобильные приложения'],
    submittedAt: 'сегодня, 11:05',
  },
  {
    id: 'm3',
    name: 'Крипто-сигналы 24/7',
    tagline: 'Заработай на крипте без вложений',
    author: 'user_8812',
    link: 'https://t.me/signals_x',
    categories: ['Боты'],
    submittedAt: 'вчера, 23:40',
  },
];

/** Готовые причины отказа: модератору быстрее, автору понятнее */
export const rejectReasons = [
  'Не IT-проект',
  'Ссылка не работает или ведёт не на проект',
  'Реклама, спам или обещание заработка',
  'Политический контент',
  'Вакансия, поиск инвестора или команды',
  'Чужой проект',
  'Другое',
] as const;

export type Report = {
  id: string;
  kind: 'comment' | 'project';
  /** Текст комментария или название проекта, на которые пожаловались */
  target: string;
  /** Где это находится */
  where: string;
  href: string;
  reason: string;
  reporter: string;
  when: string;
};

export const reports: Report[] = [
  {
    id: 'r1',
    kind: 'comment',
    target: 'Пишите в личку, продаю голоса для топа, недорого',
    where: 'Комментарий к Tarjuma Bot',
    href: '/projects/tarjuma-bot',
    reason: 'Спам',
    reporter: 'Мадина Каримова',
    when: '30 минут назад',
  },
  {
    id: 'r2',
    kind: 'project',
    target: 'GuildKeeper',
    where: 'Проект',
    href: '/projects/guildkeeper',
    reason: 'Чужой проект: это копия известного бота',
    reporter: 'Сухроб',
    when: 'вчера',
  },
];

/**
 * Поиск по проектам: название, слоган, теги.
 * С бэкендом это будет полнотекстовый поиск в базе.
 */
export function searchProjects(query: string): Project[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return projects
    .filter((p) =>
      [p.name, p.tagline, ...p.tags].some((field) => field.toLowerCase().includes(q)),
    )
    .sort((a, b) => b.votes - a.votes);
}
