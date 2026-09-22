import type { Metadata } from "next";
import { CategoryView, categoryMetadata } from "@/components/views/category";
import { ensureRoute } from "@/lib/routes";
import { categoryPath, defaultLocale, site } from "@/lib/sites";

export const revalidate = 3600;
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  if (defaultLocale === "es" || !site.locales.includes("es")) return [];
  return site.categories.map(c => ({ slug: categoryPath(c.slug, "es").split("/").pop()! }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return categoryMetadata((await params).slug, "es");
}

export default async function SpanishCategoryPage({ params }: Props) {
  ensureRoute("category", "es", "categoria");
  return <CategoryView segment={(await params).slug} locale="es" />;
}
