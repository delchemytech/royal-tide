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
      <div className="w-full bg-[#1A1A1A] text-white py-2 sm:py-2.5">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-8 flex flex-wrap items-center justify-between gap-3 text-[0.72rem] sm:text-[0.75rem] font-medium tracking-wide">
          <div className="flex flex-wrap items-center gap-x-3.5 sm:gap-x-7 gap-y-1">
            <a
              href={`tel:${content.contact.phoneHref}`}
              className="flex items-center gap-1.5 hover:text-gold transition-colors duration-200 whitespace-nowrap"
            >
              <Phone className="text-gold/80 shrink-0" size={12} />
              <span>{content.contact.phoneDisplay}</span>
            </a>
            {content.contact.phoneSecondary && (
              <a
                href={`tel:${content.contact.phoneSecondaryHref}`}
                className="flex items-center gap-1.5 hover:text-gold transition-colors duration-200 whitespace-nowrap"
              >
                <Phone className="text-gold/80 shrink-0" size={12} />
                <span>{content.contact.phoneSecondary}</span>
              </a>
            )}
            {content.contact.telephone && (
              <a
                href={`tel:${content.contact.telephoneHref}`}
                className="hidden md:flex items-center gap-1.5 hover:text-gold transition-colors duration-200 text-gray-300 whitespace-nowrap"
              >
                <Phone className="text-gold/80 shrink-0" size={12} />
                <span>Tel: {content.contact.telephone}</span>
              </a>
            )}
            <a
              href={`https://mail.google.com/mail/?view=cm&to=${content.contact.emailSales}`}
              target="_blank"
              rel="noreferrer"
              className="hidden xl:flex items-center gap-1.5 hover:text-gold transition-colors duration-200"
            >
              <Mail className="text-gold/80 shrink-0" size={12} />
              <span>{content.contact.emailSales}</span>
            </a>
          </div>

          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            <a
              href={content.contact.googleMapsUrl || "https://www.google.com/maps/search/?api=1&query=24.3530024,54.4995434"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gold hover:text-white transition-colors duration-200 font-semibold px-2.5 py-0.5 rounded-full bg-white/5 border border-gold/40 hover:border-gold text-[0.68rem] sm:text-[0.72rem] whitespace-nowrap"
              title="Open Google Maps Location"
            >
              <MapPin className="text-gold shrink-0" size={12} />
              <span className="inline sm:hidden">Location</span>
              <span className="hidden sm:inline lg:hidden">Abu Dhabi, UAE</span>
              <span className="hidden lg:inline">{content.contact.addressDisplay}</span>
            </a>

            <div className="hidden lg:flex items-center gap-5 pl-3 border-l border-white/10">
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
              {nav.map((item) => {
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

          {/* Primary CTA */}
          <div>
            <a
              href={wa}
              target={wa.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-4 py-3.5 text-sm font-bold text-navy-deep shadow-md transition-all hover:bg-gold/90 hover:shadow-lg"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Inquire on WhatsApp
            </a>
          </div>

          {/* Contact Details (Landline, Email, Showroom Location - NO duplicate mobile numbers) */}
          <div className="pt-5 border-t border-gray-100 flex flex-col gap-3 text-xs text-navy-deep/80">
            {content.contact.telephone && (
              <a
                href={`tel:${content.contact.telephoneHref}`}
                className="flex items-center gap-2.5 hover:text-gold transition-colors font-medium text-navy-deep"
              >
                <Phone size={14} className="text-gold shrink-0" />
                <span>Office Tel: {content.contact.telephone}</span>
              </a>
            )}
            <a
              href={`https://mail.google.com/mail/?view=cm&to=${content.contact.emailSales}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 hover:text-gold transition-colors font-medium text-navy-deep"
            >
              <Mail size={14} className="text-gold shrink-0" />
              <span>{content.contact.emailSales}</span>
            </a>
            <a
              href={content.contact.googleMapsUrl || "https://www.google.com/maps/search/?api=1&query=24.3530024,54.4995434"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2.5 hover:text-gold transition-colors font-medium text-navy-deep group"
            >
              <MapPin size={14} className="text-gold shrink-0 mt-0.5" />
              <span className="flex-1">
                {content.contact.addressDisplay}
                <span className="block text-[0.65rem] text-gold font-bold group-hover:underline mt-0.5">
                  Open in Google Maps ↗
                </span>
              </span>
            </a>
            <div className="text-[0.68rem] text-gray-400 pt-2 border-t border-gray-50 flex items-center justify-between">
              <span>{content.contact.hours}</span>
              <span className="font-semibold text-navy-deep/70">Abu Dhabi, UAE</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
