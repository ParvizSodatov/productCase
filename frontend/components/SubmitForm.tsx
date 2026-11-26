'use client';

/**
 * Форма публикации проекта.
 *
 * Пока ничего не отправляет на сервер — проверяет поля, показывает
 * ошибки и тост, затем переводит в «Мои проекты».
 *
 * Как устроены ошибки (так рекомендует WCAG):
 * - ошибки показываются после нажатия «Отправить», а не на каждый
 *   символ — человека не ругают, пока он ещё печатает;
 * - над формой появляется сводка «Исправьте N ошибок» со ссылками
 *   на поля, и фокус переходит на неё — скринридер сразу её прочтёт;
 * - у каждого поля ошибка написана словами, связана с полем через
 *   aria-describedby, а само поле помечено aria-invalid;
 * - как только поле исправлено, его ошибка исчезает.
 *
 * ЧТО ОБЯЗАТЕЛЬНО СДЕЛАТЬ НА СЕРВЕРЕ, когда появится бэкенд:
 *
 * 1. Повторить ВСЕ проверки из lib/validation.ts — эти обходятся запросом
 *    напрямую. Особенно ссылку: только http(s), иначе javascript:… = XSS.
 *
 * 2. Загрузка картинок. Не доверять ни имени файла, ни заголовку типа:
 *    их задаёт тот, кто отправляет. Проверять настоящий тип по первым
 *    байтам файла, ограничивать размер и пересохранять картинку
 *    (это убирает спрятанный внутри код). Имя файла придумывать своё.
 *
 * 3. Публиковать только после модерации, как и написано пользователю.
 */

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CircleExclamationPoint, ImagePlus } from 'lucide-react';
import CategoryPicker from './CategoryPicker';
import { useToast } from './Toaster';
import { PROJECT_LIMITS, validateProject, type FieldErrors, withoutError, type ProjectDraft } from '@/lib/validation';
import styles from './SubmitForm.module.css';

const MAX_SHOTS = 5;
const MAX_SHOT_BYTES = 5 * 1024 * 1024;
const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

/** Порядок полей — в этом порядке идут ошибки в сводке */
const FIELD_LABELS: Record<string, string> = {
  name: 'Название',
  tagline: 'Короткое описание',
  about: 'Подробно о проекте',
  link: 'Ссылка',
  categories: 'Категории',
  shots: 'Скриншоты',
};

