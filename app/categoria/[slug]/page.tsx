import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { getArticles } from "@/lib/content";
import { categories } from "@/lib/schema";

export const revalidate = 3600;
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = categories.find(c => c.slug === slug);
  if (!cat) return {};
  return { title: cat.name, description: `${cat.description}. Guías fáciles sobre ${cat.name.toLowerCase()}.`, alternates: { canonical: `/categoria/${cat.slug}` } };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = categories.find(c => c.slug === slug);
  if (!cat) notFound();
  const articles = (await getArticles()).filter(a => a.category === cat.slug);
  return (
    <div className="wrap page">
      <h1>{cat.name}</h1>
      <p className="lead">{cat.description}</p>
      {articles.length ? <div className="grid">{articles.map(a => <ArticleCard key={a.slug} article={a} />)}</div>
        : <p className="empty">Estamos preparando guías de este tema. Vuelve pronto.</p>}
    </div>
  );
}
