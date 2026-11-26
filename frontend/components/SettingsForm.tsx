'use client';

/**
 * Настройки профиля.
 *
 * Пока ничего не сохраняет на сервере: проверяет поля и показывает тост.
 *
 * НА СЕРВЕРЕ, когда появится бэкенд:
 * - менять можно только СВОЙ профиль: id берётся из сессии,
 *   а не из присланной формы (иначе можно переписать чужой профиль);
 * - ник уникален — проверка в базе уникальным индексом, а не поиском
 *   «есть ли такой» перед сохранением (два запроса одновременно пройдут оба);
 * - после смены ника старый адрес /profile/старый_ник лучше перенаправлять,
 *   чтобы не ломать ссылки;
 * - ссылки — только http(s), аватар — проверка по байтам и пересохранение.
 */

import { useEffect, useRef, useState } from 'react';
import { CircleExclamationPoint, Plus, Trash, Upload } from 'lucide-react';
import Avatar from './Avatar';
import { useToast } from './Toaster';
import type { Author } from '@/lib/mock';
import { PROFILE_LIMITS, validateAvatar, validateProfile, type FieldErrors, withoutError } from '@/lib/validation';
import styles from './SettingsForm.module.css';

type Link = { label: string; href: string };

export default function SettingsForm({ user }: { user: Author }) {
  const toast = useToast();
  const summaryRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [about, setAbout] = useState(user.about);
  // В заглушках вместо адресов якоря (#github) — подставим понятные примеры
  const [links, setLinks] = useState<Link[]>(
    user.links.map((link) => ({ label: link.label, href: link.href.startsWith('#') ? '' : link.href })),
  );
  const [lang, setLang] = useState<'ru' | 'tg'>('ru');
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [saving, setSaving] = useState(false);

  // Освобождаем память от предпросмотра, когда он больше не нужен
  useEffect(() => {
    return () => {
      if (avatarUrl) URL.revokeObjectURL(avatarUrl);
    };
  }, [avatarUrl]);

  function clearError(key: string) {
    if (errors[key]) setErrors((e) => withoutError(e, key));
  }

  function pickAvatar(file: File | undefined) {
    if (!file) return;
    const problem = validateAvatar(file);
    if (problem) {
      setErrors((e) => ({ ...e, avatar: problem }));
      return;
    }
    clearError('avatar');
    // Предпросмотр прямо из файла, без загрузки на сервер
    setAvatarUrl(URL.createObjectURL(file));
  }

  function updateLink(index: number, key: keyof Link, value: string) {
    setLinks((list) => list.map((link, i) => (i === index ? { ...link, [key]: value } : link)));
    clearError(`link-${key === 'label' ? 'label' : 'href'}-${index}`);
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    const found = validateProfile({ name, username, about, links });
    setErrors(found);

    if (Object.keys(found).length > 0) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSaving(false);
    toast('Профиль сохранён');
  }

  const errorCount = Object.keys(errors).filter((key) => key !== 'avatar').length;

  const a11y = (key: string, hintId?: string) => ({
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': [errors[key] ? `${key}-error` : '', hintId ?? ''].filter(Boolean).join(' ') || undefined,
  });

  return (
    <form className={styles.form} onSubmit={save} noValidate>
      {errorCount > 0 && (
        <div ref={summaryRef} className={styles.summary} tabIndex={-1} role="alert">
          {errorCount === 1 ? 'Исправьте одну ошибку' : `Исправьте ошибки: ${errorCount}`} — они
          отмечены красным ниже.
        </div>
      )}

      {/* ---------- Аватар ---------- */}
      <section className={styles.section} aria-labelledby="s-avatar">
        <h2 id="s-avatar" className={styles.sectionTitle}>
          Фото
        </h2>
        <div className={styles.avatarRow}>
          <Avatar name={name || user.name} src={avatarUrl} size={88} />
          <div className={styles.avatarActions}>
            <label className="btn btnSecondary btnSmall">
              <Upload size={16} aria-hidden="true" />
              Загрузить фото
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="visuallyHidden"
                onChange={(e) => pickAvatar(e.target.files?.[0])}
                {...a11y('avatar', 'avatar-hint')}
              />
            </label>
            {avatarUrl && (
              <button
                type="button"
                className="btn btnSecondary btnSmall"
                onClick={() => setAvatarUrl(undefined)}
              >
                Убрать
              </button>
            )}
            <p id="avatar-hint" className={styles.help}>
              PNG, JPG или WebP до 2 МБ. Без фото покажем первую букву имени.
            </p>
            <FieldError id="avatar-error" text={errors.avatar} />
          </div>
        </div>
      </section>

      {/* ---------- Основное ---------- */}
      <section className={styles.section} aria-labelledby="s-main">
        <h2 id="s-main" className={styles.sectionTitle}>
          О себе
        </h2>

        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>
              Имя
            </label>
            <input
              id="name"
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              value={name}
              autoComplete="name"
              onChange={(e) => {
                setName(e.target.value);
                clearError('name');
              }}
              {...a11y('name')}
            />
            <FieldError id="name-error" text={errors.name} />
          </div>

          <div className={styles.field}>
            <label htmlFor="username" className={styles.label}>
              Ник
            </label>
            <div className={`${styles.prefixed} ${errors.username ? styles.inputError : ''}`}>
              <span className={styles.prefix} aria-hidden="true">
                /profile/
              </span>
              <input
                id="username"
                className={styles.prefixedInput}
                value={username}
                autoComplete="username"
                autoCapitalize="none"
                spellCheck={false}
                onChange={(e) => {
                  setUsername(e.target.value.toLowerCase());
                  clearError('username');
                }}
                {...a11y('username', 'username-hint')}
              />
            </div>
            <span id="username-hint" className={styles.help}>
              Латиница, цифры и «_», от 3 до 30 символов
            </span>
            <FieldError id="username-error" text={errors.username} />
          </div>
        </div>

        <div className={styles.field}>
          <div className={styles.labelRow}>
            <label htmlFor="about" className={styles.label}>
              Описание
            </label>
            <span
              id="about-count"
              className={`${styles.counter} ${about.length > PROFILE_LIMITS.about ? styles.counterOver : ''}`}
            >
              {about.length} / {PROFILE_LIMITS.about}
            </span>
          </div>
          <textarea
            id="about"
            rows={3}
            className={`${styles.textarea} ${errors.about ? styles.inputError : ''}`}
            value={about}
            placeholder="Чем занимаетесь, что умеете"
            onChange={(e) => {
              setAbout(e.target.value);
              clearError('about');
            }}
            {...a11y('about', 'about-count')}
          />
          <FieldError id="about-error" text={errors.about} />
        </div>
      </section>

      {/* ---------- Ссылки ---------- */}
      <section className={styles.section} aria-labelledby="s-links">
        <h2 id="s-links" className={styles.sectionTitle}>
          Ссылки
        </h2>
        <p className={styles.help}>GitHub, Telegram, сайт — до {PROFILE_LIMITS.links} ссылок.</p>

        <ul className={styles.links}>
          {links.map((link, index) => (
            <li key={index} className={styles.linkRow}>
              <div className={styles.field}>
                <label htmlFor={`link-label-${index}`} className="visuallyHidden">
                  Подпись ссылки {index + 1}
                </label>
                <input
                  id={`link-label-${index}`}
                  className={`${styles.input} ${errors[`link-label-${index}`] ? styles.inputError : ''}`}
                  placeholder="GitHub"
                  value={link.label}
                  onChange={(e) => updateLink(index, 'label', e.target.value)}
                  {...a11y(`link-label-${index}`)}
                />
                <FieldError id={`link-label-${index}-error`} text={errors[`link-label-${index}`]} />
              </div>
              <div className={styles.field}>
                <label htmlFor={`link-href-${index}`} className="visuallyHidden">
                  Адрес ссылки {index + 1}
                </label>
                <input
                  id={`link-href-${index}`}
                  type="url"
                  inputMode="url"
                  className={`${styles.input} ${errors[`link-href-${index}`] ? styles.inputError : ''}`}
                  placeholder="https://…"
                  value={link.href}
                  onChange={(e) => updateLink(index, 'href', e.target.value)}
                  {...a11y(`link-href-${index}`)}
                />
                <FieldError id={`link-href-${index}-error`} text={errors[`link-href-${index}`]} />
              </div>
              <button
                type="button"
                className={styles.removeLink}
                onClick={() => {
                  setLinks((list) => list.filter((_, i) => i !== index));
                  // Номера строк сдвинулись — старые ошибки по ним больше не верны
                  setErrors({});
                }}
                aria-label={`Удалить ссылку ${link.label || index + 1}`}
              >
                <Trash size={16} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>

        {links.length < PROFILE_LIMITS.links && (
          <button
            type="button"
            className="btn btnSecondary btnSmall"
            onClick={() => setLinks((list) => [...list, { label: '', href: '' }])}
          >
            <Plus size={16} aria-hidden="true" />
            Добавить ссылку
          </button>
        )}
      </section>

      {/* ---------- Язык ---------- */}
      <section className={styles.section} aria-labelledby="s-lang">
        <h2 id="s-lang" className={styles.sectionTitle}>
          Язык
        </h2>
        <fieldset className={styles.radios}>
          <legend className="visuallyHidden">Язык интерфейса</legend>
          {(
            [
              { code: 'ru', label: 'Русский', note: 'Основной' },
              { code: 'tg', label: 'Тоҷикӣ', note: 'Скоро' },
            ] as const
          ).map((item) => (
            <label key={item.code} className={`${styles.radio} ${lang === item.code ? styles.radioOn : ''}`}>
              <input
                type="radio"
                name="lang"
                value={item.code}
                checked={lang === item.code}
                onChange={() => setLang(item.code)}
              />
              <span lang={item.code}>{item.label}</span>
              <span className={styles.radioNote}>{item.note}</span>
            </label>
          ))}
        </fieldset>
      </section>

      <div className={styles.actions}>
        <button type="submit" className="btn btnPrimary" disabled={saving} aria-busy={saving}>
          {saving ? 'Сохраняем…' : 'Сохранить'}
        </button>
      </div>
    </form>
  );
}

function FieldError({ id, text }: { id: string; text?: string }) {
  if (!text) return null;
  return (
    <p id={id} className={styles.fieldError}>
      <CircleExclamationPoint size={14} aria-hidden="true" />
      {text}
    </p>
  );
}
