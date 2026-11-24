import Header from '@/components/Header';
import Footer from '@/components/Footer';

/**
 * Обёртка публичных страниц: шапка для незашедшего посетителя и подвал.
 *
 * Папка в круглых скобках — «группа маршрутов». Она нужна только для того,
 * чтобы дать этим страницам общий layout, и в адрес сайта НЕ попадает:
 * app/(site)/page.tsx открывается по адресу «/», а не «/site».
 */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
