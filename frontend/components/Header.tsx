import Link from 'next/link';
import Logo from './Logo';
import CategoryMenu from './CategoryMenu';
import styles from './Header.module.css';

type HeaderProps = {
  /**
   * Вошёл ли пользователь. Пока передаётся вручную из layout —
   * когда появится авторизация, значение будет приходить из сессии.
   */
  signedIn?: boolean;
  /** Инициалы для аватара вошедшего пользователя */
  initials?: string;
};

/**
 * Шапка сайта.
 *
 * Серверный компонент: в браузер уходит только CategoryMenu,
 * которому нужна интерактивность.
 */
export default function Header({ signedIn = false, initials = '' }: HeaderProps) {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Главное меню">
        <Logo />

        <div className={styles.links}>
          <Link href="/#feed">Проекты</Link>
          <CategoryMenu />
          <Link href="/#how">Как это работает</Link>
        </div>

        {signedIn ? (
          <Link href="/profile/farrukh" className={styles.avatar} aria-label="Мой профиль">
            {initials}
          </Link>
        ) : (
          <div className={styles.actions}>
            <Link href="/login" className={styles.signin}>
              Войти
            </Link>
            <Link href="/submit" className={styles.cta}>
              Опубликовать проект
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
