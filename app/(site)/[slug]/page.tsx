import type { Metadata } from "next";
import { ArticleView, articleMetadata } from "@/components/views/article";
import { getArticles } from "@/lib/content";
import { defaultLocale } from "@/lib/sites";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getArticles(defaultLocale)).map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return articleMetadata((await params).slug, defaultLocale);
}

export default async function ArticlePage({ params }: Props) {
  return <ArticleView slug={(await params).slug} locale={defaultLocale} />;
}
