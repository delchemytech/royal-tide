"use client";

import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { ActionButton, btn } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";
import { content, whatsappLink } from "@/lib/site";

const { contactPage, contact } = content;

const field =
  "mt-2 w-full rounded-lg border border-input bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-gold focus:ring-1 focus:ring-gold/30";
const label =
  "text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-navy-deep";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const wa = whatsappLink();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <section className="bg-navy-deep pt-36 pb-16 sm:pt-44 sm:pb-24">
        <div className="container-rt max-w-3xl">
          <span className="eyebrow">
            <span className="h-px w-6 bg-gold" aria-hidden="true" />
            {contactPage.hero.eyebrow}
          </span>
          <h1 className="mt-5 text-4xl leading-[1.1] text-sand sm:text-5xl lg:text-6xl">
            {contactPage.hero.title}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-sand/75 sm:text-lg">
            {contactPage.hero.intro}
          </p>
          <a
            href={wa}
            target={wa.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className={cn(btn({ variant: "gold" }), "mt-9")}
          >
            <MessageCircle size={16} aria-hidden="true" />
            Chat on WhatsApp
          </a>
        </div>
      </section>

      <section className="bg-background section-py">
        <div className="container-rt grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* Contact info */}
          <div className="space-y-6">
            <Reveal className="rounded-lg border border-border bg-card p-7 shadow-card">
              <h2 className="text-2xl text-navy-deep">Contact Information</h2>
              <ul className="mt-6 space-y-5">
                <InfoRow icon={<Mail size={18} />} title="Email">
                  <a
                    className="block hover:text-gold transition-colors"
                    href={`mailto:${contact.emailInfo}`}
                  >
                    {contact.emailInfo}
                  </a>
                  <a
                    className="block hover:text-gold transition-colors"
                    href={`mailto:${contact.emailSales}`}
                  >
                    {contact.emailSales}
                  </a>
                </InfoRow>
                <InfoRow icon={<Phone size={18} />} title="Telephone">
                  {contact.phoneDisplay}
                </InfoRow>
                <InfoRow icon={<MessageCircle size={18} />} title="WhatsApp">
                  {contact.whatsappDisplay}
                </InfoRow>
                <InfoRow icon={<MapPin size={18} />} title="Trade Location">
                  {contact.addressDisplay}
                  <span className="block">{contact.location}</span>
                </InfoRow>
                <InfoRow icon={<Clock size={18} />} title="Working Hours">
                  {contact.hours}
                </InfoRow>
              </ul>
            </Reveal>

            <Reveal delay={80} className="rounded-lg border border-border bg-mist p-7 shadow-card">
              <span className="gold-rule" aria-hidden="true" />
              <h2 className="mt-5 text-xl text-navy-deep">
                {contactPage.mapCard.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {contactPage.mapCard.text}
              </p>
              <div className="mt-6 flex aspect-[16/9] items-center justify-center rounded-lg border border-dashed border-navy-deep/20 bg-card">
                <span className="px-6 text-center text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Map placeholder — [UAE OFFICE ADDRESS]
                </span>
              </div>
            </Reveal>
          </div>

          {/* RFQ form */}
          <Reveal delay={60} className="rounded-lg border border-border bg-card p-7 shadow-card sm:p-10">
            <h2 className="text-2xl text-navy-deep">{contactPage.form.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {contactPage.form.intro}
            </p>

            {sent ? (
              <div
                role="status"
                className="mt-8 rounded-lg border-l-[3px] border-gold bg-mist p-6 text-sm leading-relaxed text-navy-deep"
              >
                {contactPage.form.success}
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={label} htmlFor="name">
                    Name
                  </label>
                  <input id="name" name="name" required className={field} />
                </div>
                <div>
                  <label className={label} htmlFor="company">
                    Company Name
                  </label>
                  <input id="company" name="company" required className={field} />
                </div>
                <div>
                  <label className={label} htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className={field}
                  />
                </div>
                <div>
                  <label className={label} htmlFor="phone">
                    Phone Number
                  </label>
                  <input id="phone" name="phone" type="tel" className={field} />
                </div>
                <div className="sm:col-span-2">
                  <label className={label} htmlFor="category">
                    Product Category Interest
                  </label>
                  <select id="category" name="category" className={field} defaultValue="">
                    <option value="" disabled>
                      Select a category
                    </option>
                    {contactPage.form.categories.map((c: string) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className={label} htmlFor="message">
                    Message / RFQ Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className={field}
                    placeholder="Quantities, specifications, delivery location and timeline."
                  />
                </div>
                <div className="sm:col-span-2">
                  <ActionButton type="submit" variant="navy" className="w-full sm:w-auto">
                    Submit Inquiry
                  </ActionButton>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}

function InfoRow({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span className="mt-0.5 text-gold" aria-hidden="true">
        {icon}
      </span>
      <div>
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-navy-deep">
          {title}
        </p>
        <div className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {children}
        </div>
      </div>
    </li>
  );
}
