"use client";

import Link from "next/link";
import { SplitReveal } from "@/components/SplitReveal";
import { ArchCarousel, type CategoryProduct } from "@/components/home/ArchCarousel";
import { motion } from "@/components/motion";
import { ease } from "@/components/motion";

/**
 * The 31 bespoke leather categories matching images /categories/1.png to /categories/31.png
 */
const RAW_CATEGORIES = [
  "JACKET",
  "JACKET",
  "JACKET",
  "VEST COLLECTION",
  "BLAZER COLLECTION",
  "SHIRT COLLECTION",
  "SHIRT COLLECTION",
  "SHORTS COLLECTION",
  "CHAPS",
  "GLOVES",
  "GLOVES",
  "PANTS",
  "LEDERHOSEN COLLECTION",
  "НАТ СOLLECTION",
  "FUR WRAP",
  "CORSET TOР",
  "CORSЕT TOP",
  "SHORT DRESS COLLECTION",
  "BODYSUIT COLLECTION",
  "CROP TOP COLLECTION",
  "APRON COLLECTION",
  "KNIFE SHEATH COLLECTION",
  "KILT COLLECTION",
  "BELT",
  "WALLETS",
  "KEYCHAIN COLLECTION",
  "HOLSTER",
  "BAG COLLECTION",
  "SPORRAN COLLECTION",
  "MUSIC INSTRUMENTS COLLECTION",
  "BAG COLLECTION",
];

const categoryItems: CategoryProduct[] = RAW_CATEGORIES.map((name, index) => ({
  id: `cat-${index + 1}`,
  name,
  image: `/Categories/${index + 1}.png`,
  subtext: "Handcrafted full-grain leather, custom tanning, embossing & brass hardware.",
}));

export function CategoriesSection() {
  return (
    <section
      aria-labelledby="categories-heading"
      className="bg-[url('/leather-bg-full.jpg')] bg-cover bg-center bg-fixed relative overflow-hidden"
      style={{
        backgroundImage: "url('/leather-bg-full.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Top metallic gold accent stripe */}
      <div className="relative z-10" style={{ height: "4px", background: "linear-gradient(90deg, #BF953F, #FCF6BA, #B38728)", width: "100%" }} />

      <div className="section relative z-10">
        {/* ── Heading Row in Gold/Leather Palette ── */}
        <motion.div
          className="wrap mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.25 } },
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -50 },
              show: { opacity: 1, x: 0, transition: { duration: 0.8, ease } },
            }}
          >
            <div className="mb-4 flex items-center gap-3">
              {/* Metallic Gold accent slash */}
              <span
                style={{
                  display: "inline-block",
                  width: "6px",
                  height: "38px",
                  background: "linear-gradient(135deg, #BF953F, #FCF6BA, #B38728)",
                  transform: "skewX(-10deg)",
                }}
              />
              <span
                className="text-[13px] font-bold tracking-[0.22em] uppercase bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-transparent bg-clip-text"
              >
                Our Products
              </span>
            </div>
            <h2
              id="categories-heading"
              className="t-section font-bold"
              style={{ color: "#FDFBF7", letterSpacing: "-0.02em" }}
            >
              <SplitReveal text="What we make" />
            </h2>
            <p
              className="measure mt-5"
              style={{ color: "rgba(253, 251, 247, 0.78)" }}
            >
              Over 30 handcrafted leather product ranges, tailored to your exact private-label specifications. Custom tanning, hardware, embossing and packaging.
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, x: 40 },
              show: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
            }}
          >
            <Link
              href="/products"
              className="shrink-0 self-start md:self-auto font-bold transition-transform duration-200 hover:scale-105"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "linear-gradient(135deg, #BF953F 0%, #FCF6BA 50%, #B38728 100%)",
                color: "#1A0F0A",
                fontSize: "14px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "12px 26px",
                clipPath: "polygon(0 0, 100% 0, 94% 100%, 0% 100%)",
                whiteSpace: "nowrap",
                boxShadow: "0 4px 16px rgba(191, 149, 63, 0.4)",
              }}
            >
              See all products
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* ── 31-Category 3D Arch Carousel (z-10) ── */}
        <div className="wrap overflow-visible relative z-10">
          <ArchCarousel items={categoryItems} />
        </div>
      </div>

      {/* Bottom metallic gold accent stripe */}
      <div style={{ height: "4px", background: "linear-gradient(90deg, #BF953F, #FCF6BA, #B38728)", width: "100%" }} />
    </section>
  );
}
