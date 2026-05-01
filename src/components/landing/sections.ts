/** Якоря лендинга для навигации из hero (smooth scroll через `scroll-behavior` в `globals.css`). */
export const LANDING_SECTION_IDS = {
  events: "landing-events",
  recommendations: "landing-recommendations",
  providers: "landing-providers",
} as const;

/** Отступ под липкий header при переходе по якорю. */
export const landingSectionScrollMarginSx = {
  scrollMarginTop: { xs: "80px", md: "88px" },
} as const;
