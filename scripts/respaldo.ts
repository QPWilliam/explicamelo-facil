// Descarga TODAS las guías de Supabase a un archivo JSON local.
// Uso:  npm run respaldo            → content/articles.json
//       npm run respaldo -- ruta.json
//
// Por qué existe: content/articles.json está fuera de git a propósito (el contenido no vive en el
// repositorio), así que sin este comando no hay copia de seguridad de las guías en ninguna parte.
// El archivo que genera se puede volver a cargar con `npm run db:seed`.
import "dotenv/config";
import { writeFileSync } from "node:fs";
import { PrismaClient } from "@prisma/client";

if (!process.env.DATABASE_URL) {
  console.error("Falta DATABASE_URL en .env");
  process.exit(1);
}

const db = new PrismaClient();
const out = process.argv[2] || "content/articles.json";

async function main() {
  // A propósito se descargan las guías de TODAS las webs: es una copia de seguridad, no un filtro.
  const rows = await db.article.findMany({
    orderBy: [{ site: "asc" }, { locale: "asc" }, { publishedAt: "desc" }]
  });

  const data = rows.map(({ id: _id, categorySlug, publishedAt, updatedAt, ...rest }) => ({
    ...rest,
    category: categorySlug,
    publishedAt: publishedAt.toISOString(),
    updatedAt: updatedAt.toISOString()
  }));

  writeFileSync(out, JSON.stringify(data, null, 2) + "\n");

  const resumen = new Map<string, number>();
  for (const a of data) {
    const clave = `${a.site} · ${a.locale}`;
    resumen.set(clave, (resumen.get(clave) ?? 0) + 1);
  }
  console.log(`✓ ${data.length} guías guardadas en ${out}`);
  for (const [clave, n] of [...resumen].sort()) console.log(`   ${clave}: ${n}`);
}

main()
  .then(() => db.$disconnect())
  .catch(async e => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
