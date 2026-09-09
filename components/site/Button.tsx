import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const btn = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-[0.78rem] font-semibold uppercase tracking-[0.16em] rounded-full transition-all duration-300 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        gold: "bg-gold text-navy-deep hover:bg-champagne shadow-sm hover:shadow-md",
        navy: "bg-navy-deep text-sand hover:bg-navy shadow-sm hover:shadow-md",
        outline:
          "border-2 border-navy-deep/25 text-navy-deep hover:border-gold hover:text-gold",
        outlineLight:
          "border-2 border-sand/40 text-sand hover:border-gold hover:text-gold",
        ghost: "text-navy-deep hover:text-gold",
      },
      size: {
        md: "px-8 py-3.5",
        sm: "px-6 py-2.5 text-[0.7rem]",
      },
    },
    defaultVariants: { variant: "gold", size: "md" },
  },
);

type BtnVariants = VariantProps<typeof btn>;

export function ActionLink({
  variant,
  size,
  className,
  ...props
}: ComponentProps<typeof Link> & BtnVariants) {
  return <Link className={cn(btn({ variant, size }), className)} {...props} />;
}

export function ActionButton({
  variant,
  size,
  className,
  ...props
}: ComponentProps<"button"> & BtnVariants) {
  return <button className={cn(btn({ variant, size }), className)} {...props} />;
}
