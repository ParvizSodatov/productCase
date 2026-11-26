import Link from 'next/link';
import Form from 'next/form';
import type { Metadata } from 'next';
import { Search } from 'lucide-react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Illustration from '@/components/Illustration';
import styles from './not-found.module.css';

export const metadata: Metadata = {
  title: 'Страница не найдена',
  robots: { index: false },
};

/**
 * Страница 404. Next показывает её, когда адрес не найден
 * или когда страница вызвала notFound().
 *
 * С шапкой и подвалом: человек, попавший сюда по битой ссылке,
 * сразу видит, куда идти дальше, а не упирается в тупик.
 */
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className={styles.main}>
        <Illustration name="notFound" size={200} />
        <p className={styles.code}>Ошибка 404</p>
        <h1 className={styles.title}>Такой страницы нет</h1>
        <p className={styles.lead}>
          Возможно, проект удалили, переименовали или в адресе опечатка.
        </p>

        <div className={styles.actions}>
          <Link href="/" className="btn btnPrimary">
            На главную
          </Link>
          <Link href="/#categories" className="btn btnSecondary">
            Смотреть категории
          </Link>
        </div>

        <Form action="/search" className={styles.search} role="search">
          <label htmlFor="nf-q" className="visuallyHidden">
            Найти проект
          </label>
          <Search size={18} className={styles.searchIcon} aria-hidden="true" />
          <input
            id="nf-q"
            name="q"
            type="search"
            placeholder="Или найдите проект по названию"
            className={styles.searchInput}
          />
        </Form>
      </main>
      <Footer />
    </>
  );
}
