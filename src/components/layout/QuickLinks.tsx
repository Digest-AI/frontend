"use client";

import { useTranslations } from "next-intl";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { Link } from "@/i18n";

const navSx = {
  color: "text.primary",
  fontWeight: 500,
  fontSize: "0.95rem",
  px: { xs: 1, md: 1.25 },
  py: 0.75,
  minWidth: 0,
};

export function QuickLinks() {
  const t = useTranslations("Header");

  return (
    <Stack
      direction="row"
      sx={{
        gap: { xs: 0.5, sm: 1 },
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        maxWidth: { xs: "min(88vw, 420px)", md: "none" },
        px: { xs: 0.5 },
      }}
    >
      <Button variant="text" component={Link} href="/events" sx={navSx}>
        {t("navEvents")}
      </Button>
      <Button
        variant="text"
        component={Link}
        href="/recommendations"
        sx={navSx}
      >
        {t("navRecommendations")}
      </Button>
      <Button
        variant="text"
        component={Link}
        href="https://t.me/TheDigestAIBot"
        target="_blank"
        rel="noopener noreferrer"
        sx={navSx}
      >
        {t("navTelegram")}
      </Button>
    </Stack>
  );
}
