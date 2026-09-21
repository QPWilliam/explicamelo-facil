// Publica una o varias guías desde archivos JSON.
// Uso:  npm run publicar -- content/nuevos/mi-guia.json [otro.json …]
// 1) Valida cada guía con el mismo esquema del sitio.  2) La guarda en Supabase (crea o actualiza por slug).
// 3) Copia la guía en content/articles.json (respaldo local, fuera de git).  4) Pide al sitio que se refresque.
import "dotenv/config";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { PrismaClient } from "@prisma/client";
import { articleSchema, categories, type Article } from "../lib/schema";

const files = process.argv.slice(2);
if (!files.length) { console.error("Indica el archivo: npm run publicar -- content/nuevos/mi-guia.json"); process.exit(1); }
if (!process.env.DATABASE_URL) { console.error("Falta DATABASE_URL en .env"); process.exit(1); }

const db = new PrismaClient();
const backupPath = "content/articles.json";

async function main() {
  const incoming: Article[] = [];
  for (const file of files) {
    const raw = JSON.parse(readFileSync(file, "utf8"));
    for (const item of Array.isArray(raw) ? raw : [raw]) {
      const now = new Date().toISOString();
      const result = articleSchema.safeParse({ publishedOnce: false, featured: false, publishedAt: now, updatedAt: now,
        author: "Equipo editorial de Explícamelo Fácil", status: "published", country: "General", coverCredit: "",
        ...item, cover: item.cover || `/portada/${item.slug}` });
      if (!result.success) {
        console.error(`✗ ${file}: ${item.slug ?? "(sin slug)"}`);
        for (const issue of result.error.issues) console.error(`   - ${issue.path.join(".")}: ${issue.message}`);
        process.exit(1);
      }
      incoming.push(result.data);
    }
  }

  for (const c of categories) {
    await db.category.upsert({ where: { slug: c.slug }, update: { name: c.name }, create: { slug: c.slug, name: c.name } });
  }
  for (const a of incoming) {
    const existing = await db.article.findUnique({ where: { slug: a.slug } });
    const { category, tags, publishedOnce: _once, ...values } = a;
    const published = a.status === "published";
    const data = {
      ...values,
      publishedAt: existing?.publishedOnce ? existing.publishedAt : new Date(a.publishedAt),
      publishedOnce: Boolean(existing?.publishedOnce || published),
      updatedAt: new Date(),
      category: { connect: { slug: category } },
      tags: { connectOrCreate: [...new Set(tags)].map(name => ({ where: { name }, create: { name } })) }
    };
    await db.article.upsert({ where: { slug: a.slug }, create: data, update: { ...data, tags: { set: [], ...data.tags } } });
    console.log(`✓ ${existing ? "actualizada" : "nueva"} ${published ? "(publicada)" : "(borrador)"}  /${a.slug}`);
  }

  const backup: Article[] = existsSync(backupPath) ? JSON.parse(readFileSync(backupPath, "utf8")) : [];
  for (const a of incoming) {
    const i = backup.findIndex(b => b.slug === a.slug);
    if (i >= 0) backup[i] = a; else backup.push(a);
  }
  writeFileSync(backupPath, JSON.stringify(backup, null, 2) + "\n");

  const site = process.env.NEXT_PUBLIC_SITE_URL;
  const secret = process.env.REVALIDATE_SECRET;
  if (site && secret && !site.includes("localhost")) {
    const res = await fetch(`${site.replace(/\/$/, "")}/api/revalidate`, { method: "POST", headers: { Authorization: `Bearer ${secret}` } }).catch(() => null);
    console.log(res?.ok ? `✓ ${site} actualizado` : "! No se pudo refrescar el sitio; se actualizará solo en menos de 1 hora.");
  } else {
    console.log("i El sitio publicado se actualizará solo en menos de 1 hora (configura REVALIDATE_SECRET para que sea inmediato).");
  }
  for (const a of incoming) if (a.status === "published") console.log(`  → ${(site || "http://localhost:3000").replace(/\/$/, "")}/${a.slug}`);
}

main().then(() => db.$disconnect()).catch(async e => { console.error(e); await db.$disconnect(); process.exit(1); });
