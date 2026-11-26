'use client';

/**
 * «Пожаловаться» на проект: окно с причиной, после отправки — тост.
 * Жалоба попадает в раздел «Жалобы» у модераторов.
 *
 * С бэкендом: жаловаться могут только вошедшие, не чаще N раз в час,
 * и один человек — одну жалобу на объект (уникальный ключ в базе).
 * Иначе жалобами можно «завалить» чужой проект.
 */

import { useId, useRef, useState } from 'react';
import { Flag } from 'lucide-react';
import { useToast } from './Toaster';
import styles from './ReportButton.module.css';

const REASONS = ['Не IT-проект', 'Спам или реклама', 'Чужой проект', 'Ссылка не работает', 'Другое'];

export default function ReportButton({ projectName }: { projectName: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const toast = useToast();
  const titleId = useId();
  const errorId = useId();

  function send(event: React.FormEvent) {
    event.preventDefault();
    if (!reason) {
      setError('Выберите причину');
      return;
    }
    dialogRef.current?.close();
    setReason('');
    toast('Жалоба отправлена. Модератор проверит её в течение суток');
  }

  return (
    <>
      <button type="button" className={styles.trigger} onClick={() => dialogRef.current?.showModal()}>
        <Flag size={15} aria-hidden="true" />
        Пожаловаться
      </button>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby={titleId}
        onClose={() => setError('')}
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current.close();
        }}
      >
        <form onSubmit={send} className={styles.body} noValidate>
          <h2 id={titleId} className={styles.title}>
            Пожаловаться на «{projectName}»
          </h2>
          <fieldset className={styles.reasons} aria-describedby={error ? errorId : undefined}>
            <legend className="visuallyHidden">Причина жалобы</legend>
            {REASONS.map((value) => (
              <label key={value} className={`${styles.option} ${reason === value ? styles.optionOn : ''}`}>
                <input
                  type="radio"
                  name="report-reason"
                  value={value}
                  checked={reason === value}
                  onChange={() => {
                    setReason(value);
                    setError('');
                  }}
                />
                {value}
              </label>
            ))}
          </fieldset>
          {error && (
            <p id={errorId} className={styles.error} role="alert">
              {error}
            </p>
          )}
          <div className={styles.actions}>
            <button type="button" className="btn btnSecondary" onClick={() => dialogRef.current?.close()}>
              Отмена
            </button>
            <button type="submit" className="btn btnDark">
              Отправить
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
