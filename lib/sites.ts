// Registro de sitios. Un solo repositorio sirve a varias webs: la variable de entorno
// NEXT_PUBLIC_SITE_KEY decide cuál se construye y despliega en cada sitio de Netlify.
// Aquí vive TODO lo que cambia entre webs (marca, idiomas, tema visual, secciones).
// El código de las páginas nunca debe traer textos ni colores de marca escritos a mano.

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

export const siteKeys = ["explicamelofacil", "nolandmarks", "groundleveljapan"] as const;
export type SiteKey = (typeof siteKeys)[number];

/** Texto que existe en cada idioma que el sitio publica. */
export type Translated = Partial<Record<Locale, string>>;

export type CategoryDef = {
  /** Identificador estable. Es lo que se guarda en la base de datos; no se traduce ni se cambia. */
  slug: string;
  icon: string;
  name: Translated;
  description: Translated;
  intro: Translated;
  /** Segmento de URL por idioma. Si falta, se usa `slug`. */
  path?: Translated;
};

export type SiteConfig = {
  key: SiteKey;
  /** Dominio sin protocolo; solo se usa como respaldo si falta NEXT_PUBLIC_SITE_URL. */
  domain: string;
  name: string;
  /** Idiomas que publica, en orden. El primero va en la raíz del dominio; el resto bajo /<idioma>/. */
  locales: readonly Locale[];
  /** Hoja de estilos y componentes de marca. Ver app/globals.css. */
  theme: "editorial" | "visual" | "field";
  /** Color de la barra del navegador en móvil. */
  themeColor: string;
  tagline: Translated;
  description: Translated;
  /** Portada: el titular se parte en dos para poder resaltar la segunda mitad. */
  hero: { title: Translated; highlight: Translated; lead: Translated; placeholder: Translated };
  /** Frase de la casa, al principio de cada guía. */
  slogan: Translated;
  /** Nota breve del pie de página. */
  footerNote: Translated;
  /** Nombre por defecto de quien firma las guías. */
  author: string;
  /** Segmentos de URL de las páginas fijas, por idioma. */
  routes: {
    category: Translated;
    search: Translated;
    about: Translated;
    privacy: Translated;
    contact: Translated;
  };
  categories: readonly CategoryDef[];
};

