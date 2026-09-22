import type { Metadata } from "next";
import { CategoryView, categoryMetadata } from "@/components/views/category";
import { ensureRoute } from "@/lib/routes";
import { categoryPath, defaultLocale, site, t } from "@/lib/sites";

export const revalidate = 3600;
type Props = { params: Promise<{ slug: string }> };
const SEGMENT = "categoria";

export function generateStaticParams() {
  if (t(site.routes.category, defaultLocale) !== SEGMENT) return [];
  return site.categories.map(c => ({ slug: categoryPath(c.slug, defaultLocale).split("/").pop()! }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return categoryMetadata((await params).slug, defaultLocale);
}

export default async function CategoryPage({ params }: Props) {
  ensureRoute("category", defaultLocale, SEGMENT);
  return <CategoryView segment={(await params).slug} locale={defaultLocale} />;
}
