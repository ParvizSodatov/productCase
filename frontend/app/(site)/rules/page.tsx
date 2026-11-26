import Link from 'next/link';
import type { Metadata } from 'next';
import { CircleCheck, CircleX } from 'lucide-react';
import styles from '../prose.module.css';

export const metadata: Metadata = {
  title: 'Правила площадки',
  description:
    'Что можно публиковать на ProductCase: только IT-проекты. Без политики, вакансий, поиска инвесторов и рекламы. Правила комментариев, модерация и жалобы.',
};

/*
  Текст правил — черновик по решениям из PROJECT.md. Перед запуском
  его стоит вычитать и, возможно, показать юристу.
*/

const SECTIONS = [
  { id: 'what', title: 'Что можно публиковать' },
  { id: 'project', title: 'Требования к проекту' },
  { id: 'votes', title: 'Голоса' },
  { id: 'comments', title: 'Комментарии' },
  { id: 'moderation', title: 'Модерация и жалобы' },
  { id: 'sanctions', title: 'Нарушения' },
];

export default function RulesPage() {
  return (
    <main id="main" className={styles.main}>
      <nav className={styles.toc} aria-label="Содержание">
        <h2 className={styles.tocTitle}>Содержание</h2>
        <ol>
          {SECTIONS.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>{section.title}</a>
            </li>
          ))}
        </ol>
      </nav>

      <article className={styles.article}>
        <p className={styles.eyebrow}>Правила площадки</p>
        <h1 className={styles.title}>Только IT-проекты. Честно и по делу.</h1>
        <p className={styles.lead}>
          ProductCase — витрина того, что делают в Таджикистане: сайтов, приложений, ботов и всего
          цифрового. Правила короткие, чтобы витрина оставалась полезной.
        </p>
        <p className={styles.updated}>Черновик правил · ноябрь 2026</p>

        <section id="what" className={styles.section}>
          <h2>Что можно публиковать</h2>
          <div className={styles.split}>
            <div className={styles.allowed}>
              <h3>
                <CircleCheck size={18} aria-hidden="true" />
                Можно
              </h3>
              <ul>
                <li>Сайты, веб-сервисы и SaaS</li>
                <li>Мобильные приложения</li>
                <li>Боты в Telegram, WhatsApp, Discord</li>
                <li>ИИ-инструменты и автоматизацию</li>
                <li>Библиотеки и инструменты для разработчиков</li>
                <li>Игры, железо и IoT, цифровые услуги</li>
              </ul>
            </div>
            <div className={styles.forbidden}>
              <h3>
                <CircleX size={18} aria-hidden="true" />
                Нельзя
              </h3>
              <ul>
                <li>Политику и политическую агитацию</li>
                <li>Вакансии и поиск людей в команду</li>
                <li>Поиск инвесторов</li>
                <li>Рекламу, спам, «заработок без вложений»</li>
                <li>Чужие проекты без согласия авторов</li>
                <li>Азартные игры и запрещённое законом</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="project" className={styles.section}>
          <h2>Требования к проекту</h2>
          <ul>
            <li>Проект работает: ссылка открывается и ведёт на сам проект, а не на страницу в соцсети.</li>
            <li>Вы автор или участник команды. Если публикуете от компании — у вас есть на это право.</li>
            <li>Описание честное: что проект делает сейчас, а не что появится когда-нибудь.</li>
            <li>Скриншоты — ваши, без чужих логотипов и водяных знаков.</li>
            <li>Не больше трёх категорий: выбирайте те, где проект действительно уместен.</li>
          </ul>
        </section>

        <section id="votes" className={styles.section}>
          <h2>Голоса</h2>
          <p>
            Один аккаунт — один голос за проект. Голос можно снять. Покупать, обменивать и накручивать
            голоса запрещено: такие голоса мы обнуляем, а проект может быть снят с топа.
          </p>
          <p>Просить друзей проголосовать можно. Платить за голоса или раздавать за них подарки — нельзя.</p>
        </section>

        <section id="comments" className={styles.section}>
          <h2>Комментарии</h2>
          <ul>
            <li>По делу: вопросы автору, отзывы, предложения.</li>
            <li>Критикуйте проект, а не человека. Оскорбления удаляются.</li>
            <li>Без рекламы своих проектов в чужих обсуждениях — для этого есть своя страница проекта.</li>
            <li>Без политики, даже «к слову».</li>
          </ul>
        </section>

        <section id="moderation" className={styles.section}>
          <h2>Модерация и жалобы</h2>
          <p>
            Каждый проект перед публикацией смотрит модератор — обычно в течение суток. Если проект
            отклонён, вы увидите причину в разделе «Мои проекты», сможете исправить и отправить снова.
          </p>
          <p>
            Увидели нарушение — нажмите «Пожаловаться» у проекта или комментария. Жалобы анонимны для
            автора, модератор разбирает каждую.
          </p>
        </section>

        <section id="sanctions" className={styles.section}>
          <h2>Нарушения</h2>
          <ol>
            <li>Первое нарушение — удаление контента и предупреждение.</li>
            <li>Повторное — ограничение на публикацию и комментарии.</li>
            <li>Накрутка, спам или грубые нарушения — блокировка аккаунта.</li>
          </ol>
          <div className={styles.callout}>
            <p>
              Не согласны с решением модератора? Напишите нам — контакты на странице{' '}
              <Link href="/about#contacts">«О проекте»</Link>. Разберёмся.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
