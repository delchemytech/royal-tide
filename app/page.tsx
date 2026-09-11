import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  Hotel,
  UtensilsCrossed,
  Truck,
  Search,
  ShieldCheck,
  Package,
  Zap,
  Settings,
} from "lucide-react";
import { ActionLink } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/Section";
import { btn } from "@/components/site/Button";
import { cn } from "@/lib/utils";
import { content, images, whatsappLink } from "@/lib/site";

const hero =
  "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=1920&auto=format&fit=crop";

const { home, categoryCards } = content;

const serviceIcons = [Hotel, UtensilsCrossed, Truck, Search];
const trustIcons = [ShieldCheck, Package, Zap, Settings];

export const metadata = {
  title: home.seoTitle,
  description: home.seoDescription,
};

export default function HomePage() {
  const wa = whatsappLink();

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-navy-deep">
        <img
          src={hero}
          alt="Luxury UAE hotel dining room set with white porcelain tableware and glassware"
          className="absolute inset-0 -z-10 object-cover w-full h-full opacity-80"
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/40 to-transparent"
          aria-hidden="true"
        />
        <div className="container-rt pb-16 pt-24 sm:pb-20 sm:pt-32">
          <div className="max-w-3xl animate-[fadeInUp_0.8s_ease-out_both]">
            <span className="eyebrow">
              <span className="h-px w-6 bg-gold" aria-hidden="true" />
              {home.hero.eyebrow}
            </span>
            <h1 className="mt-5 text-4xl leading-[1.08] text-sand sm:text-5xl lg:text-6xl">
              {home.hero.headline}
              <span className="block text-gold">
                {home.hero.headlineAccent}
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-sand/80 sm:text-[1.05rem]">
              {home.hero.subline}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ActionLink href="/collections" variant="gold">
                {home.hero.primaryCta}
              </ActionLink>
              <ActionLink href="/contact" variant="outlineLight">
                {home.hero.secondaryCta}
              </ActionLink>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section className="bg-[#FAF9FC] py-12 lg:py-16">
        <div className="container-rt grid items-start gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          {/* Left Column: Visuals & Stats */}
          <Reveal className="space-y-4">
            <div className="overflow-hidden rounded-xl bg-muted shadow-sm">
              <div className="relative aspect-[16/9] w-full">
                <img
                  src="/aboutpic.jpg"
                  alt={home.about.imageAlt}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="bg-card p-4 sm:p-5 flex items-center justify-between gap-4 border-b border-border">
                <div>
                  <span className="text-[0.6rem] font-bold text-gold tracking-widest uppercase block mb-1">
                    MATERIAL SPECIFICATION
                  </span>
                  <p className="font-semibold text-navy-deep text-[0.85rem] sm:text-sm">
                    {home.about.materialSpec}
                  </p>
                </div>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <ShieldCheck size={16} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 divide-x divide-navy-deep/10 rounded-xl bg-[#F0F2F9] py-4 shadow-sm">
              {home.about.stats.map((stat: any) => (
                <div key={stat.label} className="flex flex-col items-center justify-center px-2 text-center">
                  <span className="font-display text-lg sm:text-xl font-semibold text-navy-deep">
                    {stat.value}
                  </span>
                  <span className="mt-1 text-[0.55rem] sm:text-[0.6rem] font-bold tracking-widest uppercase text-navy-deep/70 whitespace-pre-line">
                    {stat.label.replace('\\n', '\n')}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right Column: Content & Features */}
          <Reveal className="flex flex-col justify-center" delay={200}>
            <span className="eyebrow mb-2">
              {home.about.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[2rem] leading-tight text-navy-deep font-display">
              {home.about.title}
            </h2>
            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
              {home.about.description}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {home.about.features.map((feature: any, i: number) => {
                const Icon = [Truck, ShieldCheck, Zap, Package][i] || ShieldCheck;
                return (
                  <div key={feature.title} className="rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex items-start gap-2.5">
                      <Icon className="mt-0.5 shrink-0 text-gold" size={16} />
                      <div>
                        <h4 className="font-semibold text-navy-deep text-[0.85rem]">
                          {feature.title}
                        </h4>
                        <p className="mt-1 text-[0.75rem] leading-relaxed text-muted-foreground [font-family:var(--font-accent)] tracking-wide">
                          {feature.text}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6">
              <Link
                href={home.about.linkHref}
                className="inline-flex items-center gap-2 text-xs font-semibold text-navy-deep transition-colors hover:text-gold"
              >
                {home.about.linkText}
                <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── COLLECTION CARDS ─── */}
      <section className="bg-background py-12 lg:py-16">
        <div className="container-rt">
          <SectionHeading
            eyebrow={home.categoriesSection.eyebrow}
            title={home.categoriesSection.title}
            intro={home.categoriesSection.intro}
          />
          <div className="mt-8 grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-5 items-start">
            {categoryCards.map((category: any, i: number) => (
              <Reveal key={category.id} delay={i * 80}>
                <div
                  className={cn(
                    "group block h-full outline-none transition-all duration-300 hover:-translate-y-2",
                    i % 2 === 1 && "lg:mt-8"
                  )}
                >
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <img
                      src={(images as any)[category.image]}
                      alt={category.alt}
                      loading="lazy"
                      width={800}
                      height={1000}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4">
                    <span className="text-[0.65rem] font-bold text-gold tracking-widest uppercase">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-1.5 text-lg leading-tight text-navy-deep">{category.name}</h3>
                    <p className="mt-2 text-[0.8rem] leading-snug text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="bg-mist section-py">
        <div className="container-rt">
          <SectionHeading
            eyebrow={home.services.eyebrow}
            title={home.services.title}
            intro={home.services.intro}
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {home.services.items.map((service: any, i: number) => {
              const Icon = serviceIcons[i] || Hotel;
              return (
                <Reveal key={service.title} delay={i * 80}>
                  <div className="group h-full rounded-lg border border-border bg-card p-8 transition-all duration-300 hover:shadow-lift hover:-translate-y-1">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-navy-deep">
                      <Icon size={24} />
                    </div>
                    <h3 className="mt-5 text-lg text-navy-deep">{service.title}</h3>
                    <span className="mt-2 block h-0.5 w-6 rounded-full bg-gold" aria-hidden="true" />
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {service.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── TRUST / WHY CHOOSE US ─── */}
      <section className="bg-navy-deep section-py">
        <div className="container-rt">
          <SectionHeading
            eyebrow={home.trust.eyebrow}
            title={home.trust.title}
            tone="light"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {home.trust.points.map((value: any, i: number) => {
              const Icon = trustIcons[i] || ShieldCheck;
              return (
                <Reveal key={value.title} delay={i * 70}>
                  <div className="group h-full rounded-lg border border-sand/10 bg-navy/50 p-8 transition-all duration-300 hover:border-gold/30 hover:bg-navy/80">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold/15 text-gold">
                      <Icon size={24} />
                    </div>
                    <h3 className="mt-5 text-xl text-sand font-sans font-semibold">{value.title}</h3>
                    <span className="mt-2 block h-0.5 w-6 rounded-full bg-gold/50" aria-hidden="true" />
                    <p className="mt-4 text-sm leading-relaxed text-sand/70 font-sans">
                      {value.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal className="mt-12 flex flex-wrap gap-4">
            <ActionLink href="/collections" variant="gold">
              View Collections
            </ActionLink>
            <a
              href={wa}
              target={wa.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className={cn(btn({ variant: "outlineLight" }))}
            >
              <MessageCircle size={16} aria-hidden="true" />
              Inquire on WhatsApp
            </a>
          </Reveal>
        </div>
      </section>

      {/* ─── SOURCING CTA ─── */}
      <section className=" py-16 lg:py-24">
        <div className="container-rt">
          <Reveal>
            <div className="rounded-2xl bg-[#0d1a2c] p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-16 border border-white/5">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" /><polyline points="14 2 14 8 20 8" /><path d="M2 15h10" /><path d="M2 18h10" /><path d="M2 12h10" /></svg>
                  <span className="text-[0.65rem] font-bold text-gold tracking-widest uppercase">
                    COMMERCIAL PROCUREMENT
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-display text-sand leading-[1.1]">
                  Looking for the Right Hospitality Supply Partner?
                </h2>
                <p className="mt-5 text-sand/70 text-sm sm:text-base leading-relaxed">
                  Speak with our commercial OS&E sales team in Dubai about your next procurement requirement, tender quote, or volume order.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <a
                  href={wa}
                  target={wa.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className={cn(btn({ variant: "gold" }), "w-full sm:w-auto h-12 px-6 shadow-xl shadow-gold/10 rounded-full text-xs tracking-widest uppercase")}
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  CHAT ON WHATSAPP
                </a>
                <Link
                  href="/contact"
                  className={cn(btn({ variant: "outlineLight" }), "w-full sm:w-auto h-12 px-6 border-white/10 hover:bg-white/5 rounded-full text-xs tracking-widest uppercase")}
                >
                  CORPORATE INQUIRIES
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
