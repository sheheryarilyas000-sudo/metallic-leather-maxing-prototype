"use client";

/**
 * ArchCarousel — Seamless Infinite 3D Leather Arch Carousel
 *
 * Strict Constraints Implemented:
 *  1. Zero Flying Cards Glitch:
 *     - Each card has a strictly unique globalIndex key so React/Framer Motion treats entering cards
 *       as brand-new DOM elements rather than recycled elements moving across the screen.
 *     - Explicit `initial` positions: cards entering on the right start at x: slotX + 160 (opacity: 0),
 *       cards entering on the left start at x: slotX - 160 (opacity: 0). They NEVER mount at x: 0.
 *     - Only the 5 visible arch slots ([-2, -1, 0, 1, 2]) are rendered.
 *     - NO layout or layoutId props anywhere.
 *
 *  2. Strictly Hide Resetting Items:
 *     - Container has `overflow-hidden`.
 *     - Edge mask: `mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent)`.
 *
 *  3. Product Styling & Center Glow:
 *     - Active Center Item: `bg-transparent border-none shadow-none scale-125` (scale: 1.25).
 *     - Center Glow: Radial gradient div strictly BEHIND the active product at z-1.
 *     - Product image sits at z-10 above the glow.
 *     - Inactive Side Items: `bg-[#FDFBF7] rounded-[2.5rem] shadow-xl overflow-hidden scale-75` (scale: 0.75).
 */

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface CategoryProduct {
  id: string;
  name: string;
  image: string;
  subtext: string;
}

const SPRING_TRANSITION = {
  type: "spring",
  stiffness: 100,
  damping: 20,
} as const;

const AUTO_PLAY_INTERVAL_MS = 3500;

