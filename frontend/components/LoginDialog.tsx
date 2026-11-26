'use client';

/**
 * Кнопка «Войти» и модальное окно входа.
 *
 * Это обычная ссылка на /login. Если JavaScript загрузился, клик
 * перехватывается и вместо перехода открывается окно — человек не теряет
 * страницу, на которой был. Без JS ссылка просто ведёт на /login.
 *
 * Окно — нативный <dialog> с showModal(). Браузер сам:
 * - не пускает фокус за пределы окна (Tab ходит только по кнопкам внутри);
 * - закрывает окно по Escape;
 * - делает остальную страницу недоступной для клика и скринридера;
 * - возвращает фокус на кнопку «Войти» после закрытия.
 * Писать всё это руками — источник ошибок доступности.
 *
 * Сами кнопки GitHub/Google приходят через children с сервера,
 * поэтому в клиентский JS их разметка не попадает.
 */

import { useId, useRef } from 'react';
import { X } from 'lucide-react';
import Logo from './Logo';
import styles from './LoginDialog.module.css';

type LoginDialogProps = {
  className?: string;
  label?: string;
  children: React.ReactNode;
};

export default function LoginDialog({ className, label = 'Войти', children }: LoginDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // Уникальный id: на странице может быть два окна (шапка и мобильное меню)
  const titleId = useId();

  return (
    <>
      <a
        href="/login"
        className={className}
        onClick={(event) => {
          // Ctrl/Cmd+клик — человек хочет открыть в новой вкладке, не мешаем
          if (event.metaKey || event.ctrlKey || event.shiftKey) return;
          event.preventDefault();
          dialogRef.current?.showModal();
        }}
      >
        {label}
      </a>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby={titleId}
        // Клик по затемнённому фону (сам dialog, а не его содержимое) закрывает окно
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current.close();
        }}
      >
        <div className={styles.body}>
          <button
            type="button"
            className={styles.close}
            onClick={() => dialogRef.current?.close()}
            aria-label="Закрыть окно входа"
          >
            <X size={20} aria-hidden="true" />
          </button>

          <div className={styles.logo}>
            <Logo />
          </div>
          <h2 id={titleId} className={styles.title}>
            Вход в ProductCase
          </h2>
          <p className={styles.lead}>Публикуй проекты, голосуй и комментируй. Пароль не нужен.</p>

          {children}
        </div>
      </dialog>
    </>
  );
}
