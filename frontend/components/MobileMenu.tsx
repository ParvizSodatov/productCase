'use client';

/**
 * Бургер-меню на узких экранах.
 *
 * Содержимое (ссылки, категории, кнопки входа) рендерит сервер и передаёт
 * через children — клиентский код отвечает только за «открыть/закрыть».
 * Меню закрывается по Escape, по клику мимо и после перехода по любой
 * ссылке внутри.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useDismiss } from '@/lib/useDismiss';
import styles from './MobileMenu.module.css';

export default function MobileMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);
  useDismiss(wrapRef, open, close, triggerRef);

  // Пока меню открыто, страница под ним не прокручивается
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
      </button>

      {/* hidden, а не условный рендер: ссылки меню остаются в HTML,
          и поисковик видит навигацию даже на мобильной версии */}
      <div
        id="mobile-menu"
        className={styles.panel}
        hidden={!open}
        // Клик по ссылке внутри — переход, меню больше не нужно.
        // Кнопку входа не трогаем: она открывает своё окно поверх.
        onClick={(event) => {
          const link = (event.target as HTMLElement).closest('a');
          if (link && link.getAttribute('href') !== '/login') close();
        }}
      >
        {children}
      </div>
    </div>
  );
}
