import {
  CommentSkeleton,
  LoadingRegion,
  ProjectGridSkeleton,
  ProjectListSkeleton,
  Skeleton,
} from './Skeleton';
import styles from './PageSkeletons.module.css';

/**
 * Скелетоны целых страниц — для файлов loading.tsx.
 * Повторяют сетку настоящих страниц, чтобы при загрузке ничего не прыгало.
 */

/** Категория и поиск: заголовок, фильтры, список */
export function ListPageSkeleton({ label = 'Загружаем проекты…' }: { label?: string }) {
  return (
    <main id="main" className={styles.main}>
      <LoadingRegion label={label}>
        <Skeleton width={180} height={14} />
        <Skeleton width="40%" height={40} radius={10} className={styles.gapTop} />
        <Skeleton width="65%" height={16} className={styles.gapSmall} />
        <div className={styles.pills}>
          {[90, 70, 110, 80].map((width, index) => (
            <Skeleton key={index} width={width} height={40} radius={999} />
          ))}
        </div>
        <div className={styles.columns}>
          <div className={styles.content}>
            <ProjectListSkeleton count={5} />
          </div>
          <div className={styles.aside}>
            <Skeleton height={180} radius={16} />
            <Skeleton height={160} radius={16} />
          </div>
        </div>
      </LoadingRegion>
    </main>
  );
}

/** Страница проекта: шапка, галерея, описание, сбоку создатели */
export function ProjectPageSkeleton() {
  return (
    <main id="main" className={styles.main}>
      <LoadingRegion label="Загружаем проект…">
        <Skeleton width={220} height={14} />
        <div className={styles.head}>
          <Skeleton width={88} height={88} radius={20} />
          <div className={styles.headText}>
            <Skeleton width="50%" height={36} radius={10} />
            <Skeleton width="75%" height={18} />
            <div className={styles.row}>
              <Skeleton width={70} height={24} radius={999} />
              <Skeleton width={110} height={24} radius={999} />
            </div>
          </div>
          <div className={styles.row}>
            <Skeleton width={170} height={54} radius={12} />
            <Skeleton width={190} height={54} radius={12} />
          </div>
        </div>
        <div className={styles.gallery}>
          <Skeleton height="auto" radius={16} className={styles.shot} />
          <Skeleton height="auto" radius={16} className={styles.shot} />
        </div>
        <div className={styles.columns}>
          <div className={styles.content}>
            <Skeleton width={160} height={24} />
            <div className={styles.lines}>
              <Skeleton />
              <Skeleton />
              <Skeleton width="80%" />
              <Skeleton width="60%" />
            </div>
            <CommentSkeleton />
            <CommentSkeleton />
          </div>
          <div className={styles.aside}>
            <Skeleton height={200} radius={16} />
            <Skeleton height={150} radius={16} />
          </div>
        </div>
      </LoadingRegion>
    </main>
  );
}

/** Профиль: шапка с аватаром, сетка карточек */
export function ProfilePageSkeleton() {
  return (
    <main id="main" className={styles.main}>
      <LoadingRegion label="Загружаем профиль…">
        <div className={styles.head}>
          <Skeleton width={96} height={96} radius="50%" />
          <div className={styles.headText}>
            <Skeleton width="40%" height={32} radius={10} />
            <Skeleton width="30%" height={16} />
            <Skeleton width="70%" />
          </div>
        </div>
        <div className={styles.gapTopLarge}>
          <ProjectGridSkeleton count={3} />
        </div>
      </LoadingRegion>
    </main>
  );
}

/** Кабинет: «Мои проекты», модерация — заголовок и список карточек */
export function CabinetSkeleton({ label = 'Загрузка…' }: { label?: string }) {
  return (
    <main id="main" className={styles.narrow}>
      <LoadingRegion label={label}>
        <Skeleton width="35%" height={36} radius={10} />
        <Skeleton width="55%" height={16} className={styles.gapSmall} />
        <div className={styles.cards}>
          {[0, 1, 2].map((index) => (
            <Skeleton key={index} height={110} radius={16} />
          ))}
        </div>
      </LoadingRegion>
    </main>
  );
}
