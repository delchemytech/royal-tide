import content from "@/data/content.json";
const tableware = "https://images.unsplash.com/photo-1615801368940-275d278453ab?q=80&w=800&auto=format&fit=crop";
const cutlery = "https://images.unsplash.com/photo-1606041011872-5965904620f4?q=80&w=800&auto=format&fit=crop";
const glassware = "https://images.unsplash.com/photo-1510007551065-224422e57207?q=80&w=800&auto=format&fit=crop";
const linen = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop";
const buffet = "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop";

export { content };

/** Image key -> bundled asset. Swap a path here to change the artwork everywhere. */
export const images: Record<string, string> = {
  tableware,
  cutlery,
  glassware,
  linen,
  buffet,
};

/**
 * WhatsApp deep link. Until a real number is set in content.json
 * (contact.whatsappNumber, digits only, incl. country code) this falls back
 * to the contact page so no button is ever dead.
 */
export function whatsappLink(message?: string): string {
  const number = content.contact.whatsappNumber.replace(/\D/g, "");
  if (!number) return "/contact";
  const text = encodeURIComponent(message ?? content.contact.whatsappMessage);
  return `https://wa.me/${number}?text=${text}`;
}
