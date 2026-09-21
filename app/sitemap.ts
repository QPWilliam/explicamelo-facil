import type { MetadataRoute } from "next";
import { getArticles, siteUrl } from "@/lib/content";
import { categories } from "@/lib/schema";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles();
  return [
    { url: siteUrl, changeFrequency: "daily", priority: 1 },
    ...categories.map(c => ({ url: `${siteUrl}/categoria/${c.slug}`, changeFrequency: "weekly" as const, priority: 0.6 })),
    ...articles.map(a => ({ url: `${siteUrl}/${a.slug}`, lastModified: a.updatedAt, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...["acerca", "contacto", "privacidad"].map(p => ({ url: `${siteUrl}/${p}`, priority: 0.3 }))
  ];
}
