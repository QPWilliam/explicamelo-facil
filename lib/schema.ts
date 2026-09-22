import { z } from "zod";
import { locales, site, siteKeys, defaultLocale, t, type Locale } from "./sites";

// Las secciones ya no viven aquí: cada web define las suyas en lib/sites.ts.
// Se reexportan para que el resto del código siga teniendo un único punto de entrada.
export const categories = site.categories;
export type CategorySlug = string;
export { categoryName, categoryPath, categoryByPath } from "./sites";

const categorySlugs = site.categories.map(c => c.slug);
export const categorySchema = z
  .string()
  .refine(v => categorySlugs.includes(v), `Sección desconocida en ${site.name}. Opciones: ${categorySlugs.join(", ")}.`);

const imageUrl = z
  .string()
  .max(2000)
  .refine(v => /^\/((images|uploads|portada)\/)\S+$/.test(v) || /^https:\/\//.test(v), "Usa una imagen local o una URL HTTPS.");

const slugText = z.string().min(3).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

// Direcciones que usa el propio sitio y que ninguna guía puede ocupar:
// rutas técnicas, prefijos de idioma y las páginas fijas en todos los idiomas que publica la web.
export const reservedSlugs = [
  ...new Set([
    "admin", "api", "sitemap", "robots", "ads", "images", "uploads", "portada", "cover", "og", "_next",
    ...locales,
    ...site.locales.flatMap(locale => Object.values(site.routes).map(route => t(route, locale)))
  ])
];

export const articleSchema = z.object({
  // A qué web pertenece. Normalmente se omite en los archivos y se rellena con la web que se está construyendo.
  site: z.enum(siteKeys).default(site.key),
  // Idioma de esta versión del texto. La traducción es otra guía distinta con el mismo translationKey.
  locale: z
    .enum(locales)
    .default(defaultLocale)
    .refine(v => (site.locales as readonly Locale[]).includes(v), `${site.name} no publica en ese idioma.`),
  // Une las versiones de la misma guía en varios idiomas. Si falta, la guía no tiene traducción.
  translationKey: slugText.nullable().default(null),
  slug: slugText.refine(v => !reservedSlugs.includes(v), "Esa dirección está reservada por el sitio."),
  title: z.string().min(8).max(160),
  excerpt: z.string().min(20).max(320),
  category: categorySchema,
  country: z.string().min(2).max(60),
  city: z.string().min(2).max(80).nullable().default(null),
  cover: imageUrl,
  coverAlt: z.string().min(8).max(240),
  coverCredit: z.string().max(300).default(""),
  body: z.string().min(80).max(100000),
  author: z.string().min(2).max(100).default(site.author),
  status: z.enum(["draft", "published"]),
  featured: z.boolean(),
  publishedOnce: z.boolean().default(false),
  tags: z.array(z.string().min(1).max(50)).max(12),
  sources: z
    .array(z.object({ title: z.string().min(3).max(160), url: z.url().refine(v => v.startsWith("https://")) }))
    .max(20),
  checklist: z.array(z.string().min(3).max(200)).max(20),
  publishedAt: z.iso.datetime(),
  updatedAt: z.iso.datetime()
});

export type Article = z.infer<typeof articleSchema>;

export function readingMinutes(body: string) {
  return Math.max(1, Math.ceil(body.split(/\s+/).length / 200));
}

export function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
