# Explícamelo Fácil

**Guías claras en español para las dudas del día a día** — dinero, celulares, trámites, viajes y trabajo.
Sitio editorial de contenido monetizado con Google AdSense: [explicamelofacil.com](https://explicamelofacil.com)

![Next.js](https://img.shields.io/badge/Next.js-16-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6) ![Prisma](https://img.shields.io/badge/Prisma-6-2d3748) ![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e) ![Netlify](https://img.shields.io/badge/Netlify-deploy-00c7b7) ![License: MIT](https://img.shields.io/badge/license-MIT-green)

## Qué hace

- **Páginas estáticas con revalidación (ISR):** cada guía se genera en el servidor y se sirve desde CDN; cargan rápido y son fáciles de indexar.
- **Editor privado (`/admin`)** para crear, editar y publicar guías en Markdown, con vista previa y subida de imágenes. Publicar no requiere volver a desplegar.
- **API REST pública** (`/api/articles`, `/api/articles/:slug`, `/api/categories`) lista para una futura app móvil.
- **SEO técnico:** metadatos por página, Open Graph, JSON-LD (`Article`, `BreadcrumbList`), `sitemap.xml`, `robots.txt`, URLs limpias (`/como-cuidar-la-bateria-del-celular`).
- **Monetización y medición:** Google AdSense (anuncios automáticos + espacios dentro del texto, `ads.txt` generado) y Google Analytics 4, todo activable por variables de entorno.
- **Diseño editorial** con tipografía serif, capitulares, índice automático y buen comportamiento en móvil.

## Arquitectura

```
Navegador ──► Netlify CDN ──► Next.js (App Router, React Server Components)
                                 │
                                 ├─ Páginas: /  /[slug]  /categoria/[slug]  /buscar
                                 ├─ API pública:  /api/articles  /api/categories  /api/health
                                 ├─ API editor:   /api/session  /api/editor/articles  /api/editor/upload
                                 │
                                 ├─ Prisma ──► Supabase PostgreSQL (artículos, categorías, etiquetas)
                                 └─ fetch  ──► Supabase Storage (imágenes subidas)

Tarea programada diaria (Netlify) ──► /api/health  (mantiene activa la base de datos gratuita)
```

| Parte | Archivos |
| --- | --- |
| Páginas | `app/page.tsx`, `app/[slug]/page.tsx`, `app/categoria/[slug]/page.tsx`, `app/buscar/page.tsx` |
| Datos | `prisma/schema.prisma`, `lib/repository.ts`, `lib/content.ts` (caché con etiquetas) |
| Validación | `lib/schema.ts` (Zod: mismo esquema en editor, API y base de datos) |
| Editor y sesión | `components/editor.tsx`, `lib/session.ts` (cookie firmada con HMAC), `lib/admin.ts` |
| Anuncios y analítica | `components/adsense.tsx`, `components/analytics.tsx`, `app/ads.txt/route.ts` |

**Stack:** Next.js 16 · React 19 · TypeScript · Prisma · PostgreSQL (Supabase) · Zod · react-markdown · Netlify.

## Contenido

Los artículos se guardan en la base de datos, no en este repositorio. Para probar el proyecto sin base de datos,
el sitio usa `content/ejemplo.json` (una guía de muestra). Si existe un `content/articles.json` local, se usa ese.
Los textos publicados en explicamelofacil.com son propiedad de su autor; la licencia MIT cubre el código.

## Ejecutarlo en local

```bash
npm install
npm run setup      # crea .env con una contraseña para /admin
npm run dev        # http://localhost:3000
```

## Conectar Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. **Connect → ORMs → Prisma**: copia `DATABASE_URL` (pooler, puerto 6543, `?pgbouncer=true`) y `DIRECT_URL` (puerto 5432) en `.env`.
3. **Project Settings → API**: copia la *Project URL* en `SUPABASE_URL` y la clave *service_role* en `SUPABASE_SERVICE_ROLE_KEY` (es secreta).
4. **Storage → New bucket**: nombre `imagenes`, público.
5. Crea las tablas y carga el contenido:

```bash
npm run db:migrate
npm run db:seed    # usa content/articles.json si existe; si no, el ejemplo
```

## Desplegar en Netlify

1. *Add new project → Import from Git* → este repositorio (Netlify detecta Next.js).
2. *Environment variables → Import from a .env file*: pega tu `.env` con `NEXT_PUBLIC_SITE_URL=https://tu-dominio.com` y una `ADMIN_PASSWORD` nueva.
3. *Deploy*. Para un dominio propio: *Domain management → Add a domain* y configura el DNS que indica Netlify.

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compilación de producción |
| `npm run typecheck` | Revisión de tipos |
| `npm run db:migrate` | Aplica migraciones |
| `npm run db:seed` | Carga categorías y artículos desde JSON |

## Licencia

Código bajo licencia [MIT](LICENSE). El contenido editorial del sitio, el nombre y el logo de Explícamelo Fácil no están incluidos en la licencia.
