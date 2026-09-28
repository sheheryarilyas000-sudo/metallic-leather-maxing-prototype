"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fadeFromLeft, fadeUp, staggerContainer } from "@/components/motion";

interface ProcessStep {
  id: number;
  image: string;
  heading: string;
  description: string;
  mainTitle: string;
  mainSubtitle: string;
}

const processSteps: ProcessStep[] = [
  {
    id: 1,
    image: "/process/1.jpg",
    heading: "Inquiry",
    description: "Send a tech pack, reference sample or photo with quantities and target price.",
    mainTitle: "From tech pack to shipment",
    mainSubtitle: "Five clear steps, with your approval before anything goes into bulk production.",
  },
  {
    id: 2,
    image: "/process/2.jpg",
    heading: "Costing and sampling",
    description: "We quote per style and make a sample in your fabric and colour.",
    mainTitle: "Precise Costing & Sampling",
    mainSubtitle: "We quote per style and make a sample in your fabric, leather grade, and colour.",
  },
  {
    id: 3,
    image: "/process/3.jpg",
    heading: "Approval",
    description: "You approve the sample, sizes and trims. We lock the production plan.",
    mainTitle: "Client Approval & Lock",
    mainSubtitle: "You approve the sample, sizes and trims. We lock the production plan and schedule materials.",
  },
  {
    id: 4,
    image: "/process/4.jpg",
    heading: "Production",
    description: "Cutting, stitching and finishing, with inline checks on every line.",
    mainTitle: "Bulk Production",
    mainSubtitle: "Cutting, stitching and finishing, with rigorous inline quality checks on every assembly line.",
  },
  {
    id: 5,
    image: "/process/5.jpg",
    heading: "Inspection and shipping",
    description: "Final inspection, packing to your spec and export documents.",
    mainTitle: "Final Inspection & Export",
    mainSubtitle: "Final inspection, packing to your spec, customs documentation, and worldwide export dispatch.",
  },
];

const STEP_DURATION_MS = 4000;

