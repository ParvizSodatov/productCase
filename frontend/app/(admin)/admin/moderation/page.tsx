import Link from 'next/link';
import type { Metadata } from 'next';
import ModerationBoard from '@/components/ModerationBoard';
import { moderationQueue, reports } from '@/lib/mock';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Модерация',
  robots: { index: false, follow: false },
};

export default function ModerationPage() {
  return (
    <main id="main" className={styles.main}>
      <h1 className={styles.title}>Модерация</h1>
      <p className={styles.lead}>
        Проверьте новые проекты по <Link href="/rules">правилам площадки</Link> и разберите жалобы.
      </p>
      <ModerationBoard queue={moderationQueue} reports={reports} />
    </main>
  );
}