export default function SubmitForm() {
  const router = useRouter();
  const toast = useToast();
  const summaryRef = useRef<HTMLDivElement>(null);

  const [draft, setDraft] = useState<ProjectDraft>({
    name: '',
    tagline: '',
    about: '',
    link: '',
    categories: [],
  });
  const [shots, setShots] = useState<File[]>([]);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showSummary, setShowSummary] = useState(false);
  const [sending, setSending] = useState(false);

  /** Обновить поле и снять с него ошибку */
  function update<K extends keyof ProjectDraft>(key: K, value: ProjectDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    if (errors[key]) {
      setErrors((e) => withoutError(e, key));
    }
  }

  function pickShots(files: FileList | null) {
    if (!files) return;
    const list = Array.from(files);
    const bad = list.find((file) => !IMAGE_TYPES.includes(file.type) || file.size > MAX_SHOT_BYTES);

    if (list.length > MAX_SHOTS) {
      setErrors((e) => ({ ...e, shots: `Не больше ${MAX_SHOTS} скриншотов` }));
    } else if (bad) {
      setErrors((e) => ({ ...e, shots: `«${bad.name}»: нужен PNG, JPG или WebP до 5 МБ` }));
    } else {
      setShots(list);
      setErrors((e) => withoutError(e, 'shots'));
    }
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const found = { ...validateProject(draft), ...(errors.shots ? { shots: errors.shots } : {}) };
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setShowSummary(true);
      // Ждём, пока сводка появится в DOM, и переводим на неё фокус
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setShowSummary(false);
    setSending(true);
    // Здесь будет запрос на сервер. Пауза — чтобы было видно состояние кнопки
    await new Promise((resolve) => setTimeout(resolve, 600));
    toast('Проект отправлен на модерацию');
    router.push('/me/projects');
  }

  function saveDraft() {
    if (!draft.name.trim()) {
      setErrors({ name: 'Чтобы сохранить черновик, укажите хотя бы название' });
      document.getElementById('name')?.focus();
      return;
    }
    toast('Черновик сохранён');
  }

  const errorList = Object.keys(FIELD_LABELS).filter((key) => errors[key]);

  /** Свойства доступности для поля с возможной ошибкой */
  const a11y = (key: string, hintId?: string) => ({
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': [errors[key] ? `${key}-error` : '', hintId ?? ''].filter(Boolean).join(' ') || undefined,
  });

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      {showSummary && errorList.length > 0 && (
        <div ref={summaryRef} className={styles.summary} tabIndex={-1} role="alert">
          <p className={styles.summaryTitle}>
            {errorList.length === 1 ? 'Исправьте одну ошибку' : `Исправьте ошибки: ${errorList.length}`}
          </p>
          <ul className={styles.summaryList}>
            {errorList.map((key) => (
              <li key={key}>
                <a href={`#${key}`}>
                  {FIELD_LABELS[key]}: {errors[key]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>
          Название <span className={styles.required} aria-hidden="true">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={PROJECT_LIMITS.name}
          placeholder="Например, Tarjuma Bot"
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          value={draft.name}
          onChange={(e) => update('name', e.target.value)}
          {...a11y('name')}
        />
        <FieldError id="name-error" text={errors.name} />
      </div>

      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label htmlFor="tagline" className={styles.label}>
            Короткое описание <span className={styles.required} aria-hidden="true">*</span>
          </label>
          <Counter value={draft.tagline.length} max={PROJECT_LIMITS.tagline} id="tagline-count" />
        </div>
        <input
          id="tagline"
          name="tagline"
          type="text"
          required
          placeholder="Одна строка: что делает проект"
          className={`${styles.input} ${errors.tagline ? styles.inputError : ''}`}
          value={draft.tagline}
          onChange={(e) => update('tagline', e.target.value)}
          {...a11y('tagline', 'tagline-count')}
        />
        <FieldError id="tagline-error" text={errors.tagline} />
      </div>

      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label htmlFor="about" className={styles.label}>
            Подробно о проекте <span className={styles.required} aria-hidden="true">*</span>
          </label>
          <Counter value={draft.about.length} max={PROJECT_LIMITS.about} id="about-count" />
        </div>
        <textarea
          id="about"
          name="about"
          rows={6}
          required
          placeholder="Какую проблему решает, для кого, чем отличается. Абзацы разделяйте пустой строкой."
          className={`${styles.textarea} ${errors.about ? styles.inputError : ''}`}
          value={draft.about}
          onChange={(e) => update('about', e.target.value)}
          {...a11y('about', 'about-count')}
        />
        <FieldError id="about-error" text={errors.about} />
      </div>

      <div className={styles.field}>
        <label htmlFor="link" className={styles.label}>
          Ссылка <span className={styles.required} aria-hidden="true">*</span>
        </label>
        <input
          id="link"
          name="link"
          type="url"
          inputMode="url"
          required
          placeholder="https://… или https://t.me/…"
          className={`${styles.input} ${errors.link ? styles.inputError : ''}`}
          value={draft.link}
          onChange={(e) => update('link', e.target.value)}
          {...a11y('link', 'link-help')}
        />
        <span id="link-help" className={styles.help}>
          Сайт, бот, страница в магазине приложений или репозиторий
        </span>
        <FieldError id="link-error" text={errors.link} />
      </div>

      <CategoryPicker
        value={draft.categories}
        onChange={(value) => update('categories', value)}
        error={errors.categories}
      />

      <div className={styles.field}>
        <span className={styles.label}>Скриншоты</span>
        <div className={styles.uploads}>
          {/* Настоящий input type=file спрятан, кликают по подписи:
              так работает и мышь, и клавиатура, и скринридер */}
          <label className={styles.uploadShots}>
            <input
              id="shots"
              type="file"
              accept={IMAGE_TYPES.join(',')}
              multiple
              className="visuallyHidden"
              onChange={(e) => pickShots(e.target.files)}
              {...a11y('shots', 'shots-hint')}
            />
            <ImagePlus size={22} aria-hidden="true" />
            {shots.length > 0
              ? `Выбрано: ${shots.length} — нажмите, чтобы заменить`
              : `Нажмите, чтобы выбрать до ${MAX_SHOTS} скриншотов`}
            <span id="shots-hint" className={styles.uploadHint}>
              PNG, JPG или WebP, до 5 МБ каждый
            </span>
          </label>
        </div>
        <FieldError id="shots-error" text={errors.shots} />
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.draftBtn} onClick={saveDraft}>
          Сохранить черновик
        </button>
        <button type="submit" className={styles.submitBtn} disabled={sending} aria-busy={sending}>
          {sending ? 'Отправляем…' : 'Отправить на проверку'}
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

/** Счётчик символов. Краснеет, когда лимит превышен */
function Counter({ value, max, id }: { value: number; max: number; id: string }) {
  return (
    <span id={id} className={`${styles.counter} ${value > max ? styles.counterOver : ''}`}>
      {value} / {max}
    </span>
  );
}