const explicameloFacil: SiteConfig = {
  key: "explicamelofacil",
  domain: "explicamelofacil.com",
  name: "Explícamelo Fácil",
  locales: ["es"],
  theme: "editorial",
  themeColor: "#1f6f5c",
  tagline: { es: "Guías claras para el día a día" },
  description: {
    es: "Explicaciones fáciles en español sobre dinero, tecnología, belleza, moda, trámites, viajes y dudas cotidianas."
  },
  hero: {
    title: { es: "Lo complicado," },
    highlight: { es: "explicado fácil." },
    lead: { es: "Guías paso a paso en español para manejar tu dinero, cuidar tu celular, hacer trámites y resolver las dudas del día a día." },
    placeholder: { es: "Ej.: tarjeta de crédito, rizos, tallas de ropa…" }
  },
  slogan: { es: "Aquí te lo explico muy fácil." },
  footerNote: {
    es: "Guías claras en español para las dudas del día a día. La información es general: confirma siempre con la fuente oficial de tu país."
  },
  author: "Redacción de Explícamelo Fácil",
  routes: {
    category: { es: "categoria" },
    search: { es: "buscar" },
    about: { es: "acerca" },
    privacy: { es: "privacidad" },
    contact: { es: "contacto" }
  },
  categories: [
    { slug: "dinero", icon: "wallet", name: { es: "Dinero y bancos" }, description: { es: "Tu dinero, sin letra pequeña" }, intro: { es: "Guías claras para usar tu tarjeta de crédito, hacer un presupuesto, ahorrar y reconocer estafas bancarias, sin términos complicados." } },
    { slug: "tecnologia", icon: "smartphone", name: { es: "Celular y tecnología" }, description: { es: "Tu celular, más fácil y seguro" }, intro: { es: "Cómo cuidar tu celular, proteger tus cuentas, liberar espacio y resolver los problemas más comunes, paso a paso." } },
    { slug: "ia", icon: "bot", name: { es: "Inteligencia artificial" }, description: { es: "La IA, sin palabras raras" }, intro: { es: "Qué es la inteligencia artificial, cómo usar ChatGPT, Claude o Gemini, y qué significan palabras como prompt, agente o MCP." } },
    { slug: "resenas", icon: "star", name: { es: "Reseñas y comparativas" }, description: { es: "Qué comprar sin arrepentirte" }, intro: { es: "Comparativas honestas y consejos para elegir celular, cargador, audífonos o plan de telefonía sin gastar de más." } },
    { slug: "trabajo", icon: "briefcase", name: { es: "Trabajo y empleo" }, description: { es: "Del CV a tu primer día" }, intro: { es: "Currículum, entrevistas, correos formales y cómo detectar ofertas falsas: todo para conseguir y cuidar tu empleo." } },
    { slug: "tramites", icon: "file", name: { es: "Trámites" }, description: { es: "El papeleo, paso a paso" }, intro: { es: "Explicaciones sencillas para hacer trámites y apostillar documentos, con enlaces a las fuentes oficiales." } },
    { slug: "visas", icon: "plane", name: { es: "Visas y viajes" }, description: { es: "Tu próximo destino empieza aquí" }, intro: { es: "Visas, pasaportes, equipaje, vuelos baratos y seguro de viaje: lo que necesitas saber antes de salir de tu país." } },
    { slug: "estudiar", icon: "graduation", name: { es: "Estudiar fuera" }, description: { es: "Aprende más allá de tus fronteras" }, intro: { es: "Becas, idiomas y primeros pasos para estudiar en el extranjero, con fuentes oficiales de cada programa." } },
    { slug: "hogar", icon: "home", name: { es: "Casa y hogar" }, description: { es: "Trucos que sí funcionan en casa" }, intro: { es: "Trucos probados para ahorrar luz, quitar manchas, destapar el fregadero y mantener la casa en orden." } },
    { slug: "vida-practica", icon: "sparkles", name: { es: "Vida práctica" }, description: { es: "Pequeñas dudas, respuestas claras" }, intro: { es: "Cálculos y dudas del día a día explicados fácil: descuentos, propinas, regla de tres y medidas de cocina." } },
    { slug: "belleza", icon: "heart", name: { es: "Belleza y cuidado personal" }, description: { es: "Cabello, uñas y maquillaje en casa" }, intro: { es: "Guías sencillas para arreglarte en casa: peinados, manicura, maquillaje y cuidados básicos, sin promesas de salud ni trucos peligrosos." } },
    { slug: "moda", icon: "shirt", name: { es: "Moda y estilo" }, description: { es: "Vestirte bien sin complicarte" }, intro: { es: "Tallas, códigos de vestimenta, combinaciones y cuidado de prendas para comprar mejor y aprovechar lo que ya tienes." } }
  ]
};

