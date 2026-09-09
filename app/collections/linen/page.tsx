import { content } from "@/lib/site";
import { CategoryPage } from "@/components/site/CategoryPage";

export const metadata = {
  title: "Bed & Bath Linen | Royal Tide General Trading LLC SPC",
  description: "Hotel-grade 300TC satin stripe bed linen and 500–800 GSM ring-spun cotton toweling for commercial hospitality use.",
};

export default function LinenPage() {
  return <CategoryPage category={content.catalog.linen} />;
}
