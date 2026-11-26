import type { Metadata } from 'next';
import SettingsForm from '@/components/SettingsForm';
import { author } from '@/lib/mock';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Настройки профиля',
  robots: { index: false, follow: false },
};

/**
 * Настройки профиля вошедшего пользователя.
 * С бэкендом данные берутся из сессии; без входа — редирект на /login.
 */
export default function SettingsPage() {
  return (
    <main id="main" className={styles.main}>
      <h1 className={styles.title}>Настройки профиля</h1>
      <p className={styles.lead}>Так вас видят на странице проекта и в профиле.</p>
      <SettingsForm user={author} />
    </main>
  );
}
