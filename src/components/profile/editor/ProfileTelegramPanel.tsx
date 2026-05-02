"use client";

import { useCallback, useState, useTransition } from "react";
import { useTranslations } from "next-intl";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { verifyTelegramLink } from "@/app/actions";
import { isError } from "@/requests";
import type { ITGUser } from "@/types";

import { sectionCardSx } from "./profileEditorStyles";

export type ProfileTelegramInitial =
  | { kind: "linked"; user: ITGUser }
  | { kind: "not_linked" }
  | { kind: "load_error"; message: string | null };

type Props = {
  publicId: string;
  initial: ProfileTelegramInitial;
};

function normalizeState(initial: ProfileTelegramInitial) {
  if (initial.kind === "linked") {
    return { status: "linked" as const, user: initial.user };
  }
  if (initial.kind === "not_linked") {
    return { status: "pending_link" as const };
  }
  return {
    status: "error" as const,
    message: initial.message,
  };
}

export function ProfileTelegramPanel({ publicId, initial }: Props) {
  const t = useTranslations("Profile");
  const tFooter = useTranslations("Footer");
  const [state, setState] = useState(() => normalizeState(initial));
  const [code, setCode] = useState("");
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const onCodeChange = useCallback((raw: string) => {
    const normalized = raw.replace(/[^a-zA-Z0-9]/g, "").slice(0, 6);
    setCode(normalized);
    setVerifyError(null);
  }, []);

  const submitVerify = useCallback(() => {
    setVerifyError(null);

    if (code.length !== 6) {
      setVerifyError(t("telegramCodeInvalid"));
      return;
    }

    startTransition(() => {
      void verifyTelegramLink(publicId, code).then((res) => {
        if (isError(res)) {
          setVerifyError(
            res.detail?.trim() ? res.detail : t("telegramVerifyError"),
          );
          return;
        }
        setState({ status: "linked", user: res });
        setCode("");
      });
    });
  }, [code, publicId, t]);

  const botUrl = tFooter("telegramUrl");

  return (
    <Box sx={sectionCardSx}>
      <Typography variant="h6" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
        {t("sectionTelegram")}
      </Typography>

      {state.status === "error" ? (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {state.message
            ? t("telegramLoadError", { message: state.message })
            : t("telegramLoadErrorGeneric")}
        </Alert>
      ) : null}

      {state.status === "linked" ? (
        <Stack spacing={1}>
          <Typography variant="body2" color="text.secondary">
            {t("telegramLinkedIntro")}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            @{state.user.username.replace(/^@/, "")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("telegramIdLabel")}: {state.user.telegramId}
          </Typography>
        </Stack>
      ) : null}

      {state.status === "pending_link" ? (
        <Stack spacing={2}>
          <Typography variant="body2" color="text.secondary">
            {t("telegramNotLinkedIntro")}
          </Typography>
          <Link href={botUrl} target="_blank" rel="noopener noreferrer">
            {t("telegramOpenBot")}
          </Link>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              alignItems: { xs: "stretch", sm: "flex-start" },
            }}
          >
            <TextField
              label={t("telegramCodeLabel")}
              value={code}
              onChange={(e) => onCodeChange(e.target.value)}
              autoComplete="one-time-code"
              disabled={pending}
              slotProps={{
                htmlInput: { maxLength: 6 },
              }}
              sx={{ maxWidth: { sm: 220 }, width: "100%" }}
            />
            <Button
              variant="contained"
              onClick={submitVerify}
              disabled={pending || code.length !== 6}
              sx={{ alignSelf: { xs: "stretch", sm: "center" } }}
            >
              {pending ? t("telegramVerifying") : t("telegramVerify")}
            </Button>
          </Box>

          {verifyError ? (
            <Alert severity="error" onClose={() => setVerifyError(null)}>
              {verifyError}
            </Alert>
          ) : null}
        </Stack>
      ) : null}
    </Box>
  );
}
