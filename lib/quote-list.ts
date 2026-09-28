"use client";

import { useSyncExternalStore } from "react";

// The quote list holds product slugs in localStorage so it survives page loads.
// It is a convenience only: the inquiry form sends the list with the message.

const STORAGE_KEY = "maxing-quote-list";
const EMPTY: string[] = [];

let slugs: string[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function read(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((s): s is string => typeof s === "string") : [];
  } catch {
    return EMPTY;
  }
}

function ensureLoaded() {
  if (!loaded) {
    slugs = read();
    loaded = true;
  }
}

function commit(next: string[]) {
  slugs = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage can be unavailable (private mode). The list still works for this visit.
  }
  listeners.forEach((listener) => listener());
}

function onStorage(event: StorageEvent) {
  if (event.key !== STORAGE_KEY) return;
  slugs = read();
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  ensureLoaded();
  if (listeners.size === 0) window.addEventListener("storage", onStorage);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  ensureLoaded();
  return slugs;
}

function getServerSnapshot() {
  return EMPTY;
}

export function addToQuote(slug: string) {
  ensureLoaded();
  if (!slugs.includes(slug)) commit([...slugs, slug]);
}

export function removeFromQuote(slug: string) {
  ensureLoaded();
  commit(slugs.filter((s) => s !== slug));
}

export function clearQuote() {
  commit(EMPTY);
}

export function useQuoteList() {
  const list = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return {
    slugs: list,
    count: list.length,
    has: (slug: string) => list.includes(slug),
  };
}
