"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import CloseRounded from "@mui/icons-material/CloseRounded";
import LocationOnRounded from "@mui/icons-material/LocationOnRounded";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { getEventDetail } from "@/app/actions";
import { isError } from "@/requests";
import type { IDetailedEvent, IEvent } from "@/types/parser";

import {
  categoryLabel,
  eventDescription,
  eventTitle,
  formatEventDateRange,
  formatLocationLine,
  formatPriceMdl,
} from "./eventLocale";
import { EventItem, eventLayoutId } from "./Item";
import { getProviderChipSx, hasProviderBrandColor } from "./providerStyle";

export type EventListProps = {
  events: IEvent[];
  layoutGroupId?: string;
};

export function EventList({ events, layoutGroupId }: EventListProps) {
  const locale = useLocale();
  const t = useTranslations("Landing");
  const [openId, setOpenId] = useState<number | null>(null);
  const [detail, setDetail] = useState<IDetailedEvent | null>(null);

  const preview =
    openId != null ? events.find((e) => e.id === openId) : undefined;

  const close = useCallback(() => {
    setOpenId(null);
    setDetail(null);
  }, []);

  useEffect(() => {
    if (openId == null) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDetail(null);
    let cancelled = false;
    void (async () => {
      const res = await getEventDetail(openId);
      if (cancelled || isError(res)) return;
      setDetail(res);
    })();

    return () => {
      cancelled = true;
    };
  }, [openId]);

  useEffect(() => {
    if (openId == null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [openId]);

  useEffect(() => {
    if (openId == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId, close]);

  return (
    <LayoutGroup id={layoutGroupId ?? "landing-events"}>
      <Box
        sx={{
          display: "grid",
          gap: 2.5,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
        }}
      >
        {events.map((event) =>
          openId === event.id ? (
            <Box
              key={event.id}
              sx={{
                borderRadius: 2.25,
                minHeight: 320,
                bgcolor: "action.hover",
                opacity: 0.35,
              }}
            />
          ) : (
            <EventItem
              key={event.id}
              event={event}
              onOpen={() => setOpenId(event.id)}
            />
          ),
        )}
      </Box>

      <AnimatePresence>
        {openId != null && preview && (
          <>
            <motion.div
              key="backdrop"
              role="presentation"
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 1399,
                background: "rgba(4, 2, 12, 0.62)",
                backdropFilter: "blur(4px)",
              }}
            />
            <motion.div
              key="panel"
              layoutId={eventLayoutId(openId)}
              transition={{ type: "spring", stiffness: 280, damping: 32 }}
              style={{
                position: "fixed",
                zIndex: 1400,
                inset: 16,
                maxWidth: 720,
                margin: "0 auto",
                maxHeight: "calc(100vh - 32px)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                borderRadius: 20,
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow:
                  "0 24px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)",
                background:
                  "linear-gradient(165deg, rgba(28,24,44,0.98) 0%, rgba(14,12,24,0.99) 100%)",
              }}
            >
              <IconButton
                onClick={close}
                aria-label={t("eventFields.close")}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  zIndex: 2,
                  bgcolor: "rgba(0,0,0,0.35)",
                  color: "common.white",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.5)" },
                }}
                size="small"
              >
                <CloseRounded />
              </IconButton>

              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: 200, sm: 240 },
                  flexShrink: 0,
                }}
              >
                <Image
                  src={preview.imageUrl}
                  alt=""
                  fill
                  unoptimized
                  style={{ objectFit: "cover" }}
                  sizes="720px"
                />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, transparent 30%, rgba(10,8,20,0.95) 100%)",
                  }}
                />
              </Box>

              <Box
                sx={{
                  flex: 1,
                  overflowY: "auto",
                  px: { xs: 2, sm: 3 },
                  py: { xs: 2, sm: 2.5 },
                }}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ fontWeight: 800, pr: 4 }}
                >
                  {eventTitle(preview, locale)}
                </Typography>

                <DetailRow label={t("eventFields.dates")}>
                  <Typography variant="body2" component="div">
                    {!detail ? (
                      <>
                        {formatEventDateRange(
                          preview.dateStart,
                          null,
                          locale,
                        )}
                        {" — "}
                        <Skeleton
                          variant="text"
                          sx={{
                            display: "inline-block",
                            verticalAlign: "text-bottom",
                            width: 100,
                            ml: 0.5,
                          }}
                        />
                      </>
                    ) : (
                      formatEventDateRange(
                        preview.dateStart,
                        detail.dateEnd?.trim() ? detail.dateEnd : null,
                        locale,
                      )
                    )}
                  </Typography>
                </DetailRow>

                {formatLocationLine(preview) ? (
                  <DetailRow label={t("eventFields.location")}>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ alignItems: "flex-start" }}
                    >
                      <LocationOnRounded
                        sx={{
                          fontSize: 18,
                          opacity: 0.75,
                          flexShrink: 0,
                          mt: 0.25,
                        }}
                      />
                      <Typography variant="body2" sx={{ lineHeight: 1.45 }}>
                        {formatLocationLine(preview)}
                      </Typography>
                    </Stack>
                  </DetailRow>
                ) : null}

                <DetailRow
                  label={t("eventFields.price")}
                  value={formatPriceMdl(preview)}
                />

                <Divider
                  sx={{ my: 1.5, borderColor: "rgba(255,255,255,0.08)" }}
                />

                <Typography variant="overline" color="text.secondary">
                  {t("eventFields.provider")}
                </Typography>
                <Box sx={{ pt: 0.25, pb: 0.5 }}>
                  <Chip
                    component="a"
                    href={preview.provider.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    label={preview.provider.name}
                    size="small"
                    clickable
                    variant={
                      hasProviderBrandColor(preview.provider.slug)
                        ? "filled"
                        : "outlined"
                    }
                    sx={getProviderChipSx(preview.provider.slug)}
                  />
                </Box>

                <Typography
                  variant="overline"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {t("eventFields.categories")}
                </Typography>
                <Stack
                  direction="row"
                  spacing={0.75}
                  useFlexGap
                  sx={{ flexWrap: "wrap", mb: 1 }}
                >
                  {preview.categories.map((c) => (
                    <Chip
                      key={c.id}
                      label={categoryLabel(c, locale)}
                      size="small"
                    />
                  ))}
                </Stack>

                <DetailRow label={t("eventFields.url")}>
                  <Link
                    href={preview.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="body2"
                  >
                    {preview.url}
                  </Link>
                </DetailRow>

                {detail ? (
                  <DetailRow label={t("eventFields.ticketsUrl")}>
                    <Link
                      href={detail.ticketsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="body2"
                    >
                      {detail.ticketsUrl}
                    </Link>
                  </DetailRow>
                ) : (
                  <SkeletonRow label={t("eventFields.ticketsUrl")} />
                )}

                <Typography
                  variant="overline"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  {t("eventFields.description")}
                </Typography>
                {detail ? (
                  <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                    {eventDescription(detail, locale)}
                  </Typography>
                ) : (
                  <>
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="92%" />
                    <Skeleton variant="text" width="78%" />
                  </>
                )}
              </Box>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}

function DetailRow({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: ReactNode;
}) {
  const show = children ?? (value != null && value !== "" ? value : "—");
  return (
    <Box sx={{ py: 0.5 }}>
      <Typography
        variant="overline"
        color="text.secondary"
        sx={{ display: "block" }}
      >
        {label}
      </Typography>
      {typeof show === "string" ? (
        <Typography variant="body2">{show}</Typography>
      ) : (
        show
      )}
    </Box>
  );
}

function SkeletonRow({ label }: { label: string }) {
  return (
    <Box sx={{ py: 0.5 }}>
      <Typography
        variant="overline"
        color="text.secondary"
        sx={{ display: "block" }}
      >
        {label}
      </Typography>
      <Skeleton variant="rounded" height={22} width="60%" sx={{ mt: 0.5 }} />
    </Box>
  );
}
