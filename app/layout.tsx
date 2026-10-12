import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import content from "@/data/content.json";

const { company, contact } = content;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: company.name,
  url: `https://${company.domain}`,
  telephone: contact.phoneHref,
  email: contact.emailSales,
  hasMap: contact.googleMapsUrl,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Musaffah M37, Plot No. 135",
    addressLocality: "Abu Dhabi",
    addressCountry: "AE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 24.3530024,
    longitude: 54.4995434,
  },
  openingHours: "Su-Th 09:00-18:00",
};

export const metadata: Metadata = {
  title: "Royal Tide General Trading LLC SPC",
  description: "UAE supplier of commercial-grade hospitality operating supplies.",
  icons: {
    icon: "/favicon-rt.jpg",
    shortcut: "/favicon-rt.jpg",
    apple: "/favicon-rt.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&family=Manrope:wght@400..700&family=Playfair+Display:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Toaster />
      </body>
    </html>
  );
}
