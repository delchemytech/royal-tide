import { notFound } from "next/navigation";
import { CollectionBrandsPage } from "@/components/site/CollectionBrandsPage";
import { collections, getCollection } from "@/lib/catalogues";

// Static export: only the slugs listed in data/catalogues.json are built.
export const dynamicParams = false;

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return {};
  return {
    title: `${collection.title} | Royal Tide General Trading LLC SPC`,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();
  return <CollectionBrandsPage collection={collection} />;
}
