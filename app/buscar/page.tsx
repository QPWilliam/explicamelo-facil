import type { Metadata } from "next";
import { ArticleCard } from "@/components/article-card";
import { getArticles } from "@/lib/content";

export const metadata: Metadata = { title: "Buscar", robots: { index: false, follow: true } };

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const q = ((await searchParams).q || "").slice(0, 100).trim();
  const words = norm(q).split(/\s+/).filter(Boolean);
  const results = words.length
    ? (await getArticles()).map(a => {
        const title = norm(a.title), rest = norm([a.excerpt, a.tags.join(" "), a.body].join(" "));
        const score = words.reduce((s, w) => s + (title.includes(w) ? 3 : 0) + (rest.includes(w) ? 1 : 0), 0);
        return { a, score };
      }).filter(r => r.score > 0).sort((x, y) => y.score - x.score).map(r => r.a)
    : [];
  return (
    <div className="wrap page">
      <h1>Buscar</h1>
      <form action="/buscar" className="search-big" role="search" style={{ marginBottom: 24 }}>
        <label htmlFor="q-page" className="sr-only">Buscar una guía</label>
        <input id="q-page" name="q" type="search" defaultValue={q} placeholder="¿Qué quieres entender hoy?" />
        <button type="submit">Buscar</button>
      </form>
      {q && <p className="muted">{results.length} {results.length === 1 ? "resultado" : "resultados"} para “{q}”</p>}
      {results.length > 0 && <div className="grid">{results.map(a => <ArticleCard key={a.slug} article={a} />)}</div>}
      {q && results.length === 0 && <p className="empty">No encontramos guías sobre eso todavía. Prueba con otra palabra.</p>}
    </div>
  );
}
