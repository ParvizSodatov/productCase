import Link from 'next/link';
import styles from './SignInOptions.module.css';

/**
 * Кнопки «Войти через GitHub / Google» и строка про правила.
 * Общие для страницы /login и для модального окна входа.
 *
 * Кнопки пока ведут на профиль — это вёрстка, настоящего входа ещё нет.
 *
 * КОГДА БУДЕМ ДЕЛАТЬ ВХОД ПО-НАСТОЯЩЕМУ:
 *
 * Не писать OAuth руками. Это тот код, где ошибка стоит дорого: нужен
 * параметр state против подделки запроса, проверка адреса возврата,
 * обмен кода на токен только на сервере.
 *
 * Токен НИКОГДА не кладём в localStorage: оттуда его забирает любой
 * скрипт на странице. Сессия должна жить в cookie с флагами httpOnly,
 * Secure и SameSite — такую cookie JavaScript прочитать не может.
 */
export default function SignInOptions() {
  return (
    <>
      <div className={styles.buttons}>
        <Link href="/profile/farrukh" className={styles.github}>
          {/* Логотипы брендов держим как SVG в коде:
              в lucide-react брендовых иконок нет */}
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2z"
            />
          </svg>
          Войти через GitHub
        </Link>

        <Link href="/profile/farrukh" className={styles.google}>
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.4a5.5 5.5 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.6-5.2 3.6-8.8z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3a7.2 7.2 0 0 1-10.7-3.8H1.3v3.1A12 12 0 0 0 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8l4-3.1z"
            />
            <path
              fill="#EA4335"
              d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1A7.2 7.2 0 0 1 12 4.8z"
            />
          </svg>
          Войти через Google
        </Link>
      </div>

      <p className={styles.terms}>
        Входя, ты принимаешь{' '}
        <Link href="/rules" className={styles.termsLink}>
          правила площадки
        </Link>{' '}
        и{' '}
        <Link href="/privacy" className={styles.termsLink}>
          политику конфиденциальности
        </Link>
        .
      </p>
    </>
  );
}