const noLandmarks: SiteConfig = {
  key: "nolandmarks",
  domain: "nolandmarks.com",
  name: "No Landmarks",
  // Todo el contenido editorial se publica una sola vez, en inglés. La cabecera ofrece
  // traducción bajo demanda de la página completa sin duplicar guías en la base de datos.
  locales: ["en"],
  theme: "visual",
  themeColor: "#0e1116",
  tagline: {
    en: "Skip the postcard. See the city.",
    es: "Sáltate la postal. Conoce la ciudad."
  },
  description: {
    en: "Honest London guides written with people who actually live there: what to do, where to eat, how to get around and what it really costs.",
    es: "Guías honestas de Londres hechas con gente que vive allí: qué hacer, dónde comer, cómo moverte y cuánto cuesta de verdad."
  },
  hero: {
    title: { en: "The London that", es: "El Londres que" },
    highlight: { en: "doesn't photograph well.", es: "no sale en las postales." },
    lead: {
      en: "Guides made with people who actually live here: where to eat, how to get around, what things really cost and which famous stop you can skip without regret.",
      es: "Guías hechas con gente que vive allí: dónde comer, cómo moverte, cuánto cuesta de verdad y qué parada famosa te puedes saltar sin remordimiento."
    },
    placeholder: { en: "e.g. Oyster card, Camden, cheap eats…", es: "Ej.: tarjeta Oyster, Camden, comer barato…" }
  },
  slogan: {
    en: "No sponsored listings. Prices checked the day we published.",
    es: "Sin listas pagadas. Precios comprobados el día que lo publicamos."
  },
  footerNote: {
    en: "Independent guides to London. Prices, opening times and routes change — always check before you go.",
    es: "Guías independientes de Londres. Precios, horarios y rutas cambian: confirma siempre antes de ir."
  },
  author: "No Landmarks",
  routes: {
    category: { en: "category", es: "categoria" },
    search: { en: "search", es: "buscar" },
    about: { en: "about", es: "acerca" },
    privacy: { en: "privacy", es: "privacidad" },
    contact: { en: "contact", es: "contacto" }
  },
  categories: [
    {
      slug: "things-to-do", icon: "compass",
      path: { es: "que-hacer" },
      name: { en: "Things to Do", es: "Qué hacer" },
      description: { en: "Beyond the postcard shots", es: "Más allá de la foto de postal" },
      intro: {
        en: "Days out, markets, viewpoints and the small things locals actually do on a free afternoon — with what each one costs and when to go.",
        es: "Planes, mercados, miradores y las cosas pequeñas que hace la gente de allí en una tarde libre, con precios y la mejor hora para ir."
      }
    },
    {
      slug: "food-drink", icon: "utensils",
      path: { es: "comer-y-beber" },
      name: { en: "Food & Drink", es: "Comer y beber" },
      description: { en: "Where people eat when nobody's watching", es: "Dónde come la gente cuando nadie mira" },
      intro: {
        en: "Independent places, market stalls and neighbourhood pubs, with honest prices and how to find them. No sponsored lists.",
        es: "Sitios independientes, puestos de mercado y pubs de barrio, con precios honestos y cómo llegar. Sin listas pagadas."
      }
    },
    {
      slug: "getting-around", icon: "train",
      path: { es: "como-moverse" },
      name: { en: "Getting Around", es: "Cómo moverse" },
      description: { en: "Tube, buses and airports without the panic", es: "Metro, buses y aeropuertos sin agobios" },
      intro: {
        en: "Oyster vs contactless, travelcards, night buses, and the cheapest way in from every airport — explained step by step.",
        es: "Oyster o contactless, abonos de transporte, buses nocturnos y la forma más barata de llegar desde cada aeropuerto, paso a paso."
      }
    },
    {
      slug: "tickets-passes", icon: "ticket",
      path: { es: "entradas-y-pases" },
      name: { en: "Tickets & Passes", es: "Entradas y pases" },
      description: { en: "What to book ahead and what to skip", es: "Qué reservar antes y qué saltarte" },
      intro: {
        en: "Theatre seats, attraction tickets, rail passes and city cards: current prices, where to buy them and whether they're worth it.",
        es: "Entradas de teatro y atracciones, pases de tren y tarjetas turísticas: precios actuales, dónde comprarlos y si valen la pena."
      }
    },
    {
      slug: "neighbourhoods", icon: "map-pin",
      path: { es: "barrios" },
      name: { en: "Neighbourhoods", es: "Barrios" },
      description: { en: "One area at a time, properly", es: "Un barrio a la vez, bien hecho" },
      intro: {
        en: "Camden, Shoreditch, Peckham and the rest: what each area is actually like, what to see there and where to stay or avoid.",
        es: "Camden, Shoreditch, Peckham y los demás: cómo es cada zona de verdad, qué ver y dónde alojarse o qué evitar."
      }
    },
    {
      slug: "money-costs", icon: "banknote",
      path: { es: "dinero-y-precios" },
      name: { en: "Money & Costs", es: "Dinero y precios" },
      description: { en: "What a day here really costs", es: "Cuánto cuesta de verdad un día aquí" },
      intro: {
        en: "Changing money without losing on the rate, using your card abroad, tipping rules and realistic daily budgets.",
        es: "Cambiar dinero sin perder en la tasa, usar tu tarjeta en el extranjero, cuánto se propina y presupuestos diarios realistas."
      }
    },
    {
      slug: "trip-basics", icon: "backpack",
      path: { es: "antes-de-ir" },
      name: { en: "Trip Basics", es: "Antes de ir" },
      description: { en: "Sort this out before you land", es: "Resuélvelo antes de aterrizar" },
      intro: {
        en: "SIM cards and eSIMs, plug adapters, weather and what to pack, luggage storage, safety and the paperwork at the border.",
        es: "Tarjetas SIM y eSIM, adaptadores de enchufe, clima y qué llevar, dónde dejar las maletas, seguridad y papeleo en la frontera."
      }
    }
  ]
};

