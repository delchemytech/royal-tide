"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle, X, Phone, MapPin, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { content, whatsappLink } from "@/lib/site";
import { Logo } from "./Logo";

const nav = [
  { label: "Home", to: "/" },
  { label: "Collections", to: "/collections" },
  { label: "Contact Us", to: "/contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const wa = whatsappLink();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
    return pathname.startsWith(to);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex flex-col items-center">
      {/* ─── TOP BLACK BAR ─── */}
      <div className="w-full bg-[#1A1A1A] text-white py-2.5">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-8 flex flex-wrap items-center justify-between gap-4 text-[0.75rem] font-medium tracking-wide">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <div className="flex items-center gap-2">
              <Phone className="text-gold" size={14} />
              <span>{content.contact.phoneDisplay}</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <MapPin className="text-gold" size={14} />
              <span>{content.contact.addressDisplay}</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Mail className="text-gold" size={14} />
              <span>{content.contact.emailInfo}</span>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-5">
            <span className="text-gray-400 text-[0.65rem] font-bold">FOLLOW US:</span>
            <a href="#" className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span>Royal Tide</span>
            </a>
          </div>
        </div>
      </div>

      {/* ─── FLOATING PILL NAV ─── */}
      <div 
        className={cn(
          "w-full max-w-[90rem] mx-auto px-4 sm:px-8 transition-all duration-300",
          scrolled ? "mt-0" : "mt-5"
        )}
      >
        <div className="flex h-[4.5rem] items-center justify-between gap-6 rounded-full bg-white px-6 sm:px-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 relative z-20">
          
          <div className="shrink-0 lg:flex-1 flex justify-start transition-opacity duration-300">
            <Logo />
          </div>

          <nav aria-label="Main" className="hidden lg:flex flex-1 justify-end lg:justify-center">
            <ul className="flex items-center gap-2">
              {nav.map((item) => {
                const active = isActive(item.to);
                return (
                  <li key={item.to} className="relative flex flex-col items-center">
                    <Link
                      href={item.to}
                      className={cn(
                        "px-5 py-2 text-[0.85rem] font-bold transition-all duration-300 rounded-full",
                        active
                          ? "bg-gold/10 text-gold"
                          : "text-navy-deep hover:text-gold"
                      )}
                    >
                      {item.label}
                    </Link>
                    {active && (
                      <span className="absolute -bottom-1.5 h-1 w-1 rounded-full bg-gold" />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-navy-deep transition-colors lg:hidden hover:bg-gray-50 ml-auto"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ─── MOBILE MENU ─── */}
      <div
        id="mobile-menu"
        className={cn(
          "absolute left-4 right-4 top-24 z-10 overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 lg:hidden border border-gray-100",
          open ? "max-h-[32rem] opacity-100 pointer-events-auto translate-y-0" : "max-h-0 opacity-0 pointer-events-none -translate-y-4"
        )}
      >
        <nav aria-label="Mobile" className="px-6 py-6">
          <ul className="space-y-2">
            {nav.map((item) => {
              const active = isActive(item.to);
              return (
                <li key={item.to}>
                  <Link
                    href={item.to}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-sm font-bold transition-colors",
                      active ? "bg-gold/10 text-gold" : "text-navy-deep hover:bg-gray-50"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <a
            href={wa}
            target={wa.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-4 py-3 text-sm font-bold text-navy-deep transition-colors hover:bg-gold/90"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Inquire on WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
