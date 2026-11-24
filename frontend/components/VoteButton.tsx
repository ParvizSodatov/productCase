'use client';

/**
 * Кнопка голоса.
 *
 * ВНИМАНИЕ: сейчас счётчик меняется только в браузере, для показа.
 * Голос ничем не защищён — обновить страницу, и он сбросится.
 *
 * Когда появится бэкенд, правило «один аккаунт — один голос» должно
 * держаться НА СЕРВЕРЕ: уникальным ключом (user_id, project_id) в базе.
 * Проверки в этом компоненте недостаточно: любой человек может послать
 * запрос напрямую, минуя интерфейс, и накрутить голоса.
 */

import { useState } from 'react';
import styles from './VoteButton.module.css';

/** Треугольник из макета: контурный в списке, залитый на крупной кнопке */
function VoteIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path
        d="M7 2 L12 9 H2 Z"
        fill={filled ? 'currentColor' : 'none'}
        stroke={filled ? 'none' : 'var(--accent)'}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type VoteButtonProps = {
  votes: number;
  /** compact — узкая кнопка в списке, large — крупная на странице проекта */
  variant?: 'compact' | 'large';
};

export default function VoteButton({ votes, variant = 'compact' }: VoteButtonProps) {
  const [voted, setVoted] = useState(false);
  const count = voted ? votes + 1 : votes;

  if (variant === 'large') {
    return (
      <button
        type="button"
        className={`${styles.large} ${voted ? styles.largeVoted : ''}`}
        aria-pressed={voted}
        onClick={() => setVoted((v) => !v)}
      >
        <VoteIcon filled />
        {voted ? 'Голос учтён' : 'Голосовать'} · {count}
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`${styles.compact} ${voted ? styles.compactVoted : ''}`}
      aria-pressed={voted}
      aria-label={`Проголосовать, сейчас голосов: ${count}`}
      onClick={() => setVoted((v) => !v)}
    >
      <VoteIcon />
      {count}
    </button>
  );
}
