/**
 * Иллюстрации для пустых состояний и ошибок.
 *
 * Простые SVG прямо в коде, в цветах сайта: ноль запросов, ноль файлов,
 * и при тёмной теме их можно перекрасить через CSS-переменные.
 * Все они декоративные (aria-hidden): смысл несёт заголовок рядом.
 */

export type IllustrationName = 'projects' | 'comments' | 'search' | 'error' | 'notFound' | 'inbox';

const C = {
  paper: 'var(--surface)',
  fill: 'var(--surface-muted)',
  line: 'var(--border-input)',
  ink: 'var(--text-muted)',
  accent: 'var(--accent)',
  soft: 'var(--accent-soft)',
};

export default function Illustration({ name, size = 160 }: { name: IllustrationName; size?: number }) {
  return (
    <svg
      width={size}
      height={(size * 3) / 4}
      viewBox="0 0 160 120"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Мягкое пятно-подложка у всех иллюстраций — общий стиль */}
      <ellipse cx="80" cy="104" rx="56" ry="8" fill={C.fill} />
      {SCENES[name]}
    </svg>
  );
}

const SCENES: Record<IllustrationName, React.ReactNode> = {
  // Пустая коробка, сверху карточка проекта с плюсом
  projects: (
    <>
      <rect x="34" y="58" width="92" height="42" rx="8" fill={C.paper} stroke={C.line} strokeWidth="2" />
      <path d="M34 66h92" stroke={C.line} strokeWidth="2" />
      <rect x="52" y="18" width="56" height="44" rx="8" fill={C.paper} stroke={C.line} strokeWidth="2" />
      <rect x="60" y="27" width="14" height="14" rx="4" fill={C.soft} />
      <path d="M80 30h20M80 37h12" stroke={C.line} strokeWidth="2" strokeLinecap="round" />
      <circle cx="108" cy="22" r="11" fill={C.accent} />
      <path d="M108 17v10M103 22h10" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
    </>
  ),
  // Два облачка диалога, второе пустое — «ждёт вашего ответа»
  comments: (
    <>
      <path
        d="M30 30a10 10 0 0 1 10-10h56a10 10 0 0 1 10 10v24a10 10 0 0 1-10 10H54l-12 10v-10h-2a10 10 0 0 1-10-10z"
        fill={C.paper}
        stroke={C.line}
        strokeWidth="2"
      />
      <path d="M44 36h44M44 46h28" stroke={C.line} strokeWidth="2" strokeLinecap="round" />
      <path
        d="M70 62a8 8 0 0 1 8-8h44a8 8 0 0 1 8 8v18a8 8 0 0 1-8 8h-2v9l-10-9H78a8 8 0 0 1-8-8z"
        fill={C.soft}
        stroke={C.accent}
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <circle cx="88" cy="71" r="2.5" fill={C.accent} />
      <circle cx="100" cy="71" r="2.5" fill={C.accent} />
      <circle cx="112" cy="71" r="2.5" fill={C.accent} />
    </>
  ),
  // Лупа над пустыми строками списка
  search: (
    <>
      <rect x="28" y="22" width="76" height="70" rx="8" fill={C.paper} stroke={C.line} strokeWidth="2" />
      <path d="M40 38h40M40 50h52M40 62h30M40 74h44" stroke={C.fill} strokeWidth="6" strokeLinecap="round" />
      <circle cx="104" cy="58" r="20" fill={C.paper} stroke={C.accent} strokeWidth="3" />
      <path d="M118 72l14 14" stroke={C.accent} strokeWidth="5" strokeLinecap="round" />
      <path d="M97 58h14" stroke={C.ink} strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),
  // Окно браузера с разорванной линией связи
  error: (
    <>
      <rect x="26" y="20" width="108" height="76" rx="10" fill={C.paper} stroke={C.line} strokeWidth="2" />
      <path d="M26 34h108" stroke={C.line} strokeWidth="2" />
      <circle cx="36" cy="27" r="2.5" fill={C.line} />
      <circle cx="44" cy="27" r="2.5" fill={C.line} />
      <path d="M48 66h18l6-10 8 20 6-10h26" stroke={C.ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="118" cy="48" r="11" fill={C.accent} />
      <path d="M118 42v7" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="118" cy="53.5" r="1.6" fill="#fff" />
    </>
  ),
  // Дорожный знак-указатель «не туда»
  notFound: (
    <>
      <path d="M80 30v70" stroke={C.ink} strokeWidth="4" strokeLinecap="round" />
      <path d="M50 28h52l12 11-12 11H50z" fill={C.accent} />
      <path d="M62 39h30" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <path d="M110 58H62l-12 10 12 10h48z" fill={C.paper} stroke={C.line} strokeWidth="2" />
      <path d="M68 68h30" stroke={C.line} strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  // Пустой лоток для уведомлений
  inbox: (
    <>
      <path d="M36 62l14-36h60l14 36v28a6 6 0 0 1-6 6H42a6 6 0 0 1-6-6z" fill={C.paper} stroke={C.line} strokeWidth="2" />
      <path d="M36 62h26l6 10h24l6-10h26" stroke={C.line} strokeWidth="2" strokeLinejoin="round" />
      <path d="M68 44h24" stroke={C.accent} strokeWidth="3" strokeLinecap="round" />
    </>
  ),
};
