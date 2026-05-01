"use client";

import { useTranslations } from "next-intl";
import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useState,
  useEffect,
} from "react";
import { validateCode } from "@/utils/fieldValidators";

//mui components
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";

type CodeProps = {
  error: boolean;
  value: string;
  onChange: (value: string, error: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  helperText?: string;
};

export function Code({
  error,
  value,
  onChange,
  onKeyDown,
  helperText = "",
}: CodeProps) {
  const t = useTranslations("Auth");
  const [localHelperText, setLocalHelperText] = useState<string>(helperText);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      onChange(value, validateCode(value));
    },
    [onChange],
  );

  //to remove dissapearing of text before collapse finishes
  useEffect(() => {
    if (helperText !== "") {
      setLocalHelperText(helperText);
    }
  }, [helperText]);

  return (
    <Stack direction="column" spacing={1}>
      <TextField
        autoFocus
        value={value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        label={t("fields.code")}
        placeholder="••••••"
        name="code"
        fullWidth
        error={error}
        sx={{
          mx: "auto",
          "& .MuiInputBase-root": {
            borderRadius: 4,
            py: 2,
          },
          "& .MuiInputBase-input": {
            textAlign: "center",
            letterSpacing: "0.75rem",
            fontSize: "1.75rem",
            fontWeight: 600,
          },
          "& .MuiInputBase-input::placeholder": {
            opacity: 0.4,
          },
        }}
      />
      <Collapse in={helperText !== ""}>
        <Typography color="error" sx={{ textAlign: "center", mt: 1 }}>
          {localHelperText === "" ? "" : t(`errors.${localHelperText}`)}
        </Typography>
      </Collapse>
    </Stack>
  );
}
