import Link from 'next/link';
import { Triangle } from 'lucide-react';
import { findCategory } from '@/lib/categories';
import type { Project } from '@/lib/mock';
import { projectPath } from '@/lib/site';
import styles from './ProjectCard.module.css';

/** Карточка проекта с обложкой: профиль автора, похожие проекты. Серверный компонент. */
export default function ProjectCard({ project }: { project: Project }) {
  const categoryNames = project.categorySlugs
    .map((slug) => findCategory(slug)?.name)
    .filter(Boolean)
    .join(' · ');

  return (
    <Link href={projectPath(project.slug)} className={styles.card}>
      <div className={styles.cover}>Обложка проекта</div>
      <div className={styles.body}>
        <div className={styles.top}>
          <span className={styles.name}>{project.name}</span>
          <span className={styles.votes}>
            <Triangle size={11} fill="currentColor" aria-hidden="true" />
            {project.votes}
          </span>
        </div>
        <div className={styles.tagline}>{project.tagline}</div>
        <div className={styles.categories}>{categoryNames}</div>
      </div>
    </Link>
  );
}
