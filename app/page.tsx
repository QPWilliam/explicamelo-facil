import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { AdSlot } from "@/components/adsense";
import { getArticles, getCategoriesWithCount, siteName, siteUrl } from "@/lib/content";
import { categoryName, readingMinutes } from "@/lib/schema";

export const revalidate = 3600;

export default async function Home() {
  const [articles, cats] = await Promise.all([getArticles(), getCategoriesWithCount()]);
  const latest = [...articles].sort((a, b) => Number(b.featured) - Number(a.featured) || b.publishedAt.localeCompare(a.publishedAt));
  const [lead, ...rest] = latest;
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "WebSite", name: siteName, url: siteUrl, inLanguage: "es",
      potentialAction: { "@type": "SearchAction", target: `${siteUrl}/buscar?q={search_term_string}`, "query-input": "required name=search_term_string" } },
    { "@context": "https://schema.org", "@type": "Organization", name: siteName, url: siteUrl, logo: `${siteUrl}/logo-512.png`,
      email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || undefined }
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <section className="hero wrap">
        <h1>Lo complicado, <em>explicado fácil</em>.</h1>
        <p>Guías paso a paso en español para manejar tu dinero, cuidar tu celular, hacer trámites, viajar y resolver las dudas del día a día.</p>
        <form action="/buscar" className="search-big" role="search">
          <label htmlFor="q-home" className="sr-only">Buscar una guía</label>
          <input id="q-home" name="q" type="search" placeholder="Ej.: tarjeta de crédito, batería, pasaporte…" />
          <button type="submit">Buscar</button>
        </form>
      </section>

      <section className="section wrap" aria-labelledby="recientes">
        <h2 id="recientes" className="section-title">Lo último</h2>
        {lead ? (
          <>
            <Link href={`/${lead.slug}`} className="lead-story">
              <div className="card-img"><Image src={lead.cover} alt={lead.coverAlt} fill priority sizes="(max-width: 760px) 100vw, 640px" /></div>
              <div>
                <span className="kicker">{categoryName(lead.category)}</span>
                <h2>{lead.title}</h2>
                <p>{lead.excerpt}</p>
                <span className="muted small">{readingMinutes(lead.body)} min de lectura</span>
              </div>
            </Link>
            <div className="grid">{rest.slice(0, 9).map((a, i) => <ArticleCard key={a.slug} article={a} priority={i < 3} />)}</div>
          </>
        ) : <p className="empty">Pronto publicaremos las primeras guías.</p>}
      </section>

      <div className="wrap"><AdSlot /></div>

      <section className="section wrap" aria-labelledby="temas">
        <h2 id="temas" className="section-title">Explora por tema</h2>
        <div className="cat-grid">
          {cats.map(c => (
            <Link key={c.slug} href={`/categoria/${c.slug}`} className="cat-tile">
              <strong>{c.name}</strong>
              <span>{c.description}{c.count ? ` · ${c.count} ${c.count === 1 ? "guía" : "guías"}` : ""}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
