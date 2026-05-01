"use client";

import { KeyboardEvent, useCallback, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Code } from "./inputs";
import { AuthButton } from "@/components/auth";

//mui components
import Typography from "@mui/material/Typography";

interface CodeFieldProps {
  value: string;
  error: string;
  onChange: (value: string, error: string) => void;
  submit: () => void;
  resend: () => void;
}

export function CodeField({
  value,
  error,
  onChange,
  submit,
  resend,
}: CodeFieldProps) {
  const t = useTranslations("Auth");
  const [allowResend, setAllowResend] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        submit();
      }
    },
    [submit],
  );

  useEffect(() => {
    if (!allowResend) {
      const timer = setInterval(() => {
        if (secondsLeft === 0) {
          setAllowResend(true);
          clearInterval(timer);
          return;
        }
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [allowResend, secondsLeft]);

  const handleResend = useCallback(() => {
    setAllowResend(false);
    setSecondsLeft(60);
    resend();
  }, [resend]);

  return (
    <>
      <Typography>{t("verification.helper1")}</Typography>
      <Code
        error={error !== ""}
        helperText={error}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
      <AuthButton type="verification" onClick={submit} />
      <Typography>
        {t("verification.helper2", { seconds: secondsLeft })}
      </Typography>
      <AuthButton
        type="resend"
        onClick={handleResend}
        disabled={!allowResend}
      />
    </>
  );
}
