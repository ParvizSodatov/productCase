'use client';

/**
 * Выбор категорий при публикации проекта. Не больше трёх —
 * это решение из PROJECT.md.
 *
 * Ограничение «до 3» здесь нужно для удобства: кнопки просто перестают
 * нажиматься. На сервере это ограничение надо проверить ЗАНОВО, иначе
 * можно отправить запрос напрямую и прицепить проект ко всем категориям.
 */

import { useState } from 'react';
import { categories } from '@/lib/categories';
import styles from './CategoryPicker.module.css';

const MAX_CATEGORIES = 3;

export default function CategoryPicker() {
  const [picked, setPicked] = useState<string[]>(['bots', 'ai']);

  function toggle(slug: string) {
    setPicked((current) => {
      if (current.includes(slug)) {
        return current.filter((item) => item !== slug);
      }
      if (current.length >= MAX_CATEGORIES) {
        return current;
      }
      return [...current, slug];
    });
  }

  const limitReached = picked.length >= MAX_CATEGORIES;

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>
        Категории <span className={styles.hint}>(до {MAX_CATEGORIES})</span>
      </legend>

      <div className={styles.row}>
        {categories.map((category) => {
          const on = picked.includes(category.slug);
          return (
            <button
              key={category.slug}
              type="button"
              aria-pressed={on}
              /* Кнопку гасим, только если лимит набран и она не выбрана —
                 выбранную всегда можно снять */
              disabled={!on && limitReached}
              className={`${styles.pill} ${on ? styles.pillOn : ''}`}
              onClick={() => toggle(category.slug)}
            >
              {category.name}
            </button>
          );
        })}
      </div>

      {limitReached && (
        <p className={styles.limit} role="status">
          Выбрано {MAX_CATEGORIES} категории — больше нельзя. Сними одну, чтобы
          выбрать другую.
        </p>
      )}
    </fieldset>
  );
}
