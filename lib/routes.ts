import { notFound } from "next/navigation";
import { site, t, type Locale } from "./sites";

/**
 * Cada carpeta de rutas sirve a una web y un idioma concretos: el repositorio contiene
 * las carpetas de todas las webs, así que las que no corresponden deben devolver 404.
 * `segment` es el nombre de la carpeta en la que está la página (p. ej. "categoria" o "category").
 */
export function ensureRoute(name: keyof typeof site.routes, locale: Locale, segment: string) {
  if (!(site.locales as readonly Locale[]).includes(locale)) notFound();
  if (t(site.routes[name], locale) !== segment) notFound();
}

export function ensureLocale(locale: Locale) {
  if (!(site.locales as readonly Locale[]).includes(locale)) notFound();
}
