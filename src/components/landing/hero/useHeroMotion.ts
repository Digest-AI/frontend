"use client";

import { useMemo, useRef } from "react";
import {
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import { heroEasing } from "./constants";

export function useHeroMotion() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduce ? 0 : 48],
  );

  const container = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: {
          staggerChildren: reduce ? 0 : 0.11,
          delayChildren: reduce ? 0 : 0.08,
        },
      },
    }),
    [reduce],
  );

  const fadeUp = useMemo(
    () => ({
      hidden: reduce
        ? { opacity: 1, y: 0, filter: "blur(0px)" }
        : { opacity: 0, y: 32, filter: "blur(6px)" },
      show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
          duration: reduce ? 0 : 0.72,
          ease: heroEasing,
        },
      },
    }),
    [reduce],
  );

  const btnMotion = reduce
    ? {}
    : { whileHover: { scale: 1.03, y: -2 }, whileTap: { scale: 0.98 } };

  return {
    reduce,
    sectionRef,
    parallaxY,
    container,
    fadeUp,
    btnMotion,
  };
}
