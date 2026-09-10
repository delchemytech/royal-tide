import type { Metadata } from "next";
import { Playfair_Display, Manrope, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-accent",
  weight: ["300", "400", "500"],
});

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
    <html lang="en" className={`${playfair.variable} ${manrope.variable} ${dmSans.variable}`}>
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
