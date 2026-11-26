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
 *
 * Анимация: при голосе стрелка подпрыгивает, старое число уезжает вверх,
 * новое въезжает снизу (при отмене — наоборот). Анимация запускается
 * сменой key у элемента: React пересоздаёт его, и CSS-анимация
 * проигрывается заново. До первого клика ничего не анимируется.
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
        stroke={filled ? 'none' : 'currentColor'}
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
  // Сколько раз нажимали: 0 — анимаций ещё не было
  const [clicks, setClicks] = useState(0);
  const count = voted ? votes + 1 : votes;

  function toggle() {
    setVoted((v) => !v);
    setClicks((n) => n + 1);
  }

  const animate = clicks > 0;
  const arrow = (
    <span key={`arrow-${clicks}`} className={`${styles.arrow} ${animate && voted ? styles.bounce : ''}`}>
      <VoteIcon filled={variant === 'large' || voted} />
    </span>
  );
  const number = (
    <span className={styles.numberWrap}>
      <span
        key={`count-${count}`}
        className={`${styles.number} ${animate ? (voted ? styles.rollUp : styles.rollDown) : ''}`}
      >
        {count}
      </span>
    </span>
  );

  if (variant === 'large') {
    return (
      <button
        type="button"
        className={`${styles.large} ${voted ? styles.largeVoted : ''}`}
        aria-pressed={voted}
        onClick={toggle}
      >
        {arrow}
        {voted ? 'Голос учтён' : 'Голосовать'} · {number}
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`${styles.compact} ${voted ? styles.compactVoted : ''}`}
      aria-pressed={voted}
      aria-label={`Проголосовать, сейчас голосов: ${count}`}
      onClick={toggle}
    >
      {arrow}
      {number}
    </button>
  );
}
