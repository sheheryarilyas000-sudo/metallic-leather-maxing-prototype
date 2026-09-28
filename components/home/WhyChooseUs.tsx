"use client";

import { motion } from "@/components/motion";
import { ease, fadeFromLeft, fadeFromRight, fadeUp, staggerContainer } from "@/components/motion";
import { whyChooseUs, type IconName } from "@/lib/home-content";

// Outlined icons drawn in Metallic Gold
const icons: Record<IconName, React.ReactNode> = {
  moq: (
    <>
      <path d="M4 8l8-4 8 4-8 4-8-4z" />
      <path d="M4 12l8 4 8-4" />
      <path d="M4 16l8 4 8-4" />
    </>
  ),
  sample: (
    <>
      <path d="M8 4l-4 3 2 3 2-1v11h8V9l2 1 2-3-4-3" />
      <path d="M8 4a4 4 0 008 0" />
    </>
  ),
  label: (
    <>
      <path d="M4 4h9l7 7-9 9-7-7V4z" />
      <circle cx="8.5" cy="8.5" r="1.5" />
    </>
  ),
  contact: (
    <>
      <path d="M4 5h16v11H9l-5 4V5z" />
      <path d="M8 9h8M8 12h5" />
    </>
  ),
};

export function WhyChooseUs() {
  return (
    <section
      aria-labelledby="why-heading"
      className="fight-section overflow-hidden bg-[#0A0A0A] w-full border-b-[2px] border-[#BF953F]"
    >
      <div className="wrap relative z-10">
        {/* Section label + heading */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-14"
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
                Why choose us
              </span>
            </div>
            <h2
              id="why-heading"
              className="t-section font-bold"
              style={{ color: "#FDFBF7", letterSpacing: "-0.02em" }}
            >
              Why buyers choose Maxing
            </h2>
            <p className="measure mt-4" style={{ color: "rgba(253, 251, 247, 0.76)" }}>
              What you can expect on every order, from the first sample to the last carton.
            </p>
          </motion.div>
        </motion.div>

        {/* 2 × 2 card grid with Feature Images & Hover Reveal */}
        <motion.div
          className="grid sm:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {whyChooseUs.map((item, i) => {
            const featureImages = [
              "/features/1.jpg",
              "/features/2.jpg",
              "/features/3.jpg",
              "/features/4.jpg",
            ];

            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-xl h-[320px] border border-[#BF953F]/30 shadow-2xl"
              >
                {/* Background Feature Image with Slow Zoom on Hover: z-0 */}
                <img
                  src={featureImages[i % featureImages.length]}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-110"
                />

                {/* Dark Gradient Hover Overlay: z-10 */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 55%, transparent 100%)",
                  }}
                />

                {/* Subtle Gold Top Accent Line */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#BF953F] to-transparent z-10 opacity-70" />

                {/* Entire Text Content (Heading, Paragraph, Icon): z-20 */}
                <div className="absolute inset-x-0 bottom-0 p-6 z-20 flex flex-col justify-end transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                  {/* Icon */}
                  <div className="mb-4">
                    <span
                      style={{
                        display: "grid",
                        width: "44px",
                        height: "44px",
                        placeItems: "center",
                        background: "rgba(10, 10, 10, 0.75)",
                        color: "#FCF6BA",
                        border: "1px solid rgba(191, 149, 63, 0.45)",
                        borderRadius: "8px",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        style={{ width: "22px", height: "22px" }}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.8}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {icons[item.icon]}
                      </svg>
                    </span>
                  </div>

                  {/* Heading in Metallic Gold Gradient */}
                  <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-transparent bg-clip-text">
                    {item.title}
                  </h3>

                  {/* Paragraph Text in Clean White */}
                  <p className="mt-3 text-[15px] leading-relaxed text-[#FDFBF7]">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
