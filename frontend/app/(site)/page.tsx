import Link from 'next/link';
import HeroBanner from '@/components/HeroBanner';
import { Award, ShieldCheck } from 'lucide-react';
import TopFeed from '@/components/TopFeed';
import WaitlistForm from '@/components/WaitlistForm';
import { categories } from '@/lib/categories';
import { topProjects } from '@/lib/mock';
import styles from './page.module.css';

/** Лендинг. Серверный компонент: весь текст уходит в HTML, его видит Google. */
export default function HomePage() {
  const feed = topProjects(4);

  return (
    <main id="main">
      {/* ---------- Баннер-карусель: проекты дня и промо ---------- */}
      <HeroBanner />

      {/* ---------- Первый экран: заголовок и лента топа ---------- */}
      <section id="top" className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.badge}>IT-проекты Таджикистана в одном месте</p>

          <h1 className={styles.title}>
            Покажи, что ты сделал.
            <br />
            <span className={styles.titleAccent}>
              Пусть страна <span className={styles.marker}>увидит.</span>
            </span>
          </h1>

          <p className={styles.lead}>
            Сайты, приложения, боты, ИИ-инструменты и всё цифровое, что делают у нас.
            Публикуй свой проект, собирай голоса и отзывы, попадай в топ дня.
          </p>

          <div className={styles.heroActions}>
            <Link href="/submit" className={styles.btnPrimary}>
              Добавить свой проект
            </Link>
            <Link href="#feed" className={styles.btnSecondary}>
              Смотреть проекты
            </Link>
          </div>

          <p className={styles.note}>
            Бесплатно для авторов. Вход через GitHub или Google.
          </p>
        </div>

        <div className={styles.feedArea}>
          <TopFeed projects={feed} />

          {/* Плавающие плашки вокруг ленты — декор, смысл есть и в тексте ниже */}
          <span className={`${styles.floatChip} ${styles.floatChipTop}`} aria-hidden="true">
            <ShieldCheck size={16} />
            Один аккаунт — один голос
          </span>
          <span className={`${styles.floatChip} ${styles.floatChipBottom}`} aria-hidden="true">
            <Award size={16} />
            Бейдж для портфолио
          </span>
        </div>
      </section>

      {/* ---------- Категории ---------- */}
      <section id="categories" className={styles.band}>
        <div className={styles.bandInner}>
          <h2 className={styles.sectionTitle}>Всё, что связано с IT и цифрой</h2>
          <p className={styles.sectionLead}>
            Не только сайты. Один проект может быть сразу в нескольких категориях.
          </p>

          <div className={styles.categoryGrid}>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className={styles.categoryCard}
              >
                <div className={styles.categoryName}>{category.name}</div>
                <div className={styles.categoryExamples}>{category.examples}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Как это работает ---------- */}
      <section id="how" className={styles.section}>
        <h2 className={styles.sectionTitleSpaced}>Как это работает</h2>

        <div className={styles.stepGrid}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>01</div>
            <h3 className={styles.stepTitle}>Опубликуй проект</h3>
            <p className={styles.stepText}>
              Название, описание, скриншоты, ссылка и категория. Пара минут, и проект
              в ленте.
            </p>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>02</div>
            <h3 className={styles.stepTitle}>Собери голоса и отзывы</h3>
            <p className={styles.stepText}>
              Люди голосуют и комментируют. Один аккаунт — один голос, накрутить
              нельзя.
            </p>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>03</div>
            <h3 className={styles.stepTitle}>Попади в топ</h3>
            <p className={styles.stepText}>
              Лучшие проекты дня и недели получают бейдж для сайта, резюме и
              портфолио.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Для кого ---------- */}
      <section className={styles.sectionTight}>
        <h2 className={styles.sectionTitleSpaced}>Для кого</h2>

        <div className={styles.audienceGrid}>
          <div className={styles.audience}>
            <h3 className={styles.audienceTitle}>Разработчики и студенты</h3>
            <p className={styles.stepText}>
              Первые пользователи, честные отзывы и профиль, который работает как
              портфолио.
            </p>
          </div>

          <div className={styles.audience}>
            <h3 className={styles.audienceTitle}>Студии и IT-компании</h3>
            <p className={styles.stepText}>
              Витрина ваших продуктов и новые клиенты, которые ищут решения у нас.
            </p>
          </div>

          <div className={styles.audience}>
            <h3 className={styles.audienceTitle}>Пользователи</h3>
            <p className={styles.stepText}>
              Полезные местные сервисы, боты и приложения, которые сложно найти в
              другом месте.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Сбор первых проектов ---------- */}
      <section className={styles.ctaWrap}>
        <div className={styles.cta}>
          <div className={styles.ctaText}>
            <h2 className={styles.ctaTitle}>
              Собираем первые проекты{' '}
              <span className={styles.ctaAccent}>к запуску</span>
            </h2>
            <p className={styles.ctaLead}>
              Оставь контакт, и мы позовём тебя разместить проект одним из первых.
            </p>
          </div>

          <WaitlistForm />
        </div>
      </section>
    </main>
  );
}
