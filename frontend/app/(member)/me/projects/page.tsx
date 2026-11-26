import Link from 'next/link';
import type { Metadata } from 'next';
import { Plus, Triangle } from 'lucide-react';
import EmptyState from '@/components/EmptyState';
import StatusBadge from '@/components/StatusBadge';
import { myProjects, type MyProject } from '@/lib/mock';
import { projectPath } from '@/lib/site';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Мои проекты',
  robots: { index: false, follow: false },
};

/**
 * Кабинет автора: все его проекты со статусами.
 * С бэкендом — только проекты из сессии; чужие статусы и причины
 * отказа видеть никто, кроме автора и модераторов, не должен.
 */
export default function MyProjectsPage() {
  return (
    <main id="main" className={styles.main}>
      <div className={styles.head}>
        <div>
          <h1 className={styles.title}>Мои проекты</h1>
          <p className={styles.lead}>Черновики, проекты на проверке и опубликованные.</p>
        </div>
        <Link href="/submit" className="btn btnPrimary">
          <Plus size={18} aria-hidden="true" />
          Добавить проект
        </Link>
      </div>

      {myProjects.length === 0 ? (
        <EmptyState
          illustration="projects"
          title="У вас пока нет проектов"
          text="Расскажите о том, что сделали: сайт, бот, приложение. После проверки проект появится в ленте."
        >
          <Link href="/submit" className="btn btnPrimary">
            Добавить первый проект
          </Link>
        </EmptyState>
      ) : (
        <ul className={styles.list}>
          {myProjects.map((project) => (
            <MyProjectRow key={project.slug} project={project} />
          ))}
        </ul>
      )}
    </main>
  );
}

function MyProjectRow({ project }: { project: MyProject }) {
  return (
    <li className={styles.row}>
      <div className={styles.mark} aria-hidden="true">
        {project.name.charAt(0)}
      </div>

      <div className={styles.body}>
        <div className={styles.nameRow}>
          <h2 className={styles.name}>{project.name}</h2>
          <StatusBadge status={project.status} />
        </div>
        <p className={styles.tagline}>{project.tagline}</p>
        <p className={styles.meta}>
          {STATUS_NOTE[project.status]} · {project.updatedAt}
        </p>

        {project.status === 'rejected' && project.rejectReason && (
          <div className={styles.reason}>
            <strong>Причина отказа:</strong> {project.rejectReason}
          </div>
        )}
      </div>

      <div className={styles.actions}>
        {project.status === 'published' && (
          <>
            <span className={styles.votes}>
              <Triangle size={12} fill="currentColor" aria-hidden="true" />
              {project.votes}
              <span className="visuallyHidden">голосов</span>
            </span>
            <Link href={projectPath(project.slug)} className="btn btnSecondary btnSmall">
              Открыть
            </Link>
          </>
        )}
        {project.status === 'draft' && (
          <Link href="/submit" className="btn btnDark btnSmall">
            Продолжить
          </Link>
        )}
        {project.status === 'rejected' && (
          <Link href="/submit" className="btn btnPrimary btnSmall">
            Исправить
          </Link>
        )}
      </div>
    </li>
  );
}

const STATUS_NOTE: Record<MyProject['status'], string> = {
  draft: 'Видите только вы',
  pending: 'Проверка обычно занимает до суток',
  published: 'В ленте',
  rejected: 'Можно исправить и отправить снова',
};
