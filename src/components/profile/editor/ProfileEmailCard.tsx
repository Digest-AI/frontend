"use client";

import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { sectionCardSx } from "./profileEditorStyles";

type Props = {
  email: string;
  isVerified: boolean;
};

export function ProfileEmailCard({ email, isVerified }: Props) {
  const t = useTranslations("Profile");

  return (
    <Box sx={{ ...sectionCardSx }}>
      <Typography variant="overline" color="text.secondary">
        {t("email")}
      </Typography>
      <Typography variant="body1" sx={{ wordBreak: "break-all" }}>
        {email}
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        sx={{ mt: 1.5, flexWrap: "wrap", alignItems: "center" }}
      >
        <Chip
          size="small"
          color={isVerified ? "success" : "warning"}
          label={isVerified ? t("verified") : t("unverified")}
        />
      </Stack>
      <Button
        variant="outlined"
        size="small"
        sx={{ mt: 1.5, alignSelf: "flex-start" }}
        onClick={() => {}}
      >
        {t("changeEmail")}
      </Button>
    </Box>
  );
}
