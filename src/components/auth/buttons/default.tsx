"use client";

import { useTranslations } from "next-intl";

//mui components
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface AuthButtonProps {
  type: string;
  onClick: () => void;
  disabled?: boolean;
}

export function AuthButton({
  type,
  onClick,
  disabled = false,
}: AuthButtonProps) {
  const t = useTranslations("Auth");

  return (
    <Button
      sx={{ borderRadius: 90, p: 1 }}
      variant="contained"
      onClick={onClick}
      disabled={disabled}
    >
      <Typography variant="h6">{t(`${type}.submit`)}</Typography>
    </Button>
  );
}
