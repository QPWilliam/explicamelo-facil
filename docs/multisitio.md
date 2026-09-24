# Varias webs en un solo repositorio

Este repositorio construye **más de una web**. Todas comparten el código (base de datos, editor,
publicación, SEO, anuncios) y se diferencian en marca, idiomas, secciones y tema visual.

| Web | Clave (`NEXT_PUBLIC_SITE_KEY`) | Dominio | Idiomas | Tema |
| --- | --- | --- | --- | --- |
| Explícamelo Fácil | `explicamelofacil` | explicamelofacil.com | español | `editorial` (papel claro, serif, capitulares) |
| No Landmarks | `nolandmarks` | nolandmarks.com | inglés + traducción bajo demanda | `visual` (oscuro, foto grande) |

## Dónde se decide todo

**`lib/sites.ts`** es la única fuente de verdad: nombre, dominio, idiomas, tema, eslogan, textos de
portada, nota del pie y **las secciones de cada web**. Ninguna página debe llevar textos de marca
ni colores escritos a mano.

La variable de entorno `NEXT_PUBLIC_SITE_KEY` decide qué web se construye. Si falta, se usa
`explicamelofacil` (así el proyecto sigue funcionando como antes).

## Base de datos

Una sola base de Supabase y **una sola tabla** `Article`:

- `site` — a qué web pertenece. `lib/repository.ts` filtra por él en **todas** las consultas; ese filtro
  es lo único que impide que el contenido de una web aparezca en la otra. No lo quites.
- `locale` — idioma de esa versión del texto. **La traducción es otra fila**, no un campo.
- `translationKey` — la misma cadena en las dos versiones de una guía; sirve para las etiquetas
  `hreflang` que le dicen a Google que son la misma página en otro idioma.
- `city` — opcional, para webs de destino (Londres, Ámsterdam…).

Las secciones y las etiquetas ya no tienen tabla propia: las secciones se definen en `lib/sites.ts`
y las etiquetas son una lista de texto dentro de la propia guía.

## Rutas

El idioma principal va en la raíz del dominio; los demás llevan prefijo.

```
app/
  layout.tsx            <html>, fuentes, AdSense, Analytics (sin cabecera ni pie)
  (site)/               idioma principal  → nolandmarks.com/…  o  explicamelofacil.com/…
    layout.tsx          cabecera + pie en el idioma principal
    page.tsx  [slug]/  categoria/  category/  buscar/  search/  acerca/ about/ …
  es/                   español cuando NO es el idioma principal → nolandmarks.com/es/…
    layout.tsx  page.tsx  [slug]/  categoria/  buscar/  acerca/ privacidad/ contacto/
```

El repositorio contiene las carpetas de **todas** las webs, así que las que no corresponden devuelven
404: eso lo hace `ensureRoute()` / `ensureLocale()` de `lib/routes.ts` comparando el nombre de la
carpeta con `site.routes` del sitio activo.

Las páginas no tienen lógica: son tres líneas que llaman a una vista de `components/views/`
(`home`, `article`, `category`, `search`, `pages`). Toda vista recibe `locale`.

## Ver una web en local sin tocar la base de datos

```bash
NEXT_PUBLIC_SITE_KEY=nolandmarks USE_LOCAL_CONTENT=1 npm run dev
```

`USE_LOCAL_CONTENT=1` ignora `DATABASE_URL` y lee el archivo de ejemplo de esa web
(`content/ejemplo-<clave>.json`). En `npm run dev` también se muestran los borradores, así que
sirve para revisar un diseño con contenido real sin escribir nada en Supabase.

Orden en que se busca el contenido local: `content/articles.json` (respaldo propio, fuera de git) →
`content/ejemplo-<clave>.json` → `content/ejemplo.json`.

## Añadir una web nueva

1. Añadir su clave a `siteKeys` y su objeto `SiteConfig` en `lib/sites.ts` (con sus secciones).
2. Si estrena tema visual, añadir sus variables bajo `:root[data-theme="…"]` en `app/globals.css`.
3. Añadir su marca en `components/logo.tsx`, `app/icon.tsx` y `app/portada/[slug]/route.tsx`.
4. Crear el sitio en Netlify apuntando al mismo repositorio, con sus variables de entorno.

Nada de esto toca la base de datos: las guías nuevas se distinguen por la columna `site`.

## Añadir un idioma nuevo a una web

1. Añadirlo a `locales` en `lib/sites.ts` y a su lista `locales`, con los textos traducidos.
2. Añadir su diccionario en `lib/i18n.ts`.
3. Crear `app/<idioma>/…` copiando `app/es/…` (son ficheros de tres líneas).
4. Ampliar el `CHECK` de `locale` en la base de datos.
