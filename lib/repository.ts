import "server-only";
import { Prisma } from "@prisma/client";
import { db } from "./db";
import { articleSchema, categories, type Article } from "./schema";

const include = { tags: true } satisfies Prisma.ArticleInclude;
type Row = Prisma.ArticleGetPayload<{ include: typeof include }>;

function serialize(row: Row): Article {
  return articleSchema.parse({
    ...row, category: row.categorySlug, tags: row.tags.map(t => t.name),
    publishedAt: row.publishedAt.toISOString(), updatedAt: row.updatedAt.toISOString()
  });
}

export async function listArticles(admin = false) {
  const rows = await db.article.findMany({
    where: admin ? {} : { status: "published" }, include,
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }]
  });
  return rows.map(serialize);
}

export async function findArticle(slug: string, admin = false) {
  const row = await db.article.findFirst({ where: { slug, ...(admin ? {} : { status: "published" }) }, include });
  return row ? serialize(row) : null;
}

export class ContentError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

export async function saveArticle(input: Article, previousSlug?: string) {
  return db.$transaction(async tx => {
    const previous = previousSlug ? await tx.article.findUnique({ where: { slug: previousSlug } }) : null;
    if (previousSlug && !previous) throw new ContentError(404, "La guía ya no existe.");
    if (previous?.publishedOnce && input.slug !== previous.slug) {
      throw new ContentError(409, "La dirección de una guía publicada se conserva para no romper sus enlaces.");
    }
    const { category, tags, publishedAt: _date, updatedAt: _update, publishedOnce: _once, ...values } = input;
    const cat = categories.find(c => c.slug === category)!;
    const now = new Date();
    const firstPublish = !previous?.publishedOnce && input.status === "published";
    const data = {
      ...values,
      category: { connectOrCreate: { where: { slug: cat.slug }, create: { slug: cat.slug, name: cat.name } } },
      tags: { connectOrCreate: [...new Set(tags)].map(name => ({ where: { name }, create: { name } })) },
      publishedAt: firstPublish ? now : previous?.publishedAt ?? now,
      publishedOnce: Boolean(previous?.publishedOnce || input.status === "published"),
      updatedAt: now
    };
    const row = previous
      ? await tx.article.update({ where: { id: previous.id }, data: { ...data, tags: { set: [], ...data.tags } }, include })
      : await tx.article.create({ data, include });
    return serialize(row);
  });
}

export async function ping() {
  await db.$queryRaw`SELECT 1`;
}
