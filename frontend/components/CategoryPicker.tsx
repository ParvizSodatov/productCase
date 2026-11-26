'use client';

/**
 * Выбор категорий при публикации проекта. Не больше трёх —
 * это решение из PROJECT.md.
 *
 * Ограничение «до 3» здесь нужно для удобства: кнопки просто перестают
 * нажиматься. На сервере это ограничение надо проверить ЗАНОВО, иначе
 * можно отправить запрос напрямую и прицепить проект ко всем категориям.
 */

import { categories } from '@/lib/categories';
import { PROJECT_LIMITS } from '@/lib/validation';
import styles from './CategoryPicker.module.css';

const MAX_CATEGORIES = PROJECT_LIMITS.categories;

type CategoryPickerProps = {
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
};

export default function CategoryPicker({ value, onChange, error }: CategoryPickerProps) {
  function toggle(slug: string) {
    if (value.includes(slug)) {
      onChange(value.filter((item) => item !== slug));
    } else if (value.length < MAX_CATEGORIES) {
      onChange([...value, slug]);
    }
  }

  const limitReached = value.length >= MAX_CATEGORIES;

  return (
    <fieldset
      id="categories"
      className={styles.fieldset}
      aria-describedby={error ? 'categories-error' : undefined}
      // fieldset сам по себе не фокусируется — tabIndex нужен, чтобы
      // ссылка из сводки ошибок могла перевести на него фокус
      tabIndex={-1}
    >
      <legend className={styles.legend}>
        Категории <span className={styles.hint}>(до {MAX_CATEGORIES})</span>
      </legend>

      <div className={styles.row}>
        {categories.map((category) => {
          const on = value.includes(category.slug);
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

      {error ? (
        <p id="categories-error" className={styles.error}>
          {error}
        </p>
      ) : (
        limitReached && (
          <p className={styles.limit} role="status">
            Выбрано {MAX_CATEGORIES} категории — больше нельзя. Сними одну, чтобы выбрать другую.
          </p>
        )
      )}
    </fieldset>
  );
}