const groundLevelJapan: SiteConfig = {
  key: "groundleveljapan",
  domain: "groundleveljapan.com",
  name: "Ground Level Japan",
  locales: ["en", "es"],
  theme: "field",
  themeColor: "#24324a",
  tagline: {
    en: "Everyday Japan, properly explained.",
    es: "El Japón cotidiano, bien explicado."
  },
  description: {
    en: "Practical bilingual guides for visiting, moving to and understanding everyday life in Japan.",
    es: "Guías prácticas bilingües para visitar Japón, mudarte y entender la vida cotidiana del país."
  },
  hero: {
    title: { en: "Japan from", es: "Japón" },
    highlight: { en: "ground level.", es: "a pie de calle." },
    lead: {
      en: "Clear guides for visiting, moving to and understanding everyday life in Japan — researched now, then lived and filmed from Japan as the project grows.",
      es: "Guías claras para visitar Japón, mudarte y entender la vida cotidiana: investigadas desde ahora y, conforme crezca el proyecto, vividas y grabadas desde Japón."
    },
    placeholder: {
      en: "e.g. IC cards, renting, rubbish rules…",
      es: "Ej.: tarjetas IC, alquiler, basura…"
    }
  },
  slogan: {
    en: "Official sources first. First-hand notes when we have them.",
    es: "Primero, fuentes oficiales. Experiencia propia cuando la tengamos."
  },
  footerNote: {
    en: "Independent bilingual guides to everyday Japan. Rules and services vary by city, so check the official source linked in each guide.",
    es: "Guías bilingües e independientes sobre el Japón cotidiano. Las reglas y los servicios cambian según la ciudad: confirma en la fuente oficial de cada guía."
  },
  author: "Ground Level Japan",
  routes: {
    category: { en: "category", es: "categoria" },
    search: { en: "search", es: "buscar" },
    about: { en: "about", es: "acerca" },
    privacy: { en: "privacy", es: "privacidad" },
    contact: { en: "contact", es: "contacto" }
  },
  categories: [
    {
      slug: "start-here", icon: "compass", path: { es: "empieza-aqui" },
      name: { en: "Start Here", es: "Empieza aquí" },
      description: { en: "The useful basics before anything else", es: "Lo útil antes que todo lo demás" },
      intro: {
        en: "Connectivity, safety, first-day decisions and the practical details that make a first trip or move less confusing.",
        es: "Conectividad, seguridad, decisiones del primer día y detalles prácticos para que tu primer viaje o mudanza sea menos confuso."
      }
    },
    {
      slug: "moving-settling", icon: "home", path: { es: "mudarte-e-instalarte" },
      name: { en: "Moving & Settling", es: "Mudarte e instalarte" },
      description: { en: "Homes, paperwork and your first weeks", es: "Vivienda, papeleo y tus primeras semanas" },
      intro: {
        en: "How to read housing listings, set up a home and understand the systems you meet when settling in Japan.",
        es: "Cómo leer anuncios de vivienda, preparar tu hogar y entender los sistemas que encontrarás al instalarte en Japón."
      }
    },
    {
      slug: "daily-life", icon: "sparkles", path: { es: "vida-diaria" },
      name: { en: "Daily Life", es: "Vida diaria" },
      description: { en: "The small systems behind an ordinary day", es: "Los pequeños sistemas de un día normal" },
      intro: {
        en: "Addresses, rubbish, deliveries and the everyday routines that are obvious once someone explains them.",
        es: "Direcciones, basura, entregas y esas rutinas cotidianas que parecen obvias cuando alguien las explica."
      }
    },
    {
      slug: "money-costs", icon: "banknote", path: { es: "dinero-y-costos" },
      name: { en: "Money & Costs", es: "Dinero y costos" },
      description: { en: "Paying, budgeting and avoiding surprises", es: "Pagos, presupuesto y menos sorpresas" },
      intro: {
        en: "Cash, cards, ATMs and realistic cost explanations, without investment advice or made-up budgets.",
        es: "Efectivo, tarjetas, cajeros y explicaciones realistas de costos, sin inversiones ni presupuestos inventados."
      }
    },
    {
      slug: "food-shopping", icon: "utensils", path: { es: "comida-y-compras" },
      name: { en: "Food & Shopping", es: "Comida y compras" },
      description: { en: "Eating and buying things without guesswork", es: "Comer y comprar sin adivinar" },
      intro: {
        en: "Convenience stores, supermarkets, restaurants and useful shopping habits explained without sponsored rankings.",
        es: "Tiendas de conveniencia, supermercados, restaurantes y hábitos de compra, sin rankings pagados."
      }
    },
    {
      slug: "getting-around", icon: "train", path: { es: "como-moverse" },
      name: { en: "Getting Around", es: "Cómo moverse" },
      description: { en: "Trains, buses and stations made legible", es: "Trenes, buses y estaciones sin enredos" },
      intro: {
        en: "IC cards, ticket gates, transfers and the habits that make Japan's transport easier to use.",
        es: "Tarjetas IC, torniquetes, transbordos y hábitos para usar con más facilidad el transporte de Japón."
      }
    },
    {
      slug: "culture-etiquette", icon: "heart", path: { es: "cultura-y-convivencia" },
      name: { en: "Culture & Etiquette", es: "Cultura y convivencia" },
      description: { en: "Context, not a list of scary rules", es: "Contexto, no una lista de reglas intimidantes" },
      intro: {
        en: "Everyday manners and cultural context, explained with curiosity rather than treating Japan as an exotic puzzle.",
        es: "Modales cotidianos y contexto cultural, explicados con curiosidad y sin tratar Japón como un acertijo exótico."
      }
    },
    {
      slug: "places-weekends", icon: "map-pin", path: { es: "lugares-y-escapadas" },
      name: { en: "Places & Weekends", es: "Lugares y escapadas" },
      description: { en: "Neighbourhoods and short trips worth understanding", es: "Barrios y viajes cortos que vale la pena entender" },
      intro: {
        en: "Neighbourhood walks and short trips, with practical routes and honest context as our first-hand library grows.",
        es: "Caminatas por barrios y viajes cortos, con rutas prácticas y contexto honesto conforme crezca nuestra biblioteca propia."
      }
    }
  ]
};