export function ArchCarousel({ items }: { items: CategoryProduct[] }) {
  const total = items.length;

  // Virtual index monotonically advances to loop infinitely
  const [virtualIndex, setVirtualIndex] = useState(1000 * total);

  // Active product mapped to original array index
  const activeOrigIndex = ((virtualIndex % total) + total) % total;
  const activeItem = items[activeOrigIndex] || items[0];

  // Auto-play timer
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setVirtualIndex((prev) => prev + 1);
    }, AUTO_PLAY_INTERVAL_MS);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  // Drag interaction
  const dragStartX = useRef(0);
  const isDragging = useRef(false);

  const handleDragStart = (_: unknown, info: { point: { x: number } }) => {
    dragStartX.current = info.point.x;
    isDragging.current = true;
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleDragEnd = (_: unknown, info: { point: { x: number }; velocity: { x: number } }) => {
    const dx = info.point.x - dragStartX.current;
    const vx = info.velocity.x;

    if (dx < -35 || vx < -250) {
      setVirtualIndex((prev) => prev + 1);
    } else if (dx > 35 || vx > 250) {
      setVirtualIndex((prev) => prev - 1);
    }

    setTimeout(() => {
      isDragging.current = false;
    }, 60);

    startTimer();
  };

  const handleCardClick = (targetIndex: number) => {
    if (!isDragging.current) {
      setVirtualIndex(targetIndex);
      startTimer();
    }
  };

  // Render ONLY the 5 visible arch slots: [-2, -1, 0, 1, 2]
  // Using globalIndex as key ensures entering cards are brand-new DOM nodes and never tween from old positions
  const visibleCards = useMemo(() => {
    const list: Array<{ item: CategoryProduct; slotIndex: number; globalIndex: number }> = [];
    for (let slot = -2; slot <= 2; slot++) {
      const gIdx = virtualIndex + slot;
      const mappedIdx = ((gIdx % total) + total) % total;
      list.push({ item: items[mappedIdx], slotIndex: slot, globalIndex: gIdx });
    }
    return list;
  }, [virtualIndex, items, total]);

  return (
    <div className="relative w-full select-none overflow-hidden z-10" style={{ userSelect: "none" }}>

      {/* ── Carousel Stage with CSS edge mask (15% fade on left and right) ── */}
      <motion.div
        className="relative mx-auto flex items-center justify-center overflow-hidden"
        style={{
          height: "530px",
          touchAction: "pan-y",
          maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {/* ── STATIC CENTER SPOTLIGHT GLOW (Sibling to items, perfectly centered, z-0) ── */}
        <div
          className="pointer-events-none absolute w-96 h-96 md:w-[460px] md:h-[460px] rounded-full blur-3xl md:blur-[100px] opacity-75"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 235, 150, 0.8) 0%, rgba(212, 175, 55, 0.55) 35%, rgba(191, 149, 63, 0.25) 60%, transparent 75%)",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 0,
          }}
        />

        {visibleCards.map(({ item, slotIndex, globalIndex }) => {
          const isActive = slotIndex === 0;
          const isNearSide = Math.abs(slotIndex) === 1;

          // Arch Geometry
          let slotX = 0;
          let slotY = 0;
          let slotRotate = 0;
          let slotScale = 1.25;
          let slotZ = 50;
          let slotOpacity = 1;

          if (isActive) {
            // Active Center Item: scale-125 (1.25), y: 0, rotate: 0
            slotX = 0;
            slotY = 0;
            slotRotate = 0;
            slotScale = 1.25;
            slotZ = 50;
            slotOpacity = 1;
          } else if (isNearSide) {
            // Inactive Near Side: scale-75 (0.75), y: 35, rotate: ±12
            slotX = slotIndex * 265;
            slotY = 35;
            slotRotate = slotIndex < 0 ? -12 : 12;
            slotScale = 0.75;
            slotZ = 20;
            slotOpacity = 0.95;
          } else {
            // Inactive Far Side (slot ±2): scale: 0.58, y: 75, rotate: ±20
            slotX = slotIndex * 240;
            slotY = 75;
            slotRotate = slotIndex < 0 ? -20 : 20;
            slotScale = 0.58;
            slotZ = 10;
            slotOpacity = 0.75;
          }

          // Safe Initial Position:
          // Cards entering on right start at slotX + 160 (outside screen at opacity: 0).
          // Cards entering on left start at slotX - 160 (outside screen at opacity: 0).
          // They NEVER mount at x: 0 (center) to prevent any center-flying glitch.
          const initialX = slotIndex > 0 ? slotX + 160 : slotIndex < 0 ? slotX - 160 : 0;
          const initialOpacity = isActive ? 1 : 0;

          return (
            <motion.div
              key={globalIndex}
              onClick={() => handleCardClick(globalIndex)}
              initial={{
                x: initialX,
                y: slotY,
                rotate: slotRotate,
                scale: slotScale,
                zIndex: slotZ,
                opacity: initialOpacity,
                boxShadow: isActive ? "none" : "0 25px 50px -12px rgba(0,0,0,0.7)",
              }}
              animate={{
                x: slotX,
                y: slotY,
                rotate: slotRotate,
                scale: slotScale,
                zIndex: slotZ,
                opacity: slotOpacity,
                boxShadow: isActive ? "none" : "0 25px 50px -12px rgba(0,0,0,0.7)",
              }}
              transition={{
                x: SPRING_TRANSITION,
                y: SPRING_TRANSITION,
                rotate: SPRING_TRANSITION,
                scale: SPRING_TRANSITION,
                zIndex: { duration: 0 },
                opacity: { duration: 0.3 },
                boxShadow: { duration: 0.8, ease: "easeInOut" },
              }}
              className="absolute flex items-center justify-center overflow-visible rounded-[2.5rem]"
              style={{
                width: "240px",
                height: "320px",
                cursor: isActive ? "default" : "pointer",
                transformOrigin: "center center",
                background: "transparent",
              }}
            >
              {/*
                INACTIVE CARD METALLIC GOLD BACKGROUND (Pseudo-overlay):
                Framer Motion smoothly animates opacity from 0 to 1, avoiding
                color-to-gradient interpolation glitches.
                - Active Center Item: completely transparent (background: 'transparent', opacity: 0)
                - Inactive Side Items: metallic gold gradient (opacity: 1)
              */}
              <motion.div
                className="absolute inset-0 rounded-[2.5rem] pointer-events-none"
                style={{
                  background: "linear-gradient(to right, #BF953F, #FCF6BA, #B38728)",
                }}
                initial={{ opacity: isActive ? 0 : 1 }}
                animate={{ opacity: isActive ? 0 : 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />

              {/*
                PRODUCT IMAGE CONTAINER:
                Active Center Item floats at z-10 directly above the static golden aura with zero box.
                Inactive side items sit smoothly inside the metallic gold box.
              */}
              <div
                className="relative w-full h-full flex items-center justify-center p-6 z-10"
                style={{
                  background: "transparent",
                  border: "none",
                  boxShadow: "none",
                }}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain pointer-events-none"
                  sizes="320px"
                  priority={isActive || isNearSide}
                  draggable={false}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ── Dynamic Category Text Container ── */}
      <div className="min-h-[120px] w-full max-w-2xl mx-auto flex flex-col justify-center items-center text-center mt-4 px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={SPRING_TRANSITION}
            className="flex flex-col items-center"
          >
            <span
              className="text-[12px] font-bold uppercase tracking-[0.28em] mb-2 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-transparent bg-clip-text"
            >
              Category {activeOrigIndex + 1} of {total}
            </span>
            <h3
              className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-transparent bg-clip-text"
            >
              {activeItem.name}
            </h3>
            <p
              className="mt-2 text-sm sm:text-base max-w-lg leading-relaxed text-[#FDFBF7]/80"
            >
              {activeItem.subtext}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Navigation Controls & Indicator ── */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          aria-label="Previous product"
          onClick={() => {
            setVirtualIndex((prev) => prev - 1);
            startTimer();
          }}
          className="size-9 rounded-full flex items-center justify-center text-[#FCF6BA] border border-[#BF953F]/40 hover:border-[#FCF6BA] hover:bg-[#BF953F]/20 transition-all shadow-sm"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <span className="text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-transparent bg-clip-text px-3">
          {String(activeOrigIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>

        <button
          aria-label="Next product"
          onClick={() => {
            setVirtualIndex((prev) => prev + 1);
            startTimer();
          }}
          className="size-9 rounded-full flex items-center justify-center text-[#FCF6BA] border border-[#BF953F]/40 hover:border-[#FCF6BA] hover:bg-[#BF953F]/20 transition-all shadow-sm"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
