'use client';

/**
 * Выпадающее меню категорий в шапке.
 *
 * Это клиентский компонент — ему нужны состояние открытия и обработчики
 * событий. Остальная шапка остаётся серверной, поэтому в браузер уходит
 * только этот небольшой кусок JS.
 */

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { categories } from '@/lib/categories';
import styles from './CategoryMenu.module.css';

export default function CategoryMenu() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  // На страницах категорий пункт подсвечен акцентом, как в макете.
  // На остальных страницах он выглядит как обычная ссылка меню.
  const pathname = usePathname();
  const isCurrent = pathname.startsWith('/category');

  // Закрываем меню по клику вне него и по клавише Escape
  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <button
        type="button"
        className={`${styles.trigger} ${isCurrent ? styles.current : ''}`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        Категории
        <ChevronDown size={14} aria-hidden="true" />
      </button>

      {open && (
        <div className={styles.panel}>
          <div className={styles.grid}>
            {categories.map((category) => (
              <div key={category.slug}>
                <Link
                  href={`/category/${category.slug}`}
                  className={styles.name}
                  onClick={() => setOpen(false)}
                >
                  {category.name}
                </Link>
                <div className={styles.subs}>{category.subs.join(' · ')}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
