"use client";

import { useTranslations } from "next-intl";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { GENDERS } from "./profileEditorUtils";
import { sectionCardSx } from "./profileEditorStyles";

type Props = {
  name: string;
  surname: string;
  ageInput: string;
  gender: string;
  onNameChange: (v: string) => void;
  onSurnameChange: (v: string) => void;
  onAgeChange: (v: string) => void;
  onGenderChange: (v: string) => void;
  accountError: string | null;
  accountSaved: boolean;
  accountPending: boolean;
  onDismissError: () => void;
  onSubmit: () => void;
};

export function ProfileAccountForm({
  name,
  surname,
  ageInput,
  gender,
  onNameChange,
  onSurnameChange,
  onAgeChange,
  onGenderChange,
  accountError,
  accountSaved,
  accountPending,
  onDismissError,
  onSubmit,
}: Props) {
  const t = useTranslations("Profile");

  return (
    <Box sx={{ ...sectionCardSx, flex: 1 }}>
      <Typography variant="h6" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
        {t("sectionAccount")}
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={(e) => e.preventDefault()}
      >
        <Stack spacing={2}>
          <TextField
            label={t("name")}
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            autoComplete="given-name"
            fullWidth
          />
          <TextField
            label={t("surname")}
            value={surname}
            onChange={(e) => onSurnameChange(e.target.value)}
            autoComplete="family-name"
            fullWidth
          />
          <TextField
            label={t("age")}
            value={ageInput}
            onChange={(e) => onAgeChange(e.target.value.replace(/\D/g, ""))}
            inputMode="numeric"
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel id="profile-gender-label">{t("gender")}</InputLabel>
            <Select
              labelId="profile-gender-label"
              label={t("gender")}
              value={gender}
              onChange={(e) => onGenderChange(e.target.value)}
            >
              {!(GENDERS as readonly string[]).includes(gender) ? (
                <MenuItem value={gender}>{gender}</MenuItem>
              ) : null}
              {GENDERS.map((g) => (
                <MenuItem key={g} value={g}>
                  {t(`genderOptions.${g}`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {accountError ? (
            <Alert severity="error" onClose={onDismissError}>
              {accountError}
            </Alert>
          ) : null}
          {accountSaved ? (
            <Alert severity="success">{t("savedAccount")}</Alert>
          ) : null}

          <Button
            type="button"
            variant="contained"
            size="large"
            onClick={onSubmit}
            disabled={accountPending}
            sx={{ alignSelf: "flex-start" }}
          >
            {accountPending ? t("savingAccount") : t("saveAccount")}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
