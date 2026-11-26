import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import EmptyState from '@/components/EmptyState';
import ProjectRow from '@/components/ProjectRow';
import PeriodTabs from '@/components/PeriodTabs';
import SubcategoryFilter from '@/components/SubcategoryFilter';
import { categories, findCategory } from '@/lib/categories';
import { projectsByCategory } from '@/lib/mock';
import styles from './page.module.css';

/** В Next 15+ параметры адреса приходят обещанием, их нужно дожидаться. */
type PageProps = { params: Promise<{ slug: string }> };

/**
 * instant = false разрешает «блокирующий» маршрут.
 *
 * Иначе Next 16 требует, чтобы чтение адреса страницы было обёрнуто
 * в <Suspense>: он хочет сначала показать каркас, а содержимое долить
 * потом. Нам это не нужно — страница целиком собрана заранее, ждать
 * нечего, и дробить её на каркас и содержимое смысла нет.
 */
export const instant = false;

/**
 * Список адресов, которые Next соберёт заранее, при сборке сайта.
 * Благодаря этому страницы категорий отдаются как готовые файлы —
 * быстро для посетителя и хорошо для поиска.
 */
export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

/** Свои мета-теги для каждой категории — это важно для выдачи в Google. */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = findCategory(slug);

  if (!category) return { title: 'Категория не найдена' };

  return {
    title: category.name,
    description: category.description,
    openGraph: {
      title: `${category.name} · ProductCase`,
      description: category.description,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = findCategory(slug);

  // Неизвестный слаг — отдаём 404, а не пустую страницу.
  // Пустая страница с кодом 200 попала бы в индекс Google как мусор.
  if (!category) notFound();

  const list = projectsByCategory(category.slug);

  // Три соседние категории для блока «Похожие» — берём по кругу,
  // чтобы у последней категории тоже были соседи
  const index = categories.findIndex((c) => c.slug === category.slug);
  const related = [1, 2, 3].map((step) => categories[(index + step) % categories.length]);

  return (
    <main id="main" className={styles.main}>
      <p className={styles.crumbs}>
        <Link href="/">Главная</Link> / <Link href="/#categories">Категории</Link> /{' '}
        {category.name}
      </p>

      <h1 className={styles.title}>{category.name}</h1>
      <p className={styles.description}>{category.description}</p>

      <SubcategoryFilter subs={category.subs} />

      <div className={styles.columns}>
        <section className={styles.list}>
          <div className={styles.listHead}>
            <h2 className={styles.listTitle}>Лучшие в категории</h2>
            <PeriodTabs initial="week" />
          </div>

          {list.length > 0 ? (
            list.map((project) => (
              <ProjectRow key={project.slug} project={project} variant="list" />
            ))
          ) : (
            <EmptyState
              illustration="projects"
              title="Пока нет проектов в этой категории"
              text={`Станьте первым, кто покажет свой проект в категории «${category.name}».`}
              headingLevel={3}
            >
              <Link href="/submit" className="btn btnPrimary">
                Опубликовать проект
              </Link>
              <Link href="/#categories" className="btn btnSecondary">
                Другие категории
              </Link>
            </EmptyState>
          )}

          <p className={styles.disclaimer}>Пример: проекты и цифры условные</p>
        </section>

        <aside className={styles.aside}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Похожие категории</h2>
            <div className={styles.relatedList}>
              {related.map((item) => (
                <Link key={item.slug} href={`/category/${item.slug}`}>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.cardDark}>
            <h2 className={styles.cardTitle}>Сделал проект?</h2>
            <p className={styles.cardDarkText}>
              Опубликуй его в категории «{category.name}» и собери первых
              пользователей.
            </p>
            <Link href="/submit" className={styles.cardDarkBtn}>
              Добавить проект
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
