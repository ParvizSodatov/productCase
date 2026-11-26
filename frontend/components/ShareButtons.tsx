'use client';

/**
 * «Поделиться»: отправить в Telegram и скопировать ссылку.
 *
 * Ссылку собирает сервер из NEXT_PUBLIC_SITE_URL и передаёт сюда готовой,
 * а не берётся из window.location. Так в Telegram всегда уходит чистый
 * адрес — без ?utm-хвостов и не адрес превью-деплоя Vercel.
 */

import { useState } from 'react';
import { Check, Link as LinkIcon, Send } from 'lucide-react';
import { useToast } from './Toaster';
import styles from './ShareButtons.module.css';

type ShareButtonsProps = {
  url: string;
  /** Текст, который подставится в сообщение Telegram */
  text: string;
};

type CopyState = 'idle' | 'copied' | 'failed';

export default function ShareButtons({ url, text }: ShareButtonsProps) {
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const toast = useToast();

  // Официальная ссылка Telegram «поделиться»: откроет выбор чата.
  // encodeURIComponent обязателен — иначе «&» или «#» в тексте сломают адрес.
  const telegramHref = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;

  async function copyLink() {
    try {
      // Буфер обмена доступен только на https и localhost
      await navigator.clipboard.writeText(url);
      setCopyState('copied');
      toast('Ссылка скопирована');
    } catch {
      setCopyState('failed');
      toast('Не удалось скопировать ссылку', 'error');
    }
    setTimeout(() => setCopyState('idle'), 2500);
  }

  return (
    <div className={styles.share}>
      <span className={styles.label}>Поделиться</span>

      <a
        href={telegramHref}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.button}
      >
        <Send size={16} aria-hidden="true" />
        Telegram
      </a>

      <button type="button" className={styles.button} onClick={copyLink}>
        {copyState === 'copied' ? (
          <Check size={16} aria-hidden="true" />
        ) : (
          <LinkIcon size={16} aria-hidden="true" />
        )}
        {copyState === 'copied' ? 'Скопировано' : 'Копировать ссылку'}
      </button>

      {/* Скринридеру результат озвучивает тост, здесь — ссылка для ручного копирования */}
      <span className={styles.status}>
        {copyState === 'failed' && (
          <>
            Не удалось скопировать. Ссылка: <span className={styles.url}>{url}</span>
          </>
        )}
      </span>
    </div>
  );
}
