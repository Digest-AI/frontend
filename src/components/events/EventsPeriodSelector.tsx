"use client";

import type { SvgIconComponent } from "@mui/icons-material";
import BoltRounded from "@mui/icons-material/BoltRounded";
import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import CalendarViewWeekRounded from "@mui/icons-material/CalendarViewWeekRounded";
import DateRangeRounded from "@mui/icons-material/DateRangeRounded";
import EventRepeatRounded from "@mui/icons-material/EventRepeatRounded";
import TodayRounded from "@mui/icons-material/TodayRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { alpha } from "@mui/material/styles";

import type { EventsPeriodPreset } from "@/requests/parser";

const PRESET_ICONS: Record<EventsPeriodPreset, SvgIconComponent> = {
  "this-week": CalendarViewWeekRounded,
  today: TodayRounded,
  upcoming: BoltRounded,
  "next-7-days": DateRangeRounded,
  "next-14-days": DateRangeRounded,
  "next-month": CalendarMonthRounded,
  "next-3-months": EventRepeatRounded,
};

export type EventsPeriodSelectorProps = {
  presets: readonly EventsPeriodPreset[];
  value: EventsPeriodPreset;
  onChange: (preset: EventsPeriodPreset) => void;
  getLabel: (preset: EventsPeriodPreset) => string;
};

export function EventsPeriodSelector({
  presets,
  value,
  onChange,
  getLabel,
}: EventsPeriodSelectorProps) {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        p: { xs: 1, sm: 1.25 },
        borderRadius: 3,
        border: "1px solid",
        borderColor: (t) => alpha(t.palette.primary.main, 0.28),
        background: (t) =>
          t.palette.mode === "dark"
            ? `linear-gradient(155deg, ${alpha(t.palette.primary.main, 0.16)} 0%, ${alpha(t.palette.background.paper, 0.97)} 42%, ${t.palette.background.paper} 100%)`
            : `linear-gradient(155deg, ${alpha(t.palette.primary.main, 0.1)} 0%, ${t.palette.background.paper} 55%)`,
        boxShadow: (t) =>
          t.palette.mode === "dark"
            ? `0 16px 48px ${alpha("#000", 0.45)}, inset 0 1px 0 ${alpha("#fff", 0.06)}`
            : `0 12px 36px ${alpha(t.palette.primary.main, 0.09)}`,
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          background: (t) =>
            `radial-gradient(800px 120px at 20% -40%, ${alpha(t.palette.primary.main, t.palette.mode === "dark" ? 0.22 : 0.12)}, transparent 65%)`,
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexWrap: "nowrap",
          gap: { xs: 0.75, sm: 1 },
          overflowX: "auto",
          overflowY: "hidden",
          WebkitOverflowScrolling: "touch",
          scrollSnapType: "x proximity",
          pb: 0.25,
          mx: { xs: -0.25, sm: 0 },
          px: { xs: 0.25, sm: 0 },
          "@media (min-width: 900px)": {
            flexWrap: "wrap",
            overflowX: "visible",
            scrollSnapType: "none",
          },
        }}
      >
        {presets.map((p) => {
          const selected = value === p;
          const Icon = PRESET_ICONS[p];
          return (
            <Button
              key={p}
              onClick={() => onChange(p)}
              disableElevation
              sx={{
                flexShrink: 0,
                scrollSnapAlign: "start",
                borderRadius: 999,
                py: 0.85,
                px: { xs: 1.35, sm: 1.65 },
                minHeight: 40,
                gap: 0.75,
                textTransform: "none",
                fontWeight: selected ? 600 : 500,
                fontSize: "0.8125rem",
                letterSpacing: "0.01em",
                whiteSpace: "nowrap",
                border: "1px solid",
                transition: (t) =>
                  t.transitions.create(
                    ["background-color", "box-shadow", "color", "border-color"],
                    { duration: t.transitions.duration.shorter },
                  ),
                ...(selected
                  ? {
                      color: "primary.contrastText",
                      borderColor: (t) => alpha(t.palette.primary.light, 0.35),
                      background: (t) =>
                        `linear-gradient(135deg, ${t.palette.primary.light} 0%, ${t.palette.primary.main} 48%, ${t.palette.primary.dark} 115%)`,
                      boxShadow: (t) =>
                        `0 4px 16px ${alpha(t.palette.primary.main, 0.42)}, inset 0 1px 0 ${alpha("#fff", 0.12)}`,
                      "&:hover": {
                        borderColor: (t) => alpha(t.palette.primary.light, 0.5),
                        background: (t) =>
                          `linear-gradient(135deg, ${t.palette.primary.light} 0%, ${t.palette.primary.main} 45%, ${t.palette.primary.dark} 110%)`,
                        boxShadow: (t) =>
                          `0 6px 20px ${alpha(t.palette.primary.main, 0.5)}, inset 0 1px 0 ${alpha("#fff", 0.14)}`,
                      },
                    }
                  : {
                      color: "text.secondary",
                      borderColor: (t) => alpha(t.palette.divider, 0.9),
                      bgcolor: (t) =>
                        alpha(
                          t.palette.common.white,
                          t.palette.mode === "dark" ? 0.05 : 0.55,
                        ),
                      "&:hover": {
                        color: "text.primary",
                        borderColor: (t) => alpha(t.palette.primary.main, 0.4),
                        bgcolor: "action.hover",
                      },
                    }),
                "&:focus-visible": {
                  outline: "2px solid",
                  outlineColor: "primary.main",
                  outlineOffset: 2,
                },
              }}
            >
              <Icon sx={{ fontSize: 18, opacity: selected ? 0.95 : 0.75 }} />
              {getLabel(p)}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
}
