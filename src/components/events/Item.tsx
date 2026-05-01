"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { format, parseISO } from "date-fns";
import { ro, ru } from "date-fns/locale";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

import type { IEvent } from "@/types/parser";

import { Category } from "@/components/category";

import { categoryLabel, eventTitle } from "./eventLocale";

export type EventItemProps = {
  event: IEvent;
  onOpen: () => void;
  /** Бейдж «новое» (например, в общем списке рекомендаций). */
  showNewBadge?: boolean;
};

const LAYOUT_PREFIX = "event-card";

export function eventLayoutId(id: number) {
  return `${LAYOUT_PREFIX}-${id}`;
}

export function EventItem({ event, onOpen, showNewBadge }: EventItemProps) {
  const locale = useLocale();
  const t = useTranslations("Landing");
  const tRec = useTranslations("RecommendationsPage");
  const title = eventTitle(event, locale);
  const dfLocale = locale === "ru" ? ru : ro;
  const dateLabel = (() => {
    try {
      return format(parseISO(event.dateStart), "d MMM, HH:mm", {
        locale: dfLocale,
      });
    } catch {
      return event.dateStart;
    }
  })();

  return (
    <motion.article
      layoutId={eventLayoutId(event.id)}
      transition={{ type: "spring", stiffness: 320, damping: 32 }}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={t("eventFields.openDetails")}
      style={{
        borderRadius: 18,
        cursor: "pointer",
        overflow: "hidden",
        outline: "none",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        textAlign: "left",
        background:
          "linear-gradient(180deg, rgba(30,27,48,0.96) 0%, rgba(18,16,30,0.98) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "4 / 5",
          flexShrink: 0,
        }}
      >
        <Image
          src={event.imageUrl}
          alt=""
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
          unoptimized
          style={{ objectFit: "cover" }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, transparent 45%, rgba(6,4,14,0.92) 100%)",
            pointerEvents: "none",
          }}
        />
        {showNewBadge ? (
          <Chip
            label={tRec("newBadge")}
            size="small"
            color="secondary"
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              fontWeight: 700,
              backdropFilter: "blur(8px)",
              bgcolor: "rgba(18,16,30,0.72)",
            }}
          />
        ) : null}
      </Box>
      <Box sx={{ p: 2, pt: 1.5, flex: 1, textAlign: "left" }}>
        <Typography
          variant="subtitle1"
          component="h3"
          sx={{
            fontWeight: 700,
            lineHeight: 1.3,
            mb: 0.75,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block" }}
        >
          {dateLabel}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 0.25, display: "block", mb: 0.75 }}
        >
          {[event.city, event.place].filter(Boolean).join(" · ")}
        </Typography>
        {event.categories.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 0.5,
              mt: "auto",
              pt: 0.5,
            }}
          >
            {event.categories.slice(0, 4).map((c) => (
              <Category
                key={c.id}
                slug={c.slug}
                label={categoryLabel(c, locale)}
                size="small"
              />
            ))}
          </Box>
        ) : null}
      </Box>
    </motion.article>
  );
}
