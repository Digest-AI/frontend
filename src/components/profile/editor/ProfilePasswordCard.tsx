"use client";

import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { sectionCardSx } from "./profileEditorStyles";

export function ProfilePasswordCard() {
  const t = useTranslations("Profile");

  return (
    <Box sx={{ ...sectionCardSx }}>
      <Typography variant="overline" color="text.secondary">
        {t("password")}
      </Typography>
      <Typography
        variant="body1"
        sx={{ letterSpacing: "0.15em", userSelect: "none" }}
        aria-label={t("passwordHint")}
      >
        {t("passwordMasked")}
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block", mt: 0.5 }}
      >
        {t("passwordHint")}
      </Typography>
      <Button
        variant="outlined"
        size="small"
        sx={{ mt: 1.5, alignSelf: "flex-start" }}
        onClick={() => {}}
      >
        {t("changePassword")}
      </Button>
    </Box>
  );
}
