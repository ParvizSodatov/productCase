import Link from 'next/link';
import styles from './Logo.module.css';

/**
 * Логотип ProductCase.
 * Пока это заглушка «PC» в тёмном квадрате — настоящий логотип заменит её позже.
 */
export default function Logo() {
  return (
    <Link href="/" className={styles.logo}>
      <span className={styles.mark} aria-hidden="true">
        PC
      </span>
      ProductCase
    </Link>
  );
}
