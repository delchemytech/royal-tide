import { content } from "@/lib/site";
import { CategoryPage } from "@/components/site/CategoryPage";

export const metadata = {
  title: "Tableware & Dining Essentials | Royal Tide General Trading LLC SPC",
  description: "Commercial vitrified porcelain plates, bowls, cups and 18/10 stainless steel flatware for hotels, restaurants and catering operations.",
};

export default function TablewarePage() {
  return <CategoryPage category={content.catalog.tableware} />;
}
