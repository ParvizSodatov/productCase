import type { Metadata } from 'next';
import Logo from '@/components/Logo';
import SignInOptions from '@/components/SignInOptions';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Вход',
  description:
    'Вход в ProductCase через GitHub или Google. Пароль не нужен — публикуй проекты, голосуй и комментируй.',
  robots: { index: false, follow: true },
};

/**
 * Страница входа. Открывается напрямую по адресу /login и как запасной
 * вариант без JavaScript. Обычно же «Войти» в шапке открывает модальное
 * окно с теми же кнопками (LoginDialog), не уводя со страницы.
 */
export default function LoginPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Logo />
      </header>

      <main id="main" className={styles.main}>
        <div className={styles.card}>
          <h1 className={styles.title}>Вход в ProductCase</h1>
          <p className={styles.lead}>
            Публикуй проекты, голосуй и комментируй. Пароль не нужен.
          </p>

          <SignInOptions />
        </div>
      </main>
    </div>
  );
}
