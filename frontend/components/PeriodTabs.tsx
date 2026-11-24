'use client';

/**
 * Переключатель периода: День · Неделя · Всё время.
 *
 * Пока только переключает подсветку — список не меняется.
 * Когда будут настоящие данные, выбранный период станет частью адреса
 * (например /category/bots?period=week), чтобы ссылку можно было
 * отправить другому человеку и чтобы страница индексировалась.
 */

import { useState } from 'react';
import styles from './PeriodTabs.module.css';

const periods = [
  { id: 'day', label: 'День' },
  { id: 'week', label: 'Неделя' },
  { id: 'all', label: 'Всё время' },
] as const;

type PeriodId = (typeof periods)[number]['id'];

export default function PeriodTabs({ initial = 'day' }: { initial?: PeriodId }) {
  const [active, setActive] = useState<PeriodId>(initial);

  return (
    <div className={styles.tabs} role="group" aria-label="Период">
      {periods.map((period) => (
        <button
          key={period.id}
          type="button"
          aria-pressed={active === period.id}
          className={`${styles.tab} ${active === period.id ? styles.tabActive : ''}`}
          onClick={() => setActive(period.id)}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
}
