// Publica una o varias guías desde archivos JSON.
// Uso:  npm run publicar -- content/nuevos/mi-guia.json [otro.json …]
// La web a la que van las guías la decide NEXT_PUBLIC_SITE_KEY del .env (o el campo "site" del JSON).
// 1) Valida cada guía con el esquema de esa web.  2) La guarda en Supabase (crea o actualiza).
// 3) Copia la guía en content/articles.json (respaldo local, fuera de git).  4) Pide al sitio que se refresque.
import "dotenv/config";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { PrismaClient } from "@prisma/client";
import { articleSchema, type Article } from "../lib/schema";
import { site, defaultLocale, localePrefix } from "../lib/sites";

const files = process.argv.slice(2);
if (!files.length) {
  console.error("Indica el archivo: npm run publicar -- content/nuevos/mi-guia.json");
  process.exit(1);
}
if (!process.env.DATABASE_URL) {
  console.error("Falta DATABASE_URL en .env");
  process.exit(1);
}

const db = new PrismaClient();
const backupPath = "content/articles.json";

async function main() {
  console.log(`Web: ${site.name} (${site.key})\n`);
  const incoming: Article[] = [];
  for (const file of files) {
    const raw = JSON.parse(readFileSync(file, "utf8"));
    for (const item of Array.isArray(raw) ? raw : [raw]) {
      const now = new Date().toISOString();
      const result = articleSchema.safeParse({
        publishedOnce: false,
        featured: false,
        publishedAt: now,
        updatedAt: now,
        status: "published",
        country: "General",
        coverCredit: "",
        ...item,
        cover: item.cover || `/portada/${item.slug}`
      });
      if (!result.success) {
        console.error(`✗ ${file}: ${item.slug ?? "(sin slug)"}`);
        for (const issue of result.error.issues) console.error(`   - ${issue.path.join(".")}: ${issue.message}`);
        process.exit(1);
      }
      incoming.push(result.data);
    }
  }

  for (const a of incoming) {
    const key = { site: a.site, locale: a.locale, slug: a.slug };
    const existing = await db.article.findUnique({ where: { site_locale_slug: key } });
    const { category, publishedOnce: _once, publishedAt, updatedAt: _updated, ...values } = a;
    const published = a.status === "published";
    const data = {
      ...values,
      categorySlug: category,
      publishedAt: existing?.publishedOnce ? existing.publishedAt : new Date(publishedAt),
      publishedOnce: Boolean(existing?.publishedOnce || published),
      updatedAt: new Date()
    };
    await db.article.upsert({ where: { site_locale_slug: key }, create: data, update: data });
    const path = `${localePrefix(a.locale)}/${a.slug}`;
    console.log(`✓ ${existing ? "actualizada" : "nueva"} ${published ? "(publicada)" : "(borrador)"}  ${path}`);
  }

  const backup: Article[] = existsSync(backupPath) ? JSON.parse(readFileSync(backupPath, "utf8")) : [];
  for (const a of incoming) {
    const i = backup.findIndex(b => b.slug === a.slug && (b.locale ?? defaultLocale) === a.locale && (b.site ?? site.key) === a.site);
    if (i >= 0) backup[i] = a;
    else backup.push(a);
  }
  writeFileSync(backupPath, JSON.stringify(backup, null, 2) + "\n");

  const url = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
  const secret = process.env.REVALIDATE_SECRET;
  if (url && secret && !url.includes("localhost")) {
    const res = await fetch(`${url}/api/revalidate`, { method: "POST", headers: { Authorization: `Bearer ${secret}` } }).catch(() => null);
    console.log(res?.ok ? `✓ ${url} actualizado` : "! No se pudo refrescar el sitio; se actualizará solo en menos de 1 hora.");
  } else {
    console.log("i El sitio publicado se actualizará solo en menos de 1 hora (configura REVALIDATE_SECRET para que sea inmediato).");
  }
  for (const a of incoming) {
    if (a.status === "published") console.log(`  → ${url || "http://localhost:3000"}${localePrefix(a.locale)}/${a.slug}`);
  }
}

main()
  .then(() => db.$disconnect())
  .catch(async e => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
