/** Все поддерживаемые слаги категорий (порядок — для UI). */
export const CATEGORY_SLUGS = [
  "movie",
  "other",
  "concert",
  "theatre",
  "sport",
  "party",
  "kids",
  "training",
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

/** Собственный цвет чипа по слагу (фон + текст для контраста). */
const BRAND: Record<CategorySlug, { bg: string; fg: string }> = {
  movie: { bg: "#4f46e5", fg: "#f8fafc" },
  other: { bg: "#57534e", fg: "#fafaf9" },
  concert: { bg: "#db2777", fg: "#fff1f2" },
  theatre: { bg: "#d97706", fg: "#fffbeb" },
  sport: { bg: "#059669", fg: "#ecfdf5" },
  party: { bg: "#9333ea", fg: "#faf5ff" },
  kids: { bg: "#0ea5e9", fg: "#f0f9ff" },
  training: { bg: "#0d9488", fg: "#f0fdfa" },
};

/** Неизвестный слаг API — нейтральный, но не «серый по умолчанию» чипа MUI. */
const FALLBACK = { bg: "#475569", fg: "#f1f5f9" };

export function getCategoryColors(slug: string): { bg: string; fg: string } {
  if ((CATEGORY_SLUGS as readonly string[]).includes(slug)) {
    return BRAND[slug as CategorySlug];
  }
  return FALLBACK;
}
