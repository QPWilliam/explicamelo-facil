import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { AdSlot } from "@/components/adsense";
import { ArticleCard } from "@/components/article-card";
import { Markdown, headings, splitSections } from "@/components/markdown";
import { formatDate, getArticle, getArticles, relatedArticles, siteName, siteUrl } from "@/lib/content";
import { categoryName, readingMinutes } from "@/lib/schema";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getArticles()).map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle((await params).slug);
  if (!article) return { title: "Guía no encontrada" };
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/${article.slug}` },
    openGraph: { type: "article", title: article.title, description: article.excerpt, url: `/${article.slug}`,
      images: [{ url: article.cover, alt: article.coverAlt }], publishedTime: article.publishedAt, modifiedTime: article.updatedAt },
    twitter: { card: "summary_large_image", title: article.title, description: article.excerpt, images: [article.cover] }
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticle((await params).slug);
  if (!article) notFound();
  const all = await getArticles();
  const related = relatedArticles(all, article);
  const sections = splitSections(article.body);
  const toc = headings(article.body);
  const abs = (u: string) => (u.startsWith("http") ? u : `${siteUrl}${u}`);
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.excerpt,
      image: [abs(article.cover)], datePublished: article.publishedAt, dateModified: article.updatedAt,
      author: { "@type": "Organization", name: article.author }, publisher: { "@type": "Organization", name: siteName, url: siteUrl },
      mainEntityOfPage: `${siteUrl}/${article.slug}`, inLanguage: "es" },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: siteUrl },
      { "@type": "ListItem", position: 2, name: categoryName(article.category), item: `${siteUrl}/categoria/${article.category}` },
      { "@type": "ListItem", position: 3, name: article.title, item: `${siteUrl}/${article.slug}` }] }
  ];

  return (
    <article className="narrow">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <nav className="crumbs" aria-label="Ruta">
        <Link href={`/categoria/${article.category}`}>{categoryName(article.category)}</Link>
      </nav>
      <header className="article-head">
        <h1>{article.title}</h1>
        <p className="lead">{article.excerpt}</p>
        <div className="meta">
          <span>Por <strong>{article.author}</strong></span>
          <span>Actualizado el {formatDate(article.updatedAt)}</span>
          <span>{readingMinutes(article.body)} min de lectura</span>
          {article.country !== "General" && <span>{article.country}</span>}
        </div>
      </header>
      <div className="cover">
        <Image src={article.cover} alt={article.coverAlt} fill priority sizes="(max-width: 780px) 100vw, 740px" />
      </div>
      {article.coverCredit && <p className="credit">{article.coverCredit}</p>}

      {toc.length > 2 && (
        <nav className="toc" aria-label="En esta guía">
          <strong>En esta guía</strong>
          <ol>{toc.map(h => <li key={h.id}><a href={`#${h.id}`}>{h.title}</a></li>)}</ol>
        </nav>
      )}

      <div className="prose">
        {sections.map((section, i) => (
          <Fragment key={i}>
            <div className="prose-section"><Markdown source={section} /></div>
            {(i === 1 || (i > 1 && i % 3 === 1 && i < sections.length - 1)) && <AdSlot />}
          </Fragment>
        ))}
      </div>

      {article.checklist.length > 0 && (
        <section className="box" aria-labelledby="checklist">
          <h2 id="checklist">Antes de terminar, revisa</h2>
          <ul className="checklist">{article.checklist.map(item => <li key={item}>{item}</li>)}</ul>
        </section>
      )}

      {article.sources.length > 0 && (
        <section className="box" aria-labelledby="fuentes">
          <h2 id="fuentes">Fuentes consultadas</h2>
          <ol className="sources">
            {article.sources.map(s => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.title}</a></li>)}
          </ol>
          <p className="muted small">Revisado por última vez el {formatDate(article.updatedAt)}. Los requisitos y precios pueden cambiar: confirma en la fuente oficial.</p>
        </section>
      )}

      {article.tags.length > 0 && (
        <div className="tags">{article.tags.map(t => <Link key={t} className="chip" href={`/buscar?q=${encodeURIComponent(t)}`}>{t}</Link>)}</div>
      )}

      <AdSlot />

      {related.length > 0 && (
        <section className="section" aria-labelledby="relacionadas">
          <h2 id="relacionadas">También te puede servir</h2>
          <div className="grid">{related.map(a => <ArticleCard key={a.slug} article={a} />)}</div>
        </section>
      )}
    </article>
  );
}
