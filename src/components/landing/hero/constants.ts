/** Общий easing для hero-анимаций. */
export const heroEasing = [0.22, 1, 0.36, 1] as const;

const heroCtaOutlineGradient =
  "linear-gradient(130deg, #a78bfa 8%, #5eead4 42%, #c084fc 72%, #818cf8 100%)";

/** Оболочка с padding вместо border — градиентная «рамка» вокруг CTA. */
export const heroCtaGradientShellSx = {
  p: "2px",
  borderRadius: "18px",
  background: heroCtaOutlineGradient,
  display: "inline-flex",
  width: { xs: "100%", sm: "auto" },
  alignSelf: { xs: "stretch", sm: "auto" },
  boxSizing: "border-box" as const,
  transition: "box-shadow 0.25s ease, transform 0.2s ease",
  "&:hover": {
    boxShadow:
      "0 10px 36px rgba(139, 92, 246, 0.32), 0 0 0 1px rgba(255,255,255,0.06) inset",
  },
};

export const heroCtaInnerSx = {
  border: "none",
  textTransform: "none",
  borderRadius: "16px",
  minHeight: { xs: 54, sm: 58 },
  px: { xs: 3.25, sm: 4 },
  py: { xs: 2, sm: 2.125 },
  fontSize: { xs: "1.0625rem", sm: "1.125rem" },
  fontWeight: 600,
  lineHeight: 1.25,
  width: { xs: "100%", sm: "auto" },
  bgcolor: "rgba(14, 12, 26, 0.78)",
  backdropFilter: "blur(10px)",
  color: "common.white",
  boxShadow: "none",
  "&:hover": {
    bgcolor: "rgba(22, 18, 40, 0.92)",
    boxShadow: "none",
  },
  "&.MuiButton-text": { minWidth: 0 },
};
