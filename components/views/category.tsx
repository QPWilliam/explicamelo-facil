import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { getArticles } from "@/lib/content";
import { tr } from "@/lib/i18n";
import { categoryByPath, categoryPath, htmlLang, site, t, type Locale } from "@/lib/sites";

export async function categoryMetadata(segment: string, locale: Locale): Promise<Metadata> {
  const cat = categoryByPath(segment, locale);
  if (!cat) return {};
  const name = t(cat.name, locale);
  const intro = t(cat.intro, locale);
  const path = categoryPath(cat.slug, locale);
  const languages = Object.fromEntries(
    site.locales.map(l => [htmlLang[l], categoryPath(cat.slug, l)])
  );
  return {
    title: name,
    description: intro,
    alternates: { canonical: path, ...(site.locales.length > 1 ? { languages } : {}) },
    openGraph: {
      title: `${name} | ${site.name}`,
      description: intro,
      url: path,
      images: [{ url: "/portada/inicio", width: 1600, height: 900 }]
    }
  };
}

export async function CategoryView({ segment, locale }: { segment: string; locale: Locale }) {
  const d = tr(locale);
  const cat = categoryByPath(segment, locale);
  if (!cat) notFound();
  const articles = (await getArticles(locale)).filter(a => a.category === cat.slug);
  return (
    <div className="wrap page">
      <h1>{t(cat.name, locale)}</h1>
      <p className="lead">{t(cat.intro, locale)}</p>
      {articles.length ? (
        <div className="grid">{articles.map(a => <ArticleCard key={a.slug} article={a} locale={locale} />)}</div>
      ) : (
        <p className="empty">{d.emptyCategory}</p>
      )}
    </div>
  );
}
