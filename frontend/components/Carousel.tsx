'use client';

/**
 * Карусель (свайпер) без библиотек.
 *
 * Как устроено:
 * - Лента — горизонтальная прокрутка с scroll-snap, как в Gallery. Свайп
 *   на телефоне, тачпад и инерция работают силами браузера, бесплатно.
 * - Слайды приходят сюда как children из серверного компонента, поэтому
 *   их текст лежит в HTML и виден поисковикам. Клиентский здесь только
 *   этот файл — стрелки, точки и автопрокрутка, около 2 КБ.
 * - Автопрокрутку двигает CSS-анимация полоски в активной точке: когда
 *   она дошла до конца (animationend), листаем дальше. Пауза — это просто
 *   animation-play-state: paused, поэтому полоска и таймер не расходятся.
 *
 * Автопрокрутка стоит на паузе, пока курсор или фокус внутри, вкладка
 * скрыта или карусель не на экране. Есть кнопка паузы — без неё авто-
 * движение нарушает правило доступности WCAG 2.2.2. Если в системе
 * включено «уменьшить движение», автопрокрутки нет вообще.
 */

import { Children, useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import styles from './Carousel.module.css';

type CarouselProps = {
  children: React.ReactNode;
  /** Подпись для скринридера: «Избранные проекты» */
  label: string;
  /** Сколько миллисекунд показывать слайд */
  interval?: number;
};

export default function Carousel({ children, label, interval = 6000 }: CarouselProps) {
  const slides = Children.toArray(children);
  const count = slides.length;

  const trackRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  // Причины паузы храним раздельно: курсор ушёл, а фокус ещё внутри — пауза остаётся
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [offscreen, setOffscreen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const autoplay = count > 1 && !reducedMotion;
  const paused = hovered || focused || userPaused || hidden || offscreen;

  // Настройка «уменьшить движение» и видимость вкладки
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMedia = () => setReducedMotion(media.matches);
    const onVisibility = () => setHidden(document.hidden);
    onMedia();
    media.addEventListener('change', onMedia);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      media.removeEventListener('change', onMedia);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  // Карусель уехала за экран — не листаем впустую
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setOffscreen(!entry.isIntersecting));
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      const next = (index + count) % count; // по кругу в обе стороны
      track.scrollTo({
        left: next * track.clientWidth,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    },
    [count, reducedMotion],
  );

  // Активный слайд считаем по положению ленты: так он верен и после свайпа пальцем
  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const index = Math.round(track.scrollLeft / track.clientWidth);
    if (index !== active) setActive(index);
  };

  return (
    <section
      ref={rootRef}
      className={styles.root}
      aria-roledescription="карусель"
      aria-label={label}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <div ref={trackRef} className={styles.track} onScroll={onScroll}>
        {slides.map((slide, i) => (
          <div
            key={i}
            className={styles.slide}
            role="group"
            aria-roledescription="слайд"
            aria-label={`${i + 1} из ${count}`}
            // Невидимые слайды убираем из Tab-навигации и от скринридера
            inert={i !== active}
          >
            {slide}
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            className={`${styles.arrow} ${styles.prev}`}
            onClick={() => goTo(active - 1)}
            aria-label="Предыдущий слайд"
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`${styles.arrow} ${styles.next}`}
            onClick={() => goTo(active + 1)}
            aria-label="Следующий слайд"
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>

          <div className={styles.controls}>
            {autoplay && (
              <button
                type="button"
                className={styles.pause}
                onClick={() => setUserPaused((p) => !p)}
                aria-label={userPaused ? 'Включить автопрокрутку' : 'Остановить автопрокрутку'}
              >
                {userPaused ? (
                  <Play size={14} aria-hidden="true" />
                ) : (
                  <Pause size={14} aria-hidden="true" />
                )}
              </button>
            )}

            <div className={styles.dots}>
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={i === active ? styles.dotActive : styles.dot}
                  onClick={() => goTo(i)}
                  aria-label={`Слайд ${i + 1}`}
                  aria-current={i === active ? 'true' : undefined}
                >
                  {i === active && autoplay && (
                    <span
                      // key заставляет анимацию начаться заново на каждом слайде
                      key={active}
                      className={styles.progress}
                      style={{
                        animationDuration: `${interval}ms`,
                        animationPlayState: paused ? 'paused' : 'running',
                      }}
                      onAnimationEnd={() => {
                        // До первого эффекта reducedMotion ещё false, а глобальный CSS
                        // уже сжал анимацию до 0.01ms — проверяем настройку напрямую
                        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                        goTo(active + 1);
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
