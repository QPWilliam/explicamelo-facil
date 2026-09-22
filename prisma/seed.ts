// Carga las guías de un archivo JSON en la base de datos (Supabase).
// Uso: npm run db:seed  — es seguro repetirlo: actualiza por web + idioma + dirección, sin duplicar.
import "dotenv/config";
import { existsSync, readFileSync } from "node:fs";
import { PrismaClient } from "@prisma/client";
import { articleSchema } from "../lib/schema";
import { site, localePrefix } from "../lib/sites";

const db = new PrismaClient();

async function main() {
  const file = process.env.SEED_FILE || (existsSync("content/articles.json") ? "content/articles.json" : "content/ejemplo.json");
  console.log(`Web: ${site.name} — cargando ${file}…`);
  const raw = JSON.parse(readFileSync(file, "utf8")) as unknown[];
  for (const item of raw) {
    const a = articleSchema.parse(item);
    const { category, ...values } = a;
    const data = {
      ...values,
      categorySlug: category,
      publishedAt: new Date(a.publishedAt),
      updatedAt: new Date(a.updatedAt)
    };
    await db.article.upsert({
      where: { site_locale_slug: { site: a.site, locale: a.locale, slug: a.slug } },
      create: data,
      update: data
    });
    console.log(`✓ ${a.status === "published" ? "publicado" : "borrador "}  ${localePrefix(a.locale)}/${a.slug}`);
  }
}

main()
  .then(() => db.$disconnect())
  .catch(async e => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
