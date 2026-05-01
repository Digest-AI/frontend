"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import IconButton from "@mui/material/IconButton";
import LoginRounded from "@mui/icons-material/LoginRounded";
import PersonRounded from "@mui/icons-material/PersonRounded";

import { isLoggedIn } from "@/app/actions";
import { Link, usePathname } from "@/i18n";

export function ProfileButton() {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    void isLoggedIn().then((v) => {
      if (!cancelled) setLoggedIn(v);
    });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  if (loggedIn === null) {
    return (
      <IconButton
        color="inherit"
        aria-label={t("loginAria")}
        aria-busy
        disabled
        size="medium"
        edge="end"
        sx={{ opacity: 0.45 }}
      >
        <LoginRounded sx={{ fontSize: 26 }} />
      </IconButton>
    );
  }

  if (!loggedIn) {
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

  return (
    <IconButton
      component={Link}
      href="/profile"
      color="inherit"
      aria-label={t("profileAria")}
      size="medium"
      edge="end"
    >
      <PersonRounded sx={{ fontSize: 26 }} />
    </IconButton>
  );
}
