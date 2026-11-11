import data from "@/data/catalogues.json";

export interface Collection {
  slug: string;
  title: string;
  description: string;
  image: string;
}

export interface Brand {
  name: string;
  image: string;
  file: string;
  collection: string;
  subCollections: string[];
}

export const collections: Collection[] = data.collections;
const brands: Brand[] = data.brands;

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

/** Brands whose primary collection is `slug` (one-to-one: never shown on sub-collection pages). */
export function getBrandsFor(slug: string): Brand[] {
  return brands.filter((b) => b.collection === slug);
}

/** Display labels for a brand card: its own collection first, then the other ranges it covers. */
export function brandCollectionLabels(brand: Brand): string[] {
  return [brand.collection, ...brand.subCollections]
    .map((s) => getCollection(s)?.title ?? s)
    .filter((t, i, all) => all.indexOf(t) === i);
}
