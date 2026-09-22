# Guía para agentes de IA

Lee este archivo antes de tocar el proyecto. Es la fuente de verdad; si algo del código lo contradice,
manda el código y actualiza este archivo.

## Qué es

Un repositorio que construye **varias webs** con el mismo código. Hoy son dos:

- **Explícamelo Fácil** (`explicamelofacil.com`, español): guías fáciles sobre dudas del día a día —
  dinero, celular y tecnología, inteligencia artificial, reseñas, trabajo, trámites, viajes, estudios,
  hogar y vida práctica.
- **No Landmarks** (`nolandmarks.com`, inglés + español): guías honestas de Londres — qué hacer, comer
  y beber, cómo moverse, entradas y pases, barrios, dinero y precios, antes de ir.

Ambas se monetizan con Google AdSense. El dueño quiere mantenerlas con poco esfuerzo: publicar una
guía nueva debe ser fácil y no requiere tocar código.

**Antes de cambiar nada que afecte a las dos webs, lee `docs/multisitio.md`.**

## Stack y arquitectura

- **Next.js 16 (App Router) + React 19 + TypeScript**, desplegado en **Netlify** (plan gratis) con
  `@netlify/plugin-nextjs`. Cada `git push` a `main` despliega **los dos sitios**.
- **Supabase**: PostgreSQL (vía **Prisma 6**) para las guías y Storage (bucket `imagenes`) para fotos.
- **No hay servidor aparte**: la API REST son route handlers de Next.js en `app/api/`.
- Las guías **viven en la base de datos**, no en el repositorio. Las páginas usan ISR (caché de 1 h +
  revalidación por etiqueta `articles` al publicar).
- Qué web se construye lo decide `NEXT_PUBLIC_SITE_KEY` (`explicamelofacil` | `nolandmarks`).

```
app/
  layout.tsx               <html>, fuentes, AdSense, Analytics (sin cabecera ni pie)
  icon.tsx                 favicon de cada marca
  (site)/                  idioma principal, en la raíz del dominio
    layout.tsx             cabecera + pie
    page.tsx               portada
    [slug]/page.tsx        plantilla de TODAS las guías (URL = /<slug>)
    categoria/ category/   listado por sección (el nombre depende del idioma)
    buscar/ search/ acerca/ about/ contacto/ contact/ privacidad/ privacy/
    admin/                 editor privado (contraseña ADMIN_PASSWORD)
  es/                      español cuando NO es el idioma principal (/es/…)
  portada/[slug]/route.tsx portada automática (PNG) cuando la guía no tiene foto
  api/…                    pública: articles, categories, health · privada: session, editor, revalidate
  sitemap.ts robots.ts ads.txt/                SEO y AdSense
components/
  views/                   home, article, category, search, pages — TODA la lógica de las páginas
  site-header, site-footer, logo, article-card, markdown, editor, adsense, analytics
lib/sites.ts               MARCA, IDIOMAS, TEMA Y SECCIONES DE CADA WEB (fuente de verdad)
lib/i18n.ts                textos de interfaz por idioma
lib/schema.ts              esquema zod de una guía + slugs reservados
lib/content.ts             lectura de guías (Supabase, o JSON local si no hay DATABASE_URL)
lib/repository.ts          consultas Prisma (filtradas por `site` SIEMPRE)
lib/routes.ts              404 de las rutas que no son de esta web/idioma
lib/storage.ts             subida a Supabase Storage
prisma/schema.prisma       modelo de datos      prisma/seed.ts  carga masiva desde JSON
scripts/publicar.ts        `npm run publicar`: valida, guarda en Supabase y refresca el sitio
netlify/functions/keepalive.mts  tarea diaria para que Supabase gratis no se pause
```

## Cómo se publica una guía

1. Escribir la guía siguiendo **docs/escribir-articulo.md** (formato JSON, tono y reglas) y
   **docs/guia-de-estilo.md**.
2. Guardarla en `content/nuevos/<slug>.json` (carpeta ignorada por git). Campos nuevos importantes:
   `site` (`explicamelofacil` | `nolandmarks`), `locale` (`es` | `en`), y `translationKey` si la guía
   tiene versión en el otro idioma (la misma cadena en las dos).
3. `npm run publicar -- content/nuevos/<slug>.json`.

Alternativa sin archivos: editor web en `/admin` de cada sitio.

`content/articles.json` es el **respaldo local** (ignorado por git). `publicar` solo añade a ese archivo
las guías que publica, así que en una máquina nueva queda incompleto: para tener una copia real de todo,
ejecutar **`npm run respaldo`**. En el repositorio solo van los ejemplos (`content/ejemplo*.json`).

