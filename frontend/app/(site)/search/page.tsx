import Link from 'next/link';
import Form from 'next/form';
import type { Metadata } from 'next';
import { Search } from 'lucide-react';
import EmptyState from '@/components/EmptyState';
import ProjectRow from '@/components/ProjectRow';
import { categories } from '@/lib/categories';
import { searchProjects } from '@/lib/mock';
import styles from './page.module.css';

type PageProps = { searchParams: Promise<{ q?: string | string[] }> };

/** Страница зависит от запроса — заранее её не собрать, рендерится на каждый запрос */
export const instant = false;

export const metadata: Metadata = {
  title: 'Поиск проектов',
  // Страницы результатов поиска в выдаче Google не нужны — это «пустые»
  // страницы-дубли. Ссылки с них поисковик пусть проходит (follow).
  robots: { index: false, follow: true },
};

/** Подсказки, когда искать ещё нечего или ничего не нашлось */
const SUGGESTIONS = ['Telegram', 'ИИ', 'Для бизнеса', 'Обучение'];

export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  // ?q=a&q=b — берём первое; и ограничиваем длину, чтобы не гонять по базе
  // километровые строки (с бэкендом это важно и на сервере)
  const query = (Array.isArray(q) ? q[0] : q ?? '').trim().slice(0, 100);
  const results = searchProjects(query);

  return (
    <main id="main" className={styles.main}>
      <h1 className={styles.title}>Поиск проектов</h1>

      {/* next/form: обычная GET-форма, работает даже без JS,
          а с JS переходит на результаты без перезагрузки страницы */}
      <Form action="/search" className={styles.form} role="search">
        <label htmlFor="q" className="visuallyHidden">
          Что ищем
        </label>
        <Search size={20} className={styles.icon} aria-hidden="true" />
        <input
          id="q"
          name="q"
          type="search"
          defaultValue={query}
          placeholder="Название, задача или тег: «перевод», «Telegram»…"
          className={styles.input}
          maxLength={100}
          autoComplete="off"
        />
        <button type="submit" className="btn btnDark">
          Найти
        </button>
      </Form>

      {!query && (
        <div className={styles.suggest}>
          <span className={styles.suggestLabel}>Часто ищут:</span>
          {SUGGESTIONS.map((word) => (
            <Link key={word} href={`/search?q=${encodeURIComponent(word)}`} className={styles.chip}>
              {word}
            </Link>
          ))}
        </div>
      )}

      {query && results.length > 0 && (
        <section className={styles.results} aria-labelledby="results-title">
          {/* role="status": после перехода скринридер прочитает, сколько нашлось */}
          <h2 id="results-title" className={styles.count} role="status">
            Найдено: {results.length}
          </h2>
          {results.map((project) => (
            <ProjectRow key={project.slug} project={project} variant="list" />
          ))}
        </section>
      )}

      {query && results.length === 0 && (
        <div className={styles.results} role="status">
          <EmptyState
            illustration="search"
            title="Ничего не найдено"
            text={`По запросу «${query}» проектов нет. Проверьте написание или поищите по категории.`}
          >
            <Link href="/search" className="btn btnSecondary">
              Сбросить поиск
            </Link>
            <Link href="/#categories" className="btn btnDark">
              Все категории
            </Link>
          </EmptyState>

          <div className={styles.suggest}>
            <span className={styles.suggestLabel}>Попробуйте:</span>
            {categories.slice(0, 5).map((category) => (
              <Link key={category.slug} href={`/category/${category.slug}`} className={styles.chip}>
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
