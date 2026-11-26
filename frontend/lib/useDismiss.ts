'use client';

import { useEffect, type RefObject } from 'react';

/**
 * Закрыть выпадающее окно по клику вне него и по Escape.
 *
 * Одна логика на все выпадашки: меню категорий, уведомления,
 * меню профиля, мобильное меню. После Escape фокус возвращается
 * на кнопку, которая открыла окно, — иначе человек с клавиатуры
 * «теряется» на странице.
 */
export function useDismiss(
  ref: RefObject<HTMLElement | null>,
  open: boolean,
  close: () => void,
  triggerRef?: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!ref.current?.contains(event.target as Node)) close();
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        close();
        triggerRef?.current?.focus();
      }
    }

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [ref, open, close, triggerRef]);
}
