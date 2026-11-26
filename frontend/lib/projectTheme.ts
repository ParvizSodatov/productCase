/**
 * Цвет фейкового логотипа проекта.
 *
 * Пока у проектов нет настоящих логотипов, рисуем букву на градиенте.
 * Цвет выбирается по слагу, а не случайно: у проекта он всегда один
 * и тот же — и на сервере, и в браузере, и на любой странице.
 * С бэкендом здесь появится project.logoUrl, а это останется запасным
 * вариантом для проектов без логотипа.
 */

const palettes: [string, string][] = [
  ['#1d5fa8', '#7cc4ff'], // синий
  ['#b93e0e', '#ffb38a'], // фирменный оранжевый
  ['#1f7a55', '#8ee6b8'], // зелёный
  ['#5a3fc0', '#c9b8ff'], // фиолетовый
  ['#a8264f', '#ff9ec0'], // малиновый
  ['#0f766e', '#7ee0d6'], // бирюзовый
  ['#8a5a00', '#f5c76b'], // золотой
];

export function projectGradient(slug: string): string {
  let hash = 0;
  for (const ch of slug) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  const [from, to] = palettes[hash % palettes.length];
  return `linear-gradient(135deg, ${from}, ${to})`;
}
