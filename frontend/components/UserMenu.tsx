'use client';

/**
 * Меню под аватаром вошедшего пользователя.
 *
 * Пункт «Модерация» здесь показан всем — это вёрстка. С бэкендом
 * он появляется только у модераторов, НО скрытая ссылка — не защита:
 * сервер обязан проверять роль на каждом запросе к /admin, иначе
 * любой откроет адрес вручную.
 */

import { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import { LayoutList, LogOut, Settings, ShieldCheck, User } from 'lucide-react';
import Avatar from './Avatar';
import { useDismiss } from '@/lib/useDismiss';
import styles from './UserMenu.module.css';

type UserMenuProps = {
  name: string;
  username: string;
};

export default function UserMenu({ name, username }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);
  useDismiss(wrapRef, open, close, triggerRef);

  const items = [
    { href: `/profile/${username}`, label: 'Мой профиль', Icon: User },
    { href: '/me/projects', label: 'Мои проекты', Icon: LayoutList },
    { href: '/settings', label: 'Настройки', Icon: Settings },
    { href: '/admin/moderation', label: 'Модерация', Icon: ShieldCheck },
  ];

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`Меню профиля: ${name}`}
        onClick={() => setOpen((v) => !v)}
      >
        <Avatar name={name} size={40} />
      </button>

      {open && (
        <div className={styles.panel}>
          <div className={styles.who}>
            <span className={styles.name}>{name}</span>
            <span className={styles.username}>@{username}</span>
          </div>
          <ul className={styles.list}>
            {items.map(({ href, label, Icon }) => (
              <li key={href}>
                <Link href={href} className={styles.item} onClick={close}>
                  <Icon size={18} aria-hidden="true" />
                  {label}
                </Link>
              </li>
            ))}
            <li className={styles.separator}>
              {/* Выход появится вместе с авторизацией: запрос на сервер,
                  который удалит сессию и cookie */}
              <Link href="/" className={styles.item} onClick={close}>
                <LogOut size={18} aria-hidden="true" />
                Выйти
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
