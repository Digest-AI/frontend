"use client";

import { motion } from "motion/react";

import Box from "@mui/material/Box";

import { heroEasing } from "./constants";

type HeroAmbientGlowsProps = {
  reduce: boolean | null;
};

/** Декоративные градиентные пятна поверх фото (отключено при reduced motion). */
export function HeroAmbientGlows({ reduce }: HeroAmbientGlowsProps) {
  if (reduce) return null;

  const easing = heroEasing;

  return (
    <>
      <Box
        component={motion.div}
        aria-hidden
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.35, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.2, ease: easing }}
        sx={{
          position: "absolute",
          top: { xs: "-8%", md: "-12%" },
          right: { xs: "-20%", md: "-8%" },
          width: { xs: 280, md: 420 },
          height: { xs: 280, md: 420 },
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.42), transparent 62%)",
          filter: "blur(2px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <Box
        component={motion.div}
        aria-hidden
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        sx={{
          position: "absolute",
          bottom: { xs: "5%", md: "12%" },
          left: { xs: "-12%", md: "2%" },
          width: { xs: 200, md: 300 },
          height: { xs: 200, md: 300 },
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(45, 212, 191, 0.26), transparent 65%)",
          filter: "blur(4px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
    </>
  );
}
