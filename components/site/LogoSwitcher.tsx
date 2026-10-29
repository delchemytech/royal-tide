"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Eye, ChevronRight, X } from "lucide-react";
import { useLogoMode, LOGO_OPTIONS, type LogoMode } from "@/lib/logoState";
import { cn } from "@/lib/utils";

export function LogoSwitcher() {
  const [activeMode, setMode] = useLogoMode();
  const [open, setOpen] = useState(true);

  return (
    <aside aria-label="Logo Review Bar" className="fixed bottom-4 left-4 z-40 flex flex-col items-start gap-2">
      {open ? (
        <div className="w-[19rem] sm:w-[22rem] rounded-2xl bg-white/95 p-3.5 shadow-2xl backdrop-blur-md border border-gray-200/90 text-navy-deep animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100">
            <div className="flex items-center gap-1.5 text-xs font-bold text-navy-deep">
              <Sparkles size={14} className="text-gold" />
              <span>Logo Style Switcher</span>
            </div>
            <div className="flex items-center gap-1">
              <Link
                href="/logo-preview"
                className="inline-flex items-center gap-1 text-[0.68rem] font-bold text-gold hover:underline mr-1"
                title="Full Preview & Sharing Page"
              >
                <Eye size={12} />
                <span>Show All</span>
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                aria-label="Minimize Switcher"
              >
                <X size={13} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {LOGO_OPTIONS.map((opt, idx) => {
              const active = activeMode === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setMode(opt.id)}
                  className={cn(
                    "flex flex-col items-start rounded-xl p-2 text-left transition-all",
                    active
                      ? "bg-navy-deep text-white shadow-sm ring-1 ring-gold"
                      : "bg-gray-50/80 text-navy-deep hover:bg-gray-100/90 text-xs"
                  )}
                >
                  <span className="text-[0.65rem] font-bold tracking-wide uppercase opacity-70">
                    Option {idx + 1}
                  </span>
                  <span className="text-[0.72rem] font-bold line-clamp-1">
                    {opt.id === "emblem" && "RT Monogram"}
                    {opt.id === "editorial" && "Editorial Serif"}
                    {opt.id === "graphic-clean" && "Clean Graphic"}
                    {opt.id === "graphic-divider" && "With Divider"}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between text-[0.68rem] text-gray-500">
            <span className="truncate max-w-[13rem]">
              {LOGO_OPTIONS.find((o) => o.id === activeMode)?.tag}
            </span>
            <Link
              href="/logo-preview"
              className="text-gold font-bold hover:underline flex items-center shrink-0"
            >
              Compare &rarr;
            </Link>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-navy-deep/95 px-3.5 py-2 text-xs font-bold text-sand shadow-lg backdrop-blur-md border border-gold/40 hover:bg-navy-deep hover:border-gold transition-all"
        >
          <Sparkles size={14} className="text-gold" />
          <span>Switch Logo ({LOGO_OPTIONS.findIndex((o) => o.id === activeMode) + 1}/4)</span>
        </button>
      )}
    </aside>
  );
}
