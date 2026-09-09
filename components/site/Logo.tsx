import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Brand mark. `variant="light"` renders on dark backgrounds (footer/hero).
 * `variant="dark"` renders on the warm off-white background.
 */
export function Logo({
  variant = "dark",
  className,
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  if (variant === "light") {
    return (
      <Link
        href="/"
        aria-label="RoyalTide General Trading LLC SPC — home"
        className={cn("inline-block", className)}
      >
        <span className="block font-display text-3xl tracking-wide text-sand">
          Royal<span className="text-gold">Tide</span>
        </span>
        <span className="mt-1 block text-[0.62rem] font-medium uppercase tracking-[0.28em] text-sand/70">
          General Trading LLC SPC
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      aria-label="RoyalTide General Trading LLC SPC — home"
      className={cn("inline-block", className)}
    >
      <span className="block font-display text-3xl tracking-wide text-navy-deep">
        Royal<span className="text-gold">Tide</span>
      </span>
      <span className="mt-1 block text-[0.62rem] font-medium uppercase tracking-[0.28em] text-muted-foreground">
        General Trading LLC SPC
      </span>
    </Link>
  );
}
