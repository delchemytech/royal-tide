import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span className="eyebrow">
          <span className="h-px w-6 bg-gold" aria-hidden="true" />
          {eyebrow}
        </span>
      ) : null}
      {title ? (
        <h2
          className={cn(
            "mt-4 text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]",
            tone === "light" ? "text-sand" : "text-navy-deep",
          )}
        >
          {title}
        </h2>
      ) : null}
      {intro ? (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-[1.05rem]",
            tone === "light" ? "text-sand/75" : "text-muted-foreground",
          )}
        >
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  alt,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  image: string;
  alt: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep pt-32 pb-16 sm:pt-40 sm:pb-24">
      <img
        src={image}
        alt={alt}
        width={1408}
        height={912}
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25"
      />
      <div
        className="absolute inset-0 -z-10 bg-navy-deep/70"
        aria-hidden="true"
      />
      <div className="container-rt">
        <div className="max-w-3xl">
          {eyebrow ? (
            <span className="eyebrow">
              <span className="h-px w-6 bg-gold" aria-hidden="true" />
              {eyebrow}
            </span>
          ) : null}
          <h1 className="mt-5 text-4xl leading-[1.1] text-sand sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {intro ? (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-sand/75 sm:text-lg">
              {intro}
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
