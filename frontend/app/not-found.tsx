import Link from 'next/link';
import Logo from '@/components/Logo';
import styles from './not-found.module.css';

/**
 * Страница 404. Next показывает её, когда адрес не найден
 * или когда страница вызвала notFound().
 */
export default function NotFound() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Logo />
      </header>

      <main className={styles.main}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Такой страницы нет</h1>
        <p className={styles.lead}>
          Возможно, проект удалили или в адресе опечатка.
        </p>

        <div className={styles.actions}>
          <Link href="/" className={styles.primary}>
            На главную
          </Link>
          <Link href="/#categories" className={styles.secondary}>
            Смотреть категории
          </Link>
        </div>
      </main>
    </div>
  );
}
