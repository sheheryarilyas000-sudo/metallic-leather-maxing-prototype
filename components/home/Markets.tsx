"use client";

import { motion } from "@/components/motion";
import { ease, fadeFromLeft, fadeFromRight, fadeUp, staggerContainer } from "@/components/motion";
import { markets } from "@/lib/home-content";

export function Markets() {
  return (
    <section
      aria-labelledby="markets-heading"
      className="fight-section overflow-hidden bg-[#FDFBF7]"
    >
      <div className="wrap grid gap-14 lg:grid-cols-2 lg:items-start">

        {/* LEFT — heading block, slides from left */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
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
              Global Markets
            </span>
          </motion.div>

          <motion.h2
            id="markets-heading"
            variants={fadeFromLeft}
            className="t-section font-bold"
            style={{ color: "#2C1A12", letterSpacing: "-0.02em" }}
          >
            Exporting worldwide
          </motion.h2>

          <motion.p variants={fadeFromLeft} className="mt-4 measure" style={{ color: "#7A695E" }}>
            {markets.intro}
          </motion.p>

          {/* Decorative diagonal accent block */}
          <motion.div
            variants={fadeUp}
            className="mt-10 relative overflow-hidden"
            style={{
              background: "#1E100A",
              clipPath: "polygon(0 0, 100% 0, 94% 100%, 0 100%)",
              padding: "20px 32px",
              maxWidth: "320px",
              boxShadow: "0 6px 18px rgba(30,16,10,0.3)",
              border: "1px solid rgba(191,149,63,0.3)",
            }}
          >
            <p
              className="text-[12px] font-bold uppercase tracking-widest bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-transparent bg-clip-text"
            >
              Shipping terms
            </p>
            <p
              className="mt-1 text-[17px] font-bold text-[#FDFBF7]"
            >
              FOB, CIF & EXW on request
            </p>
            {/* Gold bar */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "4px",
                height: "100%",
                background: "linear-gradient(180deg, #BF953F, #FCF6BA, #B38728)",
              }}
            />
          </motion.div>
        </motion.div>

        {/* RIGHT — markets table, slides from right */}
        <motion.div
          variants={fadeFromRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="overflow-x-auto"
          style={{
            border: "1px solid rgba(191,149,63,0.35)",
            borderTop: "4px solid #BF953F",
            borderRadius: "4px",
            boxShadow: "0 4px 16px rgba(44,26,18,0.06)",
          }}
        >
          <table className="w-full min-w-[440px] border-collapse text-left text-[15px]">
            <caption className="sr-only">Markets we export to</caption>
            <thead>
              <tr
                style={{
                  background: "#1E100A",
                  color: "#FCF6BA",
                  fontSize: "13px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                <th scope="col" className="px-5 py-3.5 font-bold">
                  Region
                </th>
                <th scope="col" className="px-5 py-3.5 font-bold">
                  Sizing
                </th>
                <th scope="col" className="px-5 py-3.5 font-bold">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {markets.regions.map((row, i) => (
                <tr
                  key={row.region}
                  style={{
                    borderTop: "1px solid rgba(191,149,63,0.18)",
                    background: i % 2 === 0 ? "#ffffff" : "#F7F2EB",
                    transition: "background 0.15s",
                  }}
                  className="hover:bg-[rgba(191,149,63,0.08)]"
                >
                  <th
                    scope="row"
                    className="px-5 py-4 font-bold"
                    style={{ color: "#2C1A12" }}
                  >
                    {row.region}
                  </th>
                  <td className="px-5 py-4" style={{ color: "#2C1A12" }}>
                    {row.sizing}
                  </td>
                  <td className="px-5 py-4" style={{ color: "#7A695E" }}>{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
