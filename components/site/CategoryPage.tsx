"use client";

import { ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";
import { btn } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/site";

interface Product {
  name: string;
  specs: string;
  reason: string;
  image: string;
  alt: string;
}

interface CategoryData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  products: Product[];
}

export function CategoryPage({ category }: { category: CategoryData }) {
  const wa = whatsappLink(
    `Hi Royal Tide, I would like to inquire about your ${category.title} collection.`
  );

  return (
    <div className="min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative isolate overflow-hidden bg-navy-deep pt-36 pb-20 sm:pt-44 sm:pb-28">
        <img
          src={category.heroImage}
          alt={category.title}
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20"
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep via-navy-deep/80 to-navy-deep/60"
          aria-hidden="true"
        />
        <div className="container-rt">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-gold transition-colors hover:text-champagne mb-8"
          >
            <ArrowLeft size={14} />
            All Collections
          </Link>
          <div className="max-w-3xl">
            <span className="eyebrow">
              <span className="h-px w-6 bg-gold" aria-hidden="true" />
              {category.subtitle}
            </span>
            <h1 className="mt-5 text-4xl leading-[1.1] text-sand sm:text-5xl lg:text-6xl">
              {category.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-sand/75 sm:text-lg">
              {category.description}
            </p>
            <p className="mt-4 text-sm text-gold font-semibold uppercase tracking-wide">
              {category.products.length} Products
            </p>
          </div>
        </div>
      </section>

      {/* ─── PRODUCT GRID ─── */}
      <section className="bg-background section-py">
        <div className="container-rt">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {category.products.map((product, i) => (
              <Reveal key={product.name} delay={i * 60}>
                <div className="group h-full rounded-lg border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-lift hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                    <img
                      src={product.image}
                      alt={product.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-display text-navy-deep leading-tight">
                      {product.name}
                    </h3>
                    <span
                      className="mt-2 block h-0.5 w-8 rounded-full bg-gold transition-all duration-300 group-hover:w-12"
                      aria-hidden="true"
                    />

                    {/* Specs pill */}
                    <div className="mt-4 inline-block rounded-full bg-mist px-3 py-1.5">
                      <span className="text-[0.7rem] font-semibold uppercase tracking-wide text-navy-deep/70">
                        {product.specs}
                      </span>
                    </div>

                    {/* Rationale */}
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {product.reason}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-navy-deep section-py">
        <div className="container-rt max-w-2xl text-center">
          <Reveal>
            <span className="block mx-auto mb-6 w-14 h-0.5 rounded-full bg-gold" aria-hidden="true" />
            <h2 className="text-3xl sm:text-4xl font-display text-sand leading-tight">
              Interested in {category.title}?
            </h2>
            <p className="mt-4 text-sand/70 text-base">
              Contact our sourcing team for specifications, pricing, and bulk availability.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <a
                href={wa}
                target={wa.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className={cn(btn({ variant: "gold" }))}
              >
                <MessageCircle size={16} aria-hidden="true" />
                Inquire on WhatsApp
              </a>
              <Link
                href="/contact"
                className={cn(btn({ variant: "outlineLight" }))}
              >
                Submit an RFQ
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
