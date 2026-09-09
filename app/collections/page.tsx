import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/Section";
import { btn } from "@/components/site/Button";
import { cn } from "@/lib/utils";
import { content, whatsappLink } from "@/lib/site";

const catalog = content.catalog;
const { collections } = content;

const categories = [
  {
    ...catalog.tableware,
    href: "/collections/tableware",
    count: catalog.tableware.products.length,
  },
  {
    ...catalog.glassware,
    href: "/collections/glassware",
    count: catalog.glassware.products.length,
  },
  {
    ...catalog.linen,
    href: "/collections/linen",
    count: catalog.linen.products.length,
  },
  {
    ...catalog.buffet,
    href: "/collections/buffet",
    count: catalog.buffet.products.length,
  },
];

export const metadata = {
  title: collections.seoTitle,
  description: collections.seoDescription,
};

export default function CollectionsPage() {
  const wa = whatsappLink();

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative isolate overflow-hidden bg-navy-deep pt-36 pb-20 sm:pt-44 sm:pb-28">
        <img
          src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=1920&auto=format&fit=crop"
          alt="Fine dining table in ambient lighting"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20"
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep via-navy-deep/80 to-navy-deep/50"
          aria-hidden="true"
        />
        <div className="container-rt max-w-3xl">
          <span className="eyebrow">
            <span className="h-px w-6 bg-gold" aria-hidden="true" />
            {collections.banner.eyebrow}
          </span>
          <h1 className="mt-5 text-4xl leading-[1.1] text-sand sm:text-5xl lg:text-6xl">
            {collections.banner.title}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-sand/75 sm:text-lg">
            {collections.banner.intro}
          </p>
        </div>
      </section>

      {/* ─── CATEGORY CARDS ─── */}
      <section className="bg-background section-py">
        <div className="container-rt">
          <SectionHeading
            eyebrow="Browse by Category"
            title="Four Core Product Verticals"
            intro="Select a collection below to view the full product range with specifications."
          />

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {categories.map((cat, i) => (
              <Reveal key={cat.id} delay={i * 80}>
                <Link
                  href={cat.href}
                  className="group block h-full rounded-lg border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-lift hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-mist">
                    <img
                      src={cat.heroImage}
                      alt={cat.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="inline-block rounded-full bg-gold/90 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-navy-deep">
                        {cat.count} Products
                      </span>
                    </div>
                  </div>
                  <div className="p-7">
                    <h3 className="text-2xl text-navy-deep">{cat.title}</h3>
                    <span
                      className="mt-2 block h-0.5 w-8 rounded-full bg-gold transition-all duration-300 group-hover:w-14"
                      aria-hidden="true"
                    />
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-gold">
                      {cat.subtitle}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {cat.description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-navy-deep transition-colors group-hover:text-gold">
                      Explore Collection
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

      {/* ─── SOURCING CTA ─── */}
      <section className="bg-navy-deep section-py">
        <div className="container-rt max-w-2xl text-center">
          <Reveal>
            <span className="block mx-auto mb-6 w-14 h-0.5 rounded-full bg-gold" aria-hidden="true" />
            <h2 className="text-3xl sm:text-4xl font-display text-sand leading-tight">
              {collections.sourcingBanner.title}
            </h2>
            <p className="mt-4 text-sand/70 text-base">
              {collections.sourcingBanner.text}
            </p>
            <a
              href={wa}
              target={wa.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className={cn(btn({ variant: "gold" }), "mt-8")}
            >
              <MessageCircle size={16} aria-hidden="true" />
              {collections.sourcingBanner.cta}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
