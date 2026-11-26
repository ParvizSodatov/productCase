import Link from 'next/link';
import { Mail, Send } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { contacts } from '@/lib/site';
import styles from './Footer.module.css';

/** Подвал. Серверный, в браузер уходит только переключатель языка. */
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <span className={styles.brand}>ProductCase</span>
          <p className={styles.tagline}>
            Витрина IT-проектов Таджикистана. Только проекты — без политики, вакансий и
            рекламы.
          </p>
          <LanguageSwitcher />
        </div>

        <nav className={styles.col} aria-label="Площадка">
          <h2 className={styles.colTitle}>Площадка</h2>
          <Link href="/#feed">Топ сегодня</Link>
          <Link href="/#categories">Категории</Link>
          <Link href="/search">Поиск</Link>
          <Link href="/submit">Опубликовать проект</Link>
        </nav>

        <nav className={styles.col} aria-label="О нас">
          <h2 className={styles.colTitle}>О нас</h2>
          <Link href="/about">О проекте</Link>
          <Link href="/rules">Правила площадки</Link>
          <Link href="/about#contacts">Контакты</Link>
        </nav>

        <div className={styles.col}>
          <h2 className={styles.colTitle}>На связи</h2>
          <a href={contacts.telegramChannel} target="_blank" rel="noopener noreferrer">
            <Send size={16} aria-hidden="true" />
            Telegram-канал
          </a>
          <a href={`mailto:${contacts.email}`}>
            <Mail size={16} aria-hidden="true" />
            {contacts.email}
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© ProductCase</span>
        <span>Сделано в Таджикистане</span>
      </div>
    </footer>
  );
}
