"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Logo } from "@/components/Logo";
import { useQuoteList } from "@/lib/quote-list";
import { mainNav, quoteHref } from "@/lib/site";

/** Pages that open with a full-screen dark hero the header sits on top of. */
const OVERLAY_PATHS = new Set(["/"]);

function checkActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

const getScrolled = () => window.scrollY > 24;
const getServerScrolled = () => false;

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useSyncExternalStore(subscribeScroll, getScrolled, getServerScrolled);
  const { count } = useQuoteList();
  const quoteLabel = count > 0 ? `Quote list (${count})` : "Get a quote";
  const overlay = OVERLAY_PATHS.has(pathname) && !scrolled && !menuOpen;

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-[100] transition-[background-color,border-color,box-shadow] duration-300 ${
        overlay
          ? "header-overlay border-b border-transparent bg-transparent"
          : "border-b border-[#BF953F] bg-[#0A0A0A] shadow-xl"
      }`}
    >
      {/* 73px + 1px border = 74px, which the hero's -mt-[74px] relies on */}
      <div className="wrap flex h-[73px] items-center justify-between gap-6">
        <Logo tone={overlay ? "dark" : "light"} />

        <nav aria-label="Main" className="hidden items-center gap-6 md:flex max-lg:gap-4">
          <ul className="flex items-center gap-6 max-lg:gap-4">
            {mainNav.map((item) => {
              const isActive = checkActive(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-sm bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-transparent bg-clip-text font-bold hover:brightness-125 transition-all py-1 ${
                      isActive ? "border-b-2 border-[#BF953F]" : ""
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href={quoteHref}
            className="btn btn-sm bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-black font-bold shadow-lg hover:brightness-110 transition-all border-none"
            style={{ color: "#000000" }}
          >
            {quoteLabel}
          </Link>
        </nav>

        <button
          type="button"
          className="btn btn-sm md:hidden btn-outline-dark"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-[#BF953F]/40 bg-[#0A0A0A] md:hidden">
          <ul className="wrap pt-2">
            {mainNav.map((item) => {
              const isActive = checkActive(pathname, item.href);
              return (
                <li key={item.href} className="border-b border-dashed border-[#BF953F]/20 py-1">
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={isActive ? "page" : undefined}
                    className={`text-sm bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-transparent bg-clip-text font-bold hover:brightness-125 transition-all py-1 inline-block ${
                      isActive ? "border-b-2 border-[#BF953F]" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="wrap pb-6 pt-5">
            <Link
              href={quoteHref}
              onClick={closeMenu}
              className="btn w-full bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-black font-bold shadow-lg hover:brightness-110 transition-all border-none"
              style={{ color: "#000000" }}
            >
              {quoteLabel}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
