import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/Section";
import { btn } from "@/components/site/Button";
import { cn } from "@/lib/utils";
import { content, whatsappLink, images } from "@/lib/site";

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
  {
    ...catalog.cookware,
    href: "/collections/cookware",
    count: catalog.cookware.products.length,
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
      <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-navy-deep">
        <img
          src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=1920&auto=format&fit=crop"
          alt="Fine dining table in ambient lighting"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-80"
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep/90 via-navy-deep/40 to-transparent"
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
      <section className="bg-[#FAF9FC] py-20 lg:py-28">
        <div className="container-rt">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
            <div className="max-w-xl">
              <span className="text-[0.65rem] font-bold text-gold tracking-widest uppercase block mb-3">
                ARCHITECTURAL TABLETOP
              </span>
              <h2 className="text-3xl sm:text-4xl text-navy-deep font-display">
                The Banquet & Dining Suite
              </h2>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 items-start">
            {/* Column 1 */}
            <div className="flex flex-col gap-6">
              {[0, 2, 4].map((i) => {
                const cat = categories[i];
                const card = content.categoryCards[i];
                const badgeLabel = card.name.split('&')[0].trim();
                const isOverlay = i === 0;

                return (
                  <Reveal key={cat.id} delay={i * 80}>
                    <div
                      className="group block rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      <div className={cn("relative overflow-hidden bg-mist", isOverlay ? "aspect-[4/3] lg:aspect-[1/1]" : "aspect-[3/2] lg:aspect-[16/9]")}>
                        <img
                          src={cat.heroImage}
                          alt={card.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        {isOverlay && (
                          <>
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                              <span className="text-[0.6rem] font-bold uppercase tracking-widest text-gold block mb-2">
                                {String(i + 1).padStart(2, '0')}
                              </span>
                              <h3 className="text-xl sm:text-2xl font-bold text-white">{card.name}</h3>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="p-6 sm:p-8">
                        {!isOverlay && (
                          <div className="mb-3">
                            <span className="text-[0.6rem] font-bold uppercase tracking-widest text-gold block mb-2">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold text-navy-deep">{card.name}</h3>
                          </div>
                        )}
                        <p className="text-[0.85rem] sm:text-sm leading-relaxed text-muted-foreground">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-6">
              {[1, 3].map((i) => {
                const cat = categories[i];
                const card = content.categoryCards[i];
                const badgeLabel = card.name.split('&')[0].trim();
                const isOverlay = i === 3;

                return (
                  <Reveal key={cat.id} delay={i * 80}>
                    <div
                      className="group block rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      <div className={cn("relative overflow-hidden bg-mist", isOverlay ? "aspect-[4/3] lg:aspect-[1/1]" : "aspect-[3/2] lg:aspect-[16/9]")}>
                        <img
                          src={cat.heroImage}
                          alt={card.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        {isOverlay && (
                          <>
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                              <span className="text-[0.6rem] font-bold uppercase tracking-widest text-gold block mb-2">
                                {String(i + 1).padStart(2, '0')}
                              </span>
                              <h3 className="text-xl sm:text-2xl font-bold text-white">{card.name}</h3>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="p-6 sm:p-8">
                        {!isOverlay && (
                          <div className="mb-3">
                            <span className="text-[0.6rem] font-bold uppercase tracking-widest text-gold block mb-2">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold text-navy-deep">{card.name}</h3>
                          </div>
                        )}
                        <p className="text-[0.85rem] sm:text-sm leading-relaxed text-muted-foreground">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section className="bg-background py-20 lg:py-28">
        <div className="container-rt">
          <SectionHeading
            eyebrow={collections.gallery.eyebrow}
            intro={collections.gallery.intro}
          />
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[280px] gap-4 sm:gap-6">
            {collections.gallery.images.map((src: string, idx: number) => {
              const bentoClasses = [
                "col-span-2 md:col-span-2 row-span-2",
                "col-span-1 md:col-span-1 row-span-1",
                "col-span-1 md:col-span-1 row-span-2",
                "col-span-1 md:col-span-1 row-span-1",
                "col-span-2 md:col-span-2 row-span-1",
                "col-span-2 md:col-span-2 row-span-1",
              ];
              const gridClass = bentoClasses[idx % bentoClasses.length];

              return (
                <Reveal
                  key={src}
                  delay={(idx + 1) * 50}
                  className={cn("relative overflow-hidden rounded-xl bg-mist border border-border shadow-sm group", gridClass)}
                >
                  <img
                    src={src}
                    alt={`Product detail ${idx + 1}`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SOURCING CTA ─── */}
      <section className="bg-navy-deep section-py">
        <div className="container-rt">
          <Reveal>
            <div className="rounded-2xl bg-[#0d1a2c] p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-16 border border-white/5">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/><polyline points="14 2 14 8 20 8"/><path d="M2 15h10"/><path d="M2 18h10"/><path d="M2 12h10"/></svg>
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
                  className={cn(btn({ variant: "gold" }), "w-full sm:w-auto h-12 px-6 shadow-xl shadow-gold/10")}
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  Chat on WhatsApp
                </a>
                <Link
                  href="/contact"
                  className={cn(btn({ variant: "outlineLight" }), "w-full sm:w-auto h-12 px-6 border-white/10 hover:bg-white/5")}
                >
                  Corporate Inquiries
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
