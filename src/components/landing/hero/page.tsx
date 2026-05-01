"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import { HeroAmbientGlows } from "./HeroAmbientGlows";
import { HeroBackdrop } from "./HeroBackdrop";
import { HeroCtas } from "./HeroCtas";
import { HeroScrim } from "./HeroScrim";
import { HeroTagline } from "./HeroTagline";
import { HeroTitle } from "./HeroTitle";
import { useHeroMotion } from "./useHeroMotion";

export function Hero() {
  const t = useTranslations("Landing");
  const { reduce, sectionRef, parallaxY, container, fadeUp, btnMotion } =
    useHeroMotion();

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        isolation: "isolate",
        minHeight: "min(calc(100vh - 32px), 900px)",
      }}
    >
      <HeroBackdrop parallaxY={parallaxY} reduce={reduce} />
      <HeroAmbientGlows reduce={reduce} />
      <HeroScrim />

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "min(calc(100vh - 32px), 900px)",
          py: { xs: 10, md: 14 },
          textAlign: "center",
        }}
      >
        <Stack
          component={motion.div}
          variants={container}
          initial="hidden"
          animate="show"
          spacing={{ xs: 3.5, md: 5 }}
          sx={{
            width: "100%",
            maxWidth: { md: "min(840px, 100%)" },
            mx: "auto",
            alignItems: "center",
            color: "common.white",
          }}
        >
          <Box component={motion.div} variants={fadeUp} sx={{ width: "100%" }}>
            <HeroTitle reduce={reduce} title={t("title")} />
          </Box>

          <Box component={motion.div} variants={fadeUp} sx={{ width: "100%" }}>
            <HeroTagline tagline={t("tagline")} />
          </Box>

          <HeroCtas
            fadeUp={fadeUp}
            btnMotion={btnMotion}
            labels={{
              events: t("ctaEvents"),
              register: t("ctaRegister"),
              learnMore: t("ctaLearnMore"),
            }}
          />
        </Stack>
      </Container>
    </Box>
  );
}
