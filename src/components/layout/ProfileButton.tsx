"use client";

import { useTranslations } from "next-intl";

import IconButton from "@mui/material/IconButton";
import LoginRounded from "@mui/icons-material/LoginRounded";

import { Link } from "@/i18n";

export function ProfileButton() {
  const t = useTranslations("Header");

  return (
    <IconButton
      component={Link}
      href="/auth"
      color="inherit"
      aria-label={t("loginAria")}
      size="medium"
      edge="end"
    >
      <LoginRounded sx={{ fontSize: 26 }} />
    </IconButton>
  );
}
