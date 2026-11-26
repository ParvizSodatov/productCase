'use client';

/**
 * Галерея проекта: видео (если есть) и скриншоты в одной ленте.
 *
 * Лента — обычная горизонтальная прокрутка с scroll-snap, без библиотек.
 * Свайп на телефоне и прокрутка тачпадом работают сами, JS нужен только
 * для стрелок. Картинки при этом лежат в HTML с сервера, поэтому их видят
 * поисковики.
 */

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import type { Screenshot } from '@/lib/mock';
import { youtubeEmbedUrl, youtubeThumbnailUrl } from '@/lib/youtube';
import styles from './Gallery.module.css';

type GalleryProps = {
  projectName: string;
  screenshots: Screenshot[];
  /** Уже проверенный ID ролика — см. parseYoutubeId */
  videoId?: string;
};

export default function Gallery({ projectName, screenshots, videoId }: GalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  // Следим за положением ленты, чтобы гасить стрелку на краю
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const update = () => {
      setAtStart(track.scrollLeft <= 4);
      setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 4);
    };

    // ResizeObserver срабатывает и сразу после подключения — это первый замер
    const observer = new ResizeObserver(update);
    observer.observe(track);
    track.addEventListener('scroll', update, { passive: true });

    return () => {
      observer.disconnect();
      track.removeEventListener('scroll', update);
    };
  }, []);

  /** Сдвинуть ленту на один слайд влево (-1) или вправо (1) */
  function scrollByOne(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;

    const slide = track.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = slide ? slide.offsetWidth + gap : track.clientWidth;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    track.scrollBy({ left: direction * step, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  if (!videoId && screenshots.length === 0) return null;

  return (
    <section className={styles.gallery} aria-label={`Видео и скриншоты ${projectName}`}>
      {/* tabIndex — чтобы ленту можно было листать стрелками клавиатуры */}
      <div ref={trackRef} className={styles.track} tabIndex={0}>
        {videoId && (
          <figure className={styles.slide}>
            <div className={styles.frame}>
              <VideoPlayer videoId={videoId} projectName={projectName} />
            </div>
            <figcaption className={styles.caption}>Видео о проекте</figcaption>
          </figure>
        )}

        {screenshots.map((shot, index) => (
          <figure key={index} className={styles.slide}>
            <div className={styles.frame}>
              {shot.src ? (
                /*
                  Обычный <img>, а не next/image: next/image требует заранее
                  прописать домен хранилища картинок в next.config, а хранилище
                  ещё не выбрано. Когда выберем — перейти на next/image
                  ради сжатия и правильных размеров.
                */
                // eslint-disable-next-line @next/next/no-img-element
                <img src={shot.src} alt={shot.caption} loading="lazy" />
              ) : (
                <span>Скриншот {index + 1}</span>
              )}
            </div>
            <figcaption className={styles.caption}>{shot.caption}</figcaption>
          </figure>
        ))}
      </div>

      <button
        type="button"
        className={`${styles.arrow} ${styles.prev}`}
        onClick={() => scrollByOne(-1)}
        disabled={atStart}
        aria-label="Предыдущий слайд"
      >
        <ChevronLeft size={20} aria-hidden="true" />
      </button>
      <button
        type="button"
        className={`${styles.arrow} ${styles.next}`}
        onClick={() => scrollByOne(1)}
        disabled={atEnd}
        aria-label="Следующий слайд"
      >
        <ChevronRight size={20} aria-hidden="true" />
      </button>
    </section>
  );
}

/**
 * Видео YouTube с «фасадом»: сначала только превью и кнопка,
 * сам плеер грузится по нажатию.
 *
 * Плеер YouTube весит около мегабайта скриптов. Если вставлять его сразу,
 * страница проекта откроется заметно медленнее — даже у тех,
 * кто видео смотреть не собирался.
 */
function VideoPlayer({ videoId, projectName }: { videoId: string; projectName: string }) {
  const [playing, setPlaying] = useState(false);
  const [thumbFailed, setThumbFailed] = useState(false);

  if (playing) {
    return (
      <iframe
        className={styles.iframe}
        src={youtubeEmbedUrl(videoId)}
        title={`Видео: ${projectName}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      className={styles.videoButton}
      onClick={() => setPlaying(true)}
      aria-label={`Смотреть видео о проекте ${projectName}`}
    >
      {!thumbFailed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={styles.thumb}
          src={youtubeThumbnailUrl(videoId)}
          alt=""
          loading="lazy"
          onError={() => setThumbFailed(true)}
        />
      )}
      <span className={styles.play}>
        <Play size={26} fill="currentColor" aria-hidden="true" />
      </span>
    </button>
  );
}
