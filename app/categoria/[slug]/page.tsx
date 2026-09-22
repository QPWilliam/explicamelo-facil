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
  return { title: `${cat.name}: guías fáciles`, description: cat.intro, alternates: { canonical: `/categoria/${cat.slug}` }, openGraph: { title: `${cat.name} | Explícamelo Fácil`, description: cat.intro, url: `/categoria/${cat.slug}`, images: [{ url: "/og-default.png", width: 1200, height: 630 }] } };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = categories.find(c => c.slug === slug);
  if (!cat) notFound();
  const articles = (await getArticles()).filter(a => a.category === cat.slug);
  return (
    <div className="wrap page">
      <h1>{cat.name}</h1>
      <p className="lead">{cat.intro}</p>
      {articles.length ? <div className="grid">{articles.map(a => <ArticleCard key={a.slug} article={a} />)}</div>
        : <p className="empty">Estamos preparando guías de este tema. Vuelve pronto.</p>}
    </div>
  );
}
