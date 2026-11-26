'use client';

/**
 * Колокольчик с выпадающим списком уведомлений.
 *
 * Сейчас список приходит из заглушек и «прочитано» живёт только
 * в браузере. С бэкендом: список подгружается при открытии,
 * «Прочитать все» уходит запросом на сервер, а новые уведомления
 * можно подтягивать раз в минуту или по WebSocket.
 */

import { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import { Bell } from 'lucide-react';
import Avatar from './Avatar';
import EmptyState from './EmptyState';
import type { Notice } from '@/lib/mock';
import { useDismiss } from '@/lib/useDismiss';
import styles from './NotificationsMenu.module.css';

export default function NotificationsMenu({ initial }: { initial: Notice[] }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(initial);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);
  useDismiss(wrapRef, open, close, triggerRef);

  const unread = items.filter((item) => item.unread).length;

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-haspopup="true"
        // Число новых — часть подписи: иначе скринридер скажет просто «Уведомления»
        aria-label={unread > 0 ? `Уведомления, новых: ${unread}` : 'Уведомления'}
        onClick={() => setOpen((v) => !v)}
      >
        <Bell size={20} aria-hidden="true" />
        {unread > 0 && (
          <span className={styles.count} aria-hidden="true">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className={styles.panel}>
          <div className={styles.head}>
            <h2 className={styles.title}>Уведомления</h2>
            {unread > 0 && (
              <button
                type="button"
                className={styles.readAll}
                onClick={() => setItems((list) => list.map((item) => ({ ...item, unread: false })))}
              >
                Прочитать все
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <EmptyState
              illustration="inbox"
              title="Пока тихо"
              text="Здесь появятся комментарии и голоса за ваши проекты."
              size="compact"
              headingLevel={3}
            />
          ) : (
            <ul className={styles.list}>
              {items.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={`${styles.item} ${item.unread ? styles.unread : ''}`}
                    onClick={close}
                  >
                    <Avatar name={item.actor} size={36} />
                    <span className={styles.itemText}>
                      <span>
                        <strong>{item.actor}</strong> {item.text}
                      </span>
                      <span className={styles.when}>{item.when}</span>
                    </span>
                    {item.unread && (
                      <>
                        <span className={styles.dot} aria-hidden="true" />
                        <span className="visuallyHidden">(новое)</span>
                      </>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
