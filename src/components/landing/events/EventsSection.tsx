"use client";

import { useTranslations } from "next-intl";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { EventList } from "@/components/events/List";
import {
  heroCtaGradientShellSx,
  heroCtaInnerSx,
} from "@/components/landing/hero/constants";
import { Link } from "@/i18n";
import type { IEvent } from "@/types/parser";

import { landingSectionScrollMarginSx, LANDING_SECTION_IDS } from "../sections";

const seeMoreShellSx = {
  ...heroCtaGradientShellSx,
  borderRadius: "22px",
  p: "3px",
} as const;

const seeMoreInnerSx = {
  ...heroCtaInnerSx,
  borderRadius: "19px",
  minHeight: { xs: 58, sm: 68 },
  px: { xs: 4, sm: 5.5 },
  py: { xs: 2.25, sm: 2.625 },
  fontSize: { xs: "1.125rem", sm: "1.3125rem" },
  fontWeight: 600,
} as const;

type EventsSectionProps = {
  events: IEvent[];
};

export function EventsSection({ events }: EventsSectionProps) {
  const t = useTranslations("Landing");

  return (
    <Box
      id={LANDING_SECTION_IDS.events}
      component="section"
      sx={{
        ...landingSectionScrollMarginSx,
        py: { xs: 5, md: 7 },
        bgcolor: "background.default",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 700 }}>
            {t("eventsTitle")}
          </Typography>
        </Box>

        {events.length === 0 ? (
          <Typography color="text.secondary">{t("eventsEmpty")}</Typography>
        ) : (
          <EventList events={events} />
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 5,
            px: { xs: 0, sm: 2 },
          }}
        >
          <Box sx={seeMoreShellSx}>
            <Button
              variant="text"
              size="large"
              component={Link}
              href="/events/"
              sx={seeMoreInnerSx}
            >
              {t("eventsSeeMore")}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
