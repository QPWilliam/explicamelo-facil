import type { MetadataRoute } from "next";
import { getArticles, siteUrl } from "@/lib/content";
import { articlePath, categoryPath, localePrefix, routePath, site } from "@/lib/sites";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of site.locales) {
    entries.push({ url: `${siteUrl}${localePrefix(locale)}` || siteUrl, changeFrequency: "daily", priority: 1 });
    for (const c of site.categories) {
      entries.push({ url: `${siteUrl}${categoryPath(c.slug, locale)}`, changeFrequency: "weekly", priority: 0.6 });
    }
    for (const a of await getArticles(locale)) {
      entries.push({
        url: `${siteUrl}${articlePath(a.slug, locale)}`,
        lastModified: a.updatedAt,
        changeFrequency: "monthly",
        priority: 0.8
      });
    }
    for (const page of ["about", "contact", "privacy"] as const) {
      entries.push({ url: `${siteUrl}${routePath(page, locale)}`, priority: 0.3 });
    }
  }
  return entries;
}
