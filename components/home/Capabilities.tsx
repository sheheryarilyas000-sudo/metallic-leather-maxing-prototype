"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  fadeFromLeft,
  fadeFromRight,
  fadeUp,
  staggerContainer,
} from "@/components/motion";
import { capabilities } from "@/lib/home-content";

const capabilitySlides = [
  {
    image: "/capabilities/1.jpg",
    bullets: ["Pattern making and sampling", "Precision leather cutting"],
  },
  {
    image: "/capabilities/2.jpg",
    bullets: ["Heavy-duty stitching lines", "Printing and embroidery"],
  },
  {
    image: "/capabilities/3.jpg",
    bullets: ["Finishing and inspection", "Custom private label packing"],
  },
];

export function Capabilities() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % capabilitySlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      aria-labelledby="capabilities-heading"
      className="fight-section overflow-hidden bg-[url('/leather-bg-full.jpg')] bg-cover bg-center bg-fixed relative w-full"
      style={{
        backgroundImage: "url('/leather-bg-full.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="wrap relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-stretch">

          {/* LEFT — heading block */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col justify-center"
          >
            <motion.div variants={fadeFromLeft} className="mb-3 flex items-center gap-3">
              <span
                style={{
                  display: "inline-block",
                  width: "6px",
                  height: "34px",
                  background: "linear-gradient(135deg, #BF953F, #FCF6BA, #B38728)",
                  transform: "skewX(-10deg)",
                }}
              />
              <span
                className="text-[13px] font-bold tracking-[0.22em] uppercase bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-transparent bg-clip-text"
              >
                Capabilities
              </span>
            </motion.div>

            <motion.h2
              id="capabilities-heading"
              variants={fadeFromLeft}
              className="t-section font-bold"
              style={{ color: "#FDFBF7", letterSpacing: "-0.02em" }}
            >
              Manufacturing capabilities
            </motion.h2>

            <motion.p
              variants={fadeFromLeft}
              className="mt-4 measure"
              style={{ color: "rgba(253, 251, 247, 0.78)" }}
            >
              {capabilities.intro}
            </motion.p>

            {/* Department list — Automated Cross-Fading Bullets */}
            <div className="mt-8 min-h-[92px] relative flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.ul
                  key={currentSlide}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1"
                >
                  {capabilitySlides[currentSlide].bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-center gap-3"
                      style={{ color: "rgba(253, 251, 247, 0.9)" }}
                    >
                      {/* Metallic Gold diamond bullet */}
                      <span
                        style={{
                          display: "inline-block",
                          width: "10px",
                          height: "10px",
                          flexShrink: 0,
                          background: "linear-gradient(135deg, #BF953F, #FCF6BA, #B38728)",
                          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                        }}
                      />
                      <span className="text-[15px] sm:text-base font-medium">{bullet}</span>
                    </li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </div>

            {/* Slide indicators */}
            <div className="flex items-center gap-2 mt-4">
              {capabilitySlides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  className="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
                  style={{
                    width: currentSlide === idx ? "28px" : "8px",
                    background:
                      currentSlide === idx
                        ? "linear-gradient(135deg, #BF953F, #FCF6BA, #B38728)"
                        : "rgba(191, 149, 63, 0.35)",
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <motion.div variants={fadeUp} className="mt-8">
              <Link
                href="/capabilities"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "linear-gradient(135deg, #BF953F 0%, #FCF6BA 50%, #B38728 100%)",
                  color: "#1A0F0A",
                  fontWeight: 700,
                  fontSize: "14px",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  padding: "12px 28px",
                  clipPath: "polygon(0 0, 100% 0, 94% 100%, 0% 100%)",
                  whiteSpace: "nowrap",
                  boxShadow: "0 4px 16px rgba(191, 149, 63, 0.4)",
                }}
              >
                See our capabilities
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT — slanted factory image with cross-fading slides */}
          <motion.div
            variants={fadeFromRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative flex items-center"
            style={{ minHeight: "360px" }}
          >
            {/* Main slanted image container — strictly keeping custom cut-out shape */}
            <div
              className="relative w-full overflow-hidden"
              style={{
                clipPath: "polygon(8% 0, 100% 0, 100% 100%, 0% 100%)",
                borderRadius: "4px",
                height: "420px",
                border: "1px solid rgba(191,149,63,0.35)",
              }}
            >
              {capabilitySlides.map((slide, idx) => (
                <div
                  key={slide.image}
                  className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                  style={{
                    opacity: currentSlide === idx ? 1 : 0,
                    zIndex: currentSlide === idx ? 2 : 1,
                    pointerEvents: currentSlide === idx ? "auto" : "none",
                  }}
                >
                  <Image
                    src={slide.image}
                    alt={slide.bullets.join(", ")}
                    fill
                    priority={idx === 0}
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              ))}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 5,
                  pointerEvents: "none",
                  background:
                    "linear-gradient(135deg, rgba(30,16,10,0.45) 0%, rgba(30,16,10,0.05) 60%)",
                }}
              />
            </div>

            {/* Gold corner tab */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "60px",
                height: "60px",
                background: "linear-gradient(135deg, #BF953F, #FCF6BA, #B38728)",
                clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                zIndex: 10,
              }}
            />
          </motion.div>
        </div>

        {/* ── Stats strip ── */}
        <motion.dl
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4"
          style={{
            border: "1px solid rgba(191,149,63,0.3)",
            background: "rgba(20, 10, 6, 0.75)",
            backdropFilter: "blur(6px)",
            borderRadius: "6px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
          }}
        >
          {capabilities.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="flex flex-col-reverse gap-2 p-8 max-sm:p-6"
              style={{
                borderRight:
                  i < capabilities.stats.length - 1
                    ? "1px solid rgba(191,149,63,0.2)"
                    : undefined,
                borderBottom:
                  i < 2 ? "1px solid rgba(191,149,63,0.2)" : undefined,
              }}
            >
              <dt
                className="text-[13px] font-semibold uppercase tracking-widest text-[#D5C7B8]"
              >
                {stat.label}
              </dt>
              <dd
                className="t-stat font-extrabold bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-transparent bg-clip-text"
              >
                {stat.value}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
