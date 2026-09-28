"use client";

import { useEffect, useState } from "react";
import { useHeroVideo } from "@/components/home/HeroVideo";

const INTERVAL_MS = 2200;

// All words sit stacked in a clipped box. The current word is in view, the previous
// one slides out the top, and the rest wait below with no transition, so each word
// always enters from the bottom.
export function RotatingWord({ words }: { words: string[] }) {
  const { pausedByUser } = useHeroVideo();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (pausedByUser) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [pausedByUser, words.length]);

  const previous = (index - 1 + words.length) % words.length;

  return (
    <span aria-hidden="true" className="word-rotator">
      {words.map((word, i) => (
        <span
          key={word}
          className="word-rotator-item bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-transparent bg-clip-text"
          data-state={i === index ? "in" : i === previous ? "out" : "wait"}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
