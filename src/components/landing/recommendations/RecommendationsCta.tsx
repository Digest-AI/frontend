"use client";

import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import LoginRounded from "@mui/icons-material/LoginRounded";
import { alpha, useTheme } from "@mui/material/styles";
import { useTranslations } from "next-intl";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Link } from "@/i18n";

import { landingSectionScrollMarginSx, LANDING_SECTION_IDS } from "../sections";

export function RecommendationsCta() {
  const theme = useTheme();
  const t = useTranslations("Landing");
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      id={LANDING_SECTION_IDS.recommendations}
      component="section"
      sx={{
        ...landingSectionScrollMarginSx,
        py: { xs: 5, md: 6 },
        px: { xs: 0, sm: 0 },
        bgcolor: "background.default",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            position: "relative",
            borderRadius: { xs: 3, md: 4 },
            overflow: "hidden",
            border: "1px solid",
            borderColor: alpha(theme.palette.primary.main, isDark ? 0.28 : 0.2),
            py: { xs: 4, md: 5.5 },
            px: { xs: 2.5, sm: 4, md: 5 },
            background: isDark
              ? `
                radial-gradient(ellipse 90% 70% at 10% 20%, ${alpha("#a78bfa", 0.22)} 0%, transparent 55%),
                radial-gradient(ellipse 70% 60% at 92% 75%, ${alpha("#2dd4bf", 0.14)} 0%, transparent 50%),
                radial-gradient(ellipse 50% 45% at 70% 10%, ${alpha("#818cf8", 0.12)} 0%, transparent 45%),
                linear-gradient(165deg, ${alpha("#1a1625", 0.97)} 0%, ${alpha("#12101c", 0.99)} 100%)
              `
              : `
                radial-gradient(ellipse 90% 70% at 8% 25%, ${alpha("#7c3aed", 0.12)} 0%, transparent 55%),
                radial-gradient(ellipse 70% 60% at 95% 70%, ${alpha("#14b8a6", 0.1)} 0%, transparent 50%),
                radial-gradient(ellipse 50% 45% at 72% 8%, ${alpha("#6366f1", 0.1)} 0%, transparent 45%),
                linear-gradient(165deg, ${alpha("#faf8ff", 1)} 0%, ${alpha("#f3f0fa", 1)} 100%)
              `,
            boxShadow: isDark
              ? `0 20px 56px ${alpha("#000", 0.45)}, inset 0 1px 0 ${alpha("#fff", 0.05)}`
              : `0 16px 48px ${alpha("#7c3aed", 0.12)}, inset 0 1px 0 ${alpha("#fff", 0.9)}`,
          }}
        >
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              inset: 0,
              opacity: isDark ? 0.55 : 0.45,
              backgroundImage: `
                linear-gradient(125deg, transparent 40%, ${alpha("#fff", isDark ? 0.03 : 0.35)} 50%, transparent 60%)
              `,
              pointerEvents: "none",
            }}
          />
          <Stack
            spacing={2.5}
            sx={{
              position: "relative",
              zIndex: 1,
              maxWidth: 560,
              mx: "auto",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: alpha(theme.palette.primary.main, isDark ? 0.2 : 0.12),
                border: "1px solid",
                borderColor: alpha(theme.palette.primary.main, isDark ? 0.35 : 0.25),
                color: "primary.main",
              }}
            >
              <AutoAwesomeRounded sx={{ fontSize: 30 }} />
            </Box>
            <Typography
              variant="h4"
              component="h2"
              sx={{ fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.2 }}
            >
              {t("recommendationsTitle")}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 1.65, maxWidth: 480 }}
            >
              {t("recommendationsHint")}
            </Typography>
            <Button
              component={Link}
              href="/auth"
              variant="contained"
              size="large"
              startIcon={<LoginRounded />}
              sx={{
                mt: 0.5,
                px: 3,
                py: 1.25,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 700,
                fontSize: "1rem",
                boxShadow: `0 8px 28px ${alpha(theme.palette.primary.main, 0.35)}`,
              }}
            >
              {t("recommendationsLogin")}
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
