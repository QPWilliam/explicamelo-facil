import "server-only";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { articleSchema, categories, type Article } from "./schema";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://explicamelofacil.com").replace(/\/$/, "");
export const siteName = "Explícamelo Fácil";
export const hasDatabase = Boolean(process.env.DATABASE_URL);

// Los artículos viven en la base de datos (Supabase). Sin DATABASE_URL se usa un archivo local:
// content/articles.json (privado, fuera de git) o, si no existe, content/ejemplo.json (incluido en el repo).
// En desarrollo (npm run dev) también se muestran los borradores para poder revisarlos.
export function localContentFile() {
  const dir = path.join(process.cwd(), "content");
  const own = path.join(dir, "articles.json");
  return existsSync(own) ? own : path.join(dir, "ejemplo.json");
}

function fromSeed(): Article[] {
  const showDrafts = process.env.NODE_ENV === "development";
  const raw = JSON.parse(readFileSync(localContentFile(), "utf8")) as unknown[];
  return raw.map(a => articleSchema.parse(a)).filter(a => showDrafts || a.status === "published");
}

const fromDatabase = unstable_cache(async () => {
  const { listArticles } = await import("./repository");
  return listArticles();
}, ["published-articles"], { tags: ["articles"], revalidate: 3600 });

export const getArticles = cache(async (): Promise<Article[]> => (hasDatabase ? fromDatabase() : fromSeed()));

export async function getArticle(slug: string) {
  return (await getArticles()).find(a => a.slug === slug);
}

export async function getCategoriesWithCount() {
  const articles = await getArticles();
  return categories.map(c => ({ ...c, count: articles.filter(a => a.category === c.slug).length }));
}

export function relatedArticles(all: Article[], article: Article, limit = 3) {
  const score = (a: Article) => (a.category === article.category ? 2 : 0) + a.tags.filter(t => article.tags.includes(t)).length;
  return all.filter(a => a.slug !== article.slug).sort((a, b) => score(b) - score(a)).slice(0, limit);
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("es", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));
}
