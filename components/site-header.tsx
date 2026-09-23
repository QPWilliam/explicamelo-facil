import Link from "next/link";
import { Logo } from "./logo";
import { TranslatePageLink } from "./translate-page-link";
import { tr } from "@/lib/i18n";
import { categoryName, categoryPath, defaultLocale, localePrefix, routePath, site, t, type Locale } from "@/lib/sites";

const languageNames: Record<Locale, string> = { es: "Español", en: "English" };

export function SiteHeader({ locale = defaultLocale }: { locale?: Locale }) {
  const d = tr(locale);
  const others = site.locales.filter(l => l !== locale);
  const topics = site.categories.slice(0, 5).map(c => categoryName(c.slug, locale));

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="wrap topbar-row">
          <span>{t(site.tagline, locale)}</span>
          <span className="topbar-topics">{topics.join(" · ")}</span>
          {site.key === "nolandmarks" ? (
            <span className="lang-switch">
              <TranslatePageLink label={d.translatePage} />
            </span>
          ) : others.length > 0 && (
            <span className="lang-switch">
              {others.map(l => (
                <Link key={l} href={localePrefix(l) || "/"} hrefLang={l} prefetch={false}>
                  {languageNames[l]}
                </Link>
              ))}
            </span>
          )}
        </div>
      </div>
      <div className="wrap header-row">
        <Link href={localePrefix(locale) || "/"} className="logo" aria-label={d.homeAria(site.name)}>
          <Logo size={44} />
        </Link>
        <form action={routePath("search", locale)} className="header-search" role="search">
          <label htmlFor="q" className="sr-only">{d.searchLabel}</label>
          <input id="q" name="q" type="search" placeholder={d.searchPlaceholder} autoComplete="off" />
          <button type="submit">{d.searchAction}</button>
        </form>
      </div>
      <nav className="cat-nav" aria-label={d.categoriesNav}>
        <div className="wrap cat-nav-row">
          {site.categories.map(c => (
            <Link key={c.slug} href={categoryPath(c.slug, locale)}>
              {categoryName(c.slug, locale)}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
