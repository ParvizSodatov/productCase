/**
 * Фейковые «скриншоты» для баннера: телефон с чатом, карта доставки,
 * окно с очередью, ракета, медаль.
 *
 * Это SVG прямо в разметке: ни одного запроса за картинкой, вес — пара
 * килобайт на все пять. Когда у проектов появятся настоящие скриншоты,
 * вместо этого компонента в слайд встанет <Image> из next/image.
 *
 * Картинка декоративная (aria-hidden): смысл слайда несёт текст рядом.
 */

import type { BannerArtKind } from '@/lib/banners';

type BannerArtProps = {
  kind: BannerArtKind;
  /** Акцентный цвет слайда */
  glow: string;
  className?: string;
};

const W = 'rgba(255,255,255,'; // белый с прозрачностью: `${W}0.2)`

export default function BannerArt({ kind, glow, className }: BannerArtProps) {
  return (
    <svg
      viewBox="0 0 440 360"
      className={className}
      aria-hidden="true"
      focusable="false"
      fontFamily="inherit"
    >
      {kind === 'chat' && <Chat glow={glow} />}
      {kind === 'delivery' && <Delivery glow={glow} />}
      {kind === 'queue' && <Queue glow={glow} />}
      {kind === 'launch' && <Launch glow={glow} />}
      {kind === 'badge' && <Badge glow={glow} />}
    </svg>
  );
}

/** Корпус телефона, внутрь кладём экран */
function Phone({ x, children }: { x: number; children: React.ReactNode }) {
  return (
    <g transform={`translate(${x} 20)`}>
      <rect width="190" height="340" rx="30" fill="#0b0d10" />
      <rect x="8" y="8" width="174" height="324" rx="24" fill="#f7f6f2" />
      <rect x="70" y="16" width="50" height="8" rx="4" fill="#0b0d10" />
      {children}
    </g>
  );
}

function Chat({ glow }: { glow: string }) {
  return (
    <>
      <circle cx="330" cy="90" r="70" fill={glow} opacity="0.18" />
      <Phone x={140}>
        {/* шапка чата */}
        <rect x="8" y="32" width="174" height="40" fill="#1d5fa8" />
        <circle cx="32" cy="52" r="11" fill={glow} />
        <text x="50" y="56" fontSize="12" fontWeight="700" fill="#fff">
          Tarjuma Bot
        </text>
        {/* сообщения */}
        <rect x="20" y="88" width="110" height="34" rx="12" fill="#fff" stroke="#e3e1da" />
        <text x="32" y="110" fontSize="12" fill="#111418">Салом, дӯстам!</text>
        <rect x="60" y="134" width="110" height="34" rx="12" fill="#d9ecff" />
        <text x="72" y="156" fontSize="12" fill="#111418">Привет, друг!</text>
        <rect x="20" y="180" width="124" height="34" rx="12" fill="#fff" stroke="#e3e1da" />
        <text x="32" y="202" fontSize="12" fill="#111418">Ташаккур барои…</text>
        <rect x="46" y="226" width="124" height="34" rx="12" fill="#d9ecff" />
        <text x="58" y="248" fontSize="12" fill="#111418">Спасибо за…</text>
        {/* поле ввода */}
        <rect x="18" y="290" width="154" height="28" rx="14" fill="#efede7" />
        <circle cx="160" cy="304" r="10" fill="#1d5fa8" />
      </Phone>
      {/* плашки языков вокруг телефона */}
      <g transform="translate(40 110)">
        <rect width="80" height="34" rx="17" fill={`${W}0.14)`} stroke={`${W}0.3)`} />
        <text x="40" y="22" fontSize="13" fontWeight="700" fill="#fff" textAnchor="middle">
          TJ
        </text>
      </g>
      <g transform="translate(345 220)">
        <rect width="80" height="34" rx="17" fill={`${W}0.14)`} stroke={`${W}0.3)`} />
        <text x="40" y="22" fontSize="13" fontWeight="700" fill="#fff" textAnchor="middle">
          RU
        </text>
      </g>
    </>
  );
}

function Delivery({ glow }: { glow: string }) {
  return (
    <>
      <circle cx="110" cy="270" r="80" fill={glow} opacity="0.16" />
      <Phone x={140}>
        {/* карта */}
        <rect x="8" y="32" width="174" height="190" fill="#e6f2ea" />
        <path d="M8 90 H182 M8 160 H182 M60 32 V222 M130 32 V222" stroke="#fff" strokeWidth="10" />
        <path
          d="M40 190 C 70 150, 90 170, 110 120 S 150 70, 160 60"
          fill="none"
          stroke="#1f7a55"
          strokeWidth="4"
          strokeDasharray="8 6"
          strokeLinecap="round"
        />
        <circle cx="40" cy="190" r="8" fill="#1f7a55" />
        <path d="M160 40 a12 12 0 0 1 12 12 c0 9 -12 20 -12 20 s-12 -11 -12 -20 a12 12 0 0 1 12 -12z" fill="#b93e0e" />
        <circle cx="160" cy="52" r="4" fill="#fff" />
        {/* карточка заказа */}
        <rect x="18" y="236" width="154" height="84" rx="14" fill="#fff" stroke="#e3e1da" />
        <text x="30" y="260" fontSize="12" fontWeight="700" fill="#111418">Заказ №248</text>
        <text x="30" y="278" fontSize="11" fill="#5c5f64">Курьер в пути · 12 мин</text>
        <rect x="30" y="292" width="130" height="8" rx="4" fill="#efede7" />
        <rect x="30" y="292" width="88" height="8" rx="4" fill="#1f7a55" />
      </Phone>
      {/* пакет с покупками */}
      <g transform="translate(350 70)">
        <rect width="70" height="80" rx="12" fill={`${W}0.16)`} stroke={`${W}0.35)`} />
        <path d="M22 22 v-8 a13 13 0 0 1 26 0 v8" fill="none" stroke="#fff" strokeWidth="4" />
        <circle cx="35" cy="50" r="10" fill={glow} />
      </g>
    </>
  );
}

