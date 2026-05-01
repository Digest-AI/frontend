"use client";

import Image from "next/image";
import type { MotionValue } from "motion/react";
import { motion } from "motion/react";

import Box from "@mui/material/Box";

import { heroEasing } from "./constants";

type HeroBackdropProps = {
  parallaxY: MotionValue<number>;
  reduce: boolean | null;
};

/** Фон hero: фото, параллакс при скролле, Ken Burns. */
export function HeroBackdrop({ parallaxY, reduce }: HeroBackdropProps) {
  const easing = heroEasing;

  return (
    <Box
      component={motion.div}
      style={{ y: parallaxY }}
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        willChange: "transform",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: reduce ? 0 : "-4%",
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{ position: "absolute", inset: 0 }}
          initial={{ opacity: reduce ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.85, ease: easing }}
        >
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              willChange: "transform",
            }}
            initial={{ scale: reduce ? 1 : 1.12 }}
            animate={{ scale: 1 }}
            transition={{
              duration: reduce ? 0 : 1.45,
              ease: easing,
            }}
          >
            <motion.div
              style={{
                position: "absolute",
                inset: reduce ? 0 : "-2%",
                willChange: "transform",
              }}
              initial={false}
              animate={reduce ? { scale: 1 } : { scale: [1, 1.045, 1] }}
              transition={{
                duration: reduce ? 0 : 24,
                repeat: reduce ? 0 : Infinity,
                ease: "easeInOut",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  height: "100%",
                  width: "100%",
                }}
              >
                <Image
                  src="/images/hero_bg.jpg"
                  alt=""
                  fill
                  priority
                  sizes="100vw"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </Box>
            </motion.div>
          </motion.div>
        </motion.div>
      </Box>
    </Box>
  );
}
