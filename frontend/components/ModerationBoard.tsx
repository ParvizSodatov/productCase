'use client';

/**
 * Модерация: очередь проектов на проверке и жалобы.
 *
 * Сейчас решения живут только в браузере. С бэкендом каждое действие —
 * запрос на сервер, который проверяет роль модератора и пишет журнал
 * (см. app/(admin)/layout.tsx).
 */

import { useId, useRef, useState } from 'react';
import Link from 'next/link';
import { Check, ExternalLink, Flag, X } from 'lucide-react';
import EmptyState from './EmptyState';
import { useToast } from './Toaster';
import { rejectReasons, type ModerationItem, type Report } from '@/lib/mock';
import styles from './ModerationBoard.module.css';

type Tab = 'queue' | 'reports';

type ModerationBoardProps = {
  queue: ModerationItem[];
  reports: Report[];
};

export default function ModerationBoard({ queue: initialQueue, reports: initialReports }: ModerationBoardProps) {
  const [tab, setTab] = useState<Tab>('queue');
  const [queue, setQueue] = useState(initialQueue);
  const [reports, setReports] = useState(initialReports);
  const [rejecting, setRejecting] = useState<ModerationItem | null>(null);
  const toast = useToast();
  const baseId = useId();

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: 'queue', label: 'На проверке', count: queue.length },
    { id: 'reports', label: 'Жалобы', count: reports.length },
  ];

  /** Стрелки влево/вправо переключают вкладки — так принято для role="tablist" */
  function onTabKey(event: React.KeyboardEvent) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    const next: Tab = tab === 'queue' ? 'reports' : 'queue';
    setTab(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  }

  function approve(item: ModerationItem) {
    setQueue((list) => list.filter((i) => i.id !== item.id));
    toast(`«${item.name}» опубликован`);
  }

  function reject(item: ModerationItem, reason: string) {
    setQueue((list) => list.filter((i) => i.id !== item.id));
    setRejecting(null);
    toast(`«${item.name}» отклонён. Автор увидит причину: ${reason}`, 'info');
  }

  function resolveReport(report: Report, action: 'remove' | 'dismiss') {
    setReports((list) => list.filter((r) => r.id !== report.id));
    if (action === 'dismiss') toast('Жалоба отклонена', 'info');
    else toast(report.kind === 'comment' ? 'Комментарий удалён' : 'Проект снят с публикации');
  }

  return (
    <>
      <div className={styles.tabs} role="tablist" aria-label="Разделы модерации" onKeyDown={onTabKey}>
        {tabs.map((item) => (
          <button
            key={item.id}
            id={`${baseId}-tab-${item.id}`}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            aria-controls={`${baseId}-panel-${item.id}`}
            // Только активная вкладка в порядке Tab, остальные — стрелками
            tabIndex={tab === item.id ? 0 : -1}
            className={`${styles.tab} ${tab === item.id ? styles.tabActive : ''}`}
            onClick={() => setTab(item.id)}
          >
            {item.label}
            <span className={styles.count}>{item.count}</span>
          </button>
        ))}
      </div>

      <div
        id={`${baseId}-panel-${tab}`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${tab}`}
        className={styles.panel}
      >
        {tab === 'queue' &&
          (queue.length === 0 ? (
            <EmptyState
              illustration="inbox"
              title="Очередь пуста"
              text="Все проекты проверены. Новые появятся здесь, как только авторы их отправят."
            />
          ) : (
            <ul className={styles.list}>
              {queue.map((item) => (
                <li key={item.id} className={styles.card}>
                  <div className={styles.cardMain}>
                    <h2 className={styles.name}>{item.name}</h2>
                    <p className={styles.tagline}>{item.tagline}</p>
                    <dl className={styles.facts}>
                      <div>
                        <dt>Автор</dt>
                        <dd>{item.author}</dd>
                      </div>
                      <div>
                        <dt>Категории</dt>
                        <dd>{item.categories.join(', ')}</dd>
                      </div>
                      <div>
                        <dt>Отправлен</dt>
                        <dd>{item.submittedAt}</dd>
                      </div>
                    </dl>
                    {/*
                      Адрес показываем целиком, а не текстом-ссылкой: модератор
                      должен видеть, куда на самом деле ведёт ссылка, прежде
                      чем открыть её. nofollow — не передаём ей вес нашего сайта.
                    */}
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className={styles.link}
                    >
                      {item.link}
                      <ExternalLink size={14} aria-hidden="true" />
                      <span className="visuallyHidden">(откроется в новой вкладке)</span>
                    </a>
                  </div>

                  <div className={styles.cardActions}>
                    <button type="button" className="btn btnPrimary btnSmall" onClick={() => approve(item)}>
                      <Check size={16} aria-hidden="true" />
                      Одобрить
                    </button>
                    <button type="button" className="btn btnDanger btnSmall" onClick={() => setRejecting(item)}>
                      <X size={16} aria-hidden="true" />
                      Отклонить
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ))}

        {tab === 'reports' &&
          (reports.length === 0 ? (
            <EmptyState illustration="inbox" title="Жалоб нет" text="Когда пользователи пожалуются на проект или комментарий, жалоба появится здесь." />
          ) : (
            <ul className={styles.list}>
              {reports.map((report) => (
                <li key={report.id} className={styles.card}>
                  <div className={styles.cardMain}>
                    <div className={styles.reportHead}>
                      <span className={styles.kind}>
                        <Flag size={13} aria-hidden="true" />
                        {report.kind === 'comment' ? 'Комментарий' : 'Проект'}
                      </span>
                      <span className={styles.reason}>{report.reason}</span>
                    </div>
                    {/* Чужой текст — выводим как значение, React экранирует */}
                    <blockquote className={styles.quote}>{report.target}</blockquote>
                    <p className={styles.reportMeta}>
                      <Link href={report.href}>{report.where}</Link> · пожаловался(ась) {report.reporter} ·{' '}
                      {report.when}
                    </p>
                  </div>

                  <div className={styles.cardActions}>
                    <button
                      type="button"
                      className="btn btnDanger btnSmall"
                      onClick={() => resolveReport(report, 'remove')}
                    >
                      {report.kind === 'comment' ? 'Удалить комментарий' : 'Снять проект'}
                    </button>
                    <button
                      type="button"
                      className="btn btnSecondary btnSmall"
                      onClick={() => resolveReport(report, 'dismiss')}
                    >
                      Отклонить жалобу
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ))}
      </div>

      {rejecting && (
        <RejectDialog item={rejecting} onCancel={() => setRejecting(null)} onConfirm={reject} />
      )}
    </>
  );
}

/**
 * Окно «Отклонить с причиной». Причина обязательна: автор должен понять,
 * что исправить. «Другое» требует пояснения своими словами.
 */
function RejectDialog({
  item,
  onCancel,
  onConfirm,
}: {
  item: ModerationItem;
  onCancel: () => void;
  onConfirm: (item: ModerationItem, reason: string) => void;
}) {
  const [reason, setReason] = useState<string>('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const titleId = useId();

  // Окно открывается сразу при монтировании — через ref-колбэк,
  // чтобы showModal() вызвался, как только элемент появился в DOM
  const opened = useRef(false);
  const openOnMount = (node: HTMLDialogElement | null) => {
    if (node && !opened.current) {
      opened.current = true;
      node.showModal();
    }
  };

  function confirm(event: React.FormEvent) {
    event.preventDefault();
    if (!reason) return setError('Выберите причину');
    if (reason === 'Другое' && comment.trim().length < 10)
      return setError('Опишите причину своими словами — хотя бы 10 символов');
    onConfirm(item, comment.trim() ? `${reason}. ${comment.trim()}` : reason);
  }

  return (
    <dialog
      ref={openOnMount}
      className={styles.dialog}
      aria-labelledby={titleId}
      // Escape закрывает dialog сам — синхронизируем состояние
      onClose={onCancel}
    >
      <form onSubmit={confirm} className={styles.dialogBody} noValidate>
        <h2 id={titleId} className={styles.dialogTitle}>
          Отклонить «{item.name}»
        </h2>
        <p className={styles.dialogLead}>Автор увидит причину и сможет исправить проект.</p>

        <fieldset className={styles.reasons} aria-describedby={error ? 'reject-error' : undefined}>
          <legend className={styles.legend}>Причина</legend>
          {rejectReasons.map((value) => (
            <label key={value} className={`${styles.reasonOption} ${reason === value ? styles.reasonOn : ''}`}>
              <input
                type="radio"
                name="reason"
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

        <label htmlFor="reject-comment" className={styles.legend}>
          Пояснение для автора {reason === 'Другое' ? '' : '(необязательно)'}
        </label>
        <textarea
          id="reject-comment"
          rows={3}
          className={styles.textarea}
          value={comment}
          placeholder="Например: замените ссылку на Instagram ссылкой на сам сервис"
          onChange={(e) => {
            setComment(e.target.value);
            setError('');
          }}
          aria-invalid={error && reason === 'Другое' ? true : undefined}
          aria-describedby={error ? 'reject-error' : undefined}
        />

        {error && (
          <p id="reject-error" className={styles.error} role="alert">
            {error}
          </p>
        )}

        <div className={styles.dialogActions}>
          <button type="button" className="btn btnSecondary" onClick={onCancel}>
            Отмена
          </button>
          <button type="submit" className="btn btnDanger">
            Отклонить проект
          </button>
        </div>
      </form>
    </dialog>
  );
}
