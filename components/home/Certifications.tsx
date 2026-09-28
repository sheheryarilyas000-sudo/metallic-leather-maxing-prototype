"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "@/components/motion";
import { fadeFromLeft, fadeUp, staggerContainer } from "@/components/motion";
import { certifications } from "@/lib/home-content";

// Two identical sets duplicated for a seamless infinite loop without jumping
const certList = [...certifications, ...certifications];
const duplicatedCerts = [...certList, ...certList];

export function Certifications() {
  return (
    <section
      aria-labelledby="certs-heading"
      className="fight-section overflow-hidden bg-[url('/leather-bg-full.jpg')] bg-cover bg-center bg-fixed relative w-full"
      style={{
        backgroundImage: "url('/leather-bg-full.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="wrap relative z-10">

        {/* Heading */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <motion.div variants={fadeFromLeft}>
            <div className="mb-3 flex items-center gap-3">
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
                Quality Assurance
              </span>
            </div>
            <h2
              id="certs-heading"
              className="t-section font-bold"
              style={{ color: "#FDFBF7", letterSpacing: "-0.02em" }}
            >
              Certified and audited
            </h2>
            <p
              className="measure mt-4"
              style={{ color: "rgba(253, 251, 247, 0.78)" }}
            >
              Independent certificates and social audits, with numbers and validity dates you can check.
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Link
              href="/quality"
              className="font-semibold transition-all duration-200 hover:scale-105"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                border: "1px solid #BF953F",
                color: "#FCF6BA",
                fontSize: "14px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "11px 24px",
                whiteSpace: "nowrap",
                background: "rgba(191,149,63,0.12)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              Quality & certificates
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Seamless Infinite Marquee with Edge Fading Mask ── */}
        <div
          className="relative overflow-hidden w-full py-4"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          }}
        >
          <motion.div
            className="flex w-max gap-10 sm:gap-14"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 22,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {duplicatedCerts.map((cert, index) => (
              <div
                key={`${cert.name}-${index}`}
                className="flex-shrink-0 w-36 sm:w-44 flex flex-col items-center text-center group cursor-pointer bg-transparent"
              >
                {/* Circular badge container */}
                <div className="relative mb-3 flex h-24 w-24 items-center justify-center rounded-full overflow-hidden border border-[#BF953F]/40 bg-white/10 shadow-lg p-2 transition-transform duration-300 group-hover:scale-105 mx-auto">
                  <Image
                    src={`/images/cert-badge-${(index % certifications.length) + 1}.png`}
                    alt={`${cert.name} certification badge`}
                    width={96}
                    height={96}
                    className="h-full w-full object-contain rounded-full"
                  />
                </div>
                <h3
                  className="font-sans text-[15px] font-bold tracking-normal text-[#FDFBF7]"
                >
                  {cert.name}
                </h3>
                <p
                  className="mt-1 text-[13px] text-[#D5C7B8]/80 max-w-[18ch]"
                >
                  {cert.text}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-8 text-[14px]"
          style={{ color: "rgba(253,251,247,0.55)" }}
        >
          We only show certificates we currently hold. Numbers and validity dates are listed on the quality page.
        </motion.p>
      </div>
    </section>
  );
}
