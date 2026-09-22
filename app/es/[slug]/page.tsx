import type { Metadata } from "next";
import { ArticleView, articleMetadata } from "@/components/views/article";
import { getArticles } from "@/lib/content";
import { ensureLocale } from "@/lib/routes";
import { defaultLocale, site } from "@/lib/sites";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  if (defaultLocale === "es" || !site.locales.includes("es")) return [];
  return (await getArticles("es")).map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return articleMetadata((await params).slug, "es");
}

export default async function SpanishArticlePage({ params }: Props) {
  ensureLocale("es");
  return <ArticleView slug={(await params).slug} locale="es" />;
}
