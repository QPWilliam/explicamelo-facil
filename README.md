# Multi-site content platform

*[Versión en español](README.es.md)*

One Next.js codebase that powers **several independent content sites** — different brands, different
languages, different visual identities — from a **single database** and a **single deployment pipeline**.

Live: **[explicamelofacil.com](https://explicamelofacil.com)** (Spanish, 62 guides) ·
**[nolandmarks.com](https://nolandmarks.com)** (English + Spanish, London city guides)

![Next.js](https://img.shields.io/badge/Next.js-16-black) ![React](https://img.shields.io/badge/React-19-61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6) ![Prisma](https://img.shields.io/badge/Prisma-6-2d3748) ![PostgreSQL](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e) ![Netlify](https://img.shields.io/badge/Netlify-deploy-00c7b7) ![License: MIT](https://img.shields.io/badge/license-MIT-green)

---

## The problem this solves

The first site was a single Spanish blog. When a second site was needed — a different brand, in a
different language, with an entirely different look — the obvious options were both bad:

- **A second repository** means two copies of the same database layer, admin editor, publishing
  pipeline and SEO plumbing. They drift apart, and every bug gets fixed twice.
- **A second database** multiplies cost and connection limits for content that is structurally identical.

So the project was refactored into a **multi-tenant platform**: one repo, one database, one set of
infrastructure, and a site registry that decides everything that differs between brands.

A third site was later built on this platform and split out into its own repository once it outgrew
the shared setup — which is the point: adding and removing a site is a configuration change, not a rewrite.

## How it works

`NEXT_PUBLIC_SITE_KEY` selects which site is being built. Each Netlify project points at the **same
repository** with a different value, so one `git push` can ship two production sites.

```
                        ┌─ NEXT_PUBLIC_SITE_KEY=explicamelofacil ─► explicamelofacil.com
git push ──► one build ─┤
                        └─ NEXT_PUBLIC_SITE_KEY=nolandmarks ──────► nolandmarks.com

Browser ──► CDN ──► Next.js (App Router, React Server Components)
                       │
                       ├─ lib/sites.ts      brand, locales, theme, sections  (single source of truth)
                       ├─ lib/repository.ts every query scoped to the active site
                       ├─ Prisma ──► PostgreSQL     articles for every site, one table
                       └─ fetch  ──► Object storage  uploaded images
```

### Multi-tenancy that can't leak

Every article row carries `site`, `locale` and an optional `translationKey`. The site filter lives in
the data layer, not in the pages:

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

A new page cannot accidentally show another brand's content, because it never gets to write the filter.

### Internationalisation

The primary locale lives at the domain root, secondary locales under a prefix (`/es/…`). Routes,
section slugs and UI strings are all per-locale, and translated articles are linked by
`translationKey` so `hreflang` tags can be emitted automatically.

```
app/
  (site)/          primary locale at the root        nolandmarks.com/camden-in-half-a-day
  es/              secondary locale under a prefix   nolandmarks.com/es/camden-en-medio-dia
```

Route folders for every site live in the repo; `lib/routes.ts` returns 404 for the ones that don't
belong to the active site and locale.

### Two visual identities, one stylesheet

The theme is an attribute on `<html>`. The shared stylesheet defines structure once; each theme
redefines design tokens and a handful of rules.

- **`editorial`** — light, serif, drop caps and numbered sections. Built for long explanatory text.
- **`visual`** — dark, sans-serif, full-bleed photography. Built for travel content.

Put side by side they look like two different companies.

### Publishing without deploying

Content lives in the database. Pages use ISR with tag-based revalidation, so publishing an article
purges its cache and the article appears in seconds — **no rebuild, no deploy**.

```bash
npm run publicar -- content/nuevos/my-guide.json   # validate → save → revalidate
```

There is also a private editor at `/admin` with Markdown preview and image upload.

## Engineering details worth a look

| Area | What it does |
| --- | --- |
| **Validation** | One Zod schema (`lib/schema.ts`) is the contract for the editor, the API and the database — shaped by the active site, so each brand only accepts its own sections and languages |
| **Auth** | HMAC-signed session cookie, same-origin checks, in-memory rate limiting on login |
| **Uploads** | Server-side re-encode to WebP with `sharp`, type and size validation, stored in object storage |
| **Generated images** | Per-article cover images and favicons rendered at the edge with `next/og`, themed per brand |
| **SEO** | Per-page metadata, Open Graph, JSON-LD (`Article`, `BreadcrumbList`, `WebSite`, `Organization`), `hreflang`, `sitemap.xml`, `robots.txt` |
| **Migrations** | Hand-written SQL migration that moved a live single-tenant database to the multi-tenant schema without losing a row, collapsing two lookup tables into the article itself |
| **Operations** | Scheduled function keeps the free-tier database from idling; `/api/health` reports database connectivity |

## Stack

Next.js 16 (App Router, RSC, ISR) · React 19 · TypeScript · Prisma 6 · PostgreSQL (Supabase) ·
Zod · react-markdown · `next/og` · `sharp` · Netlify.

## Running it locally

```bash
npm install
npm run setup        # generates .env with an /admin password
npm run dev          # http://localhost:3000
```

Preview a different site with its sample content, without touching the database:

```bash
NEXT_PUBLIC_SITE_KEY=nolandmarks USE_LOCAL_CONTENT=1 npm run dev
```

With a database: copy `DATABASE_URL` and `DIRECT_URL` into `.env`, then

```bash
npm run db:migrate
npm run db:seed
```

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run typecheck` | Type check — must be clean before committing |
| `npm run publicar -- <file.json>` | Validate, publish and revalidate |
| `npm run respaldo` | Download every article to a local JSON backup |
| `npm run db:migrate` / `db:seed` | Migrations / bulk load |

## Adding a new site

1. Add its `SiteConfig` to `lib/sites.ts` (brand, locales, theme, sections).
2. Add its theme tokens to `app/globals.css` if it needs a new look.
3. Add its mark to `components/logo.tsx` and `app/icon.tsx`.
4. Create a Netlify project pointing at this repo with its own `NEXT_PUBLIC_SITE_KEY`.

No database change: new articles are distinguished by the `site` column.

Architecture notes: [`docs/multisitio.md`](docs/multisitio.md) · Conventions for AI agents and
contributors: [`AGENTS.md`](AGENTS.md).

## Licence

Code under the [MIT](LICENSE) licence. The editorial content, names and logos of the sites are not
included in the licence.
