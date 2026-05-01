"use client";

import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";

export type EventsPaginationProps = {
  count: number;
  page: number;
  onPageChange: (page: number) => void;
  /** Подпись для `aria-label` (доступность). */
  ariaLabel: string;
};

/** Общая пагинация для списков событий (каталог, рекомендации и т.д.). */
export function EventsPagination({
  count,
  page,
  onPageChange,
  ariaLabel,
}: EventsPaginationProps) {
  if (count <= 1) {
    return null;
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", pt: 1 }}>
      <Pagination
        count={count}
        page={page}
        onChange={(_, p) => onPageChange(p)}
        color="primary"
        aria-label={ariaLabel}
      />
    </Box>
  );
}
