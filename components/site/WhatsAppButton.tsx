"use client";

import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function WhatsAppButton() {
  const [waLink, setWaLink] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setWaLink(whatsappLink());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
      )}
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
