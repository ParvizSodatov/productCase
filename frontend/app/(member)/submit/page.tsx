import Link from 'next/link';
import type { Metadata } from 'next';
import SubmitForm from '@/components/SubmitForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Опубликовать проект',
  description:
    'Расскажи о своём IT-проекте: название, описание, скриншоты и ссылка. После проверки модератором проект появится в ленте ProductCase.',
  // Страницу-форму в поиске показывать не нужно
  robots: { index: false, follow: true },
};

/**
 * Страница публикации. Сама страница серверная (заголовок, мета-теги),
 * интерактивна только форма — SubmitForm. Там же описано, что
 * обязательно проверять на сервере.
 */
export default function SubmitPage() {
  return (
    <main id="main" className={styles.main}>
      <h1 className={styles.title}>Опубликовать проект</h1>
      <p className={styles.lead}>
        Заполни карточку. После проверки модератором проект появится в ленте. Поля со звёздочкой обязательны.
      </p>

      <SubmitForm />

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
