"use client";

import type { Variants } from "motion/react";
import { motion } from "motion/react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { Link } from "@/i18n";

import { heroCtaGradientShellSx, heroCtaInnerSx } from "./constants";
import { LANDING_SECTION_IDS } from "../sections";

type BtnMotion = {
  whileHover?: { scale: number; y: number };
  whileTap?: { scale: number };
};

type HeroCtasProps = {
  fadeUp: Variants;
  btnMotion: BtnMotion | Record<string, never>;
  labels: {
    events: string;
    register: string;
    learnMore: string;
  };
};

/** Ряд основных призывов к действию под hero-текстом. */
export function HeroCtas({ fadeUp, btnMotion, labels }: HeroCtasProps) {
  return (
    <Stack
      component={motion.div}
      variants={fadeUp}
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      useFlexGap
      sx={{
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "stretch",
        width: "100%",
        "& > div": {
          flex: 1,
          width: "100%",

          "& > div": {
            width: "100%",
            height: "100%",

            "& > a": {
              width: "100%",
              height: "100%",
            },
          },
        },
      }}
    >
      <Box component={motion.div} {...btnMotion}>
        <Box sx={heroCtaGradientShellSx}>
          <Button
            variant="text"
            size="large"
            component={Link}
            href={`#${LANDING_SECTION_IDS.events}`}
            sx={heroCtaInnerSx}
          >
            {labels.events}
          </Button>
        </Box>
      </Box>
      <Box component={motion.div} {...btnMotion}>
        <Box sx={heroCtaGradientShellSx}>
          <Button
            variant="text"
            size="large"
            component={Link}
            href={`#${LANDING_SECTION_IDS.recommendations}`}
            sx={heroCtaInnerSx}
          >
            {labels.register}
          </Button>
        </Box>
      </Box>
      <Box component={motion.div} {...btnMotion}>
        <Box sx={heroCtaGradientShellSx}>
          <Button
            variant="text"
            size="large"
            component={Link}
            href={`#${LANDING_SECTION_IDS.providers}`}
            sx={heroCtaInnerSx}
          >
            {labels.learnMore}
          </Button>
        </Box>
      </Box>
    </Stack>
  );
}
