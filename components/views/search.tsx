import { ArticleCard } from "@/components/article-card";
import { getArticles } from "@/lib/content";
import { tr } from "@/lib/i18n";
import { routePath, type Locale } from "@/lib/sites";

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export async function SearchView({ query, locale }: { query: string; locale: Locale }) {
  const d = tr(locale);
  const q = query.slice(0, 100).trim();
  const words = norm(q).split(/\s+/).filter(Boolean);
  const results = words.length
    ? (await getArticles(locale))
        .map(a => {
          const title = norm(a.title);
          const rest = norm([a.excerpt, a.tags.join(" "), a.body].join(" "));
          const score = words.reduce((s, w) => s + (title.includes(w) ? 3 : 0) + (rest.includes(w) ? 1 : 0), 0);
          return { a, score };
        })
        .filter(r => r.score > 0)
        .sort((x, y) => y.score - x.score)
        .map(r => r.a)
    : [];

  return (
    <div className="wrap page">
      <h1>{d.searchTitle}</h1>
      <form action={routePath("search", locale)} className="search-big" role="search" style={{ marginBottom: 24 }}>
        <label htmlFor="q-page" className="sr-only">{d.searchLabel}</label>
        <input id="q-page" name="q" type="search" defaultValue={q} placeholder={d.searchPlaceholder} />
        <button type="submit">{d.searchAction}</button>
      </form>
      {q && <p className="muted">{d.searchResults(results.length)} {d.searchFor(q)}</p>}
      {results.length > 0 && (
        <div className="grid">{results.map(a => <ArticleCard key={a.slug} article={a} locale={locale} />)}</div>
      )}
      {q && results.length === 0 && <p className="empty">{d.searchEmpty}</p>}
    </div>
  );
}
