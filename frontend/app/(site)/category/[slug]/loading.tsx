import { ListPageSkeleton } from '@/components/PageSkeletons';

/** Показывается при переходе, пока грузится список категории */
export default function Loading() {
  return <ListPageSkeleton />;
}
