import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { AdSlot } from "@/components/adsense";
import { getArticles, getCategoriesWithCount, siteUrl } from "@/lib/content";
import { readingMinutes } from "@/lib/schema";
import { tr } from "@/lib/i18n";
import { articlePath, categoryName, categoryPath, localePrefix, routePath, site, t, type Locale } from "@/lib/sites";

export async function HomeView({ locale }: { locale: Locale }) {
  const d = tr(locale);
  const [articles, cats] = await Promise.all([getArticles(locale), getCategoriesWithCount(locale)]);
  const [lead, ...rest] = articles;
  const home = `${siteUrl}${localePrefix(locale)}` || siteUrl;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: site.name,
      url: home,
      inLanguage: locale,
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}${routePath("search", locale)}?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: site.name,
      url: siteUrl,
      logo: `${siteUrl}/logo-512.png`,
      email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || undefined
    }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <section className="hero wrap">
        <h1>
          {t(site.hero.title, locale)} <em>{t(site.hero.highlight, locale)}</em>
        </h1>
        <p>{t(site.hero.lead, locale)}</p>
        <form action={routePath("search", locale)} className="search-big" role="search">
          <label htmlFor="q-home" className="sr-only">{d.searchLabel}</label>
          <input id="q-home" name="q" type="search" placeholder={t(site.hero.placeholder, locale)} />
          <button type="submit">{d.searchAction}</button>
        </form>
      </section>

      <section className="section wrap" aria-labelledby="recientes">
        <h2 id="recientes" className="section-title">{d.latest}</h2>
        {lead ? (
          <>
            <Link href={articlePath(lead.slug, locale)} className="lead-story">
              <div className="card-img">
                <Image src={lead.cover} alt={lead.coverAlt} fill priority sizes="(max-width: 760px) 100vw, 640px" />
              </div>
              <div>
                <span className="kicker">{categoryName(lead.category, locale)}</span>
                <h2>{lead.title}</h2>
                <p>{lead.excerpt}</p>
                <span className="muted small">{d.readingTime(readingMinutes(lead.body))}</span>
              </div>
            </Link>
            <div className="grid">
              {rest.slice(0, 9).map((a, i) => <ArticleCard key={a.slug} article={a} locale={locale} priority={i < 3} />)}
            </div>
          </>
        ) : (
          <p className="empty">{d.emptyHome}</p>
        )}
      </section>

      <div className="wrap"><AdSlot /></div>

      <section className="section wrap" aria-labelledby="temas">
        <h2 id="temas" className="section-title">{d.exploreTopics}</h2>
        <div className="cat-grid">
          {cats.map(c => (
            <Link key={c.slug} href={categoryPath(c.slug, locale)} className="cat-tile">
              <strong>{c.name}</strong>
              <span>{c.description}{c.count ? ` · ${d.guides(c.count)}` : ""}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
