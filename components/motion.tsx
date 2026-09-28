"use client";

/**
 * Shared Framer Motion animation variants and wrapper components.
 * Used across all below-hero sections for the "Fight" aesthetic animations.
 */
import { motion } from "framer-motion";

export { motion };

/** Long, smooth ease matching the "Fight" aesthetic requirement */
export const ease = [0.16, 1, 0.3, 1] as const;

/** Container that staggers its children as they scroll into view */
export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.05 },
  },
};

/** Text/heading — slides in from the left */
export const fadeFromLeft = {
  hidden: { opacity: 0, x: -50 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease },
  },
};

/** Image / visual block — slides in from the right */
export const fadeFromRight = {
  hidden: { opacity: 0, x: 50 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease },
  },
};

/** Generic fade up — for sub-items like stat cells, cards */
export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

/** Fade in from below — slightly more subtle, for small elements */
export const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

/** Clip-path unmask from left — for slanted image reveals */
export const clipReveal = {
  hidden: { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", opacity: 0 },
  show: {
    clipPath: "polygon(0 0, 100% 0, 90% 100%, 0% 100%)",
    opacity: 1,
    transition: { duration: 0.9, ease },
  },
};

/** Clip-path unmask from right — right-side slanted image reveals */
export const clipRevealRight = {
  hidden: { clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)", opacity: 0 },
  show: {
    clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0% 100%)",
    opacity: 1,
    transition: { duration: 0.9, ease },
  },
};

/**
 * Section wrapper — viewport-triggered stagger container.
 * Once 20% of the element is visible, it fires the animation once.
 */
export function SectionMotion({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "ol" | "ul";
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
