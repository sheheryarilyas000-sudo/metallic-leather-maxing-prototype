"use client";

import Link from "next/link";
import { motion } from "@/components/motion";
import { ease, fadeFromLeft, fadeFromRight, fadeUp, staggerContainer } from "@/components/motion";
import { quoteHref, site } from "@/lib/site";

export function FinalCta() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="fight-section relative overflow-hidden bg-[url('/leather-bg-full.jpg')] bg-cover bg-center bg-fixed w-full"
      style={{
        backgroundImage: "url('/leather-bg-full.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Large diagonal gold block — decorative */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "45%",
          height: "100%",
          background: "linear-gradient(135deg, #BF953F, #FCF6BA, #B38728)",
          clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)",
          zIndex: 0,
          opacity: 0.08,
        }}
      />

      {/* Top accent line */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #BF953F, #FCF6BA, #B38728)",
          zIndex: 1,
        }}
      />

      <div className="wrap relative" style={{ zIndex: 2 }}>
        <motion.div
          className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={fadeFromLeft}>
            <div className="mb-4 flex items-center gap-3">
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
                Start a project
              </span>
            </div>
            <h2
              id="cta-heading"
              className="t-section font-bold max-w-[18ch]"
              style={{ color: "#FDFBF7", letterSpacing: "-0.02em" }}
            >
              Ready to source your next range?
            </h2>
            <p
              className="measure mt-5"
              style={{ color: "rgba(253, 251, 247, 0.78)" }}
            >
              Send your tech pack or a reference sample, and we reply with costing and a bespoke leather sampling plan.
            </p>
          </motion.div>

          <motion.div
            variants={fadeFromRight}
            className="flex shrink-0 flex-wrap gap-4"
          >
            <Link
              href={quoteHref}
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
                padding: "14px 32px",
                clipPath: "polygon(0 0, 100% 0, 94% 100%, 0% 100%)",
                whiteSpace: "nowrap",
                boxShadow: "0 4px 16px rgba(191, 149, 63, 0.4)",
              }}
            >
              Request a quote
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href={site.catalogueUrl}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                border: "1px solid #BF953F",
                color: "#FCF6BA",
                fontWeight: 600,
                fontSize: "14px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "13px 28px",
                whiteSpace: "nowrap",
                background: "rgba(191, 149, 63, 0.12)",
                transition: "all 0.2s",
              }}
            >
              Download catalogue (PDF)
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
