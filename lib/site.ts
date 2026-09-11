import content from "@/data/content.json";
const tableware = "/corkeyandtablewear.png";
const cutlery = "/steel.png";
const glassware = "/glass.png";
const linen = "/table_andsuite.png";
const buffet = "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop";
const cookware = "/catogory5.jpg";

export { content };

/** Image key -> bundled asset. Swap a path here to change the artwork everywhere. */
export const images: Record<string, string> = {
  tableware,
  cutlery,
  glassware,
  linen,
  buffet,
  cookware,
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
