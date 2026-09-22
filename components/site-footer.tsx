import Link from "next/link";
import { Logo } from "./logo";
import { tr } from "@/lib/i18n";
import { defaultLocale, routePath, site, t, type Locale } from "@/lib/sites";

export function SiteFooter({ locale = defaultLocale }: { locale?: Locale }) {
  const d = tr(locale);
  return (
    <footer className="site-footer">
      <div className="wrap footer-row">
        <div>
          <p className="logo-text"><Logo size={34} /></p>
          <p className="muted">{t(site.footerNote, locale)}</p>
        </div>
        <nav aria-label={d.siteLinks} className="footer-links">
          <Link href={routePath("about", locale)}>{d.about}</Link>
          <Link href={routePath("contact", locale)}>{d.contact}</Link>
          <Link href={routePath("privacy", locale)}>{d.privacy}</Link>
          <Link href={routePath("search", locale)}>{d.searchAction}</Link>
        </nav>
      </div>
      <p className="wrap muted small">© {new Date().getFullYear()} {site.name} · {site.domain}</p>
    </footer>
  );
}
