import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  variant = "dark",
  className,
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="RoyalTide General Trading LLC SPC — home"
      className={cn("inline-flex items-center", className)}
    >
      <img 
        src="/logobgrm.png" 
        alt="RoyalTide Logo" 
        className="h-20 w-auto object-contain" 
      />
    </Link>
  );
}
