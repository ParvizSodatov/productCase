'use client';

/**
 * Переключатель разделов профиля: Проекты · Понравилось.
 * Содержимое вкладок передаётся пропсами, чтобы сами списки
 * остались серверными и попали в HTML для поиска.
 */

import { useState } from 'react';
import styles from './ProfileTabs.module.css';

type ProfileTabsProps = {
  projectsTab: React.ReactNode;
  votedTab: React.ReactNode;
};

export default function ProfileTabs({ projectsTab, votedTab }: ProfileTabsProps) {
  const [tab, setTab] = useState<'projects' | 'voted'>('projects');

  const tabs = [
    { id: 'projects', label: 'Проекты' },
    { id: 'voted', label: 'Понравилось' },
  ] as const;

  return (
    <>
      <div className={styles.row} role="tablist" aria-label="Разделы профиля">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            className={`${styles.tab} ${tab === item.id ? styles.tabActive : ''}`}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === 'projects' ? projectsTab : votedTab}
    </>
  );
}
