import "server-only";
import { db } from "./db";
import { articleSchema, type Article } from "./schema";
import { site, defaultLocale, type Locale } from "./sites";

// REGLA: ninguna consulta de este archivo sale sin filtrar por `site`.
// Es lo único que impide que una guía de una web aparezca en la otra, así que el filtro
// se aplica aquí, en la capa de datos, y no en cada página.
const scope = { site: site.key } as const;

type Row = {
  publishedAt: Date;
  updatedAt: Date;
  categorySlug: string;
  [key: string]: unknown;
};

function serialize(row: Row): Article {
  return articleSchema.parse({
    ...row,
    category: row.categorySlug,
    publishedAt: row.publishedAt.toISOString(),
    updatedAt: row.updatedAt.toISOString()
  });
}

export async function listArticles(options: { admin?: boolean; locale?: Locale } = {}) {
  const { admin = false, locale } = options;
  const rows = await db.article.findMany({
    where: { ...scope, ...(locale ? { locale } : {}), ...(admin ? {} : { status: "published" }) },
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }]
  });
  return rows.map(serialize);
}

export async function findArticle(slug: string, locale: Locale = defaultLocale, admin = false) {
  const row = await db.article.findFirst({
    where: { ...scope, slug, locale, ...(admin ? {} : { status: "published" }) }
  });
  return row ? serialize(row) : null;
}

export class ContentError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

/** Guarda una guía. `previousSlug` sólo se pasa al editar una que ya existía. */
export async function saveArticle(input: Article, previousSlug?: string) {
  if (input.site !== site.key) {
    throw new ContentError(400, `Esta guía pertenece a otra web (${input.site}) y no se puede guardar desde ${site.name}.`);
  }
  return db.$transaction(async tx => {
    const previous = previousSlug
      ? await tx.article.findUnique({
          where: { site_locale_slug: { site: site.key, locale: input.locale, slug: previousSlug } }
        })
      : null;
    if (previousSlug && !previous) throw new ContentError(404, "La guía ya no existe.");
    if (previous?.publishedOnce && input.slug !== previous.slug) {
      throw new ContentError(409, "La dirección de una guía publicada se conserva para no romper sus enlaces.");
    }

    const { category, publishedAt: _date, updatedAt: _update, publishedOnce: _once, ...values } = input;
    const now = new Date();
    const firstPublish = !previous?.publishedOnce && input.status === "published";
    const data = {
      ...values,
      categorySlug: category,
      publishedAt: firstPublish ? now : previous?.publishedAt ?? now,
      publishedOnce: Boolean(previous?.publishedOnce || input.status === "published"),
      updatedAt: now
    };

    const row = previous
      ? await tx.article.update({ where: { id: previous.id }, data })
      : await tx.article.create({ data });
    return serialize(row);
  });
}

export async function ping() {
  await db.$queryRaw`SELECT 1`;
}
