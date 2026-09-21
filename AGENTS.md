# Explícamelo Fácil — guía para agentes de IA

Lee este archivo antes de tocar el proyecto. Es la fuente de verdad; si algo del código lo contradice,
manda el código y actualiza este archivo.

## Qué es

Sitio editorial en español (**explicamelofacil.com**) con guías fáciles sobre dudas del día a día:
dinero, celular y tecnología, inteligencia artificial, reseñas, trabajo, trámites, viajes, estudios,
hogar y vida práctica. Se monetiza con Google AdSense. El dueño quiere mantenerlo con poco esfuerzo:
publicar guías nuevas debe ser fácil y no requiere tocar código.

## Stack y arquitectura

- **Next.js 16 (App Router) + React 19 + TypeScript**, desplegado en **Netlify** (plan gratis) con
  `@netlify/plugin-nextjs`. Cada `git push` a `main` despliega solo.
- **Supabase**: PostgreSQL (vía **Prisma 6**) para las guías y Storage (bucket `imagenes`) para fotos subidas.
- **No hay servidor aparte**: la API REST son route handlers de Next.js en `app/api/`.
- Las guías **viven en la base de datos**, no en el repositorio. Las páginas usan ISR (caché de 1 h +
  revalidación por etiqueta `articles` al publicar).

```
app/
  page.tsx                 portada
  [slug]/page.tsx          plantilla de TODAS las guías (URL = /<slug>)
  categoria/[slug]/        listado por categoría
  buscar/ acerca/ contacto/ privacidad/
  admin/                   editor privado (contraseña ADMIN_PASSWORD)
  portada/[slug]/route.tsx portada automática (PNG) cuando la guía no tiene foto
  api/articles, api/categories, api/health        API pública (JSON)
  api/session, api/editor/*, api/revalidate       API privada
  sitemap.ts robots.ts ads.txt/                   SEO y AdSense
components/                 header, footer, logo, tarjetas, markdown, editor, adsense, analytics
lib/schema.ts               ESQUEMA ZOD DE UNA GUÍA + LISTA DE CATEGORÍAS (fuente de verdad)
lib/content.ts              lectura de guías (Supabase, o JSON local si no hay DATABASE_URL)
lib/repository.ts           consultas Prisma     lib/storage.ts  subida a Supabase Storage
prisma/schema.prisma        modelo de datos      prisma/seed.ts  carga masiva desde JSON
scripts/publicar.ts         `npm run publicar`: valida, guarda en Supabase y refresca el sitio
netlify/functions/keepalive.mts  tarea diaria para que Supabase gratis no se pause
```

## Cómo se publica una guía

1. Escribir la guía siguiendo **docs/escribir-articulo.md** (formato JSON, tono y reglas) y
   **docs/guia-de-estilo.md**.
2. Guardarla en `content/nuevos/<slug>.json` (carpeta ignorada por git).
3. `npm run publicar -- content/nuevos/<slug>.json` → queda en `https://explicamelofacil.com/<slug>`.

Alternativa sin archivos: editor web en `/admin`. `content/articles.json` es un **respaldo local**
(ignorado por git) que `publicar` mantiene actualizado. En el repo solo va `content/ejemplo.json`.

## Imágenes

- Fotos: **Unsplash** (licencia libre, sin Unsplash+), enlazadas desde `images.unsplash.com`, con crédito
  `"Foto: <autor> en Unsplash"` en `coverCredit`. Evitar fotos con logos de marcas.
- Sin foto: `cover: "/portada/<slug>"` genera una portada con el diseño del sitio.
- Nunca usar imágenes de Google Imágenes, Pinterest ni de otros sitios sin licencia.

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Sitio local (localhost:3000). Sin DATABASE_URL lee `content/articles.json` o el ejemplo |
| `npm run build` | `prisma generate` + compilación de producción |
| `npm run typecheck` | Revisión de tipos (debe quedar en 0 errores) |
| `npm run publicar -- <archivo.json>` | Publica o actualiza guías |
| `npm run db:migrate` / `db:seed` | Migraciones / carga masiva |

## Reglas de contenido (obligatorias)

- Español neutro latinoamericano, de tú, cercano. Frase de la casa (la pone la plantilla):
  *"Aquí te lo explico muy fácil."*
- Toda cifra, precio, requisito o ruta de menú necesita **fuente oficial** en `sources`. Nunca copiar texto.
- **Prohibido**: salud/medicina, dietas o nutrición, salud mental, inversiones o cripto, asesoría legal o
  migratoria de un caso concreto, apuestas, piratería, espiar a otras personas.
- No inventar testimonios, experiencias ni reseñas "probadas" que no se hicieron.
- Guías de dinero terminan con el aviso de que no sustituyen asesoría financiera.
- Temas y prioridades pendientes: **docs/catalogo-contenido.md** (marcar ✅ al publicar).

## Reglas de código

- Un artículo es **datos**, no una página nueva: no crear componentes por guía.
- Para una categoría nueva: agregarla en `lib/schema.ts` (`categories`), su color en
  `app/portada/[slug]/route.tsx` (`palette`) y su sección en el catálogo.
- **No cambiar el slug de una guía publicada** (rompe enlaces y SEO); el editor ya lo bloquea.
- Secretos solo en `.env` (ignorado) y en Netlify. Nunca con prefijo `NEXT_PUBLIC_`:
  `DATABASE_URL`, `DIRECT_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `REVALIDATE_SECRET`.
  Los `NEXT_PUBLIC_*` (GA, AdSense, URL, contacto) son públicos a propósito.
- AdSense: el `<script>` debe ir en el `<head>` como etiqueta real (`components/adsense.tsx`), no con `next/script`.
- Rutas nuevas en la raíz no deben chocar con slugs: añadirlas a `reservedSlugs` en `lib/schema.ts`.
- Verificar con `npm run typecheck` antes de hacer commit. Commits en español.

## Estado actual

Ver **docs/project-status.md**. Producto y decisiones del dueño: **PRODUCT.md**.
