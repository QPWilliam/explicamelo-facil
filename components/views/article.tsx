import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { AdSlot } from "@/components/adsense";
import { ArticleCard } from "@/components/article-card";
import { LogoMark } from "@/components/logo";
import { Markdown, headings, splitSections } from "@/components/markdown";
import { formatDate, getArticle, getArticles, relatedArticles, siteUrl, translationsOf } from "@/lib/content";
import { readingMinutes } from "@/lib/schema";
import { tr } from "@/lib/i18n";
import { articlePath, categoryName, categoryPath, htmlLang, localePrefix, routePath, site, t, type Locale } from "@/lib/sites";

/** Enlaces hreflang: le dicen a Google que dos direcciones son la misma guía en otro idioma. */
async function languageAlternates(slug: string, locale: Locale) {
  const article = await getArticle(slug, locale);
  if (!article) return undefined;
  const others = await translationsOf(article);
  if (!others.length) return undefined;
  const languages: Record<string, string> = { [htmlLang[locale]]: articlePath(slug, locale) };
  for (const other of others) languages[htmlLang[other.locale]] = articlePath(other.slug, other.locale);
  return languages;
}

export async function articleMetadata(slug: string, locale: Locale): Promise<Metadata> {
  const article = await getArticle(slug, locale);
  const d = tr(locale);
  if (!article) return { title: d.notFoundArticle };
  const path = articlePath(slug, locale);
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: path, languages: await languageAlternates(slug, locale) },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: path,
      images: [{ url: article.cover, alt: article.coverAlt }],
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt
    },
    twitter: { card: "summary_large_image", title: article.title, description: article.excerpt, images: [article.cover] }
  };
}

export async function ArticleView({ slug, locale }: { slug: string; locale: Locale }) {
  const d = tr(locale);
  const article = await getArticle(slug, locale);
  if (!article) notFound();

  const all = await getArticles(locale);
  const related = relatedArticles(all, article);
  const sections = splitSections(article.body);
  const toc = headings(article.body);
  const abs = (u: string) => (u.startsWith("http") ? u : `${siteUrl}${u}`);
  const home = `${siteUrl}${localePrefix(locale)}` || siteUrl;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.excerpt,
      image: [abs(article.cover)],
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      author: { "@type": "Organization", name: article.author },
      publisher: {
        "@type": "Organization",
        name: site.name,
        url: siteUrl,
        logo: { "@type": "ImageObject", url: `${siteUrl}/logo-512.png` }
      },
      mainEntityOfPage: `${siteUrl}${articlePath(article.slug, locale)}`,
      inLanguage: locale
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: d.home, item: home },
        { "@type": "ListItem", position: 2, name: categoryName(article.category, locale), item: `${siteUrl}${categoryPath(article.category, locale)}` },
        { "@type": "ListItem", position: 3, name: article.title, item: `${siteUrl}${articlePath(article.slug, locale)}` }
      ]
    }
  ];

  return (
    <article className="narrow">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <nav className="crumbs" aria-label={d.breadcrumb}>
        <Link href={categoryPath(article.category, locale)}>{categoryName(article.category, locale)}</Link>
      </nav>
      <header className="article-head">
        <h1>{article.title}</h1>
        <p className="lead">{article.excerpt}</p>
        <div className="meta">
          <span>{d.byline} <strong>{article.author}</strong></span>
          <span>{d.updatedOn(formatDate(article.updatedAt, locale))}</span>
          <span>{d.readingTime(readingMinutes(article.body))}</span>
          {article.city && <span>{article.city}</span>}
          {!article.city && article.country !== "General" && <span>{article.country}</span>}
        </div>
      </header>
      <div className="cover">
        <Image src={article.cover} alt={article.coverAlt} fill priority sizes="(max-width: 780px) 100vw, 740px" />
      </div>
      {article.coverCredit && <p className="credit">{article.coverCredit}</p>}

      {toc.length > 2 && (
        <nav className="toc" aria-label={d.inThisGuide}>
          <strong>{d.inThisGuide}</strong>
          <ol>{toc.map(h => <li key={h.id}><a href={`#${h.id}`}>{h.title}</a></li>)}</ol>
        </nav>
      )}

      <p className="slogan"><LogoMark size={26} /> {t(site.slogan, locale)}</p>

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
          <h2 id="checklist">{d.checklistTitle}</h2>
          <ul className="checklist">{article.checklist.map(item => <li key={item}>{item}</li>)}</ul>
        </section>
      )}

      {article.sources.length > 0 && (
        <section className="box" aria-labelledby="fuentes">
          <h2 id="fuentes">{d.sourcesTitle}</h2>
          <ol className="sources">
            {article.sources.map(s => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.title}</a></li>)}
          </ol>
          <p className="muted small">{d.sourcesNote(formatDate(article.updatedAt, locale))}</p>
        </section>
      )}

      {article.tags.length > 0 && (
        <div className="tags">
          {article.tags.map(tag => (
            <Link key={tag} className="chip" href={`${routePath("search", locale)}?q=${encodeURIComponent(tag)}`}>{tag}</Link>
          ))}
        </div>
      )}

      <AdSlot />

      {related.length > 0 && (
        <section className="section" aria-labelledby="relacionadas">
          <h2 id="relacionadas">{d.relatedTitle}</h2>
          <div className="grid">{related.map(a => <ArticleCard key={a.slug} article={a} locale={locale} />)}</div>
        </section>
      )}
    </article>
  );
}
