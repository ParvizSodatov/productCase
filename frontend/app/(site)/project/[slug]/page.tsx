import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import VoteButton from '@/components/VoteButton';
import CommentForm from '@/components/CommentForm';
import { findCategory } from '@/lib/categories';
import { author, comments, findProject, projects } from '@/lib/mock';
import styles from './page.module.css';

type PageProps = { params: Promise<{ slug: string }> };

/** Страница собрана заранее целиком, дробить её на каркас и содержимое не нужно. */
export const instant = false;

/** Собираем страницы всех проектов заранее — они главные для поиска. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

/**
 * Мета-теги конкретного проекта.
 * Именно отсюда Telegram и WhatsApp берут превью, когда кидают ссылку.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) return { title: 'Проект не найден' };

  return {
    title: project.name,
    description: project.tagline,
    openGraph: {
      title: `${project.name} — ${project.tagline}`,
      description: project.about,
      type: 'article',
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) notFound();

  const projectCategories = project.categorySlugs
    .map((categorySlug) => findCategory(categorySlug))
    .filter((category) => category !== undefined);

  const firstCategory = projectCategories[0];

  return (
    <main className={styles.main}>
      <p className={styles.crumbs}>
        <Link href="/">Главная</Link>
        {firstCategory && (
          <>
            {' / '}
            <Link href={`/category/${firstCategory.slug}`}>{firstCategory.name}</Link>
          </>
        )}
        {' / '}
        {project.name}
      </p>

      {/* ---------- Заголовок проекта ---------- */}
      <div className={styles.head}>
        <div className={styles.mark} aria-hidden="true">
          {project.initial}
        </div>

        <div className={styles.headText}>
          <h1 className={styles.title}>{project.name}</h1>
          <p className={styles.tagline}>{project.tagline}</p>

          <div className={styles.badges}>
            {projectCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className={styles.badge}
              >
                {category.name}
              </Link>
            ))}
            <span className={styles.badgeOutline}>#1 сегодня</span>
          </div>
        </div>

        <div className={styles.headActions}>
          {/*
            Ссылка на чужой сайт, которую прислал автор проекта.
            rel="noopener noreferrer" обязателен: без noopener открытая
            страница получает доступ к объекту window нашей страницы и может
            её подменить. Это настоящая уязвимость, а не формальность.
          */}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className={styles.openBtn}
          >
            Открыть
          </a>
          <VoteButton votes={project.votes} variant="large" />
        </div>
      </div>

      {/* ---------- Скриншоты ---------- */}
      <div className={styles.shots}>
        {[1, 2, 3].map((number) => (
          <div key={number} className={styles.shot}>
            Скриншот {number}
          </div>
        ))}
      </div>

      {/* ---------- Описание, комментарии и боковая панель ---------- */}
      <div className={styles.columns}>
        <div className={styles.content}>
          <h2 className={styles.sectionTitle}>О проекте</h2>
          <p className={styles.about}>{project.about}</p>

          <h2 className={styles.sectionTitleSpaced}>
            Комментарии · {comments.length}
          </h2>

          <CommentForm />

          {comments.map((comment) => (
            <div key={comment.id} className={styles.comment}>
              <div className={styles.commentAvatar} aria-hidden="true">
                {comment.initial}
              </div>
              <div className={styles.commentBody}>
                <div className={styles.commentMeta}>
                  <span className={styles.commentName}>{comment.name}</span>{' '}
                  <span className={styles.commentWhen}>· {comment.when}</span>
                </div>
                {/* Текст подставляется как значение — React его экранирует,
                    поэтому вставить сюда скрипт нельзя */}
                <p className={styles.commentText}>{comment.text}</p>
              </div>
            </div>
          ))}
        </div>

        <aside className={styles.aside}>
          <Link href={`/profile/${author.username}`} className={styles.authorCard}>
            <div className={styles.authorAvatar} aria-hidden="true">
              {author.initials}
            </div>
            <div>
              <div className={styles.authorLabel}>Автор</div>
              <div className={styles.authorName}>{author.name}</div>
            </div>
          </Link>

          <div className={styles.infoCard}>
            <div>
              <span className={styles.infoLabel}>Опубликован:</span>{' '}
              {project.publishedAt}
            </div>
            <div>
              <span className={styles.infoLabel}>Платформа:</span> {project.platform}
            </div>
            <div>
              <span className={styles.infoLabel}>Цена:</span> {project.price}
            </div>
            <div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className={styles.infoLink}
              >
                {project.linkLabel}
              </a>
            </div>
          </div>
        </aside>
      </div>

      <p className={styles.disclaimer}>
        Пример: проект, автор и комментарии условные
      </p>
    </main>
  );
}
