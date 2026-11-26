'use client';

/**
 * Переключатель языка: Русский / Тоҷикӣ.
 *
 * Сейчас только запоминает выбор в cookie `lang` — переводов ещё нет.
 * Как их подключать (библиотека или своя схема, язык в адресе /tg/…
 * или в cookie) — решение по стеку, его согласуем отдельно.
 * Для поиска язык в адресе лучше: Google индексирует каждую версию.
 *
 * Cookie без httpOnly — это настройка интерфейса, а не секрет,
 * её можно читать из JS. Сессию так хранить нельзя.
 */

import { useSyncExternalStore } from 'react';
import { useToast } from './Toaster';
import styles from './LanguageSwitcher.module.css';

type Lang = 'ru' | 'tg';

const LANGS: { code: Lang; label: string }[] = [
  { code: 'ru', label: 'Русский' },
  { code: 'tg', label: 'Тоҷикӣ' },
];

/* Небольшое «хранилище» поверх cookie: useSyncExternalStore читает его
   одинаково на сервере и в браузере, без ошибки гидратации. */
const listeners = new Set<() => void>();

function readLang(): Lang {
  return document.cookie.match(/(?:^|; )lang=(tg|ru)/)?.[1] === 'tg' ? 'tg' : 'ru';
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function writeLang(lang: Lang) {
  // Год, весь сайт, SameSite=Lax — cookie не уходит с чужих сайтов
  document.cookie = `lang=${lang}; path=/; max-age=31536000; SameSite=Lax`;
  listeners.forEach((listener) => listener());
}

export default function LanguageSwitcher() {
  // На сервере cookie не читаем — HTML собран заранее и для всех одинаковый
  const lang = useSyncExternalStore(subscribe, readLang, () => 'ru' as Lang);
  const toast = useToast();

  return (
    <div className={styles.switcher} role="group" aria-label="Язык сайта">
      {LANGS.map((item) => (
        <button
          key={item.code}
          type="button"
          lang={item.code}
          className={`${styles.option} ${lang === item.code ? styles.active : ''}`}
          aria-pressed={lang === item.code}
          onClick={() => {
            writeLang(item.code);
            if (item.code === 'tg') toast('Таджикская версия готовится — скоро появится', 'info');
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
