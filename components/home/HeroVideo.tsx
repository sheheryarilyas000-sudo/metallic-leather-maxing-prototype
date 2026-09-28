"use client";

import { createContext, useContext, useEffect, useRef, useState, useSyncExternalStore } from "react";

// The video plays only on wide screens for visitors who allow motion.
// Everyone else sees the poster, and the file is never downloaded.
const PLAY_QUERY = "(min-width: 53.75rem) and (prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(PLAY_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(PLAY_QUERY).matches;
const getServerSnapshot = () => false;

type HeroVideoState = {
  canPlay: boolean;
  pausedByUser: boolean;
  togglePaused: () => void;
};

const HeroVideoContext = createContext<HeroVideoState | null>(null);

export function useHeroVideo() {
  const state = useContext(HeroVideoContext);
  if (!state) throw new Error("HeroVideo components must be inside HeroVideoProvider");
  return state;
}

/** Shares play/pause state between the background video and the rotating headline word. */
export function HeroVideoProvider({ children }: { children: React.ReactNode }) {
  const canPlay = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [pausedByUser, setPausedByUser] = useState(false);
  const togglePaused = () => setPausedByUser((paused) => !paused);

  return (
    <HeroVideoContext.Provider value={{ canPlay, pausedByUser, togglePaused }}>
      {children}
    </HeroVideoContext.Provider>
  );
}

export function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { canPlay, pausedByUser } = useHeroVideo();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!canPlay || pausedByUser) {
      video.pause();
      return;
    }

    // React does not reliably apply `muted` during hydration, and browsers only
    // autoplay muted video, so set the property directly.
    video.muted = true;
    if (!video.getAttribute("src")) video.src = src;

    // Autoplay can be refused (battery saver, or a page opened in a background tab).
    // The poster stays visible, and we try again when the tab comes to the front.
    const play = () => video.play().catch(() => {});
    const onVisible = () => {
      if (document.visibilityState === "visible" && video.paused) play();
    };
    play();
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [canPlay, pausedByUser, src]);

  return (
    <video
      ref={videoRef}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      className="absolute inset-0 -z-20 size-full object-cover"
    />
  );
}
