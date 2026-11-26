'use client';

/**
 * Тосты — всплывающие уведомления внизу экрана.
 *
 *   const toast = useToast();
 *   toast('Ссылка скопирована');
 *   toast('Не удалось сохранить', 'error');
 *
 * Провайдер стоит в корневом layout. Страницы внутри него остаются
 * серверными: клиентский компонент может принимать серверные как children.
 *
 * Доступность: контейнер с role="status" есть в разметке всегда, даже
 * пустой. Скринридер следит за ним и читает каждый новый тост, не уводя
 * фокус с того, что человек делал. Если вставлять контейнер вместе
 * с тостом, первое сообщение многие скринридеры пропускают.
 */

import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { CircleExclamationPoint, CircleCheck, Info, X } from 'lucide-react';
import styles from './Toaster.module.css';

type Tone = 'success' | 'info' | 'error';
type Toast = { id: number; text: string; tone: Tone };
type ShowToast = (text: string, tone?: Tone) => void;

const ToastContext = createContext<ShowToast>(() => {});

/** Показать тост из любого клиентского компонента */
export function useToast(): ShowToast {
  return useContext(ToastContext);
}

/** Сколько тост висит на экране. Ошибку держим дольше — её важнее прочитать */
const DURATION: Record<Tone, number> = { success: 4000, info: 4000, error: 7000 };

const ICONS = { success: CircleCheck, info: Info, error: CircleExclamationPoint };

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(1);

  const dismiss = useCallback((id: number) => {
    setToasts((list) => list.filter((toast) => toast.id !== id));
  }, []);

  const show = useCallback<ShowToast>(
    (text, tone = 'success') => {
      const id = nextId.current++;
      // Больше трёх сразу не показываем — самые старые уходят
      setToasts((list) => [...list.slice(-2), { id, text, tone }]);
      setTimeout(() => dismiss(id), DURATION[tone]);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={show}>
      {children}

      <div className={styles.region} role="status" aria-live="polite">
        {toasts.map((toast) => {
          const Icon = ICONS[toast.tone];
          return (
            <div key={toast.id} className={`${styles.toast} ${styles[toast.tone]}`}>
              <Icon size={18} className={styles.icon} aria-hidden="true" />
              <span className={styles.text}>{toast.text}</span>
              <button
                type="button"
                className={styles.close}
                onClick={() => dismiss(toast.id)}
                aria-label="Закрыть уведомление"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