function Queue({ glow }: { glow: string }) {
  const rows = [
    { time: '10:00', name: 'Стрижка', busy: true },
    { time: '10:30', name: 'Маникюр', busy: true },
    { time: '11:00', name: 'Свободно', busy: false },
    { time: '11:30', name: 'Окрашивание', busy: true },
  ];

  return (
    <>
      <circle cx="360" cy="80" r="70" fill={glow} opacity="0.2" />
      {/* окно браузера */}
      <g transform="translate(40 40)">
        <rect width="370" height="290" rx="18" fill="#f7f6f2" />
        <rect width="370" height="36" rx="18" fill="#e9e6dd" />
        <rect y="18" width="370" height="18" fill="#e9e6dd" />
        <circle cx="22" cy="18" r="5" fill="#e8693a" />
        <circle cx="40" cy="18" r="5" fill="#f5c76b" />
        <circle cx="58" cy="18" r="5" fill="#8ee6b8" />
        <rect x="90" y="10" width="200" height="16" rx="8" fill="#fff" />

        <text x="24" y="70" fontSize="16" fontWeight="800" fill="#111418">Запись на сегодня</text>
        {rows.map((row, i) => (
          <g key={row.time} transform={`translate(24 ${88 + i * 46})`}>
            <rect
              width="322"
              height="38"
              rx="10"
              fill={row.busy ? '#fff' : '#5a3fc0'}
              stroke={row.busy ? '#e3e1da' : 'none'}
            />
            <text x="16" y="24" fontSize="13" fontWeight="700" fill={row.busy ? '#111418' : '#fff'}>
              {row.time}
            </text>
            <text x="76" y="24" fontSize="13" fill={row.busy ? '#5c5f64' : '#fff'}>
              {row.name}
            </text>
            {!row.busy && (
              <g transform="translate(232 7)">
                <rect width="78" height="24" rx="12" fill="#fff" />
                <text x="39" y="16" fontSize="11" fontWeight="700" fill="#5a3fc0" textAnchor="middle">
                  Записаться
                </text>
              </g>
            )}
          </g>
        ))}
      </g>
    </>
  );
}

function Launch({ glow }: { glow: string }) {
  return (
    <>
      <circle cx="230" cy="180" r="130" fill={glow} opacity="0.14" />
      <circle cx="230" cy="180" r="85" fill={glow} opacity="0.14" />
      {/* звёзды */}
      {[
        [70, 60],
        [380, 90],
        [100, 300],
        [360, 300],
        [300, 40],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" fill="#fff" opacity="0.8" />
      ))}
      {/* ракета, наклонена вправо-вверх */}
      <g transform="rotate(35 230 180)">
        <path d="M230 50 C 270 90, 275 170, 262 230 H198 C 185 170, 190 90, 230 50z" fill="#fff" />
        <circle cx="230" cy="130" r="20" fill={glow} stroke="#2a0f04" strokeWidth="5" />
        <path d="M198 200 L165 250 L200 240z" fill={glow} />
        <path d="M262 200 L295 250 L260 240z" fill={glow} />
        <path d="M208 232 C 210 270, 230 300, 230 300 C 230 300, 250 270, 252 232z" fill="#f5c76b" />
        <path d="M218 232 C 220 255, 230 275, 230 275 C 230 275, 240 255, 242 232z" fill="#e8693a" />
      </g>
    </>
  );
}

function Badge({ glow }: { glow: string }) {
  return (
    <>
      <circle cx="220" cy="170" r="140" fill={glow} opacity="0.12" />
      {/* ленты */}
      <path d="M170 220 L140 340 L180 318 L200 350 L222 240z" fill="#b93e0e" />
      <path d="M270 220 L300 340 L260 318 L240 350 L218 240z" fill="#8f2f09" />
      {/* медаль */}
      <circle cx="220" cy="160" r="100" fill={glow} />
      <circle cx="220" cy="160" r="82" fill="none" stroke="#fff" strokeWidth="3" opacity="0.7" />
      <text x="220" y="150" fontSize="54" fontWeight="800" fill="#121418" textAnchor="middle">
        №1
      </text>
      <text x="220" y="186" fontSize="15" fontWeight="800" fill="#121418" textAnchor="middle" letterSpacing="2">
        ПРОЕКТ ДНЯ
      </text>
      {/* блёстки */}
      <path d="M90 70 l6 14 14 6 -14 6 -6 14 -6 -14 -14 -6 14 -6z" fill="#fff" opacity="0.85" />
      <path d="M360 230 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4z" fill="#fff" opacity="0.7" />
    </>
  );
}
