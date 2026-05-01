"use client";

import { useCallback } from "react";
import { useTranslations } from "next-intl";
import { useColorScheme } from "@mui/material/styles";

import IconButton from "@mui/material/IconButton";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

export function ModeSwitcher() {
  const t = useTranslations("Header");
  const { setMode } = useColorScheme();

  const themeToLight = useCallback(() => {
    setMode("light");
  }, [setMode]);

  const themeToDark = useCallback(() => {
    setMode("dark");
  }, [setMode]);

  return (
    <IconButton
      type="button"
      color="inherit"
      aria-label={t("themeToggleAria")}
      size="medium"
      edge="end"
      disableRipple={false}
    >
      <DarkModeOutlinedIcon
        onClick={themeToLight}
        sx={[
          { display: "none", cursor: "pointer", fontSize: 26 },
          (theme) => theme.applyStyles("dark", { display: "block" }),
        ]}
      />
      <LightModeOutlinedIcon
        onClick={themeToDark}
        sx={[
          { display: "block", cursor: "pointer", fontSize: 26 },
          (theme) => theme.applyStyles("dark", { display: "none" }),
        ]}
      />
    </IconButton>
  );
}
