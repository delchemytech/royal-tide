import { content } from "@/lib/site";
import { CategoryPage } from "@/components/site/CategoryPage";

export const metadata = {
  title: "Glassware & Barware | Royal Tide General Trading LLC SPC",
  description: "Commercial soda-lime and crystal glassware — tumblers, goblets, stemware, carafes and shot glasses for hotel bars, restaurants and banquets.",
};

export default function GlasswarePage() {
  return <CategoryPage category={content.catalog.glassware} />;
}
