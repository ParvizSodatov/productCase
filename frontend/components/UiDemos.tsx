'use client';

/** Интерактивные куски витрины состояний /ui: тосты и ошибка с повтором */

import { useState } from 'react';
import EmptyState from './EmptyState';
import { ProjectListSkeleton } from './Skeleton';
import { useToast } from './Toaster';

export function ToastDemo() {
  const toast = useToast();
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      <button type="button" className="btn btnSecondary" onClick={() => toast('Проект отправлен на модерацию')}>
        «Отправлен на модерацию»
      </button>
      <button type="button" className="btn btnSecondary" onClick={() => toast('Ссылка скопирована')}>
        «Ссылка скопирована»
      </button>
      <button type="button" className="btn btnSecondary" onClick={() => toast('Комментарий удалён')}>
        «Комментарий удалён»
      </button>
      <button
        type="button"
        className="btn btnSecondary"
        onClick={() => toast('Не удалось сохранить. Проверьте интернет', 'error')}
      >
        Ошибка
      </button>
    </div>
  );
}

/**
 * Блок «Не удалось загрузить» внутри страницы — например, если упала
 * только подгрузка комментариев, а сама страница открылась.
 * «Повторить» показывает скелетон, затем снова ошибку (для демонстрации).
 */
export function LoadErrorDemo() {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div role="status" aria-busy="true">
        <span className="visuallyHidden">Загрузка…</span>
        <div aria-hidden="true">
          <ProjectListSkeleton count={2} />
        </div>
      </div>
    );
  }

  return (
    <div role="alert">
      <EmptyState
        illustration="error"
        title="Не удалось загрузить проекты"
        text="Проверьте интернет и попробуйте ещё раз."
        headingLevel={3}
      >
        <button
          type="button"
          className="btn btnDark"
          onClick={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 1500);
          }}
        >
          Повторить
        </button>
      </EmptyState>
    </div>
  );
}
