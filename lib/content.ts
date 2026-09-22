import "server-only";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { articleSchema, type Article } from "./schema";
import { site, defaultLocale, t, type Locale } from "./sites";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || `https://${site.domain}`).replace(/\/$/, "");
export const siteName = site.name;
// USE_LOCAL_CONTENT=1 obliga a leer del archivo local aunque haya base de datos.
// Sirve para ver una web nueva (o probar un diseño) sin escribir nada en Supabase.
export const hasDatabase = Boolean(process.env.DATABASE_URL) && process.env.USE_LOCAL_CONTENT !== "1";

// Las guías viven en la base de datos (Supabase). Sin DATABASE_URL se usa un archivo local:
// content/articles.json (privado, fuera de git) o, si no existe, content/ejemplo.json (incluido en el repo).
// En desarrollo (npm run dev) también se muestran los borradores para poder revisarlos.
// Orden de preferencia del contenido local: respaldo propio → ejemplo de esta web → ejemplo genérico.
// Se usa el PRIMER archivo que contenga guías de la web activa.
const localFiles = ["articles.json", `ejemplo-${site.key}.json`, "ejemplo.json"];

export function localContentFile() {
  const dir = path.join(process.cwd(), "content");
  for (const name of localFiles) {
    const file = path.join(dir, name);
    if (existsSync(file) && readLocal(file).length) return file;
  }
  return path.join(dir, "ejemplo.json");
}

/**
 * Lee un archivo de contenido local y devuelve sólo las guías de la web activa.
 * Un mismo archivo puede traer guías de otra web (o de una versión anterior del esquema):
 * se descartan en silencio en lugar de tumbar el sitio.
 */
function readLocal(file: string): Article[] {
  if (!existsSync(file)) return [];
  let raw: unknown[];
  try {
    raw = JSON.parse(readFileSync(file, "utf8")) as unknown[];
  } catch {
    return [];
  }
  if (!Array.isArray(raw)) return [];
  return raw.flatMap(item => {
    const parsed = articleSchema.safeParse(item);
    return parsed.success && parsed.data.site === site.key ? [parsed.data] : [];
  });
}

function fromSeed(locale: Locale): Article[] {
  const showDrafts = process.env.NODE_ENV === "development";
  const dir = path.join(process.cwd(), "content");
  for (const name of localFiles) {
    const found = readLocal(path.join(dir, name));
    if (!found.length) continue;
    return found
      .filter(a => a.locale === locale)
      .filter(a => showDrafts || a.status === "published")
      .sort((a, b) => Number(b.featured) - Number(a.featured) || b.publishedAt.localeCompare(a.publishedAt));
  }
  return [];
}

// Una caché por idioma; se vacía entera con revalidateTag("articles") al publicar.
const fromDatabase = Object.fromEntries(
  site.locales.map(locale => [
    locale,
    unstable_cache(
      async () => {
        const { listArticles } = await import("./repository");
        return listArticles({ locale });
      },
      ["published-articles", site.key, locale],
      { tags: ["articles"], revalidate: 3600 }
    )
  ])
) as Record<Locale, () => Promise<Article[]>>;

export const getArticles = cache(
  async (locale: Locale = defaultLocale): Promise<Article[]> =>
    hasDatabase ? fromDatabase[locale]() : fromSeed(locale)
);

export async function getArticle(slug: string, locale: Locale = defaultLocale) {
  return (await getArticles(locale)).find(a => a.slug === slug);
}

export async function getCategoriesWithCount(locale: Locale = defaultLocale) {
  const articles = await getArticles(locale);
  return site.categories.map(c => ({
    slug: c.slug,
    icon: c.icon,
    name: t(c.name, locale),
    description: t(c.description, locale),
    intro: t(c.intro, locale),
    count: articles.filter(a => a.category === c.slug).length
  }));
}

export function relatedArticles(all: Article[], article: Article, limit = 3) {
  const score = (a: Article) =>
    (a.category === article.category ? 2 : 0) + a.tags.filter(tag => article.tags.includes(tag)).length;
  return all
    .filter(a => a.slug !== article.slug)
    .sort((a, b) => score(b) - score(a))
    .slice(0, limit);
}

/**
 * Versiones de la misma guía en los demás idiomas de la web, para las etiquetas hreflang.
 * Dos guías son la misma cuando comparten translationKey.
 */
export async function translationsOf(article: Article) {
  if (!article.translationKey) return [] as { locale: Locale; slug: string }[];
  const others = site.locales.filter(l => l !== article.locale);
  const found = await Promise.all(
    others.map(async locale => {
      const match = (await getArticles(locale)).find(a => a.translationKey === article.translationKey);
      return match ? { locale, slug: match.slug } : null;
    })
  );
  return found.filter((x): x is { locale: Locale; slug: string } => x !== null);
}

export function formatDate(iso: string, locale: Locale = defaultLocale) {
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "es", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(iso));
}
