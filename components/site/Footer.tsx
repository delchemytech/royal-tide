import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { content, whatsappLink } from "@/lib/site";
import { btn } from "./Button";
import { Logo } from "./Logo";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Collections", to: "/collections" },
  { label: "Contact Us", to: "/contact" },
] as const;

export function Footer() {
  const { contact, company } = content;
  const wa = whatsappLink();

  return (
    <footer className="bg-[#0A1120] text-sand">
      {/* Gold top border */}
      <div className="h-1 bg-gradient-to-r from-gold/60 via-gold to-gold/60" />

      <div className="container-rt py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1.3fr]">
          {/* Brand column */}
          <div>
            <Logo variant="light" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-sand/65">
              Commercial-grade tableware, cutlery, glassware and bed &amp; bath
              linen for hotels, restaurants and catering operations across the
              UAE.
            </p>
            <a
              href={wa}
              target={wa.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className={cn(btn({ variant: "gold", size: "sm" }), "mt-7")}
            >
              <MessageCircle size={15} aria-hidden="true" />
              Inquire on WhatsApp
            </a>
          </div>

          {/* Quick Links */}
          <FooterColumn title="Quick Links">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link
                  href={l.to}
                  className="text-sm text-sand/65 transition-colors hover:text-gold"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          {/* Contact */}
          <FooterColumn title="Contact">
            <li className="flex items-start gap-3 text-sm text-sand/65">
              <Mail size={16} className="mt-0.5 shrink-0 text-gold" />
              <span className="flex flex-col gap-1">
                <a className="hover:text-gold transition-colors" href={`mailto:${contact.emailInfo}`}>
                  {contact.emailInfo}
                </a>
                <a className="hover:text-gold transition-colors" href={`mailto:${contact.emailSales}`}>
                  {contact.emailSales}
                </a>
              </span>
            </li>
            <li className="flex items-start gap-3 text-sm text-sand/65">
              <Phone size={16} className="mt-0.5 shrink-0 text-gold" />
              <span>{contact.phoneDisplay}</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-sand/65">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
              <span>{contact.addressDisplay}</span>
            </li>
          </FooterColumn>
        </div>
      </div>

      <div className="border-t border-sand/10">
        <div className="container-rt flex flex-col items-start justify-between gap-3 py-6 sm:flex-row sm:items-center">
          <p className="text-xs text-sand/45">{company.copyright}</p>
          <p className="text-xs text-sand/45">{company.domain}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-gold">
        {title}
      </h3>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}
