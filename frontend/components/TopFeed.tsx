import Link from 'next/link';
import { Crown } from 'lucide-react';
import VoteButton from './VoteButton';
import PeriodTabs from './PeriodTabs';
import { findCategory } from '@/lib/categories';
import type { Project } from '@/lib/mock';
import { projectGradient } from '@/lib/projectTheme';
import { projectPath } from '@/lib/site';
import styles from './TopFeed.module.css';

/**
 * Лента «Топ сегодня» на первом экране.
 *
 * Первое место — большая карточка-лидер с короной и золотой рамкой,
 * остальные — строки с местом, цветным логотипом и полоской голосов
 * относительно лидера. Серверный компонент: клиентские тут только
 * кнопки голоса и вкладки периода.
 */
export default function TopFeed({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  const [leader, ...rest] = projects;
  const maxVotes = leader.votes || 1;

  return (
    <div className={styles.stack}>
      <div id="feed" className={styles.card}>
        <div className={styles.head}>
          <h2 className={styles.title}>
            <span className={styles.live} aria-hidden="true" />
            Топ сегодня
          </h2>
          <PeriodTabs />
        </div>

        <ol className={styles.list}>
          {/* ---------- Лидер ---------- */}
          <li className={styles.leader} style={{ animationDelay: '0.05s' }}>
            <span className={styles.crown} aria-hidden="true">
              <Crown size={16} />
            </span>
            <span className="visuallyHidden">1 место: </span>

            <Link
              href={projectPath(leader.slug)}
              className={styles.logoBig}
              style={{ background: projectGradient(leader.slug) }}
              aria-hidden="true"
              tabIndex={-1}
            >
              {leader.initial}
            </Link>

            <div className={styles.body}>
              <span className={styles.leaderBadge}>Проект дня</span>
              <Link href={projectPath(leader.slug)} className={styles.leaderName}>
                {leader.name}
              </Link>
              <p className={styles.tagline}>{leader.tagline}</p>
              <Chips project={leader} />
            </div>

            <VoteButton votes={leader.votes} />
          </li>

          {/* ---------- Остальные места ---------- */}
          {rest.map((project, i) => {
            const place = i + 2;
            return (
              <li
                key={project.slug}
                className={styles.row}
                style={{ animationDelay: `${0.12 + i * 0.07}s` }}
              >
                <span className={styles.place} data-place={place}>
                  <span className="visuallyHidden">Место </span>
                  {place}
                </span>

                <Link
                  href={projectPath(project.slug)}
                  className={styles.logo}
                  style={{ background: projectGradient(project.slug) }}
                  aria-hidden="true"
                  tabIndex={-1}
                >
                  {project.initial}
                </Link>

                <div className={styles.body}>
                  <Link href={projectPath(project.slug)} className={styles.name}>
                    {project.name}
                  </Link>
                  <p className={styles.tagline}>{project.tagline}</p>
                  {/* Полоска: сколько голосов у проекта относительно лидера */}
                  <span className={styles.bar} aria-hidden="true">
                    <span
                      className={styles.barFill}
                      style={{ width: `${Math.round((project.votes / maxVotes) * 100)}%` }}
                    />
                  </span>
                </div>

                <VoteButton votes={project.votes} />
              </li>
            );
          })}
        </ol>

        <p className={styles.disclaimer}>Пример ленты: проекты и цифры условные</p>
      </div>
    </div>
  );
}

function Chips({ project }: { project: Project }) {
  const names = project.categorySlugs
    .map((slug) => findCategory(slug)?.name)
    .filter((name): name is string => Boolean(name));

  return (
    <div className={styles.chips}>
      {names.map((name) => (
        <span key={name} className={styles.chip}>
          {name}
        </span>
      ))}
    </div>
  );
}
