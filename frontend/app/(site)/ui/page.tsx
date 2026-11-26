import Link from 'next/link';
import type { Metadata } from 'next';
import Avatar from '@/components/Avatar';
import EmptyState from '@/components/EmptyState';
import {
  CommentSkeleton,
  ProjectGridSkeleton,
  ProjectListSkeleton,
} from '@/components/Skeleton';
import StatusBadge from '@/components/StatusBadge';
import { LoadErrorDemo, ToastDemo } from '@/components/UiDemos';
import VoteButton from '@/components/VoteButton';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Состояния интерфейса',
  robots: { index: false, follow: false },
};

/**
 * Витрина состояний: всё, что без бэкенда на живых страницах
 * не увидеть или увидеть трудно, — в одном месте.
 * Служебная страница для разработки и дизайна. Перед запуском
 * её можно закрыть паролем или убрать.
 */
export default function UiPage() {
  return (
    <main id="main" className={styles.main}>
      <h1 className={styles.title}>Состояния интерфейса</h1>
      <p className={styles.lead}>
        Служебная страница: скелетоны, пустые состояния, ошибки, статусы и мелкие анимации.
      </p>

      <Section title="Скелетоны">
        <p className={styles.note}>
          Показываются при переходе между страницами (файлы <code>loading.tsx</code>), пока грузятся
          данные.
        </p>
        <h3 className={styles.sub}>Список проектов</h3>
        <ProjectListSkeleton count={2} />
        <h3 className={styles.sub}>Карточки</h3>
        <ProjectGridSkeleton count={3} />
        <h3 className={styles.sub}>Комментарий</h3>
        <CommentSkeleton />
      </Section>

      <Section title="Пустые состояния">
        <div className={styles.grid2}>
          <EmptyState
            illustration="projects"
            title="Пока нет проектов в этой категории"
            text="Станьте первым, кто покажет свой проект здесь."
            headingLevel={3}
          >
            <Link href="/submit" className="btn btnPrimary">
              Опубликовать проект
            </Link>
          </EmptyState>
          <EmptyState
            illustration="comments"
            title="Комментариев пока нет — будьте первым"
            text="Спросите автора о проекте или расскажите, как вы им пользуетесь."
            headingLevel={3}
          >
            <button type="button" className="btn btnSecondary">
              Написать комментарий
            </button>
          </EmptyState>
          <EmptyState
            illustration="projects"
            title="У вас пока нет проектов"
            text="Расскажите о том, что сделали. После проверки проект появится в ленте."
            headingLevel={3}
          >
            <Link href="/submit" className="btn btnPrimary">
              Добавить первый проект
            </Link>
          </EmptyState>
          <EmptyState
            illustration="search"
            title="Ничего не найдено"
            text="По запросу «блокчейн» проектов нет. Проверьте написание или поищите по категории."
            headingLevel={3}
          >
            <Link href="/search" className="btn btnSecondary">
              Сбросить поиск
            </Link>
          </EmptyState>
        </div>
        <p className={styles.note}>
          Вживую: <Link href="/category/hardware">категория «Железо и IoT»</Link>,{' '}
          <Link href="/projects/dastras">комментарии у «Дастрас»</Link>,{' '}
          <Link href="/search?q=блокчейн">поиск «блокчейн»</Link>.
        </p>
      </Section>

      <Section title="Ошибки">
        <h3 className={styles.sub}>Не удалось загрузить</h3>
        <LoadErrorDemo />
        <h3 className={styles.sub}>Ошибки в форме</h3>
        <p className={styles.note}>
          Откройте <Link href="/submit">публикацию проекта</Link> или{' '}
          <Link href="/settings">настройки профиля</Link> и нажмите «Отправить» / «Сохранить» с пустыми
          полями: появится сводка ошибок со ссылками на поля и подсказки под каждым полем.
        </p>
      </Section>

      <Section title="Статусы проекта">
        <div className={styles.row}>
          <StatusBadge status="draft" />
          <StatusBadge status="pending" />
          <StatusBadge status="published" />
          <StatusBadge status="rejected" />
        </div>
        <p className={styles.note}>
          Вживую — в <Link href="/me/projects">«Моих проектах»</Link>.
        </p>
      </Section>

      <Section title="Тосты">
        <ToastDemo />
      </Section>

      <Section title="Кнопка голоса">
        <p className={styles.note}>Нажмите: стрелка подпрыгивает, цифра прокручивается.</p>
        <div className={styles.row}>
          <VoteButton votes={312} />
          <VoteButton votes={99} />
          <VoteButton votes={187} variant="large" />
        </div>
      </Section>

      <Section title="Аватары-заглушки">
        <div className={styles.row}>
          {['Фаррух Раҳимов', 'Мадина Каримова', 'Алишер Назаров', 'Ҳусейн', 'Сухроб', 'Ӯғилой'].map(
            (name) => (
              <span key={name} className={styles.avatarItem}>
                <Avatar name={name} size={48} />
                <span>{name}</span>
              </span>
            ),
          )}
        </div>
      </Section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}
