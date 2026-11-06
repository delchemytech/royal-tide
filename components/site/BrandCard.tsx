import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { brandCollectionLabels, type Brand } from "@/lib/catalogues";

/**
 * Portrait brand tile: image (or placeholder), dark overlay, name + collections.
 * Hover / keyboard focus: image zooms, overlay deepens, text lifts, a gold line
 * draws in under the brand name, and the "View Catalogue" cue fades in.
 * Opens the catalogue PDF in a new tab.
 */
export function BrandCard({ brand }: { brand: Brand }) {
  const labels = brandCollectionLabels(brand).join(", ");
  const hasFile = Boolean(brand.file);

  const card = (
    <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-navy-deep shadow-sm transition-shadow duration-500 group-hover:shadow-xl group-focus-visible:shadow-xl">
      {brand.image ? (
        <img
          src={brand.image}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus-visible:scale-105"
        />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1b2a44] via-navy-deep to-[#0a1120] transition-transform duration-700 ease-out group-hover:scale-105 group-focus-visible:scale-105"
          aria-hidden="true"
        >
          <img src="/logo-rt-emblem.png" alt="" className="w-1/3 opacity-15" />
        </div>
      )}

      {/* Base overlay + a darker layer that fades in on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/5" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-black/25 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
        aria-hidden="true"
      />

      <div className="absolute inset-x-4 bottom-6 flex flex-col items-center text-center transition-transform duration-500 ease-out md:translate-y-3 md:group-hover:translate-y-0 md:group-focus-visible:translate-y-0">
        <h3 className="font-display text-2xl uppercase tracking-wide text-white sm:text-3xl">
          {brand.name}
        </h3>

        {/* Line under the brand name: always shown on touch screens, draws in on hover on desktop */}
        <span
          className="mt-3 block h-px w-12 bg-gold transition-all duration-500 ease-out md:w-0 md:group-hover:w-16 md:group-focus-visible:w-16"
          aria-hidden="true"
        />

        <p className="mt-3 text-[0.7rem] tracking-wide text-white/80">{labels}</p>

        <span
          className={cn(
            "mt-4 inline-flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gold transition-opacity duration-500",
            "md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100",
          )}
        >
          <FileText size={12} aria-hidden="true" />
          {hasFile ? "View Catalogue" : "Catalogue Coming Soon"}
        </span>
      </div>
    </div>
  );

  if (!hasFile) {
    return <div className="group">{card}</div>;
  }

  return (
    <a
      href={brand.file}
      target="_blank"
      rel="noreferrer"
      aria-label={`${brand.name} catalogue (PDF, opens in a new tab)`}
      className="group block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
    >
      {card}
    </a>
  );
}
