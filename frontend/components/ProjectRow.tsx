import Link from 'next/link';
import VoteButton from './VoteButton';
import { findCategory } from '@/lib/categories';
import type { Project } from '@/lib/mock';
import { projectPath } from '@/lib/site';
import styles from './ProjectRow.module.css';

type ProjectRowProps = {
  project: Project;
  /**
   * feed — компактная строка в ленте на лендинге
   * list — строка в списке категории, с тегами
   */
  variant?: 'feed' | 'list';
};

/** Строка проекта в списке. Серверный компонент, кнопка голоса внутри — клиентская. */
export default function ProjectRow({ project, variant = 'feed' }: ProjectRowProps) {
  // Названия категорий для подписи под проектом: «Боты · ИИ-инструменты»
  const categoryNames = project.categorySlugs
    .map((slug) => findCategory(slug)?.name)
    .filter(Boolean)
    .join(' · ');

  return (
    <div className={variant === 'feed' ? styles.rowFeed : styles.rowList}>
      <Link
        href={projectPath(project.slug)}
        className={variant === 'feed' ? styles.markFeed : styles.markList}
        aria-hidden="true"
        tabIndex={-1}
      >
        {project.initial}
      </Link>

      <div className={styles.body}>
        <Link href={projectPath(project.slug)} className={styles.name}>
          {project.name}
        </Link>
        <div className={styles.tagline}>{project.tagline}</div>

        {variant === 'list' ? (
          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        ) : (
          <div className={styles.categories}>{categoryNames}</div>
        )}
      </div>

      <VoteButton votes={project.votes} />
    </div>
  );
}
