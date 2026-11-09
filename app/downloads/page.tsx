import Link from "next/link";
import { Download, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { btn } from "@/components/site/Button";
import { cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/site";
import { collections, getBrandsFor, type Brand } from "@/lib/catalogues";

export const metadata = {
  title: "Downloads | Royal Tide General Trading LLC SPC",
  description:
    "Download Royal Tide brand catalogues for tableware, flatware, glassware, buffet, bar equipment and more.",
};

/**
 * Google Drive "/file/d/<id>/view" links become direct downloads.
 * Other links (anyflip etc.) are online viewers and open as-is.
 */
function catalogueLink(file: string): { href: string; isDownload: boolean } | null {
  if (!file) return null;
  const drive = file.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (drive) {
    return { href: `https://drive.google.com/uc?export=download&id=${drive[1]}`, isDownload: true };
  }
  return { href: file, isDownload: false };
}

const groups = collections
  .map((c) => ({ collection: c, brands: getBrandsFor(c.slug) }))
  .filter((g) => g.brands.length > 0);

export default function DownloadsPage() {
  const wa = whatsappLink("Hi Royal Tide, I would like to request a product catalogue.");

  return (
    <div className="min-h-screen bg-background">
      <section className="pt-36 pb-20 sm:pt-44 sm:pb-24">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <h1 className="text-center font-display text-3xl tracking-wide text-navy-deep sm:text-4xl">
            Download Our Catalogues
          </h1>
          <span className="mx-auto mt-5 block h-0.5 w-14 rounded-full bg-gold" aria-hidden="true" />

          <div className="mt-10 space-y-6">
            {groups.map(({ collection, brands }) => (
              <Reveal key={collection.slug}>
                <section
                  id={collection.slug}
                  aria-labelledby={`${collection.slug}-heading`}
                  className="scroll-mt-32 rounded-lg bg-mist/60 p-2 sm:p-3"
                >
                  <h2
                    id={`${collection.slug}-heading`}
                    className="px-1 pb-3 pt-1 text-xl font-semibold text-navy-deep sm:text-2xl"
                  >
                    {collection.title}
                  </h2>
                  <ul className="space-y-1.5">
                    {brands.map((brand, i) => (
                      <DownloadRow key={`${brand.name}-${i}`} brand={brand} />
                    ))}
                  </ul>
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-navy-deep section-py">
        <div className="container-rt max-w-2xl text-center">
          <Reveal>
            <span className="mx-auto mb-6 block h-0.5 w-14 rounded-full bg-gold" aria-hidden="true" />
            <h2 className="font-display text-3xl leading-tight text-sand sm:text-4xl">
              Can&rsquo;t find a catalogue?
            </h2>
            <p className="mt-4 text-base text-sand/70">
              Our team can send price lists, specifications and catalogues for any brand we supply.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={wa}
                target={wa.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className={cn(btn({ variant: "gold" }))}
              >
                <WhatsAppIcon className="h-4 w-4" aria-hidden="true" />
                Request on WhatsApp
              </a>
              <Link href="/contact" className={cn(btn({ variant: "outlineLight" }))}>
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function DownloadRow({ brand }: { brand: Brand }) {
  const link = catalogueLink(brand.file);

  return (
    <li className="flex items-center justify-between gap-4 rounded-md bg-white px-4 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:px-5">
      <span className="min-w-0 text-sm uppercase tracking-wide text-navy-deep/85">{brand.name}</span>

      {link ? (
        <a
          href={link.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${link.isDownload ? "Download" : "View"} ${brand.name} catalogue`}
          className="inline-flex shrink-0 items-center gap-2 rounded-md bg-navy-deep px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-gold hover:text-navy-deep"
        >
          {link.isDownload ? (
            <Download size={14} aria-hidden="true" />
          ) : (
            <ExternalLink size={14} aria-hidden="true" />
          )}
          {link.isDownload ? "Download" : "View"}
        </a>
      ) : (
        <span className="shrink-0 px-3.5 py-2 text-xs font-semibold text-muted-foreground">
          Coming soon
        </span>
      )}
    </li>
  );
}
