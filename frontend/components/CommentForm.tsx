'use client';

/**
 * Форма комментария.
 *
 * Пока ничего не отправляет.
 *
 * ПРО БЕЗОПАСНОСТЬ, когда подключим бэкенд:
 *
 * 1. Текст комментария — это чужой текст на твоём сайте. React подставляет
 *    его как {text} и сам экранирует опасные символы, поэтому XSS не будет.
 *    НО: никогда не выводи комментарии через dangerouslySetInnerHTML —
 *    именно так и получают XSS. Если захочешь разрешить разметку
 *    (ссылки, жирный шрифт), текст нужно прогонять через библиотеку
 *    очистки вроде DOMPurify, а не доверять ему.
 *
 * 2. Проверять длину и содержимое нужно НА СЕРВЕРЕ. Проверка здесь —
 *    только подсказка пользователю, обойти её тривиально.
 *
 * 3. Нужен лимит на частоту отправки, иначе комментарии зальют ботами.
 */

import { useState } from 'react';
import styles from './CommentForm.module.css';

const MAX_LENGTH = 1000;

export default function CommentForm() {
  const [text, setText] = useState('');

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        if (text.trim().length === 0) return;
        // Отправка появится вместе с бэкендом
        setText('');
      }}
    >
      <label htmlFor="comment" className="visuallyHidden">
        Ваш комментарий
      </label>
      <input
        id="comment"
        name="comment"
        type="text"
        maxLength={MAX_LENGTH}
        placeholder="Что думаешь о проекте?"
        className={styles.input}
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button type="submit" className={styles.submit}>
        Отправить
      </button>
    </form>
  );
}
