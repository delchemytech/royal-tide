import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BrandCard } from "@/components/site/BrandCard";
import { Reveal } from "@/components/site/Reveal";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { btn } from "@/components/site/Button";
import { cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/site";
import { getBrandsFor, type Collection } from "@/lib/catalogues";

export function CollectionBrandsPage({ collection }: { collection: Collection }) {
  const brands = getBrandsFor(collection.slug);
  const wa = whatsappLink(
    `Hi Royal Tide, I would like to inquire about your ${collection.title} collection.`,
  );

  return (
    <div className="min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative isolate overflow-hidden bg-navy-deep pt-36 pb-20 sm:pt-44 sm:pb-28">
        {collection.image ? (
          <img
            src={collection.image}
            alt=""
            className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
          />
        ) : (
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-br from-[#1b2a44] via-navy-deep to-[#0a1120]"
            aria-hidden="true"
          />
        )}
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep via-navy-deep/60 to-navy-deep/30"
          aria-hidden="true"
        />
        <div className="container-rt">
          <Link
            href="/collections"
            className="mb-8 inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-gold transition-colors hover:text-champagne"
          >
            <ArrowLeft size={14} />
            All Collections
          </Link>
          <div className="max-w-3xl">
            <span className="eyebrow">
              <span className="h-px w-6 bg-gold" aria-hidden="true" />
              Collections
            </span>
            <h1 className="mt-5 text-4xl leading-[1.1] text-sand sm:text-5xl lg:text-6xl">
              {collection.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-sand/75 sm:text-lg">
              {collection.description}
            </p>
          </div>
        </div>
      </section>

      {/* ─── BRAND GRID ─── */}
      <section className="bg-background section-py">
        <div className="container-rt">
          {brands.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {brands.map((brand, i) => (
                <Reveal key={brand.name} delay={i * 60}>
                  <BrandCard brand={brand} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-xl rounded-xl border border-border bg-card p-10 text-center">
              <h2 className="font-display text-2xl text-navy-deep">Catalogues coming soon</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                We are preparing our {collection.title} catalogues. Message us for current
                brands, availability and pricing.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-navy-deep section-py">
        <div className="container-rt max-w-2xl text-center">
          <Reveal>
            <span className="mx-auto mb-6 block h-0.5 w-14 rounded-full bg-gold" aria-hidden="true" />
            <h2 className="font-display text-3xl leading-tight text-sand sm:text-4xl">
              Interested in {collection.title}?
            </h2>
            <p className="mt-4 text-base text-sand/70">
              Contact our sourcing team for specifications, pricing, and bulk availability.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={wa}
                target={wa.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className={cn(btn({ variant: "gold" }))}
              >
                <WhatsAppIcon className="h-4 w-4" aria-hidden="true" />
                Inquire on WhatsApp
              </a>
              <Link href="/contact" className={cn(btn({ variant: "outlineLight" }))}>
                Submit an RFQ
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
