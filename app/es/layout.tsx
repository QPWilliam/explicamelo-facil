import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { tr } from "@/lib/i18n";
import { defaultLocale, site } from "@/lib/sites";

// Marco visual del español cuando NO es el idioma principal (nolandmarks.com/es/…).
// En Explícamelo Fácil el español ya va en la raíz, así que estas rutas no existen.
const SECONDARY = "es" as const;

export default function SpanishLayout({ children }: { children: React.ReactNode }) {
  if (defaultLocale === SECONDARY || !site.locales.includes(SECONDARY)) notFound();
  const d = tr(SECONDARY);
  return (
    <>
      <a href="#contenido" className="skip">{d.skip}</a>
      <SiteHeader locale={SECONDARY} />
      <main id="contenido">{children}</main>
      <SiteFooter locale={SECONDARY} />
    </>
  );
}
