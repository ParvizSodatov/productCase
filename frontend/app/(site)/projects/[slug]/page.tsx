import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ExternalLink, Trophy } from 'lucide-react';
import Avatar from '@/components/Avatar';
import Comments from '@/components/Comments';
import Gallery from '@/components/Gallery';
import ProjectCard from '@/components/ProjectCard';
import ReportButton from '@/components/ReportButton';
import ShareButtons from '@/components/ShareButtons';
import VoteButton from '@/components/VoteButton';
import { findCategory } from '@/lib/categories';
import {
  author as currentUser,
  commentsFor,
  dailyRank,
  findAuthor,
  findProject,
  pricingLabels,
  projects,
  similarProjects,
} from '@/lib/mock';
import { projectPath, siteUrl } from '@/lib/site';
import { parseYoutubeId } from '@/lib/youtube';
import styles from './page.module.css';

type PageProps = { params: Promise<{ slug: string }> };

/** Страница собрана заранее целиком, дробить её на каркас и содержимое не нужно. */
export const instant = false;

/** Сколько мест рейтинга дня показывать как достижение («#2 сегодня») */
const SHOWN_RANK_LIMIT = 10;

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

  // В превью ссылки нужен только первый абзац
  const firstParagraph = project.about.split('\n\n')[0];

  return {
    title: project.name,
    description: project.tagline,
    // Один адрес страницы для поисковика, даже если пришли со старого /project/…
    alternates: { canonical: projectPath(project.slug) },
    openGraph: {
      title: `${project.name} — ${project.tagline}`,
      description: firstParagraph,
      type: 'article',
      url: projectPath(project.slug),
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) notFound();

  // Категорий не больше трёх. Обрезка здесь — страховка для вёрстки;
  // само правило должен держать сервер при сохранении проекта.
  const projectCategories = project.categorySlugs
    .map((categorySlug) => findCategory(categorySlug))
    .filter((category) => category !== undefined)
    .slice(0, 3);

  const firstCategory = projectCategories[0];

  const makers = project.makers
    .map((username) => findAuthor(username))
    .filter((maker) => maker !== undefined);

  const rank = dailyRank(project.slug);
  const showRank = rank !== undefined && rank <= SHOWN_RANK_LIMIT;

  const videoId = parseYoutubeId(project.videoUrl);
  const similar = similarProjects(project, 3);
  const paragraphs = project.about.split('\n\n');

  return (
    <main id="main" className={styles.main}>
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
            <span className={styles.pricing}>{pricingLabels[project.pricing]}</span>
          </div>
        </div>

        <div className={styles.headActions}>
          {/*
            Ссылка на чужой сайт, которую прислал автор проекта.
            rel="noopener noreferrer" обязателен: без noopener открытая
            страница получает доступ к объекту window нашей страницы и может
            её подменить. Это настоящая уязвимость, а не формальность.

            И ещё: на сервере при сохранении разрешать только адреса
            с https:// (или http://). Ссылка вида javascript:… в href
            выполнится по клику — это XSS.
          */}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className={styles.openBtn}
          >
            Перейти на сайт
            <ExternalLink size={16} aria-hidden="true" />
          </a>

          <div className={styles.voteBox}>
            <VoteButton votes={project.votes} variant="large" />
            {showRank && (
              <Link href="/#feed" className={styles.rank}>
                <Trophy size={14} aria-hidden="true" />#{rank} сегодня
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className={styles.shareRow}>
        <ShareButtons
          url={`${siteUrl}${projectPath(project.slug)}`}
          text={`${project.name} — ${project.tagline}`}
        />
        <ReportButton projectName={project.name} />
      </div>

      {/* ---------- Видео и скриншоты ---------- */}
      <Gallery projectName={project.name} screenshots={project.screenshots} videoId={videoId} />

      {/* ---------- Описание, комментарии и боковая панель ---------- */}
      <div className={styles.columns}>
        <div className={styles.content}>
          <h2 className={styles.sectionTitle}>О проекте</h2>
          {/* Текст автора выводим как значение — React его экранирует.
              Никакого dangerouslySetInnerHTML, даже ради абзацев. */}
          {paragraphs.map((paragraph, index) => (
            <p key={index} className={styles.about}>
              {paragraph}
            </p>
          ))}

          {project.tags.length > 0 && (
            <ul className={styles.tags} aria-label="Теги">
              {project.tags.map((tag) => (
                <li key={tag} className={styles.tag}>
                  #{tag}
                </li>
              ))}
            </ul>
          )}

          <Comments
            initial={commentsFor(project.slug)}
            me={{ name: currentUser.name, username: currentUser.username }}
          />
        </div>

        <aside className={styles.aside}>
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Создатели</h2>
            <ul className={styles.makers}>
              {makers.map((maker) => (
                <li key={maker.username}>
                  <Link href={`/profile/${maker.username}`} className={styles.maker}>
                    <Avatar name={maker.name} size={44} />
                    <span className={styles.makerText}>
                      <span className={styles.makerName}>{maker.name}</span>
                      <span className={styles.makerRole}>
                        {maker.username === project.authorUsername
                          ? `Владелец · ${maker.role}`
                          : maker.role}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

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

      {/* ---------- Похожие проекты ---------- */}
      {similar.length > 0 && (
        <section className={styles.similar}>
          <h2 className={styles.sectionTitle}>Похожие проекты</h2>
          <div className={styles.similarGrid}>
            {similar.map((item) => (
              <ProjectCard key={item.slug} project={item} />
            ))}
          </div>
        </section>
      )}

      <p className={styles.disclaimer}>
        Пример: проект, создатели, видео и комментарии условные
      </p>
    </main>
  );
}
