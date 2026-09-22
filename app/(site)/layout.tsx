import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { tr } from "@/lib/i18n";
import { defaultLocale } from "@/lib/sites";

// Marco visual del idioma principal (el que va en la raíz del dominio).
export default function DefaultLocaleLayout({ children }: { children: React.ReactNode }) {
  const d = tr(defaultLocale);
  return (
    <>
      <a href="#contenido" className="skip">{d.skip}</a>
      <SiteHeader locale={defaultLocale} />
      <main id="contenido">{children}</main>
      <SiteFooter locale={defaultLocale} />
    </>
  );
}
