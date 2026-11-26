import Link from 'next/link';
import { Search } from 'lucide-react';
import Logo from './Logo';
import CategoryMenu from './CategoryMenu';
import LoginDialog from './LoginDialog';
import MobileMenu from './MobileMenu';
import NotificationsMenu from './NotificationsMenu';
import SignInOptions from './SignInOptions';
import UserMenu from './UserMenu';
import { categories } from '@/lib/categories';
import { notices } from '@/lib/mock';
import styles from './Header.module.css';

type HeaderProps = {
  /**
   * Вошедший пользователь. Пока передаётся вручную из layout —
   * когда появится авторизация, значение будет приходить из сессии.
   */
  user?: { name: string; username: string };
};

/**
 * Шапка сайта.
 *
 * Серверный компонент. В браузер уходят только интерактивные куски:
 * меню категорий, окно входа, уведомления, меню профиля и бургер.
 *
 * Шире 900px — полное меню. Уже — логотип, поиск, колокольчик и бургер,
 * а ссылки, категории и вход переезжают в выпадающую панель.
 */
export default function Header({ user }: HeaderProps) {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Главное меню">
        <Logo />

        <div className={styles.links}>
          <Link href="/#feed">Проекты</Link>
          <CategoryMenu />
          <Link href="/#how">Как это работает</Link>
        </div>

        <div className={styles.right}>
          <Link href="/search" className={styles.iconBtn} aria-label="Поиск проектов">
            <Search size={20} aria-hidden="true" />
          </Link>

          {user ? (
            <>
              <NotificationsMenu initial={notices} />
              <div className={styles.desktopOnly}>
                <UserMenu name={user.name} username={user.username} />
              </div>
            </>
          ) : (
            <div className={`${styles.actions} ${styles.desktopOnly}`}>
              <LoginDialog className={styles.signin}>
                <SignInOptions />
              </LoginDialog>
              <Link href="/submit" className={styles.cta}>
                Опубликовать проект
              </Link>
            </div>
          )}

          <MobileMenu>
            <ul className={styles.mobileList}>
              <li>
                <Link href="/#feed">Проекты</Link>
              </li>
              <li>
                <Link href="/#how">Как это работает</Link>
              </li>
              <li>
                <Link href="/search">Поиск</Link>
              </li>
            </ul>

            <h2 className={styles.mobileHeading}>Категории</h2>
            <ul className={styles.mobileCategories}>
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link href={`/category/${category.slug}`}>{category.name}</Link>
                </li>
              ))}
            </ul>

            {user ? (
              <>
                <h2 className={styles.mobileHeading}>{user.name}</h2>
                <ul className={styles.mobileList}>
                  <li>
                    <Link href={`/profile/${user.username}`}>Мой профиль</Link>
                  </li>
                  <li>
                    <Link href="/me/projects">Мои проекты</Link>
                  </li>
                  <li>
                    <Link href="/settings">Настройки</Link>
                  </li>
                  <li>
                    <Link href="/admin/moderation">Модерация</Link>
                  </li>
                </ul>
              </>
            ) : (
              <div className={styles.mobileActions}>
                <Link href="/submit" className="btn btnDark">
                  Опубликовать проект
                </Link>
                <LoginDialog className="btn btnSecondary">
                  <SignInOptions />
                </LoginDialog>
              </div>
            )}
          </MobileMenu>
        </div>
      </nav>
    </header>
  );
}