const registry: Record<SiteKey, SiteConfig> = {
  explicamelofacil: explicameloFacil,
  nolandmarks: noLandmarks,
  groundleveljapan: groundLevelJapan
};

function resolveKey(): SiteKey {
  const raw = process.env.NEXT_PUBLIC_SITE_KEY;
  if (raw && (siteKeys as readonly string[]).includes(raw)) return raw as SiteKey;
  if (raw) throw new Error(`NEXT_PUBLIC_SITE_KEY="${raw}" no existe. Opciones: ${siteKeys.join(", ")}.`);
  return "explicamelofacil";
}

/** El sitio que se está construyendo o sirviendo ahora mismo. */
export const site: SiteConfig = registry[resolveKey()];

/** Idioma de la raíz del dominio. */
export const defaultLocale: Locale = site.locales[0];

export function isLocale(value: string): value is Locale {
  return (site.locales as readonly string[]).includes(value);
}

/** Prefijo de URL del idioma: "" para el principal, "/es" para los demás. */
export function localePrefix(locale: Locale) {
  return locale === defaultLocale ? "" : `/${locale}`;
}

/** Elige el texto del idioma pedido; si no existe, cae al idioma principal. */
export function t(text: Translated, locale: Locale = defaultLocale): string {
  return text[locale] ?? text[defaultLocale] ?? Object.values(text)[0] ?? "";
}

export function routePath(name: keyof SiteConfig["routes"], locale: Locale = defaultLocale) {
  return `${localePrefix(locale)}/${t(site.routes[name], locale)}`;
}

export function categoryPath(slug: string, locale: Locale = defaultLocale) {
  const category = site.categories.find(c => c.slug === slug);
  const segment = category?.path?.[locale] ?? slug;
  return `${routePath("category", locale)}/${segment}`;
}

/** Busca una categoría por el segmento que aparece en la URL de ese idioma. */
export function categoryByPath(segment: string, locale: Locale = defaultLocale) {
  return site.categories.find(c => (c.path?.[locale] ?? c.slug) === segment);
}

export function categoryName(slug: string, locale: Locale = defaultLocale) {
  const category = site.categories.find(c => c.slug === slug);
  return category ? t(category.name, locale) : slug;
}

/** Dirección de un artículo dentro de su idioma. */
export function articlePath(slug: string, locale: Locale = defaultLocale) {
  return `${localePrefix(locale)}/${slug}`;
}

/** Etiqueta de idioma para <html lang> y Open Graph. */
export const htmlLang: Record<Locale, string> = { es: "es", en: "en-GB" };
export const ogLocale: Record<Locale, string> = { es: "es_419", en: "en_GB" };
