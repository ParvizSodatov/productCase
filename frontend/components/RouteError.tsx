'use client';

/**
 * Экран «Не удалось загрузить» для файлов error.tsx.
 *
 * Next показывает его, если страница упала при загрузке данных.
 * Посетителю — понятный текст и кнопка «Попробовать снова»
 * (retry() в Next 16 заново загружает данные и перерисовывает страницу).
 *
 * ПРО БЕЗОПАСНОСТЬ: текст самой ошибки (error.message) посетителю
 * не показываем — в нём могут быть детали запроса к базе, пути файлов,
 * куски чужих данных. В продакшене Next и так его прячет, а для поиска
 * причины есть error.digest — по нему ошибку находят в логах сервера.
 */

import { useEffect } from 'react';
import Link from 'next/link';
import EmptyState from './EmptyState';
import styles from './RouteError.module.css';

type RouteErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function RouteError({ error, retry }: RouteErrorProps) {
  useEffect(() => {
    // Здесь позже будет отправка в сервис мониторинга ошибок
    console.error(error);
  }, [error]);

  return (
    <main id="main" className={styles.main}>
      <div role="alert">
        <EmptyState
          illustration="error"
          title="Не удалось загрузить страницу"
          text="Похоже, проблема со связью или на нашей стороне. Попробуйте ещё раз через пару секунд."
        >
          <button type="button" className="btn btnDark" onClick={() => retry()}>
            Попробовать снова
          </button>
          <Link href="/" className="btn btnSecondary">
            На главную
          </Link>
        </EmptyState>
        {error.digest && <p className={styles.digest}>Код ошибки для поддержки: {error.digest}</p>}
      </div>
    </main>
  );
}
