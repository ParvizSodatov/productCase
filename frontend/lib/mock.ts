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
  initial: string;
  name: string;
  when: string;
  text: string;
};

export type Project = {
  slug: string;
  name: string;
  /** Первая буква названия — заглушка вместо логотипа */
  initial: string;
  tagline: string;
  about: string;
  /** Слаги категорий, до 3 */
  categorySlugs: string[];
  /** Подписи-теги в списке */
  tags: string[];
  votes: number;
  link: string;
  linkLabel: string;
  platform: string;
  price: string;
  publishedAt: string;
  authorUsername: string;
};

export const author: Author = {
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
};

export const projects: Project[] = [
  {
    slug: 'tarjuma-bot',
    name: 'Tarjuma Bot',
    initial: 'Т',
    tagline: 'Перевод таджикский ↔ русский прямо в Telegram',
    about:
      'Бот переводит текст и голосовые сообщения между таджикским и русским. Добавьте его в чат или пишите напрямую. Понимает разговорную речь и латиницу, работает бесплатно.',
    categorySlugs: ['bots', 'ai'],
    tags: ['Telegram', 'ИИ'],
    votes: 312,
    link: 'https://t.me/tarjuma_bot',
    linkLabel: 't.me/tarjuma_bot',
    platform: 'Telegram',
    price: 'бесплатно',
    publishedAt: '24 ноября',
    authorUsername: 'farrukh',
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
    price: 'бесплатно',
    publishedAt: '22 ноября',
    authorUsername: 'farrukh',
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
    price: 'от 150 сомони в месяц',
    publishedAt: '20 ноября',
    authorUsername: 'farrukh',
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
    price: 'бесплатно',
    publishedAt: '18 ноября',
    authorUsername: 'farrukh',
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
    price: 'бесплатно',
    publishedAt: '15 ноября',
    authorUsername: 'farrukh',
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
    price: 'бесплатно',
    publishedAt: '12 ноября',
    authorUsername: 'farrukh',
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
    price: 'от 200 сомони в месяц',
    publishedAt: '10 ноября',
    authorUsername: 'farrukh',
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
    price: 'от 100 сомони в месяц',
    publishedAt: '8 ноября',
    authorUsername: 'farrukh',
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
    price: 'бесплатно',
    publishedAt: '5 ноября',
    authorUsername: 'farrukh',
  },
];

export const comments: Comment[] = [
  {
    id: 'c1',
    initial: 'М',
    name: 'Мадина',
    when: '2 часа назад',
    text: 'Пользуюсь каждый день для переписки с клиентами. Голосовые распознаёт хорошо.',
  },
  {
    id: 'c2',
    initial: 'А',
    name: 'Алишер',
    when: '5 часов назад',
    text: 'Круто! Планируете поддержку узбекского?',
  },
  {
    id: 'c3',
    initial: 'С',
    name: 'Сухроб',
    when: 'вчера',
    text: 'Добавьте, пожалуйста, перевод картинок с текстом.',
  },
];

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
