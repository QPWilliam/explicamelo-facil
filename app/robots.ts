import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/content";
import { routePath, site } from "@/lib/sites";

export default function robots(): MetadataRoute.Robots {
  // Las páginas de búsqueda no se indexan: generan direcciones infinitas sin contenido propio.
  const search = site.locales.map(l => routePath("search", l));
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api/editor", "/api/session", ...search] }],
    sitemap: `${siteUrl}/sitemap.xml`
  };
}
