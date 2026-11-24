import Link from 'next/link';
import type { Metadata } from 'next';
import CategoryPicker from '@/components/CategoryPicker';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Опубликовать проект',
  description:
    'Расскажи о своём IT-проекте: название, описание, скриншоты и ссылка. После проверки модератором проект появится в ленте ProductCase.',
  // Страницу-форму в поиске показывать не нужно
  robots: { index: false, follow: true },
};

/**
 * Форма публикации проекта.
 *
 * Пока форма ничего не отправляет — это вёрстка.
 *
 * ЧТО ОБЯЗАТЕЛЬНО СДЕЛАТЬ НА СЕРВЕРЕ, когда появится бэкенд:
 *
 * 1. Поле «Ссылка». Проверять, что адрес начинается с http:// или https://.
 *    Адрес вида javascript:... — это способ выполнить чужой скрипт у
 *    посетителей, который открыл ссылку. Белый список схем, а не чёрный.
 *
 * 2. Загрузка картинок. Не доверять ни имени файла, ни заголовку типа:
 *    их задаёт тот, кто отправляет. Проверять настоящий тип по первым
 *    байтам файла, ограничивать размер и пересохранять картинку
 *    (это убирает спрятанный внутри код). Имя файла придумывать своё.
 *
 * 3. Проверять длину всех полей и количество категорий заново — проверки
 *    в браузере обходятся запросом напрямую.
 *
 * 4. Публиковать только после модерации, как и написано пользователю.
 */
export default function SubmitPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Опубликовать проект</h1>
      <p className={styles.lead}>
        Заполни карточку. После проверки модератором проект появится в ленте.
      </p>

      <form className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>
            Название
          </label>
          <input
            id="name"
            name="name"
            type="text"
            maxLength={80}
            placeholder="Например, Tarjuma Bot"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="tagline" className={styles.label}>
            Короткое описание
          </label>
          <input
            id="tagline"
            name="tagline"
            type="text"
            maxLength={60}
            placeholder="Одна строка: что делает проект"
            className={styles.input}
          />
          <span className={styles.help}>До 60 символов</span>
        </div>

        <div className={styles.field}>
          <label htmlFor="about" className={styles.label}>
            Подробно о проекте
          </label>
          <textarea
            id="about"
            name="about"
            rows={5}
            maxLength={4000}
            placeholder="Какую проблему решает, для кого, чем отличается"
            className={styles.textarea}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="link" className={styles.label}>
            Ссылка
          </label>
          <input
            id="link"
            name="link"
            type="url"
            placeholder="https:// или t.me/..."
            className={styles.input}
          />
        </div>

        <CategoryPicker />

        <div className={styles.field}>
          <span className={styles.label}>Логотип и скриншоты</span>
          <div className={styles.uploads}>
            <button type="button" className={styles.uploadLogo}>
              Логотип
            </button>
            <button type="button" className={styles.uploadShots}>
              Перетащи до 5 скриншотов или нажми, чтобы выбрать
              <span className={styles.uploadHint}>PNG или JPG, до 5 МБ каждый</span>
            </button>
          </div>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.draftBtn}>
            Сохранить черновик
          </button>
          <button type="submit" className={styles.submitBtn}>
            Отправить на проверку
          </button>
        </div>
      </form>

      <p className={styles.rules}>
        Публикуя проект, ты соглашаешься с{' '}
        <Link href="/rules" className={styles.rulesLink}>
          правилами площадки
        </Link>
        : только IT-проекты, без политики и чужого контента.
      </p>
    </main>
  );
}
