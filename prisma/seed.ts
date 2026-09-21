// Carga las categorías y los artículos de un archivo JSON en la base de datos (Supabase).
// Uso: npm run db:seed  — es seguro repetirlo: actualiza por "slug" sin duplicar.
import "dotenv/config";
import { existsSync, readFileSync } from "node:fs";
import { PrismaClient } from "@prisma/client";
import { articleSchema, categories } from "../lib/schema";

const db = new PrismaClient();

async function main() {
  for (const c of categories) {
    await db.category.upsert({ where: { slug: c.slug }, update: { name: c.name }, create: { slug: c.slug, name: c.name } });
  }
  // Archivo a cargar: SEED_FILE, content/articles.json (privado) o el ejemplo público.
  const file = process.env.SEED_FILE || (existsSync("content/articles.json") ? "content/articles.json" : "content/ejemplo.json");
  console.log(`Cargando ${file}…`);
  const raw = JSON.parse(readFileSync(file, "utf8")) as unknown[];
  for (const item of raw) {
    const a = articleSchema.parse(item);
    const { category, tags, ...values } = a;
    const data = {
      ...values, publishedAt: new Date(a.publishedAt), updatedAt: new Date(a.updatedAt),
      category: { connect: { slug: category } },
      tags: { connectOrCreate: [...new Set(tags)].map(name => ({ where: { name }, create: { name } })) }
    };
    await db.article.upsert({ where: { slug: a.slug }, create: data, update: { ...data, tags: { set: [], ...data.tags } } });
    console.log(`✓ ${a.status === "published" ? "publicado" : "borrador "}  /${a.slug}`);
  }
}

main().then(() => db.$disconnect()).catch(async e => { console.error(e); await db.$disconnect(); process.exit(1); });
