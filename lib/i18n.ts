import { site, defaultLocale, t, type Locale } from "./sites";

// Textos de interfaz (botones, etiquetas, encabezados fijos). El contenido de marca
// —eslogan, portada, nota del pie— vive en lib/sites.ts porque cambia de una web a otra.
export type Dictionary = {
  skip: string;
  home: string;
  homeAria: (name: string) => string;
  searchLabel: string;
  searchPlaceholder: string;
  searchAction: string;
  searchTitle: string;
  searchResults: (n: number) => string;
  searchFor: (q: string) => string;
  searchEmpty: string;
  latest: string;
  exploreTopics: string;
  guides: (n: number) => string;
  readingTime: (n: number) => string;
  emptyHome: string;
  emptyCategory: string;
  breadcrumb: string;
  categoriesNav: string;
  siteLinks: string;
  inThisGuide: string;
  byline: string;
  updatedOn: (date: string) => string;
  checklistTitle: string;
  sourcesTitle: string;
  sourcesNote: (date: string) => string;
  relatedTitle: string;
  notFoundTitle: string;
  notFoundBody: string;
  backHome: string;
  goSearch: string;
  about: string;
  contact: string;
  privacy: string;
  notFoundArticle: string;
};

const dictionaries: Record<Locale, Dictionary> = {
  es: {
    skip: "Saltar al contenido",
    home: "Inicio",
    homeAria: (name: string) => `${name}, inicio`,
    searchLabel: "Buscar una guía",
    searchPlaceholder: "¿Qué quieres entender hoy?",
    searchAction: "Buscar",
    searchTitle: "Buscar",
    searchResults: (n: number) => `${n} ${n === 1 ? "resultado" : "resultados"}`,
    searchFor: (q: string) => `para “${q}”`,
    searchEmpty: "No encontramos guías sobre eso todavía. Prueba con otra palabra.",
    latest: "Lo último",
    exploreTopics: "Explora por tema",
    guides: (n: number) => `${n} ${n === 1 ? "guía" : "guías"}`,
    readingTime: (n: number) => `${n} min de lectura`,
    emptyHome: "Pronto publicaremos las primeras guías.",
    emptyCategory: "Estamos preparando guías de este tema. Vuelve pronto.",
    breadcrumb: "Ruta",
    categoriesNav: "Categorías",
    siteLinks: "Enlaces del sitio",
    inThisGuide: "En esta guía",
    byline: "Por",
    updatedOn: (date: string) => `Actualizado el ${date}`,
    checklistTitle: "Antes de terminar, revisa",
    sourcesTitle: "Fuentes consultadas",
    sourcesNote: (date: string) =>
      `Revisado por última vez el ${date}. Los requisitos y precios pueden cambiar: confirma en la fuente oficial.`,
    relatedTitle: "También te puede servir",
    notFoundTitle: "No encontramos esta página",
    notFoundBody: "Puede que la guía haya cambiado de dirección o que el enlace tenga un error.",
    backHome: "Volver al inicio",
    goSearch: "Buscar una guía",
    about: "Acerca de",
    contact: "Contacto",
    privacy: "Privacidad y cookies",
    notFoundArticle: "Guía no encontrada"
  },
  en: {
    skip: "Skip to content",
    home: "Home",
    homeAria: (name: string) => `${name}, home`,
    searchLabel: "Search the guides",
    searchPlaceholder: "What do you need to figure out?",
    searchAction: "Search",
    searchTitle: "Search",
    searchResults: (n: number) => `${n} ${n === 1 ? "result" : "results"}`,
    searchFor: (q: string) => `for “${q}”`,
    searchEmpty: "Nothing on that yet. Try another word.",
    latest: "Latest",
    exploreTopics: "Browse by topic",
    guides: (n: number) => `${n} ${n === 1 ? "guide" : "guides"}`,
    readingTime: (n: number) => `${n} min read`,
    emptyHome: "The first guides are on their way.",
    emptyCategory: "We're still working on this section. Check back soon.",
    breadcrumb: "Breadcrumb",
    categoriesNav: "Sections",
    siteLinks: "Site links",
    inThisGuide: "In this guide",
    byline: "By",
    updatedOn: (date: string) => `Updated ${date}`,
    checklistTitle: "Before you go",
    sourcesTitle: "Sources",
    sourcesNote: (date: string) =>
      `Last checked on ${date}. Prices and opening times change — confirm before you travel.`,
    relatedTitle: "You might also like",
    notFoundTitle: "We couldn't find this page",
    notFoundBody: "The guide may have moved, or the link might have a typo.",
    backHome: "Back to the homepage",
    goSearch: "Search the guides",
    about: "About",
    contact: "Contact",
    privacy: "Privacy & cookies",
    notFoundArticle: "Guide not found"
  }
};


export function tr(locale: Locale = defaultLocale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

/** Eslogan y descripción de la web activa, en el idioma pedido. */
export function brand(locale: Locale = defaultLocale) {
  return {
    name: site.name,
    tagline: t(site.tagline, locale),
    description: t(site.description, locale)
  };
}
