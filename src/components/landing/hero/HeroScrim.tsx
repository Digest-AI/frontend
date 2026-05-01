import Box from "@mui/material/Box";

/** Затемнение и виньетка поверх фото для читаемости текста. */
export function HeroScrim() {
  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 2,
        pointerEvents: "none",
        backgroundColor: "rgba(4, 3, 10, 0.52)",
        backgroundImage: `
            radial-gradient(ellipse 125% 90% at 50% 108%, rgba(0, 0, 0, 0.72) 0%, transparent 52%),
            linear-gradient(to top, rgba(2, 1, 8, 0.88) 0%, rgba(2, 1, 8, 0.28) 36%, transparent 58%),
            linear-gradient(
              116deg,
              rgba(8, 6, 20, 0.82) 0%,
              rgba(8, 6, 20, 0.38) 48%,
              rgba(8, 6, 20, 0.18) 100%
            )
          `,
        boxShadow: "inset 0 0 100px rgba(0, 0, 0, 0.35)",
      }}
    />
  );
}
