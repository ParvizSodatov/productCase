import styles from './Avatar.module.css';

/**
 * Фоны заглушек. Белая буква на каждом даёт контраст от 5.6:1 до 8.8:1 —
 * выше нормы WCAG 4.5:1 для текста.
 */
const COLORS = ['#111418', '#b93e0e', '#3b4a8a', '#2f5d50', '#6b3a5e'];

/** Один и тот же человек всегда получает один и тот же цвет */
function colorFor(name: string): string {
  let hash = 0;
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return COLORS[hash % COLORS.length];
}

type AvatarProps = {
  name: string;
  /** Фото из GitHub/Google. Нет фото — показываем первую букву имени */
  src?: string;
  size?: number;
  /**
   * Рядом с аватаром почти всегда написано имя — тогда скринридеру
   * незачем читать его дважды, и картинка помечается как декоративная.
   * Если имени рядом нет, передайте decorative={false}.
   */
  decorative?: boolean;
};

/** Аватар человека. Серверный компонент, без JS. */
export default function Avatar({ name, src, size = 40, decorative = true }: AvatarProps) {
  const style = { width: size, height: size, fontSize: Math.round(size * 0.42) };

  if (src) {
    return (
      // Фото с чужого домена (GitHub, Google): next/image потребует прописать
      // эти домены в next.config — сделаем вместе со входом.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={decorative ? '' : name}
        className={styles.avatar}
        style={style}
        loading="lazy"
      />
    );
  }

  // Первая буква без учёта пробелов и кавычек; toLocaleUpperCase — чтобы
  // таджикские «ҳ», «ӯ», «ҷ» тоже стали заглавными
  const letter = name.trim().replace(/^[^\p{L}\p{N}]+/u, '').charAt(0).toLocaleUpperCase('ru') || '?';

  return (
    <span
      className={styles.avatar}
      style={{ ...style, background: colorFor(name) }}
      {...(decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': name })}
    >
      {letter}
    </span>
  );
}
