"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HeroVideoProvider } from "@/components/home/HeroVideo";
import { RotatingWord } from "@/components/home/RotatingWord";
import { quoteHref, site } from "@/lib/site";

const heroWords = ["Leather Jackets", "Biker Vests", "Custom Blazers", "Leather Gloves", "Fine Goods", "Accessories"];

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.readyState >= 2) {
      setIsVideoLoaded(true);
    }
    video.muted = true;
    const play = () => video.play().catch(() => {});
    play();
    const handleVisibility = () => {
      if (document.visibilityState === "visible") play();
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return (
    <HeroVideoProvider>
      <section className="on-dark relative w-full min-h-screen overflow-hidden flex items-center -mt-[74px] text-white bg-black">
        {/* Instant Poster Image (First Frame) - shows immediately while video buffers */}
        <img
          src="/video-poster.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />

        {/* Full-bleed Background Video with smooth 1s fade-in once data is ready */}
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          poster="/video-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`transition-opacity duration-1000 ease-in-out ${isVideoLoaded ? "opacity-100" : "opacity-0"} w-full h-full object-cover absolute inset-0 z-0`}
        />

        {/* Left-to-Right Gradient Overlay for Text Readability & Right-side Clarity */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.65) 45%, rgba(0,0,0,0.2) 75%, transparent 100%)",
          }}
        />

        {/* Text & CTAs Layered ON TOP at z-[10] */}
        <div className="relative z-[10] w-full max-w-2xl px-8 lg:px-16 pt-[calc(74px+40px)] pb-16">
          <h1 className="text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] rise">
            <span className="block text-[#FDFBF7]">We make</span>
            <span className="sr-only">{heroWords.join(", ")}</span>
            <span className="block">
              <RotatingWord words={heroWords} />
            </span>
          </h1>
          <p
            className="text-lg rise mt-6 max-w-[46ch] text-[#E6D5B8]"
            style={{ "--rise-delay": "120ms" } as React.CSSProperties}
          >
            Premium leather garments and bespoke accessories manufacturer in Pakistan, exporting to the US, UK and Europe.
            Orders from 500 pieces per style.
          </p>
          <div
            className="rise mt-8 flex flex-wrap gap-4"
            style={{ "--rise-delay": "240ms" } as React.CSSProperties}
          >
            <Link
              href={quoteHref}
              className="bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-black font-bold shadow-lg hover:brightness-110 transition-all border-none px-5 py-2.5 text-base rounded inline-flex items-center justify-center"
              style={{ color: "#000000" }}
            >
              Request a quote
            </Link>
            <a
              href={site.catalogueUrl}
              className="border-2 border-[#BF953F] text-white hover:text-black hover:border-transparent hover:bg-gradient-to-r hover:from-[#BF953F] hover:via-[#FCF6BA] hover:to-[#B38728] transition-all duration-300 font-bold px-5 py-2.5 text-base rounded inline-flex items-center justify-center"
            >
              Download catalogue (PDF)
            </a>
          </div>
        </div>
      </section>
    </HeroVideoProvider>
  );
}
