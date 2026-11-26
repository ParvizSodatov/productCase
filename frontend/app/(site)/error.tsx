'use client'; // Границы ошибок в Next обязаны быть клиентскими компонентами

import RouteError from '@/components/RouteError';

/** Ошибка на любой странице этой группы: шапка и подвал остаются, падает только содержимое */
export default function Error(props: { error: Error & { digest?: string }; retry: () => void }) {
  return <RouteError {...props} />;
}
