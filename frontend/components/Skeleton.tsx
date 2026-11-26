import styles from './Skeleton.module.css';

/**
 * Скелетоны — серые блоки на месте содержимого, пока оно грузится.
 *
 * Повторяют форму настоящих элементов: когда данные придут, страница
 * не прыгает, а человек заранее видит, что где будет.
 *
 * Скринридеру мерцающие блоки ни о чём не говорят, поэтому каждый набор
 * скрыт от него (aria-hidden), а вместо них читается одна фраза
 * «Загрузка…» — см. LoadingRegion.
 */

type BoxProps = {
  width?: number | string;
  height?: number | string;
  radius?: number | string;
  className?: string;
};

/** Один серый блок */
export function Skeleton({ width = '100%', height = 14, radius = 6, className = '' }: BoxProps) {
  return (
    <span
      className={`${styles.box} ${className}`}
      style={{ width, height, borderRadius: radius }}
    />
  );
}

/** Обёртка для страниц и списков: озвучивает «Загрузка…» и прячет блоки */
export function LoadingRegion({
  label = 'Загрузка…',
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div role="status" aria-busy="true">
      <span className="visuallyHidden">{label}</span>
      <div aria-hidden="true">{children}</div>
    </div>
  );
}

/** Строка проекта в списке: логотип, две строки текста, кнопка голоса */
export function ProjectRowSkeleton() {
  return (
    <div className={styles.row}>
      <Skeleton width={56} height={56} radius={12} />
      <div className={styles.rowText}>
        <Skeleton width="45%" height={16} />
        <Skeleton width="75%" />
        <Skeleton width="30%" height={12} />
      </div>
      <Skeleton width={60} height={64} radius={12} />
    </div>
  );
}

/** Карточка проекта с обложкой */
export function ProjectCardSkeleton() {
  return (
    <div className={styles.card}>
      <Skeleton height="auto" radius={0} className={styles.cover} />
      <div className={styles.cardBody}>
        <Skeleton width="55%" height={17} />
        <Skeleton width="85%" />
        <Skeleton width="40%" height={12} />
      </div>
    </div>
  );
}

/** Несколько строк подряд */
export function ProjectListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <ProjectRowSkeleton key={index} />
      ))}
    </>
  );
}

/** Сетка карточек */
export function ProjectGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className={styles.grid}>
      {Array.from({ length: count }, (_, index) => (
        <ProjectCardSkeleton key={index} />
      ))}
    </div>
  );
}

/** Комментарий: аватар и две строки */
export function CommentSkeleton() {
  return (
    <div className={styles.comment}>
      <Skeleton width={40} height={40} radius="50%" />
      <div className={styles.rowText}>
        <Skeleton width="30%" height={13} />
        <Skeleton width="90%" />
      </div>
    </div>
  );
}
