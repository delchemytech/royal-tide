"use client";

import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState, useRef, type FormEvent, type ChangeEvent, type FocusEvent } from "react";
import { ActionButton, btn } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";
import { content, whatsappLink } from "@/lib/site";

const { contactPage, contact } = content;

const field =
  "mt-2 w-full rounded-lg border border-input bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-gold focus:ring-1 focus:ring-gold/30";
const fieldError =
  "mt-2 w-full rounded-lg border border-red-400 bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-red-500 focus:ring-1 focus:ring-red-300";
const label =
  "text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-navy-deep";

// ── Sanitization ──────────────────────────────────────────────────────────────
/** Strip all HTML tags and dangerous characters to prevent XSS / injection */
function sanitize(value: string): string {
  return value
    .replace(/<[^>]*>/g, "")           // strip HTML tags
    .replace(/[<>"'`]/g, "")           // remove remaining angle brackets & quotes
    .replace(/javascript:/gi, "")      // block javascript: URIs
    .replace(/on\w+\s*=/gi, "")        // strip inline event handlers
    .replace(/data:/gi, "")            // block data: URIs
    .trim();
}

/** Sanitize every string value in the form data object */
function sanitizeAll(data: Record<string, FormDataEntryValue>) {
  return Object.fromEntries(
    Object.entries(data).map(([k, v]) => [k, typeof v === "string" ? sanitize(v) : v])
  );
}

// ── Validation rules ──────────────────────────────────────────────────────────
const RULES = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 80,
    pattern: /^[a-zA-Z\u00C0-\u024F '\-.]+$/,
    patternMsg: "Name may only contain letters, spaces, hyphens, or apostrophes.",
  },
  company: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z0-9\u00C0-\u024F &',\-.()]+$/,
    patternMsg: "Company name contains invalid characters.",
  },
  email: {
    required: true,
    maxLength: 254,
    // RFC 5322 simplified
    pattern: /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
    patternMsg: "Please enter a valid email address.",
  },
  phone: {
    required: false,
    maxLength: 20,
    // Allow +, digits, spaces, dashes, parentheses
    pattern: /^[+]?[\d\s()\-]{6,20}$/,
    patternMsg: "Phone must be 6–20 digits and may include +, spaces, or dashes.",
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 2000,
    pattern: /^[\s\S]{10,2000}$/,
    patternMsg: "Message must be between 10 and 2000 characters.",
  },
};

type FieldKey = keyof typeof RULES;
type FieldErrors = Partial<Record<FieldKey, string>>;

