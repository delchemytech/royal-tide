"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { content, whatsappLink } from "@/lib/site";
import { btn } from "./Button";
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

  const solid = scrolled || open;

  function isActive(to: string) {
    if (to === "/") return pathname === "/";
    return pathname.startsWith(to);
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "bg-sand/95 shadow-soft backdrop-blur-md border-b border-border"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="container-rt flex h-[4.5rem] items-center justify-between gap-6 sm:h-[5rem]">
        <div
          className={cn(
            "transition-opacity duration-300",
            solid ? "opacity-100" : "rounded-lg bg-sand/90 px-3 py-1.5",
          )}
        >
          <Logo />
        </div>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  href={item.to}
                  className={cn(
                    "relative py-2 text-[0.8rem] font-semibold uppercase tracking-[0.16em] transition-colors",
                    solid
                      ? "text-navy-deep hover:text-gold"
                      : "text-sand hover:text-gold",
                    isActive(item.to) && "text-gold",
                  )}
                >
                  {item.label}
                  {/* Gold active underline */}
                  {isActive(item.to) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gold" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={wa}
          target={wa.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          className={cn(btn({ variant: "gold", size: "sm" }), "hidden lg:inline-flex")}
        >
          <MessageCircle size={15} aria-hidden="true" />
          Inquire on WhatsApp
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-lg border transition-colors lg:hidden",
            solid
              ? "border-border text-navy-deep"
              : "border-sand/40 text-sand",
          )}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden border-t bg-sand transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-[32rem] border-border" : "max-h-0 border-transparent",
        )}
      >
        <nav aria-label="Mobile" className="container-rt py-4">
          <ul className="divide-y divide-border">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  href={item.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block py-4 text-sm font-semibold uppercase tracking-[0.14em] transition-colors",
                    isActive(item.to) ? "text-gold" : "text-navy-deep",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={wa}
            target={wa.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className={cn(btn({ variant: "gold" }), "mt-5 mb-2 w-full")}
          >
            <MessageCircle size={16} aria-hidden="true" />
            Inquire on WhatsApp
          </a>
          <p className="pb-4 text-center text-xs text-muted-foreground">
            {content.contact.emailSales}
          </p>
        </nav>
      </div>
    </header>
  );
}
