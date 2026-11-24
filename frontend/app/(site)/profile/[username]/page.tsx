import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Triangle } from 'lucide-react';
import ProfileTabs from '@/components/ProfileTabs';
import { findCategory } from '@/lib/categories';
import { author, projects } from '@/lib/mock';
import styles from './page.module.css';

type PageProps = { params: Promise<{ username: string }> };

/** Страница собрана заранее целиком. */
export const instant = false;

export function generateStaticParams() {
  return [{ username: author.username }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;

  if (username !== author.username) return { title: 'Профиль не найден' };

  return {
    title: author.name,
    description: `${author.role} · ${author.city}. ${author.about}`,
    openGraph: {
      title: `${author.name} · ProductCase`,
      description: author.about,
      type: 'profile',
    },
  };
}

export default async function ProfilePage({ params }: PageProps) {
  const { username } = await params;

  // Пока в заглушках один автор. С бэкендом здесь будет запрос в базу.
  if (username !== author.username) notFound();

  const ownProjects = projects.filter((p) => p.authorUsername === author.username);

  /* Сетка проектов автора */
  const projectsTab = (
    <div className={styles.grid}>
      {ownProjects.map((project) => {
        const categoryNames = project.categorySlugs
          .map((slug) => findCategory(slug)?.name)
          .filter(Boolean)
          .join(' · ');

        return (
          <Link
            key={project.slug}
            href={`/project/${project.slug}`}
            className={styles.card}
          >
            <div className={styles.cover}>Обложка проекта</div>
            <div className={styles.cardBody}>
              <div className={styles.cardTop}>
                <span className={styles.cardName}>{project.name}</span>
                <span className={styles.cardVotes}>
                  <Triangle size={11} fill="currentColor" aria-hidden="true" />
                  {project.votes}
                </span>
              </div>
              <div className={styles.cardTagline}>{project.tagline}</div>
              <div className={styles.cardCategories}>{categoryNames}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );

  const votedTab = (
    <p className={styles.emptyTab}>
      Здесь будут проекты, за которые проголосовал автор.
    </p>
  );

  return (
    <main className={styles.main}>
      <section className={styles.header}>
        <div className={styles.avatar} aria-hidden="true">
          {author.initials}
        </div>

        <div className={styles.headerText}>
          <h1 className={styles.name}>{author.name}</h1>
          <p className={styles.role}>
            {author.role} · {author.city}
          </p>
          <p className={styles.about}>{author.about}</p>

          <div className={styles.links}>
            {author.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.stats}>
          <div>
            <div className={styles.statValue}>{author.stats.projects}</div>
            <div className={styles.statLabel}>проекта</div>
          </div>
          <div>
            <div className={styles.statValue}>{author.stats.votes}</div>
            <div className={styles.statLabel}>голоса</div>
          </div>
          <div>
            <div className={styles.statValue}>{author.stats.topDays}</div>
            <div className={styles.statLabel}>раз в топе дня</div>
          </div>
        </div>
      </section>

      <ProfileTabs projectsTab={projectsTab} votedTab={votedTab} />

      <p className={styles.disclaimer}>
        Пример: автор, проекты и цифры условные
      </p>
    </main>
  );
}
