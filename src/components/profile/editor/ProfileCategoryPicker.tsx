"use client";

import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";

import { Category } from "@/components/category";

import { categoryZoneBaseSx } from "./profileEditorStyles";

type Props = {
  selectedSlugs: string[];
  unselectedSlugs: string[];
  onToggleCategory: (slug: string) => void;
};

export function ProfileCategoryPicker({
  selectedSlugs,
  unselectedSlugs,
  onToggleCategory,
}: Props) {
  const t = useTranslations("Profile");

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
        {t("interestsTitle")}
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block", mb: 1.5 }}
      >
        {t("categoriesTapHint")}
      </Typography>

      <Stack spacing={1.5}>
        <Box>
          <Typography
            variant="overline"
            color="primary"
            sx={{ fontWeight: 700, letterSpacing: "0.06em" }}
          >
            {t("categoriesSelectedTitle")}
          </Typography>
          <Box
            sx={(theme) => ({
              ...categoryZoneBaseSx,
              borderColor: "primary.main",
              borderStyle: "solid",
              bgcolor: alpha(
                theme.palette.primary.main,
                theme.palette.mode === "dark" ? 0.12 : 0.06,
              ),
            })}
          >
            {selectedSlugs.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                {t("categoriesSelectedEmpty")}
              </Typography>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                {selectedSlugs.map((slug) => (
                  <Category
                    key={slug}
                    slug={slug}
                    label={t(`categoryLabels.${slug}`)}
                    size="small"
                    selected
                    onClick={() => onToggleCategory(slug)}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Box>

        <Box>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ fontWeight: 700, letterSpacing: "0.06em" }}
          >
            {t("categoriesUnselectedTitle")}
          </Typography>
          <Box
            sx={(theme) => ({
              ...categoryZoneBaseSx,
              bgcolor: alpha(
                theme.palette.primary.main,
                theme.palette.mode === "dark" ? 0.06 : 0.03,
              ),
            })}
          >
            {unselectedSlugs.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                {t("categoriesUnselectedEmpty")}
              </Typography>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                {unselectedSlugs.map((slug) => (
                  <Category
                    key={slug}
                    slug={slug}
                    label={t(`categoryLabels.${slug}`)}
                    size="small"
                    selected={false}
                    onClick={() => onToggleCategory(slug)}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
