import Image from "next/image";
import { getTranslations } from "next-intl/server";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { fetchProviders, isError } from "@/requests";

import { landingSectionScrollMarginSx, LANDING_SECTION_IDS } from "../sections";

export async function ProvidersSection() {
  const t = await getTranslations("Landing");
  const res = await fetchProviders();
  if (isError(res)) return null;

  return (
    <Box
      id={LANDING_SECTION_IDS.providers}
      component="section"
      sx={{
        ...landingSectionScrollMarginSx,
        py: { xs: 5, md: 7 },
        bgcolor: "background.default",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          spacing={1.75}
          sx={{
            maxWidth: "min(680px, 100%)",
            mx: "auto",
            mb: { xs: 4, md: 5 },
            textAlign: "center",
          }}
        >
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.65 }}
          >
            {t("providersIntro1")}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.65 }}
          >
            {t("providersIntro2")}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.65 }}
          >
            {t("providersIntro3")}
          </Typography>
        </Stack>

        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 700 }}>
            {t("providersTitle")}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "stretch",
            gap: 2,
          }}
        >
          {res.map((provider) => (
            <Box
              key={provider.id}
              component="a"
              href={provider.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: "0 0 auto",
                width: { xs: "calc(50% - 8px)", sm: 172 },
                maxWidth: 200,
                p: 2,
                minHeight: 100,
                borderRadius: 2,
                bgcolor: "action.hover",
                border: "1px solid",
                borderColor: "divider",
                transition: "transform 0.2s ease, border-color 0.2s ease",
                boxSizing: "border-box",
                "&:hover": {
                  transform: "translateY(-2px)",
                  borderColor: "rgba(167,139,250,0.45)",
                },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: 56,
                  maxWidth: 160,
                }}
              >
                <Image
                  src={`/images/providers/${provider.slug}.png`}
                  alt={provider.name}
                  fill
                  sizes="160px"
                  style={{ objectFit: "contain" }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
