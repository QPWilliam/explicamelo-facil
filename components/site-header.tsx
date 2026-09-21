import Link from "next/link";
import { categories } from "@/lib/schema";
import { Logo } from "./logo";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="topbar">
        <div className="wrap topbar-row">
          <span>Guías claras para el día a día</span>
          <span className="topbar-topics">Dinero · Tecnología · IA · Trámites · Viajes</span>
        </div>
      </div>
      <div className="wrap header-row">
        <Link href="/" className="logo" aria-label="Explícamelo Fácil, inicio"><Logo size={44} /></Link>
        <form action="/buscar" className="header-search" role="search">
          <label htmlFor="q" className="sr-only">Buscar una guía</label>
          <input id="q" name="q" type="search" placeholder="¿Qué quieres entender hoy?" autoComplete="off" />
          <button type="submit">Buscar</button>
        </form>
      </div>
      <nav className="cat-nav" aria-label="Categorías">
        <div className="wrap cat-nav-row">
          {categories.map(c => <Link key={c.slug} href={`/categoria/${c.slug}`}>{c.name}</Link>)}
        </div>
      </nav>
    </header>
  );
}
