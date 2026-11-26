import Link from 'next/link';
import type { Metadata } from 'next';
import { Mail, Send } from 'lucide-react';
import { contacts } from '@/lib/site';
import styles from '../prose.module.css';

export const metadata: Metadata = {
  title: 'О проекте',
  description:
    'ProductCase — витрина IT-проектов Таджикистана, местный аналог Product Hunt. Зачем мы это делаем, как устроена площадка и как с нами связаться.',
};

const SECTIONS = [
  { id: 'why', title: 'Зачем' },
  { id: 'how', title: 'Как это устроено' },
  { id: 'principles', title: 'Принципы' },
  { id: 'contacts', title: 'Контакты' },
];

export default function AboutPage() {
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
        <p className={styles.eyebrow}>О проекте</p>
        <h1 className={styles.title}>Покажи, что ты сделал. Пусть страна увидит.</h1>
        <p className={styles.lead}>
          ProductCase — витрина IT-проектов Таджикистана, местный аналог Product Hunt. Разработчики,
          студии и компании публикуют проекты, люди голосуют и комментируют, лучшие попадают в топ дня
          и недели.
        </p>

        <section id="why" className={styles.section}>
          <h2>Зачем</h2>
          <p>
            У нас делают много хорошего: ботов, сервисы, приложения. Но найти их сложно — они
            разбросаны по Telegram-каналам и сарафанному радио. Авторам негде получить первых
            пользователей и честные отзывы, а людям — узнать, что полезный местный сервис уже существует.
          </p>
          <p>ProductCase собирает всё это в одном месте.</p>
        </section>

        <section id="how" className={styles.section}>
          <h2>Как это устроено</h2>
          <div className={styles.cards}>
            <div className={styles.cardItem}>
              <span className={styles.cardNumber}>01</span>
              <h3>Публикация</h3>
              <p>Автор входит через GitHub или Google и заполняет карточку проекта.</p>
            </div>
            <div className={styles.cardItem}>
              <span className={styles.cardNumber}>02</span>
              <h3>Модерация</h3>
              <p>Модератор проверяет проект по правилам — обычно в течение суток.</p>
            </div>
            <div className={styles.cardItem}>
              <span className={styles.cardNumber}>03</span>
              <h3>Голоса и топ</h3>
              <p>Один аккаунт — один голос. Лучшие проекты попадают в топ дня и недели.</p>
            </div>
          </div>
        </section>

        <section id="principles" className={styles.section}>
          <h2>Принципы</h2>
          <ul>
            <li>
              <strong>Только проекты.</strong> Без вакансий, поиска инвесторов и людей в команду — для
              этого есть другие площадки.
            </li>
            <li>
              <strong>Без политики.</strong> Только IT и цифровизация.
            </li>
            <li>
              <strong>Честные голоса.</strong> Накрутку обнуляем, за повторную — блокируем.
            </li>
            <li>
              <strong>Бесплатно для авторов.</strong> Публикация проекта ничего не стоит.
            </li>
          </ul>
          <p>
            Подробно — в <Link href="/rules">правилах площадки</Link>.
          </p>
        </section>

        <section id="contacts" className={styles.section}>
          <h2>Контакты</h2>
          <div className={styles.cards}>
            <div className={styles.cardItem}>
              <h3>Telegram-канал</h3>
              <p>Новости площадки и лучшие проекты недели.</p>
              <a
                href={contacts.telegramChannel}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                <Send size={16} aria-hidden="true" />
                Открыть канал
              </a>
            </div>
            <div className={styles.cardItem}>
              <h3>Почта</h3>
              <p>Вопросы, спорные решения модерации, сотрудничество.</p>
              <a href={`mailto:${contacts.email}`} className={styles.contactLink}>
                <Mail size={16} aria-hidden="true" />
                {contacts.email}
              </a>
            </div>
          </div>
        </section>

        <div className={styles.cta}>
          <div>
            <h2>Сделали проект?</h2>
            <p>Расскажите о нём — это бесплатно и занимает пару минут.</p>
          </div>
          <Link href="/submit" className="btn btnPrimary">
            Опубликовать проект
          </Link>
        </div>
      </article>
    </main>
  );
}
