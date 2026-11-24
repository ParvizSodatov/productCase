import type { Metadata } from 'next';
import { Manrope, Inter } from 'next/font/google';
import './globals.css';

/**
 * Шрифты подключаются через next/font: Next скачивает их при сборке
 * и раздаёт со своего домена. Так быстрее, чем тянуть с Google Fonts,
 * и браузер не делает лишний запрос на чужой сервер.
 *
 * subsets обязательно включает 'cyrillic' — иначе таджикский и русский
 * текст отвалится на системный шрифт.
 *
 * weight не указан намеренно: оба шрифта переменные, и без weight
 * загружается один файл на все начертания вместо отдельного файла
 * на каждое. Для сайта это втрое меньше веса шрифтов.
 */
const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

/** Адрес сайта. Нужен, чтобы og-ссылки были абсолютными. */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

/**
 * Мета-теги по умолчанию. Каждая страница дополняет их своими —
 * это то, что видит Google и что показывается превью в Telegram.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ProductCase — IT-проекты Таджикистана',
    template: '%s · ProductCase',
  },
  description:
    'Витрина IT-проектов Таджикистана: сайты, приложения, боты, ИИ-инструменты. Публикуй свой проект, собирай голоса и попадай в топ дня.',
  keywords: [
    'IT Таджикистан',
    'проекты Таджикистана',
    'разработчики Душанбе',
    'Telegram-боты',
    'ProductCase',
  ],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'ProductCase',
    title: 'ProductCase — IT-проекты Таджикистана',
    description:
      'Сайты, приложения, боты, ИИ-инструменты и всё цифровое, что делают у нас. Публикуй проект, собирай голоса, попадай в топ дня.',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${manrope.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
