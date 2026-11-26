import Illustration, { type IllustrationName } from './Illustration';
import styles from './EmptyState.module.css';

type EmptyStateProps = {
  illustration: IllustrationName;
  title: string;
  text?: string;
  /** Кнопка или ссылка действия: «Добавить проект», «Повторить» */
  children?: React.ReactNode;
  /** compact — внутри карточки или выпадающего окна */
  size?: 'default' | 'compact';
  /** Уровень заголовка: на странице без h2 выше — h2, внутри секции — h3 */
  headingLevel?: 2 | 3;
};

/**
 * Пустое состояние: иллюстрация, заголовок, пояснение и действие.
 * Хорошее пустое состояние не просто говорит «ничего нет»,
 * а подсказывает следующий шаг.
 */
export default function EmptyState({
  illustration,
  title,
  text,
  children,
  size = 'default',
  headingLevel = 2,
}: EmptyStateProps) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';

  return (
    <div className={`${styles.empty} ${size === 'compact' ? styles.compact : ''}`}>
      <Illustration name={illustration} size={size === 'compact' ? 112 : 160} />
      <Heading className={styles.title}>{title}</Heading>
      {text && <p className={styles.text}>{text}</p>}
      {children && <div className={styles.actions}>{children}</div>}
    </div>
  );
}
