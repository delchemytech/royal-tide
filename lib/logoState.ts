"use client";

import { useState, useEffect } from "react";

export type LogoMode = "emblem" | "editorial" | "graphic-clean" | "graphic-divider";

export const DEFAULT_LOGO_MODE: LogoMode = "graphic-clean";

export const LOGO_OPTIONS: { id: LogoMode; label: string; tag: string; description: string }[] = [
  {
    id: "emblem",
    label: "Version 1: RT Monogram Only",
    tag: "Luxury Monogram Aesthetic",
    description: "Compact jewel-like crowned RT emblem with wave crests. Eliminates all horizontal board text for a minimalist Rolex / Chanel luxury aesthetic.",
  },
  {
    id: "editorial",
    label: "Version 2: Luxury Editorial Serif",
    tag: "Modern 5-Star Hotel Supplier",
    description: "RT emblem icon paired with crisp, razor-sharp Playfair Display typography in code. Zero 3D decal texture or divider fence stick.",
  },
  {
    id: "graphic-clean",
    label: "Version 3: Clean Minimal Graphic",
    tag: "Default Selection (Refined Proportions, No Divider)",
    description: "Original brand lockup with the vertical divider needle removed and scaled to a subtle, delicate height (32px) so it never dominates the pill.",
  },
  {
    id: "graphic-divider",
    label: "Version 4: Graphic With Divider",
    tag: "Original Baseline",
    description: "Original brand lockup with the vertical gold divider accent preserved and optically re-centered.",
  },
];

const STORAGE_KEY = "rt_logo_mode_v3";
const EVENT_NAME = "rt_logo_mode_change";

export function getInitialLogoMode(): LogoMode {
  if (typeof window === "undefined") return DEFAULT_LOGO_MODE;
  const param = new URLSearchParams(window.location.search).get("logo") as LogoMode;
  if (param && LOGO_OPTIONS.some((o) => o.id === param)) return param;
  const stored = localStorage.getItem(STORAGE_KEY) as LogoMode;
  if (stored && LOGO_OPTIONS.some((o) => o.id === stored)) return stored;
  return DEFAULT_LOGO_MODE;
}

export function setGlobalLogoMode(mode: LogoMode) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, mode);
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: mode }));
}

export function useLogoMode(overrideMode?: LogoMode): [LogoMode, (mode: LogoMode) => void] {
  const [mode, setMode] = useState<LogoMode>(overrideMode || DEFAULT_LOGO_MODE);

  useEffect(() => {
    if (overrideMode) {
      setMode(overrideMode);
      return;
    }

    setMode(getInitialLogoMode());

    const handleEvent = (e: Event) => {
      const custom = e as CustomEvent<LogoMode>;
      if (custom.detail) setMode(custom.detail);
    };

    window.addEventListener(EVENT_NAME, handleEvent);
    return () => window.removeEventListener(EVENT_NAME, handleEvent);
  }, [overrideMode]);

  const updateMode = (newMode: LogoMode) => {
    setMode(newMode);
    setGlobalLogoMode(newMode);
  };

  return [mode, updateMode];
}
