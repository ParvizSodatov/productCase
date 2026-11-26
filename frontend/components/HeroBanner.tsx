import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Carousel from './Carousel';
import BannerArt from './BannerArt';
import { bannerSlides, type BannerSlide } from '@/lib/banners';
import styles from './HeroBanner.module.css';

/**
 * Баннер-карусель на главной. Серверный компонент: слайды рендерятся
 * на сервере, а клиентская Carousel только листает их.
 */
export default function HeroBanner() {
  const slides = bannerSlides();

  return (
    <div className={styles.wrap}>
      <Carousel label="Избранное на ProductCase">
        {slides.map((slide, i) => (
          <Slide key={slide.id} slide={slide} first={i === 0} />
        ))}
      </Carousel>
    </div>
  );
}

function Slide({ slide, first }: { slide: BannerSlide; first: boolean }) {
  const { theme } = slide;

  return (
    <div
      className={styles.slide}
      // Цвета слайда — CSS-переменные, градиент и свечение собираются в модуле
      style={
        {
          '--from': theme.from,
          '--to': theme.to,
          '--glow': theme.glow,
        } as React.CSSProperties
      }
    >
      <div className={styles.text}>
        <span className={styles.label}>{slide.label}</span>

        {slide.logo ? (
          <div className={styles.titleRow}>
            <span className={styles.logo} aria-hidden="true">
              {slide.logo}
            </span>
            <p className={styles.title}>{slide.title}</p>
          </div>
        ) : (
          <p className={styles.title}>{slide.title}</p>
        )}

        <p className={styles.lead}>{slide.text}</p>
        {slide.meta && <p className={styles.meta}>{slide.meta}</p>}

        <Link
          href={slide.cta.href}
          className={styles.cta}
          // Первый слайд виден сразу — его ссылку загружаем заранее, остальные по требованию
          prefetch={first ? undefined : false}
        >
          {slide.cta.label}
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>

      <BannerArt kind={slide.art} glow={theme.glow} className={styles.art} />
    </div>
  );
}
