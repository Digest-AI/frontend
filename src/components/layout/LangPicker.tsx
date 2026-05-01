"use client";

import { useLocale, useTranslations } from "next-intl";
import { alpha } from "@mui/material/styles";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { usePathname, useRouter } from "@/i18n";
import { langs, routing } from "@/i18n/routing";

export function LangPicker() {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const toggleLocale = () => {
    const nextLocale =
      routing.locales.find((code: string) => code !== locale) ?? langs[0].code;
    router.replace(pathname, { locale: nextLocale });
  };

  const localeBadge = locale.toUpperCase();

  return (
    <IconButton
      type="button"
      color="inherit"
      onClick={toggleLocale}
      aria-label={t("languageAria")}
      size="medium"
      edge="end"
      sx={{
        px: 1,
        minWidth: 44,
        borderRadius: 2,
        border: 1,
        borderColor: (theme) =>
          alpha(
            theme.palette.primary.main,
            theme.palette.mode === "dark" ? 0.35 : 0.22,
          ),
      }}
    >
      <Typography
        component="span"
        sx={{
          fontWeight: 800,
          fontSize: "0.75rem",
          letterSpacing: "0.12em",
          lineHeight: 1,
          textAlign: "center",
          color: "text.primary",
        }}
      >
        {localeBadge}
      </Typography>
    </IconButton>
  );
}
