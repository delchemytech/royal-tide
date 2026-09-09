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
      <section className="relative isolate flex min-h-[95vh] items-end overflow-hidden bg-navy-deep">
        <img
          src={hero}
          alt="Luxury UAE hotel dining room set with white porcelain tableware and glassware"
          className="absolute inset-0 -z-10 object-cover w-full h-full"
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/80 to-[#0F172A]/40"
          aria-hidden="true"
        />
        <div className="container-rt pb-20 pt-40 sm:pb-28 sm:pt-48">
          <div className="max-w-3xl animate-[fadeInUp_0.8s_ease-out_both]">
            <span className="eyebrow">
              <span className="h-px w-6 bg-gold" aria-hidden="true" />
              {home.hero.eyebrow}
            </span>
            <h1 className="mt-6 text-4xl leading-[1.08] text-sand sm:text-6xl lg:text-7xl">
              {home.hero.headline}
              <span className="block text-gold">
                {home.hero.headlineAccent}
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-sand/80 sm:text-lg">
              {home.hero.subline}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
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
      <section className="bg-sand section-py">
        <div className="container-rt grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow={home.about.eyebrow}
            title={home.about.title}
            className="max-w-xl"
          />
          <Reveal className="space-y-5">
            {home.about.paragraphs.map((p: string) => (
              <p key={p} className="text-base leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
            <div className="rounded-lg border-l-[3px] border-gold bg-card p-6 shadow-card">
              <h3 className="text-lg text-navy-deep">{home.about.missionTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {home.about.mission}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── COLLECTION CARDS ─── */}
      <section className="bg-background section-py">
        <div className="container-rt">
          <SectionHeading
            eyebrow={home.categoriesSection.eyebrow}
            title={home.categoriesSection.title}
            intro={home.categoriesSection.intro}
          />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {categoryCards.map((category: any, i: number) => (
              <Reveal key={category.id} delay={i * 80}>
                <Link
                  href={category.href || `/collections#${category.id}`}
                  className="group block h-full rounded-lg border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-lift hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={(images as any)[category.image]}
                      alt={category.alt}
                      loading="lazy"
                      width={800}
                      height={600}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl text-navy-deep">{category.name}</h3>
                    <span className="mt-2 block h-0.5 w-8 rounded-full bg-gold transition-all duration-300 group-hover:w-12" aria-hidden="true" />
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {category.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-navy-deep transition-colors group-hover:text-gold">
                      View Collection
                      <ArrowRight
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
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
                    <h3 className="mt-5 text-xl text-sand">{value.title}</h3>
                    <span className="mt-2 block h-0.5 w-6 rounded-full bg-gold/50" aria-hidden="true" />
                    <p className="mt-4 text-sm leading-relaxed text-sand/70">
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
    </>
  );
}
