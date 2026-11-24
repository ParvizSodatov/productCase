import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.brand}>ProductCase</span>

        <div className={styles.links}>
          <Link href="/rules">Правила площадки</Link>
          <Link href="/about">О проекте</Link>
          <a href="https://t.me" target="_blank" rel="noopener noreferrer">
            Telegram
          </a>
        </div>

        <span>Только IT-проекты. Без политики.</span>
      </div>
    </footer>
  );
}
