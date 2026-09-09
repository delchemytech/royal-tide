import { content } from "@/lib/site";
import { CategoryPage } from "@/components/site/CategoryPage";

export const metadata = {
  title: "Buffet & Service Accessories | Royal Tide General Trading LLC SPC",
  description: "Stainless steel chafing dishes, GN food pans, beverage dispensers and tabletop service accessories for hotel buffets and banquets.",
};

export default function BuffetPage() {
  return <CategoryPage category={content.catalog.buffet} />;
}
