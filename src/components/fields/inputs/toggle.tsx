"use client";

import { useTranslations } from "next-intl";

//mui components
import Switch, { type SwitchProps } from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export function Toggle({ checked, onChange, ...props }: SwitchProps) {
  const t = useTranslations("Auth");

  return (
    <Stack
      direction="row"
      sx={{ justifyContent: "space-between", alignItems: "center" }}
    >
      <Switch checked={checked} onChange={onChange} {...props} />
      <Typography variant="body1">{t("fields.remember_me")}</Typography>
    </Stack>
  );
}
