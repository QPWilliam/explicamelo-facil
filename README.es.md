# Plataforma multi-sitio de contenido

*[English version](README.md)*

Un solo proyecto de Next.js que sirve **varias webs independientes** —marcas distintas, idiomas
distintos, identidades visuales distintas— desde **una sola base de datos** y **un solo despliegue**.

En producción: **[explicamelofacil.com](https://explicamelofacil.com)** (español, 62 guías) ·
**[nolandmarks.com](https://nolandmarks.com)** (inglés + español, guías de Londres)

![Next.js](https://img.shields.io/badge/Next.js-16-black) ![React](https://img.shields.io/badge/React-19-61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6) ![Prisma](https://img.shields.io/badge/Prisma-6-2d3748) ![PostgreSQL](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e) ![Netlify](https://img.shields.io/badge/Netlify-deploy-00c7b7) ![License: MIT](https://img.shields.io/badge/license-MIT-green)

---

## El problema que resuelve

Al principio era un único blog en español. Cuando hizo falta una segunda web —otra marca, otro idioma
y un diseño completamente distinto— las dos opciones evidentes eran malas:

- **Un segundo repositorio** significa dos copias de la misma capa de datos, el mismo editor, el mismo
  sistema de publicación y la misma fontanería de SEO. Se desincronizan, y cada error se arregla dos veces.
- **Una segunda base de datos** multiplica coste y límites de conexión para un contenido que es
  estructuralmente idéntico.

Así que el proyecto se refactorizó como **plataforma multi-inquilino**: un repositorio, una base de
datos, una infraestructura, y un registro de sitios que decide todo lo que cambia entre marcas.

Más adelante se construyó una tercera web sobre esta plataforma y se separó a su propio repositorio
cuando se le quedó pequeña la configuración compartida — que es justo la idea: añadir o quitar un sitio
es un cambio de configuración, no una reescritura.

## Cómo funciona

`NEXT_PUBLIC_SITE_KEY` decide qué web se construye. Cada proyecto de Netlify apunta al **mismo
repositorio** con un valor distinto, así que un `git push` puede desplegar dos webs de producción.

```
                               ┌─ NEXT_PUBLIC_SITE_KEY=explicamelofacil ─► explicamelofacil.com
git push ──► una compilación ──┤
                               └─ NEXT_PUBLIC_SITE_KEY=nolandmarks ──────► nolandmarks.com

Navegador ──► CDN ──► Next.js (App Router, React Server Components)
                         │
                         ├─ lib/sites.ts      marca, idiomas, tema, secciones  (fuente de verdad)
                         ├─ lib/repository.ts toda consulta filtrada por el sitio activo
                         ├─ Prisma ──► PostgreSQL      artículos de todas las webs, una tabla
                         └─ fetch  ──► Almacenamiento  imágenes subidas
```

### Multi-inquilino a prueba de fugas

Cada fila de artículo lleva `site`, `locale` y un `translationKey` opcional. El filtro por sitio vive
en la capa de datos, no en las páginas:

```ts
const scope = { site: site.key } as const;   // lib/repository.ts

export async function listArticles({ admin = false, locale } = {}) {
  const rows = await db.article.findMany({
    where: { ...scope, ...(locale && { locale }), ...(admin ? {} : { status: "published" }) },
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }]
  });
  return rows.map(serialize);
}
```

Una página nueva no puede mostrar por descuido el contenido de otra marca, porque nunca llega a
escribir el filtro.

### Internacionalización

El idioma principal va en la raíz del dominio y los secundarios bajo prefijo (`/es/…`). Rutas,
direcciones de las secciones y textos de interfaz cambian por idioma, y las traducciones se enlazan
por `translationKey` para generar las etiquetas `hreflang` automáticamente.

```
app/
  (site)/          idioma principal en la raíz     nolandmarks.com/camden-in-half-a-day
  es/              idioma secundario con prefijo   nolandmarks.com/es/camden-en-medio-dia
```

El repositorio contiene las carpetas de rutas de todas las webs; `lib/routes.ts` devuelve 404 en las
que no corresponden al sitio y el idioma activos.

### Dos identidades visuales, una hoja de estilos

El tema es un atributo en `<html>`. La hoja compartida define la estructura una vez; cada tema
redefine las variables de diseño y un puñado de reglas.

- **`editorial`** — claro, con serifa, capitulares y secciones numeradas. Pensado para texto largo.
- **`visual`** — oscuro, sin serifa, fotografía a sangre. Pensado para contenido de viajes.

Puestas una al lado de la otra parecen dos empresas distintas.

### Publicar sin desplegar

El contenido vive en la base de datos. Las páginas usan ISR con revalidación por etiquetas, así que
publicar un artículo invalida su caché y aparece en segundos: **sin recompilar y sin desplegar**.

```bash
npm run publicar -- content/nuevos/mi-guia.json   # validar → guardar → revalidar
```

También hay un editor privado en `/admin` con vista previa de Markdown y subida de imágenes.

## Detalles de ingeniería que merecen un vistazo

| Área | Qué hace |
| --- | --- |
| **Validación** | Un solo esquema de Zod (`lib/schema.ts`) es el contrato del editor, la API y la base de datos — construido a partir del sitio activo, así que cada marca solo acepta sus secciones y sus idiomas |
| **Sesión** | Cookie de sesión firmada con HMAC, comprobación de mismo origen y limitación de intentos de acceso |
| **Subidas** | Reconversión a WebP en el servidor con `sharp`, validación de tipo y tamaño, guardado en almacenamiento de objetos |
| **Imágenes generadas** | Portadas por artículo y favicons renderizados en el borde con `next/og`, con el tema de cada marca |
| **SEO** | Metadatos por página, Open Graph, JSON-LD (`Article`, `BreadcrumbList`, `WebSite`, `Organization`), `hreflang`, `sitemap.xml` y `robots.txt` |
| **Migraciones** | Migración SQL escrita a mano que llevó una base en producción de un inquilino a multi-inquilino sin perder una fila, fundiendo dos tablas de catálogo dentro del propio artículo |
| **Operación** | Una tarea programada evita que la base de datos del plan gratuito se pause; `/api/health` informa del estado de la conexión |

## Stack

Next.js 16 (App Router, RSC, ISR) · React 19 · TypeScript · Prisma 6 · PostgreSQL (Supabase) ·
Zod · react-markdown · `next/og` · `sharp` · Netlify.

## Ejecutarlo en local

```bash
npm install
npm run setup        # genera .env con una contraseña para /admin
npm run dev          # http://localhost:3000
```

Ver otra web con su contenido de ejemplo, sin tocar la base de datos:

```bash
NEXT_PUBLIC_SITE_KEY=nolandmarks USE_LOCAL_CONTENT=1 npm run dev
```

Con base de datos: copia `DATABASE_URL` y `DIRECT_URL` en `.env` y después

```bash
npm run db:migrate
npm run db:seed
```

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compilación de producción |
| `npm run typecheck` | Revisión de tipos — debe quedar limpia antes de cada commit |
| `npm run publicar -- <archivo.json>` | Valida, publica y revalida |
| `npm run respaldo` | Descarga todos los artículos a un respaldo local en JSON |
| `npm run db:migrate` / `db:seed` | Migraciones / carga masiva |

## Añadir una web nueva

1. Añade su `SiteConfig` a `lib/sites.ts` (marca, idiomas, tema, secciones).
2. Añade sus variables de tema a `app/globals.css` si estrena diseño.
3. Añade su marca en `components/logo.tsx` y `app/icon.tsx`.
4. Crea un proyecto en Netlify apuntando a este repositorio con su propia `NEXT_PUBLIC_SITE_KEY`.

Sin cambios en la base de datos: los artículos nuevos se distinguen por la columna `site`.

Notas de arquitectura: [`docs/multisitio.md`](docs/multisitio.md) · Convenciones para agentes de IA y
colaboradores: [`AGENTS.md`](AGENTS.md).

## Licencia

Código bajo licencia [MIT](LICENSE). El contenido editorial, los nombres y los logos de las webs no
están incluidos en la licencia.
