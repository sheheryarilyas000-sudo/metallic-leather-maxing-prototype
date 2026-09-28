"use client";

import { useEffect, useRef } from "react";

// Letter-by-letter reveal for section headings, matching the reference site's GSAP
// timeline: each letter rises from 120% below with a 10° tilt and fades in, 30ms apart,
// once, when the heading reaches 80% of the viewport height. Done with CSS transitions.
// Letters are hidden only after JavaScript runs, so the heading never goes missing.
export function SplitReveal({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.dataset.split = "ready";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.split = "revealed";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  let charIndex = 0;
  return (
    <span ref={ref} className="split-reveal">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((word, w, words) => (
          <span key={w} className="inline-block whitespace-nowrap">
            {[...word].map((char) => (
              <span key={charIndex} className="split-char" style={{ "--i": charIndex++ } as React.CSSProperties}>
                {char}
              </span>
            ))}
            {w < words.length - 1 && (
              <span className="split-char" style={{ "--i": charIndex++ } as React.CSSProperties}>
                {" "}
              </span>
            )}
          </span>
        ))}
      </span>
    </span>
  );
}
