'use client';

/**
 * Фильтр по подкатегориям на странице категории.
 *
 * Пока только подсвечивает выбранную кнопку — список проектов не фильтруется,
 * потому что данные ещё заглушки. Когда появится бэкенд, выбор должен попадать
 * в адрес (/category/bots?sub=telegram): тогда ссылкой можно поделиться,
 * а страница останется видимой для поиска.
 */

import { useState } from 'react';
import styles from './SubcategoryFilter.module.css';

export default function SubcategoryFilter({ subs }: { subs: string[] }) {
  // 'Все' — значение по умолчанию, оно не входит в список подкатегорий
  const [active, setActive] = useState('Все');
  const options = ['Все', ...subs];

  return (
    <div className={styles.row} role="group" aria-label="Подкатегории">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={active === option}
          className={`${styles.pill} ${active === option ? styles.pillActive : ''}`}
          onClick={() => setActive(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
