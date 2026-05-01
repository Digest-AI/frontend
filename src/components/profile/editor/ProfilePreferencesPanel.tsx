"use client";

import { useTranslations } from "next-intl";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";

import { ProfileCategoryPicker } from "./ProfileCategoryPicker";
import { sectionCardSx } from "./profileEditorStyles";

type Props = {
  preferencesLoadError: string | null;
  selectedSlugs: string[];
  unselectedSlugs: string[];
  onToggleCategory: (slug: string) => void;
  maxPriceInput: string;
  onMaxPriceChange: (v: string) => void;
  freeOnly: boolean;
  onFreeOnlyChange: (v: boolean) => void;
  missingRecProfile: boolean;
  privacyAccepted: boolean;
  onPrivacyAcceptedChange: (v: boolean) => void;
  prefError: string | null;
  prefSaved: boolean;
  preferencesSaveDisabled: boolean;
  prefPending: boolean;
  onDismissPrefError: () => void;
  onSubmitPreferences: () => void;
};

export function ProfilePreferencesPanel({
  preferencesLoadError,
  selectedSlugs,
  unselectedSlugs,
  onToggleCategory,
  maxPriceInput,
  onMaxPriceChange,
  freeOnly,
  onFreeOnlyChange,
  missingRecProfile,
  privacyAccepted,
  onPrivacyAcceptedChange,
  prefError,
  prefSaved,
  preferencesSaveDisabled,
  prefPending,
  onDismissPrefError,
  onSubmitPreferences,
}: Props) {
  const t = useTranslations("Profile");

  return (
    <Box sx={{ ...sectionCardSx, height: "100%" }}>
      <Typography variant="h6" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
        {t("sectionPreferences")}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {t("preferencesIntro")}
      </Typography>

      {preferencesLoadError ? (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {t("preferencesLoadError", { message: preferencesLoadError })}
        </Alert>
      ) : null}

      <Stack spacing={2}>
        <ProfileCategoryPicker
          selectedSlugs={selectedSlugs}
          unselectedSlugs={unselectedSlugs}
          onToggleCategory={onToggleCategory}
        />

        <TextField
          label={t("maxPrice")}
          value={maxPriceInput}
          onChange={(e) =>
            onMaxPriceChange(e.target.value.replace(/[^\d.]/g, ""))
          }
          inputMode="decimal"
          fullWidth
          disabled={freeOnly}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={freeOnly}
              onChange={(_, c) => onFreeOnlyChange(c)}
            />
          }
          label={t("freeOnly")}
        />

        {missingRecProfile ? (
          <Box
            sx={(theme) => ({
              p: 2,
              borderRadius: 2,
              border: "2px solid",
              borderColor: privacyAccepted
                ? theme.palette.success.main
                : theme.palette.primary.main,
              bgcolor: alpha(
                theme.palette.primary.main,
                theme.palette.mode === "dark" ? 0.12 : 0.06,
              ),
            })}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
              {t("consentBlockTitle")}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              {t("consentBlockIntro")}
            </Typography>
            <FormControlLabel
              sx={{ alignItems: "flex-start", ml: 0, mr: 0 }}
              control={
                <Checkbox
                  checked={privacyAccepted}
                  onChange={(_, c) => onPrivacyAcceptedChange(c)}
                  color="primary"
                  size="medium"
                  sx={{ pt: 0.25 }}
                />
              }
              label={
                <Typography
                  variant="body2"
                  component="span"
                  sx={{ lineHeight: 1.45 }}
                >
                  {t("personalDataConsent")}
                </Typography>
              }
            />
          </Box>
        ) : null}

        {prefError ? (
          <Alert severity="error" onClose={onDismissPrefError}>
            {prefError}
          </Alert>
        ) : null}
        {prefSaved ? (
          <Alert severity="success">{t("savedPreferences")}</Alert>
        ) : null}

        <Button
          type="button"
          variant="contained"
          color="secondary"
          size="large"
          onClick={onSubmitPreferences}
          disabled={preferencesSaveDisabled}
          sx={{ alignSelf: "flex-start" }}
        >
          {prefPending ? t("savingPreferences") : t("savePreferences")}
        </Button>
      </Stack>
    </Box>
  );
}
