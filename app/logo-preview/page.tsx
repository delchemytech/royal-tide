"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy, ArrowLeft, Sparkles, ShieldCheck, ExternalLink } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { useLogoMode, LOGO_OPTIONS, type LogoMode } from "@/lib/logoState";
import { cn } from "@/lib/utils";

export default function LogoPreviewPage() {
  const [activeMode, setMode] = useLogoMode();
  const [copied, setCopied] = useState(false);

  const copyWhatsAppText = () => {
    const text = `Shafiq ikka / Royal Tide Team,
We have updated the logo to solve the "bus board" clutter effect according to the owner's feedback.

We have prepared 3 luxury versions for review:
1. Option 1 (Owner's Direct Suggestion): RT Monogram only — clean, luxury seal (like Rolex/Chanel).
2. Option 2: RT Monogram + Editorial Serif (Playfair Display) — 5-star hotel supplier style, no 3D decal.
3. Option 3: Clean Logo Graphic — with the vertical divider needle removed and scaled to elegant proportions.

You can compare them live on the website:
http://localhost:3000/logo-preview`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-navy-deep pt-28 pb-20 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between pb-6 border-b border-gray-200">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-navy-deep/70 hover:text-navy-deep"
          >
            <ArrowLeft size={16} />
            <span>Back to Home Page</span>
          </Link>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-3 py-1 text-xs font-bold text-gold border border-gold/30">
            <Sparkles size={13} />
            <span>Owner Review Studio</span>
          </span>
        </div>

        {/* Title Header */}
        <div className="mt-8 text-center max-w-3xl mx-auto">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-navy-deep">
            Logo Presentation Review
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
            Eliminating the &ldquo;bus board&rdquo; decal effect and elevating Royal Tide&rsquo;s presence to a premier UAE luxury hospitality brand. Review and activate the preferred style below.
          </p>
        </div>

        {/* Active Selection Banner */}
        <div className="mt-8 rounded-2xl bg-white p-5 shadow-sm border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-deep text-gold">
              <ShieldCheck size={22} />
            </span>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Currently Active on Website</p>
              <p className="text-base font-bold text-navy-deep">
                {LOGO_OPTIONS.find((o) => o.id === activeMode)?.label}
              </p>
            </div>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy-deep px-5 py-2.5 text-xs font-bold text-sand hover:bg-gold hover:text-navy-deep transition-all"
          >
            <span>View Live on Home Page</span>
            <ExternalLink size={14} />
          </Link>
        </div>

        {/* Live Simulation Banner (Pill Navbar over Hero Photo) */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Live Header Simulation (Over Hero Photo)
            </h2>
            <span className="text-xs text-gray-400">Updates live when clicking below</span>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[21/9] min-h-[220px] max-h-[300px] flex items-start justify-center p-4 sm:p-6 bg-navy-deep">
            {/* Background image preview */}
            <img
              src="/hero-dining.jpg"
              alt="Luxury Dining Background"
              className="absolute inset-0 h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent" />

            {/* Simulated Floating Pill Navbar */}
            <div className="relative z-10 w-full max-w-4xl rounded-full bg-white/95 backdrop-blur-md px-5 sm:px-8 py-3 shadow-[0_10px_35px_rgba(0,0,0,0.2)] border border-white/60 flex items-center justify-between">
              <div className="shrink-0 flex items-center">
                <Logo mode={activeMode} />
              </div>
              <div className="hidden md:flex items-center gap-5 text-xs font-bold text-navy-deep/80">
                <span className="text-gold font-bold">Collections</span>
                <span>About</span>
                <span>Contact Us</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-navy-deep px-4 py-1.5 text-[0.72rem] font-bold text-sand">
                  Get a Quote
                </span>
              </div>
            </div>

            <div className="absolute bottom-4 left-6 z-10 text-white/80 text-xs hidden sm:block">
              Simulated Front Page First Fold
            </div>
          </div>
        </div>

        {/* Grid of 4 Options */}
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {LOGO_OPTIONS.map((opt, idx) => {
            const isSelected = activeMode === opt.id;
            return (
              <div
                key={opt.id}
                className={cn(
                  "flex flex-col justify-between rounded-3xl bg-white p-6 sm:p-7 shadow-sm transition-all border",
                  isSelected
                    ? "ring-2 ring-gold border-gold/50 shadow-xl"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <div>
                  {/* Badge & Title */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="inline-flex items-center rounded-full bg-navy-deep/5 px-2.5 py-0.5 text-[0.65rem] font-bold text-navy-deep uppercase tracking-wider">
                        Option {idx + 1}
                      </span>
                      <h3 className="mt-2 text-xl font-bold text-navy-deep">{opt.label}</h3>
                    </div>
                    {isSelected && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                        <Check size={13} />
                        <span>Active</span>
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-xs font-semibold text-gold">{opt.tag}</p>
                  <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {opt.description}
                  </p>

                  {/* Visual Renderings: Light & Dark backgrounds */}
                  <div className="mt-6 space-y-3">
                    {/* On Clean White / Pill Navbar */}
                    <div className="rounded-2xl border border-gray-100 bg-[#FAF9F6] p-4 flex items-center justify-center min-h-[80px]">
                      <Logo mode={opt.id} />
                    </div>

                    {/* On Deep Luxury Navy */}
                    <div className="rounded-2xl bg-navy-deep p-4 flex items-center justify-center min-h-[80px]">
                      <Logo mode={opt.id} variant="light" />
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setMode(opt.id)}
                    className={cn(
                      "w-full rounded-xl py-2.5 text-xs font-bold transition-all flex items-center justify-center gap-2",
                      isSelected
                        ? "bg-navy-deep text-sand shadow-sm"
                        : "bg-gray-100 text-navy-deep hover:bg-gold hover:text-navy-deep"
                    )}
                  >
                    {isSelected ? (
                      <>
                        <Check size={14} className="text-gold" />
                        <span>Active on Site</span>
                      </>
                    ) : (
                      <span>Apply to Website</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* WhatsApp Sharing Card */}
        <div className="mt-14 rounded-3xl bg-navy-deep p-7 sm:p-9 text-sand shadow-xl border border-gold/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold">Share With Client / Owner</span>
              <h2 className="mt-1 text-2xl font-bold font-display text-white">
                Ready-to-Send WhatsApp Summary
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-sand/80 max-w-xl">
                Copy this formatted review note to send to Shafeeq ikka or the business owner alongside screenshots of the options.
              </p>
            </div>
            <button
              type="button"
              onClick={copyWhatsAppText}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3 text-xs font-bold text-navy-deep hover:bg-gold/90 transition-all shadow-md shrink-0"
            >
              {copied ? (
                <>
                  <Check size={16} />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>Copy Message Text</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
