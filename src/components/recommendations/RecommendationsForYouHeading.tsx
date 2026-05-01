"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import Typography from "@mui/material/Typography";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.12 },
  },
};

const wordMotion = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 380, damping: 28 },
  },
};

export function RecommendationsForYouHeading() {
  const t = useTranslations("RecommendationsPage");
  const phrase = t("forYou");
  const words = phrase.split(/\s+/).filter(Boolean);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      aria-hidden
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.28em 0.35em" }}
    >
      {words.map((word, i) => (
        <motion.span key={`${word}-${i}`} variants={wordMotion} style={{ display: "inline-block" }}>
          <Typography
            component="span"
            sx={{
              fontSize: { xs: "clamp(1.35rem, 5vw, 1.85rem)", md: "clamp(1.6rem, 2.6vw, 2.15rem)" },
              fontWeight: 700,
              letterSpacing: "-0.02em",
              background: (theme) =>
                `linear-gradient(118deg, ${theme.palette.secondary.light} 0%, ${theme.palette.primary.light} 45%, ${theme.palette.secondary.main} 100%)`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              textShadow: "0 12px 40px rgba(0,0,0,0.25)",
            }}
          >
            {word}
          </Typography>
        </motion.span>
      ))}
    </motion.div>
  );
}
