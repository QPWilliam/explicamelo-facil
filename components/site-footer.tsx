import Link from "next/link";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-row">
        <div>
          <p className="logo-text"><Logo size={34} /></p>
          <p className="muted">Guías claras en español para las dudas del día a día. La información es general: confirma siempre con la fuente oficial de tu país.</p>
        </div>
        <nav aria-label="Enlaces del sitio" className="footer-links">
          <Link href="/acerca">Acerca de</Link>
          <Link href="/contacto">Contacto</Link>
          <Link href="/privacidad">Privacidad y cookies</Link>
          <Link href="/buscar">Buscar</Link>
        </nav>
      </div>
      <p className="wrap muted small">© {new Date().getFullYear()} Explícamelo Fácil · explicamelofacil.com</p>
    </footer>
  );
}
