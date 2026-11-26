import { CircleCheck, CircleX, Clock, Pencil } from 'lucide-react';
import type { ProjectStatus } from '@/lib/mock';
import styles from './StatusBadge.module.css';

/**
 * Статус проекта для автора.
 *
 * Статус передаётся тремя способами сразу: словом, иконкой и цветом.
 * Только цветом нельзя: человек с дальтонизмом не отличит зелёный
 * «опубликован» от красного «отклонён».
 */
const STATUS = {
  draft: { label: 'Черновик', Icon: Pencil },
  pending: { label: 'На модерации', Icon: Clock },
  published: { label: 'Опубликован', Icon: CircleCheck },
  rejected: { label: 'Отклонён', Icon: CircleX },
} as const;

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  const { label, Icon } = STATUS[status];

  return (
    <span className={`${styles.badge} ${styles[status]}`}>
      <Icon size={14} aria-hidden="true" />
      {label}
    </span>
  );
}
