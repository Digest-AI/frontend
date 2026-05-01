"use client";

import type { ChipProps } from "@mui/material/Chip";
import Chip from "@mui/material/Chip";
import { alpha } from "@mui/material/styles";

import { getCategoryColors } from "./constants";

export type CategoryProps = Omit<ChipProps, "color"> & {
  slug: string;
  /** Выбрано (например, интересы в профиле). */
  selected?: boolean;
};

export function Category({
  slug,
  label,
  selected = false,
  sx,
  variant = "filled",
  onClick,
  ...rest
}: CategoryProps) {
  const { bg, fg } = getCategoryColors(slug);

  return (
    <Chip
      label={label}
      variant={variant}
      onClick={onClick}
      sx={[
        onClick ? { cursor: "pointer" } : null,
        (theme) => ({
          fontWeight: 600,
          backgroundColor: selected
            ? bg
            : alpha(bg, theme.palette.mode === "dark" ? 0.38 : 0.5),
          color: fg,
          border: `1px solid ${alpha(fg, 0.22)}`,
          "& .MuiChip-label": { px: 1 },
          "&:hover": {
            backgroundColor: alpha(bg, theme.palette.mode === "dark" ? 0.85 : 0.72),
          },
        }),
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
      {...rest}
    />
  );
}
