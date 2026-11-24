'use client';

/**
 * Форма «Хочу участвовать» в тёмном блоке на лендинге.
 *
 * Пока ничего не отправляет — только показывает подтверждение.
 *
 * Когда появится бэкенд: контакт проверять НА СЕРВЕРЕ, а не только здесь.
 * Проверка в браузере — это удобство для пользователя, её легко обойти.
 * На сервере нужно ограничить длину, отсеять мусор и поставить лимит
 * запросов с одного адреса, иначе форму быстро зальют спамом.
 */

import { useState } from 'react';
import styles from './WaitlistForm.module.css';

export default function WaitlistForm() {
  const [contact, setContact] = useState('');
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p className={styles.done} role="status">
        Спасибо! Напишем, когда откроем публикацию проектов.
      </p>
    );
  }

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        if (contact.trim().length < 3) return;
        setSent(true);
      }}
    >
      <label htmlFor="contact" className="visuallyHidden">
        Telegram или email
      </label>
      <input
        id="contact"
        name="contact"
        type="text"
        autoComplete="off"
        maxLength={120}
        placeholder="Telegram или email"
        className={styles.input}
        value={contact}
        onChange={(event) => setContact(event.target.value)}
      />
      <button type="submit" className={styles.submit}>
        Хочу участвовать
      </button>
    </form>
  );
}
