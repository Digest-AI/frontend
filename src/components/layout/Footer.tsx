"use client";

import Image from "next/image";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import Telegram from "@mui/icons-material/Telegram";
import { alpha, useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";

import { Link as I18nLink } from "@/i18n";

export function Footer() {
  const theme = useTheme();
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  const telegramUrl = t("telegramUrl");
  const facebookUrl = t("facebookUrl");
  const instagramUrl = t("instagramUrl");

  const telegramBtnSx = {
    color: "#fff",
    bgcolor: "#229ED9",
    border: "1px solid",
    borderColor: alpha("#229ED9", 0.65),
    "&:hover": {
      bgcolor: "#1f8bc7",
      borderColor: alpha("#229ED9", 0.85),
    },
  };

  const facebookBtnSx = {
    color: "#fff",
    bgcolor: "#1877F2",
    border: "1px solid",
    borderColor: alpha("#1877F2", 0.65),
    "&:hover": {
      bgcolor: "#166FE5",
      borderColor: alpha("#1877F2", 0.85),
    },
  };

  const instagramBtnSx = {
    color: "#fff",
    border: "1px solid",
    borderColor: alpha("#E4405F", 0.55),
    background:
      "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
    "&:hover": {
      filter: "brightness(1.08)",
      borderColor: alpha("#E4405F", 0.75),
    },
  };

  return (
    <Box
      component="footer"
      sx={(th) => ({
        mt: "auto",
        borderTop: "1px solid",
        borderColor: alpha(
          th.palette.primary.main,
          th.palette.mode === "dark" ? 0.14 : 0.12,
        ),
        bgcolor:
          th.palette.mode === "dark" ? "rgba(10, 8, 18, 0.94)" : "grey.50",
        backgroundImage:
          th.palette.mode === "dark"
            ? `linear-gradient(180deg, ${alpha(th.palette.primary.main, 0.08)} 0%, transparent 42%)`
            : `linear-gradient(180deg, ${alpha(th.palette.primary.main, 0.06)} 0%, transparent 38%)`,
      })}
    >
      <Container
        maxWidth="lg"
        sx={{ px: { xs: 2, sm: 3 }, py: { xs: 5, md: 6 } }}
      >
        <Stack spacing={{ xs: 4, md: 5 }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 4, md: 3 }}
            useFlexGap
            sx={{
              justifyContent: "space-between",
              alignItems: { xs: "center", md: "flex-start" },
            }}
          >
            <Stack
              spacing={1.25}
              sx={{
                alignItems: { xs: "center", md: "flex-start" },
                maxWidth: { md: 320 },
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <Box
                component={I18nLink}
                href="/"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1.25,
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: 44,
                    height: 44,
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src="/images/logo.svg"
                    alt=""
                    fill
                    sizes="44px"
                    style={{ objectFit: "contain" }}
                  />
                </Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, letterSpacing: "-0.02em" }}
                >
                  {t("brand")}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.55 }}
              >
                {t("tagline")}
              </Typography>
            </Stack>

            <Stack
              spacing={1.5}
              sx={{
                alignItems: { xs: "center", md: "flex-start" },
                minWidth: { md: 160 },
              }}
            >
              <Typography
                variant="overline"
                color="text.secondary"
                sx={{ letterSpacing: "0.1em", fontWeight: 700 }}
              >
                {t("followTitle")}
              </Typography>
              <Stack
                direction="row"
                spacing={0.75}
                useFlexGap
                sx={{ justifyContent: { xs: "center", md: "flex-start" } }}
              >
                <IconButton
                  component="a"
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("telegramAria")}
                  size="medium"
                  sx={telegramBtnSx}
                >
                  <Telegram />
                </IconButton>
                <IconButton
                  component="a"
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("facebookAria")}
                  size="medium"
                  sx={facebookBtnSx}
                >
                  <Facebook />
                </IconButton>
                <IconButton
                  component="a"
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("instagramAria")}
                  size="medium"
                  sx={instagramBtnSx}
                >
                  <Instagram />
                </IconButton>
              </Stack>
            </Stack>

            <Stack
              spacing={1.5}
              sx={{
                alignItems: { xs: "center", md: "flex-start" },
                minWidth: { md: 200 },
              }}
            >
              <Typography
                variant="overline"
                color="text.secondary"
                sx={{ letterSpacing: "0.1em", fontWeight: 700 }}
              >
                {t("contactTitle")}
              </Typography>
              <Stack
                spacing={0.75}
                sx={{ alignItems: { xs: "center", md: "flex-start" } }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block" }}
                >
                  {t("emailLabel")}
                </Typography>
                <Link
                  href={`mailto:${t("contactEmail")}`}
                  variant="body2"
                  underline="hover"
                >
                  {t("contactEmail")}
                </Link>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mt: 0.5 }}
                >
                  {t("phoneLabel")}
                </Typography>
                <Link
                  href={`tel:${t("contactPhoneRaw")}`}
                  variant="body2"
                  underline="hover"
                >
                  {t("contactPhoneDisplay")}
                </Link>
              </Stack>
            </Stack>
          </Stack>

          <Divider sx={{ borderColor: alpha(theme.palette.divider, 0.85) }} />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            useFlexGap
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ textAlign: { xs: "center", sm: "left" } }}
            >
              © {year} {t("brand")}. {t("copyright")}
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              useFlexGap
              sx={{
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Link
                component={I18nLink}
                href="/"
                variant="caption"
                color="text.secondary"
                underline="hover"
              >
                {t("privacy")}
              </Link>
              <Link
                component={I18nLink}
                href="/"
                variant="caption"
                color="text.secondary"
                underline="hover"
              >
                {t("terms")}
              </Link>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
