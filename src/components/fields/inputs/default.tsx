"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

//mui components
import { type AutocompleteRenderInputParams } from "@mui/material/Autocomplete";
import TextField, { type TextFieldProps } from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";

type InputProps = (TextFieldProps | AutocompleteRenderInputParams) & {
  name: string;
  helperText?: string;
  activeType?: string;
  switchType?: (field: "email" | "password") => void;
};

export function Input({
  name,
  helperText = "",
  activeType,
  switchType,
  ...props
}: InputProps) {
  const t = useTranslations("Auth");
  const [localHelperText, setLocalHelperText] = useState<string>(helperText);

  //to remove dissapearing of text before collapse finishes
  useEffect(() => {
    if (helperText !== "") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocalHelperText(helperText);
    }
  }, [helperText]);

  return (
    <Stack direction="column" spacing={1} sx={{ flex: 1 }}>
      <TextField
        {...props}
        id={name}
        required
        sx={{
          "& .MuiInputBase-root": {
            borderRadius: 90,
            minHeight: { xs: "56px", md: "auto" },
            fontSize: { xs: "1rem", md: "inherit" },
            "& .MuiOutlinedInput-notchedOutline": {
              transition: "all 0.3s ease-in-out",
            },
          },
          "& .MuiInputLabel-root": {
            fontSize: { xs: "1rem", md: "inherit" },
          },
        }}
        placeholder={t(`fields.${name}`)}
      />
      {switchType !== undefined && (
        <Button
          variant="text"
          onClick={() => switchType(name as "email" | "password")}
          sx={{ alignSelf: "flex-start", p: 0 }}
        >
          <Typography>{t(`${activeType}.redirect_labels.${name}`)}</Typography>
        </Button>
      )}
      <Collapse in={helperText !== ""}>
        <Typography color="error">
          {localHelperText === "" ? "" : t(`errors.${localHelperText}`)}
        </Typography>
      </Collapse>
    </Stack>
  );
}
