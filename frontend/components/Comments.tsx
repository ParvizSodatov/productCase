'use client';

/**
 * Комментарии проекта: список, форма и пустое состояние.
 *
 * Клиентский компонент, но список приходит пропсом с сервера и попадает
 * в HTML при первой отрисовке — поисковик комментарии видит.
 *
 * Сейчас новые комментарии и удаление живут только в браузере.
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
 * 3. Удалять комментарий сервер разрешает только автору или модератору —
 *    проверка по сессии, а не по тому, что кнопка «Удалить» видна.
 *
 * 4. Нужен лимит на частоту отправки, иначе комментарии зальют ботами.
 */

import { useRef, useState } from 'react';
import { Trash } from 'lucide-react';
import Avatar from './Avatar';
import EmptyState from './EmptyState';
import { useToast } from './Toaster';
import type { Comment } from '@/lib/mock';
import styles from './Comments.module.css';

const MAX_LENGTH = 1000;
const MIN_LENGTH = 2;

type CommentsProps = {
  initial: Comment[];
  /** Вошедший пользователь — его комментарии можно удалить */
  me: { name: string; username: string };
};

export default function Comments({ initial, me }: CommentsProps) {
  const [comments, setComments] = useState(initial);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const toast = useToast();

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const value = text.trim();

    if (value.length < MIN_LENGTH) {
      setError('Напишите хотя бы пару слов');
      inputRef.current?.focus();
      return;
    }
    if (value.length > MAX_LENGTH) {
      setError(`Не длиннее ${MAX_LENGTH} символов`);
      inputRef.current?.focus();
      return;
    }

    setComments((list) => [
      { id: `local-${Date.now()}`, name: me.name, username: me.username, when: 'только что', text: value },
      ...list,
    ]);
    setText('');
    setError('');
    toast('Комментарий опубликован');
  }

  function remove(id: string) {
    setComments((list) => list.filter((comment) => comment.id !== id));
    toast('Комментарий удалён');
  }

  const errorId = 'comment-error';

  return (
    <section aria-labelledby="comments-title">
      <h2 id="comments-title" className={styles.title}>
        Комментарии · {comments.length}
      </h2>

      <form className={styles.form} onSubmit={submit} noValidate>
        <label htmlFor="comment" className="visuallyHidden">
          Ваш комментарий
        </label>
        <div className={styles.field}>
          <textarea
            ref={inputRef}
            id="comment"
            name="comment"
            rows={2}
            placeholder="Что думаешь о проекте?"
            className={`${styles.input} ${error ? styles.inputError : ''}`}
            value={text}
            onChange={(event) => {
              setText(event.target.value);
              if (error) setError('');
            }}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
          />
          <div className={styles.meta}>
            {error ? (
              <span id={errorId} className={styles.error} role="alert">
                {error}
              </span>
            ) : (
              <span />
            )}
            {/* Счётчик показываем ближе к лимиту — раньше он только отвлекает */}
            {text.length > MAX_LENGTH * 0.8 && (
              <span className={text.length > MAX_LENGTH ? styles.error : styles.counter}>
                {text.length} / {MAX_LENGTH}
              </span>
            )}
          </div>
        </div>
        <button type="submit" className="btn btnDark">
          Отправить
        </button>
      </form>

      {comments.length === 0 ? (
        <EmptyState
          illustration="comments"
          title="Комментариев пока нет — будьте первым"
          text="Спросите автора о проекте или расскажите, как вы им пользуетесь."
          headingLevel={3}
        >
          <button type="button" className="btn btnSecondary" onClick={() => inputRef.current?.focus()}>
            Написать комментарий
          </button>
        </EmptyState>
      ) : (
        <ul className={styles.list}>
          {comments.map((comment) => (
            <li key={comment.id} className={styles.comment}>
              <Avatar name={comment.name} size={40} />
              <div className={styles.body}>
                <div className={styles.commentMeta}>
                  <span className={styles.name}>{comment.name}</span>{' '}
                  <span className={styles.when}>· {comment.when}</span>
                </div>
                {/* Текст подставляется как значение — React его экранирует */}
                <p className={styles.text}>{comment.text}</p>
              </div>
              {comment.username === me.username && (
                <button
                  type="button"
                  className={styles.delete}
                  onClick={() => remove(comment.id)}
                  aria-label="Удалить мой комментарий"
                >
                  <Trash size={16} aria-hidden="true" />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