## Imágenes

- Fotos: **Unsplash** (licencia libre, sin Unsplash+), enlazadas desde `images.unsplash.com`, con crédito
  `"Foto: <autor> en Unsplash"` en `coverCredit`. Evitar fotos con logos de marcas.
- En No Landmarks se prefieren fotos propias o de colaboradores que viven en la ciudad; el crédito debe
  decir de quién es.
- Sin foto: `cover: "/portada/<slug>"` genera una portada con el diseño del sitio.
- Nunca usar imágenes de Google Imágenes, Pinterest ni de otros sitios sin licencia.

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Sitio local (localhost:3000). La web depende de `NEXT_PUBLIC_SITE_KEY` del `.env` |
| `NEXT_PUBLIC_SITE_KEY=<web> USE_LOCAL_CONTENT=1 npm run dev` | Ver otra web con su contenido de ejemplo, sin tocar Supabase |
| `npm run build` | `prisma generate` + compilación de producción |
| `npm run typecheck` | Revisión de tipos (debe quedar en 0 errores) |
| `npm run publicar -- <archivo.json>` | Publica o actualiza guías |
| `npm run respaldo` | Descarga todas las guías de Supabase a `content/articles.json` (copia de seguridad) |
| `npm run db:migrate` / `db:seed` | Migraciones / carga masiva |

## Reglas de contenido (obligatorias)

- Explícamelo Fácil: español neutro latinoamericano, de tú, cercano.
  No Landmarks: inglés británico sencillo y su versión en español; sin jerga de folleto de viajes.
- La frase de la casa la pone la plantilla; está en `lib/sites.ts` (`slogan`), no se escribe en el texto.
- Toda cifra, precio, requisito o ruta de menú necesita **fuente oficial** en `sources`. Nunca copiar texto.
- **Prohibido**: salud/medicina, dietas o nutrición, salud mental, inversiones o cripto, asesoría legal o
  migratoria de un caso concreto, apuestas, piratería, espiar a otras personas.
- **No inventar** testimonios, experiencias, reseñas "probadas", puntuaciones ni rankings que no se hicieron.
  Si el autor tiene relación personal con un negocio del que habla, **decirlo en el propio artículo**;
  describirlo con honestidad en lugar de coronarlo como "el mejor".
- Guías de dinero terminan con el aviso de que no sustituyen asesoría financiera.
- Temas y prioridades pendientes: **docs/catalogo-contenido.md** (marcar ✅ al publicar).

## Reglas de código

- Un artículo es **datos**, no una página nueva: no crear componentes por guía.
- **Ninguna consulta a la base de datos sin filtrar por `site`.** El filtro vive en `lib/repository.ts`;
  si escribes una consulta nueva, va ahí, no en una página.
- Las páginas de `app/` son de tres líneas y llaman a una vista de `components/views/`. Toda vista
  recibe `locale`. Ningún texto de interfaz escrito a mano: va en `lib/i18n.ts`.
- Ningún texto de marca ni color escrito a mano: va en `lib/sites.ts` y `app/globals.css`.
- Para una sección nueva: agregarla a la web correspondiente en `lib/sites.ts` y su color en
  `app/portada/[slug]/route.tsx` (`palette`).
- **No cambiar el slug de una guía publicada** (rompe enlaces y SEO); el editor ya lo bloquea.
- Una traducción es **otra guía** con el mismo `translationKey`, no un campo dentro de la guía.
- Secretos solo en `.env` (ignorado) y en Netlify. Nunca con prefijo `NEXT_PUBLIC_`:
  `DATABASE_URL`, `DIRECT_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `REVALIDATE_SECRET`.
  Los `NEXT_PUBLIC_*` (GA, AdSense, URL, clave del sitio, contacto) son públicos a propósito.
- AdSense: el `<script>` debe ir en el `<head>` como etiqueta real (`components/adsense.tsx`), no con `next/script`.
- Rutas nuevas en la raíz no deben chocar con slugs: `reservedSlugs` en `lib/schema.ts` ya incluye los
  nombres de las páginas fijas y los prefijos de idioma de la web activa.
- Verificar con `npm run typecheck` antes de hacer commit. Commits en español.

## Estado actual

Ver **docs/project-status.md**. Producto y decisiones del dueño: **PRODUCT.md**.
Arquitectura multi-sitio: **docs/multisitio.md**. Despliegue del segundo sitio: **docs/desplegar-nolandmarks.md**.
