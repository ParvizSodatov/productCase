import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { author } from '@/lib/mock';

/**
 * Обёртка страниц для вошедшего пользователя: в шапке вместо кнопок
 * «Войти» и «Опубликовать проект» показывается аватар профиля.
 *
 * Пока признак «вошёл» передаётся жёстко, для вёрстки. Когда появится
 * авторизация, здесь будет чтение сессии, а неавторизованного посетителя
 * нужно будет перенаправлять на /login.
 */
export default function MemberLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header signedIn initials={author.initials} />
      {children}
      <Footer />
    </>
  );
}
