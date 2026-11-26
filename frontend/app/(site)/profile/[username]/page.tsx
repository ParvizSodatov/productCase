import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Avatar from '@/components/Avatar';
import EmptyState from '@/components/EmptyState';
import ProfileTabs from '@/components/ProfileTabs';
import ProjectCard from '@/components/ProjectCard';
import { authors, findAuthor, projects } from '@/lib/mock';
import styles from './page.module.css';

type PageProps = { params: Promise<{ username: string }> };

/** Страница собрана заранее целиком. */
export const instant = false;

export function generateStaticParams() {
  return authors.map((person) => ({ username: person.username }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const author = findAuthor(username);

  if (!author) return { title: 'Профиль не найден' };

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

  // С бэкендом здесь будет запрос в базу
  const author = findAuthor(username);

  if (!author) notFound();

  const ownProjects = projects.filter((p) => p.makers.includes(author.username));

  /* Сетка проектов, в которых человек среди создателей */
  const projectsTab =
    ownProjects.length > 0 ? (
      <div className={styles.grid}>
        {ownProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    ) : (
      <div className={styles.emptyWrap}>
        <EmptyState
          illustration="projects"
          title="Пока нет опубликованных проектов"
          text="Когда проекты пройдут модерацию, они появятся здесь."
          headingLevel={3}
        >
          <Link href="/submit" className="btn btnPrimary">
            Опубликовать проект
          </Link>
        </EmptyState>
      </div>
    );

  const votedTab = (
    <div className={styles.emptyWrap}>
      <EmptyState
        illustration="projects"
        title="Здесь будут проекты, за которые проголосовал автор"
        headingLevel={3}
      />
    </div>
  );

  return (
    <main id="main" className={styles.main}>
      <section className={styles.header}>
        <Avatar name={author.name} size={96} />

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
