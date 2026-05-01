"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { alpha } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Link } from "@/i18n";

import { LangPicker } from "./LangPicker";
import { ModeSwitcher } from "./ModeSwitcher";
import { ProfileButton } from "./ProfileButton";
import { QuickLinks } from "./QuickLinks";

export function Header() {
  const t = useTranslations("Header");

  return (
    <Box
      component="header"
      sx={(theme) => ({
        position: "sticky",
        top: 0,
        zIndex: theme.zIndex.appBar,
        borderBottom: "1px solid",
        borderColor: alpha(
          theme.palette.primary.main,
          theme.palette.mode === "dark" ? 0.12 : 0.1,
        ),
        backdropFilter: "blur(14px)",
        bgcolor: "background.default",
        backgroundImage: `linear-gradient(
          175deg,
          ${alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.14 : 0.08)} 0%,
          transparent 52%
        )`,
        boxShadow:
          theme.palette.mode === "dark"
            ? `inset 0 1px 0 ${alpha("#fff", 0.035)}`
            : `inset 0 1px 0 ${alpha("#fff", 0.65)}`,
      })}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Box
          component="nav"
          aria-label="Main"
          sx={{
            position: "relative",
            py: { xs: 1.25, md: 1.5 },
            minHeight: { xs: 56, md: 64 },
          }}
        >
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              gap: { xs: 1, md: 2 },
            }}
          >
            <Stack
              direction="row"
              sx={{
                gap: 1.25,
                alignItems: "center",
                minWidth: 0,
                flexShrink: 0,
                justifyContent: "flex-start",
                zIndex: 1,
              }}
            >
              <Box
                component={Link}
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
                    width: 40,
                    height: 40,
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src="/images/logo.svg"
                    alt=""
                    fill
                    sizes="40px"
                    priority
                    style={{ objectFit: "contain" }}
                  />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    fontSize: { xs: "1.05rem", sm: "1.125rem" },
                    whiteSpace: "nowrap",
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  {t("brand")}
                </Typography>
              </Box>
            </Stack>

            <QuickLinks />

            <Stack
              direction="row"
              sx={{
                gap: { xs: 1, sm: 1.5, md: 2, lg: 3 },
                alignItems: "center",
                justifyContent: "flex-end",
                flexShrink: 0,
                zIndex: 1,
              }}
            >
              {/*<ModeSwitcher />*/}
              <LangPicker />
              <ProfileButton />
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