export function ProcessFlow() {
  const [activeStep, setActiveStep] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);
  const [isInstant, setIsInstant] = useState(true);
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let frame1: number;
    let frame2: number;

    const startPct = activeStep * 25;
    const targetPct = activeStep < 4 ? (activeStep + 1) * 25 : 100;

    // Immediately snap to the start percentage of this step (no transition delay)
    setIsInstant(true);
    setProgressWidth(startPct);

    if (activeStep < 4) {
      // In next animation frames, enable CSS transition and smoothly fill to targetPct over 4000ms
      frame1 = requestAnimationFrame(() => {
        frame2 = requestAnimationFrame(() => {
          setIsInstant(false);
          setProgressWidth(targetPct);
        });
      });
    } else {
      // Step 5: progressWidth is already at 100% (Node 5). Pause for 4000ms.
      setIsInstant(true);
      setProgressWidth(100);
    }

    // Set timeout for 4000ms to transition to next step
    timer = setTimeout(() => {
      setActiveStep((prev) => (prev + 1) % processSteps.length);
      setCycleKey((k) => k + 1);
    }, STEP_DURATION_MS);

    return () => {
      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);
      clearTimeout(timer);
    };
  }, [cycleKey]);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setCycleKey((k) => k + 1);
  };

  return (
    <section
      aria-labelledby="flow-heading"
      className="fight-section overflow-hidden bg-[#FDFBF7]"
    >
      <div className="wrap">

        {/* ── Split layout: image left (slanted), heading right ── */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center mb-16">

          {/* Left: slanted process image with custom shape preserved */}
          <motion.div
            variants={fadeFromLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative"
            style={{ minHeight: "300px" }}
          >
            <div
              className="relative w-full overflow-hidden"
              style={{
                clipPath: "polygon(0 0, 100% 0, 92% 100%, 0% 100%)",
                borderRadius: "4px",
                height: "340px",
                border: "1px solid rgba(191,149,63,0.35)",
              }}
            >
              {processSteps.map((step, idx) => (
                <div
                  key={step.id}
                  className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                  style={{
                    opacity: activeStep === idx ? 1 : 0,
                    zIndex: activeStep === idx ? 2 : 1,
                    pointerEvents: activeStep === idx ? "auto" : "none",
                  }}
                >
                  <Image
                    src={step.image}
                    alt={step.heading}
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
                    "linear-gradient(to right, rgba(44,26,18,0.25) 0%, transparent 70%)",
                }}
              />
            </div>

            {/* Gold accent bar on the left edge */}
            <div
              style={{
                position: "absolute",
                top: "10%",
                left: 0,
                width: "5px",
                height: "80%",
                background: "linear-gradient(180deg, #BF953F, #FCF6BA, #B38728)",
                zIndex: 10,
              }}
            />
          </motion.div>

          {/* Right: heading — cross-fading on activeStep change */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col justify-center min-h-[220px]"
          >
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
                Our Process &bull; Step {activeStep + 1} of 5
              </span>
            </div>

            <div className="relative min-h-[140px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                >
                  <h2
                    id="flow-heading"
                    className="t-section font-bold"
                    style={{ color: "#2C1A12", letterSpacing: "-0.02em" }}
                  >
                    {processSteps[activeStep].mainTitle}
                  </h2>
                  <p className="mt-4 measure text-base sm:text-lg leading-relaxed" style={{ color: "#7A695E" }}>
                    {processSteps[activeStep].mainSubtitle}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* ── Process steps timeline with synchronized progress line ── */}
        <div className="relative">
          {/* Base horizontal timeline connecting line (desktop) */}
          <div
            aria-hidden="true"
            className="absolute hidden sm:block pointer-events-none"
            style={{
              top: "22px",
              left: "10%",
              right: "10%",
              height: "4px",
              background: "#E6D5B8",
              borderRadius: "2px",
              zIndex: 0,
            }}
          >
            {/* Active loading progress line overlay: z-0 */}
            <div
              style={{
                height: "100%",
                width: `${progressWidth}%`,
                background: "linear-gradient(90deg, #3E2723 0%, #BF953F 50%, #FCF6BA 100%)",
                borderRadius: "2px",
                boxShadow: "0 0 10px rgba(191,149,63,0.6)",
                transition: isInstant ? "none" : `width ${STEP_DURATION_MS}ms linear`,
              }}
            />
          </div>

          {/* Mobile progress indicator */}
          <div className="sm:hidden mb-6 w-full h-[4px] bg-[#E6D5B8] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#3E2723] via-[#BF953F] to-[#FCF6BA]"
              style={{
                width: `${progressWidth}%`,
                transition: isInstant ? "none" : `width ${STEP_DURATION_MS}ms linear`,
              }}
            />
          </div>

          <motion.ol
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="relative grid grid-cols-1 gap-8 sm:grid-cols-5 sm:gap-0 z-10"
          >
            {processSteps.map((step, i) => (
              <motion.li
                key={step.id}
                variants={fadeUp}
                className="relative flex flex-col items-center text-center sm:px-3"
              >
                {/* Diamond step number button: z-10 to stay strictly above the progress line */}
                <button
                  type="button"
                  onClick={() => handleStepClick(i)}
                  className="group relative cursor-pointer focus:outline-none"
                  style={{ zIndex: 10 }}
                  aria-label={`Step ${i + 1}: ${step.heading}`}
                >
                  <div
                    aria-hidden="true"
                    style={{
                      width: "48px",
                      height: "48px",
                      flexShrink: 0,
                      background:
                        activeStep === i
                          ? "linear-gradient(135deg, #BF953F, #FCF6BA, #B38728)"
                          : i < activeStep
                          ? "linear-gradient(135deg, #A88234, #DFC268, #8E6818)"
                          : "linear-gradient(135deg, #E6D5B8, #D8C7AA, #C7B595)",
                      clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#1A0F0A",
                      fontFamily: "var(--head)",
                      fontWeight: 800,
                      fontSize: "16px",
                      marginBottom: "20px",
                      position: "relative",
                      zIndex: 10,
                      boxShadow:
                        activeStep === i
                          ? "0 0 16px rgba(191,149,63,0.7), 0 4px 12px rgba(191,149,63,0.4)"
                          : "0 2px 6px rgba(0,0,0,0.1)",
                      transform: activeStep === i ? "scale(1.15)" : "scale(1)",
                      transition: "transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease",
                    }}
                  >
                    {i + 1}
                  </div>
                </button>

                <h3
                  className="t-card-sm font-bold mb-2 transition-colors duration-300"
                  style={{
                    color: activeStep === i ? "#2C1A12" : "#5C4033",
                    fontWeight: activeStep === i ? 800 : 700,
                  }}
                >
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.heading}
                </h3>
                <p
                  className="text-[14px] leading-relaxed transition-colors duration-300"
                  style={{
                    color: activeStep === i ? "#2C1A12" : "#7A695E",
                    opacity: activeStep === i ? 1 : 0.8,
                  }}
                >
                  {step.description}
                </p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
