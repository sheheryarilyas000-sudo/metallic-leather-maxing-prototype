"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { CircularGalleryEngine } from "@/components/home/circular-gallery-engine";
import type { Category } from "@/lib/catalog";

type Mode = "pending" | "gallery" | "cards";

// Curved WebGL gallery on large screens for visitors who allow motion; a swipeable card
// strip everywhere else (and a plain grid on large screens with reduced motion).
const GALLERY_QUERY = "(min-width: 64rem) and (prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(GALLERY_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}
const getSnapshot = () => window.matchMedia(GALLERY_QUERY).matches;
const getServerSnapshot = () => false;

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

type Item = Pick<Category, "slug" | "name" | "summary" | "image" | "tint"> & { href: string };

export function CategoryShowcase({ items }: { items: Item[] }) {
  const wantsGallery = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [webglFailed, setWebglFailed] = useState(false);
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const mode: Mode = !hydrated ? "pending" : wantsGallery && !webglFailed ? "gallery" : "cards";

  return (
    <div data-mode={mode} className="category-showcase">
      {mode === "gallery" ? (
        <Gallery items={items} onFail={() => setWebglFailed(true)} />
      ) : (
        <CardStrip items={items} />
      )}
    </div>
  );
}

function Gallery({ items, onFail }: { items: Item[]; onFail: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<CircularGalleryEngine | null>(null);
  const router = useRouter();
  const [centerIndex, setCenterIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!canUseWebGL()) {
      onFail();
      return;
    }

    let cancelled = false;
    let engine: CircularGalleryEngine | null = null;

    (async () => {
      const { CircularGalleryEngine } = await import("@/components/home/circular-gallery-engine");
      const styles = getComputedStyle(document.documentElement);
      const family = styles.getPropertyValue("--font-bricolage").trim() || "sans-serif";
      const ink = styles.getPropertyValue("--color-ink").trim() || "#1c1b19";
      const font = `700 22px ${family}`;
      // Titles are painted into textures, so the heading font must be ready first.
      await document.fonts.load(font).catch(() => undefined);
      if (cancelled) return;

      try {
        engine = new CircularGalleryEngine(container, {
          items: items.map((item) => ({ image: item.image, tint: "#ffffff", text: item.name, href: item.href })),
          bend: 3,
          textColor: ink,
          borderRadius: 0.016,
          font,
          scrollSpeed: 2.5,
          scrollEase: 0.03,
          onNavigate: (href) => router.push(href),
          onCenterChange: setCenterIndex,
        });
        engineRef.current = engine;
      } catch {
        onFail();
      }
    })();

    return () => {
      cancelled = true;
      engine?.destroy();
      engineRef.current = null;
    };
    // The engine is built once; items come from static catalogue data.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const engine = engineRef.current;
    if (!engine) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      engine.step(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      engine.step(-1);
    } else if (event.key === "Enter") {
      const href = engine.centerHref();
      if (href) router.push(href);
    }
  };

  const current = items[centerIndex];

  return (
    <>
      <div
        ref={containerRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Product ranges. Use the left and right arrow keys to browse and Enter to open the centred range."
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="gallery-stage h-[600px] w-full cursor-grab touch-pan-y select-none data-[dragging=true]:cursor-grabbing"
      />
      <p aria-live="polite" className="sr-only">
        {current ? `${current.name}: ${current.summary}` : ""}
      </p>
      {/* Plain links for screen readers; the canvas itself is decorative. */}
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item.slug}>
            <Link href={item.href} tabIndex={-1}>
              {item.name}: {item.summary}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function CardStrip({ items }: { items: Item[] }) {
  return (
    <ul className="cat-strip">
      {items.map((item) => (
        <li key={item.slug}>
          {/* Same anatomy as the desktop gallery: white tile with subtle shadow, then the title below it. */}
          <Link href={item.href} className="cat-card group flex h-full flex-col">
            <div className="cat-card-tile overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md border border-line/60 transition-all duration-300">
              {/* eslint-disable-next-line @next/next/no-img-element -- local transparent cut-outs, already sized */}
              <img
                src={item.image}
                alt=""
                width={700}
                height={900}
                draggable={false}
                className="aspect-[7/9] w-full select-none object-cover"
              />
            </div>
            <h3 className="t-card mt-5 transition-colors group-hover:text-red">{item.name}</h3>
            <p className="mt-2 text-[15px] text-muted">{item.summary}</p>
            <div className="mt-auto pt-4">
              <span className="link-stitch group-hover:text-red">View range</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
