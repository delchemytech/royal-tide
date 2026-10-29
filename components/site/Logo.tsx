"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLogoMode, type LogoMode } from "@/lib/logoState";

export function Logo({
  variant = "dark",
  mode: propMode,
  className,
  imgClassName,
}: {
  variant?: "dark" | "light";
  mode?: LogoMode;
  className?: string;
  imgClassName?: string;
}) {
  const [activeMode] = useLogoMode(propMode);

  return (
    <Link
      href="/"
      aria-label="Royal Tide — Home"
      className={cn(
        "group inline-flex items-center transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded",
        className
      )}
    >
      {/* ─── Mode 1: RT Monogram Only (Owner's Request) ─── */}
      {activeMode === "emblem" && (
        <img
          src="/logo-rt-emblem.png"
          alt="Royal Tide Logo"
          className={cn(
            "h-10 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-105",
            imgClassName
          )}
        />
      )}

      {/* ─── Mode 2: Luxury Editorial Serif Typography ─── */}
      {activeMode === "editorial" && (
        <div className="flex items-center gap-2.5 sm:gap-3">
          <img
            src="/logo-rt-emblem.png"
            alt="Royal Tide"
            className={cn(
              "h-8 sm:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105",
              imgClassName
            )}
          />
          <div className="flex flex-col">
            <span
              className={cn(
                "font-display text-[0.95rem] sm:text-[1.08rem] font-bold tracking-[0.16em] uppercase leading-tight transition-colors",
                variant === "light" ? "text-white" : "text-navy-deep group-hover:text-gold"
              )}
            >
              Royal Tide
            </span>
            <span className="text-[0.52rem] sm:text-[0.56rem] font-semibold tracking-[0.24em] text-gold uppercase">
              Hospitality
            </span>
          </div>
        </div>
      )}

      {/* ─── Mode 3: Clean Minimal Graphic (No Divider) ─── */}
      {activeMode === "graphic-clean" && (
        <img
          src="/logo-tied-clean.png"
          alt="Royal Tide Logo"
          className={cn(
            "h-7 sm:h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-102",
            imgClassName
          )}
        />
      )}

      {/* ─── Mode 4: Graphic With Divider (Baseline) ─── */}
      {activeMode === "graphic-divider" && (
        <img
          src="/logo-tied-divider.png"
          alt="Royal Tide Logo"
          className={cn(
            "h-8 sm:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-102",
            imgClassName
          )}
        />
      )}
    </Link>
  );
}