function validateField(name: FieldKey, value: string): string {
  const r = RULES[name];
  const v = value.trim();

  if (r.required && !v) return "This field is required.";
  if (!r.required && !v) return ""; // optional + empty → OK

  if ("minLength" in r && r.minLength && v.length < r.minLength)
    return `Minimum ${r.minLength} characters required.`;
  if (r.maxLength && v.length > r.maxLength)
    return `Maximum ${r.maxLength} characters allowed.`;
  if (r.pattern && !r.pattern.test(v)) return r.patternMsg;

  return "";
}

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const wa = whatsappLink();

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const name = e.target.name as FieldKey;
    if (!touched[name]) return; // only re-validate after first blur
    const msg = validateField(name, sanitize(e.target.value));
    setFieldErrors((prev) => ({ ...prev, [name]: msg }));
  }

  function handleBlur(e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const name = e.target.name as FieldKey;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const msg = validateField(name, sanitize(e.target.value));
    setFieldErrors((prev) => ({ ...prev, [name]: msg }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError("");

    // Validate all fields up-front
    const formData = new FormData(e.currentTarget);
    const raw = Object.fromEntries(formData.entries()) as Record<string, string>;
    const allTouched: Partial<Record<FieldKey, boolean>> = {};
    const errors: FieldErrors = {};
    let hasError = false;

    (Object.keys(RULES) as FieldKey[]).forEach((key) => {
      allTouched[key] = true;
      const msg = validateField(key, sanitize(raw[key] ?? ""));
      if (msg) { errors[key] = msg; hasError = true; }
    });

    setTouched(allTouched);
    setFieldErrors(errors);
    if (hasError) return;

    // Sanitize before sending
    const safe = sanitizeAll(raw as Record<string, FormDataEntryValue>);

    setLoading(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "8e02f809-f68b-44f3-8e6f-d6ceaa9431c3",
          to: "sales@royaltides.ae",
          subject: `New RFQ from ${safe.name} — ${safe.company}`,
          ...safe,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setSent(true);
        formRef.current?.reset();
      } else {
        setSubmitError("Something went wrong. Please try again or reach us on WhatsApp.");
      }
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
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
                    href={`https://mail.google.com/mail/?view=cm&to=${contact.emailInfo}`}
                    target="_blank" rel="noreferrer"
                  >
                    {contact.emailInfo}
                  </a>
                  <a
                    className="block hover:text-gold transition-colors"
                    href={`https://mail.google.com/mail/?view=cm&to=${contact.emailSales}`}
                    target="_blank" rel="noreferrer"
                  >
                    {contact.emailSales}
                  </a>
                </InfoRow>
                <InfoRow icon={<Phone size={18} />} title="Telephone">
                  <a href={`tel:${contact.phoneHref}`} className="hover:text-gold transition-colors">
                    {contact.phoneDisplay}
                  </a>
                </InfoRow>
                <InfoRow icon={<MessageCircle size={18} />} title="WhatsApp">
                  <a href={wa} target="_blank" rel="noreferrer" className="hover:text-gold transition-colors">
                    {contact.whatsappDisplay}
                  </a>
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
              <div className="mt-6 overflow-hidden rounded-lg border border-border bg-card aspect-[16/9]">
                <iframe
                  src="https://maps.google.com/maps?q=Office%204,%20Musaffah%2037,%20Abu%20Dhabi&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="UAE Operations Map"
                />
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
              <form ref={formRef} onSubmit={onSubmit} noValidate className="mt-8 grid gap-5 sm:grid-cols-2">
                {/* Web3Forms hidden fields */}
                <input type="hidden" name="access_key" value="8e02f809-f68b-44f3-8e6f-d6ceaa9431c3" />
                <input type="hidden" name="subject" value="New RFQ — Royal Tide Website" />
                <input type="hidden" name="from_name" value="Royal Tide Website" />

                {/* Submit-level error */}
                {submitError && (
                  <div role="alert" className="sm:col-span-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {submitError}
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className={label} htmlFor="name">Name <span className="text-red-500">*</span></label>
                  <input
                    id="name" name="name" autoComplete="name"
                    maxLength={80}
                    onChange={handleChange} onBlur={handleBlur}
                    className={fieldErrors.name ? fieldError : field}
                    aria-describedby={fieldErrors.name ? "name-err" : undefined}
                  />
                  {fieldErrors.name && <p id="name-err" role="alert" className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>}
                </div>

                {/* Company */}
                <div>
                  <label className={label} htmlFor="company">Company Name <span className="text-red-500">*</span></label>
                  <input
                    id="company" name="company" autoComplete="organization"
                    maxLength={100}
                    onChange={handleChange} onBlur={handleBlur}
                    className={fieldErrors.company ? fieldError : field}
                    aria-describedby={fieldErrors.company ? "company-err" : undefined}
                  />
                  {fieldErrors.company && <p id="company-err" role="alert" className="mt-1 text-xs text-red-600">{fieldErrors.company}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className={label} htmlFor="email">Email <span className="text-red-500">*</span></label>
                  <input
                    id="email" name="email" type="email" autoComplete="email"
                    maxLength={254}
                    onChange={handleChange} onBlur={handleBlur}
                    className={fieldErrors.email ? fieldError : field}
                    aria-describedby={fieldErrors.email ? "email-err" : undefined}
                  />
                  {fieldErrors.email && <p id="email-err" role="alert" className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className={label} htmlFor="phone">Phone Number</label>
                  <input
                    id="phone" name="phone" type="tel" autoComplete="tel"
                    maxLength={20}
                    onChange={handleChange} onBlur={handleBlur}
                    className={fieldErrors.phone ? fieldError : field}
                    aria-describedby={fieldErrors.phone ? "phone-err" : undefined}
                  />
                  {fieldErrors.phone && <p id="phone-err" role="alert" className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p>}
                </div>

                {/* Category */}
                <div className="sm:col-span-2">
                  <label className={label} htmlFor="category">Product Category Interest</label>
                  <select id="category" name="category" className={field} defaultValue="">
                    <option value="" disabled>Select a category</option>
                    {contactPage.form.categories.map((c: string) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                  <label className={label} htmlFor="message">Message / RFQ Details <span className="text-red-500">*</span></label>
                  <textarea
                    id="message" name="message" rows={5}
                    maxLength={2000}
                    onChange={handleChange} onBlur={handleBlur}
                    className={cn(fieldErrors.message ? fieldError : field, "resize-y")}
                    placeholder="Quantities, specifications, delivery location and timeline."
                    aria-describedby={fieldErrors.message ? "message-err" : undefined}
                  />
                  {fieldErrors.message && <p id="message-err" role="alert" className="mt-1 text-xs text-red-600">{fieldErrors.message}</p>}
                </div>

                {/* Submit */}
                <div className="sm:col-span-2">
                  <ActionButton type="submit" variant="navy" className="w-full sm:w-auto" disabled={loading}>
                    {loading ? "Sending…" : "Submit Inquiry"}
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
