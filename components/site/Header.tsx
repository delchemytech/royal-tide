"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

const nav = [
  { label: "Collections", to: "/collections" },
  { label: "About", to: "/#about" },
  { label: "Contact Us", to: "/contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function isActive(to: string) {
    if (to === "/") return pathname === "/";
    if (to.startsWith("/#")) return pathname === "/" && typeof window !== "undefined" && window.location.hash === to.slice(1);
    return pathname.startsWith(to);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex flex-col items-center">
      {/* ─── FLOATING PILL NAV ─── */}
      <div
        className={cn(
          "w-full max-w-[90rem] mx-auto px-4 sm:px-8 transition-all duration-300",
          scrolled ? "mt-2 sm:mt-3" : "mt-4 sm:mt-6"
        )}
      >
        <div className="flex h-16 sm:h-[4.5rem] items-center justify-between gap-4 sm:gap-6 rounded-full bg-white/95 backdrop-blur-md px-5 sm:px-8 shadow-[0_10px_35px_rgba(0,0,0,0.08)] border border-gray-100/90 relative z-20">
          {/* Left: Brand Logo (Links to Home) */}
          <div className="shrink-0 lg:flex-1 flex justify-start items-center">
            <Logo />
          </div>

          {/* Center: Main Navigation */}
          <nav aria-label="Main" className="hidden lg:flex flex-1 justify-center">
            <ul className="flex items-center gap-1 sm:gap-2">
              {nav.map((item) => {
                const active = isActive(item.to);
                return (
                  <li key={item.to} className="relative flex flex-col items-center">
                    <Link
                      href={item.to}
                      className={cn(
                        "px-4 py-2 text-[0.85rem] font-bold transition-all duration-200 rounded-full",
                        active
                          ? "text-gold"
                          : "text-navy-deep/80 hover:text-navy-deep hover:bg-navy-deep/5"
                      )}
                    >
                      {item.label}
                    </Link>
                    {active && (
                      <span className="absolute -bottom-1 left-3 right-3 h-0.5 rounded-full bg-gold" />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right: Quick Action CTAs (Desktop) */}
          <div className="hidden lg:flex flex-1 justify-end items-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-navy-deep px-5 py-2.5 text-[0.82rem] font-bold text-sand transition-all hover:bg-gold hover:text-navy-deep shadow-sm"
            >
              <span>Get a Quote</span>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden ml-auto">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-navy-deep transition-colors hover:bg-gray-50"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* ─── MOBILE BACKDROP ─── */}
      <div
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* ─── MOBILE DRAWER MENU ─── */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden flex flex-col justify-between overflow-y-auto",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <Logo />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-navy-deep hover:bg-gray-50 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="px-6 py-6 flex-1 flex flex-col justify-between gap-6 overflow-y-auto">
          {/* Navigation Links */}
          <nav aria-label="Mobile Navigation">
            <p className="text-[0.68rem] font-bold text-gray-400 uppercase tracking-widest mb-3">Navigation</p>
            <ul className="space-y-1.5">
              {[
                { label: "Home", to: "/" },
                { label: "Collections", to: "/collections" },
                { label: "About Royal Tide", to: "/#about" },
                { label: "Contact Us", to: "/contact" },
              ].map((item) => {
                const active = isActive(item.to);
                return (
                  <li key={item.to}>
                    <Link
                      href={item.to}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-4 py-3 text-base font-bold transition-colors",
                        active ? "bg-gold/10 text-gold" : "text-navy-deep hover:bg-gray-50"
                      )}
                    >
                      <span>{item.label}</span>
                      <span className={cn("text-xs font-normal", active ? "text-gold" : "text-gray-400")}>→</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Quick Collections */}
            <div className="mt-5 pt-5 border-t border-gray-100">
              <p className="text-[0.68rem] font-bold text-gray-400 uppercase tracking-widest mb-2.5">Hospitality Collections</p>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  { name: "Tableware", href: "/collections/tableware" },
                  { name: "Glassware", href: "/collections/glassware" },
                  { name: "Linen", href: "/collections/linen" },
                  { name: "Buffet", href: "/collections/buffet" },
                  { name: "Cutlery", href: "/collections/cutlery" },
                ].map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    onClick={() => setOpen(false)}
                    className="px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gold/10 hover:text-gold text-navy-deep/80 font-medium transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Primary Actions (Matching Desktop Navbar) */}
          <div className="space-y-2.5">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-navy-deep px-5 py-3.5 text-sm font-bold text-sand shadow-sm transition-all hover:bg-gold hover:text-navy-deep"
            >
              <span>Get a Quote</span>
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-navy-deep/20 px-4 py-3 text-xs font-bold text-navy-deep transition-all hover:bg-navy-deep hover:text-sand"
            >
              Contact Sales &amp; Showroom
            </Link>
          </div>

          {/* Minimal Location & Contact Page Link (No cluttered telephone directory) */}
          <div className="pt-4 border-t border-gray-100 text-xs text-navy-deep/70 flex items-center justify-between">
            <span className="font-semibold">Abu Dhabi, UAE</span>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="text-gold font-bold hover:underline"
            >
              View Full Details &rarr;
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

