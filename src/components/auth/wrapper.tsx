"use client";

import { useTranslations } from "next-intl";
import { AnimatePresence, m } from "framer-motion";
import { AuthFields, Verification } from "./steps";
import { useAuthContext } from "@/providers";

//mui components
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FacebookButton, GoogleButton } from "./buttons";
import Divider from "@mui/material/Divider";

export function AuthWrapper() {
  const t = useTranslations("Auth");
  const { activeType } = useAuthContext();

  return (
    <Stack
      direction="column"
      sx={{
        p: 4,
        position: "relative",
        overflow: "hidden",
        width: "100%",
        maxWidth: "500px",
      }}
    >
      <AnimatePresence mode="wait">
        <m.div
          key={`step-content-${activeType}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Stack direction="column" spacing={8}>
            <Typography
              variant="h4"
              color="text.primary"
              sx={{ textAlign: "center" }}
            >
              {t(`${activeType}.label`)}
            </Typography>
            <Stack spacing={2} sx={{ flex: 1 }}>
              {activeType === "verification" ? (
                <Verification />
              ) : (
                <AuthFields />
              )}
              <Divider sx={{ my: 1 }}>{t("oauth2.or")}</Divider>
              <Stack direction="row" spacing={2}>
                <GoogleButton />
                <FacebookButton />
              </Stack>
            </Stack>
          </Stack>
        </m.div>
      </AnimatePresence>
    </Stack>
  );
}
