import type { SxProps, Theme } from "@mui/material/styles";

/** Брендовые цвета чипа провайдера по slug (имя файла лого без .png). */
const providerBrandColors: Record<string, { bg: string; color: string }> = {
  afisha_md: { bg: "#f4192e", color: "#fff" },
  iticket_md: { bg: "#ff9f00", color: "#1a1a1a" },
  cineplex_md: { bg: "#4c7938", color: "#fff" },
};

export function hasProviderBrandColor(slug: string): boolean {
  return Object.prototype.hasOwnProperty.call(providerBrandColors, slug);
}

export function getProviderChipSx(slug: string): SxProps<Theme> {
  const b = providerBrandColors[slug];
  if (!b) {
    return {
      borderColor: "divider",
      fontWeight: 600,
    };
  }
  return {
    bgcolor: b.bg,
    color: b.color,
    border: "none",
    fontWeight: 600,
    textDecoration: "none",
    "& .MuiChip-label": { px: 1 },
    "&:hover": {
      bgcolor: b.bg,
      filter: "brightness(0.92)",
    },
  };
}
