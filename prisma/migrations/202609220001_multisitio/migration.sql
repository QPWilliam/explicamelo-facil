-- Multi-sitio: una sola base de datos de Supabase sirve a varias webs.
-- Las guías que ya existen quedan asignadas a Explícamelo Fácil en español.
-- De paso se simplifican dos tablas que sólo servían de catálogo:
--   * Category  -> las secciones se definen en el código (lib/sites.ts).
--   * Tag       -> las etiquetas pasan a ser una lista dentro de la propia guía.

ALTER TABLE "Article"
  ADD COLUMN IF NOT EXISTS "site"           TEXT   NOT NULL DEFAULT 'explicamelofacil',
  ADD COLUMN IF NOT EXISTS "locale"         TEXT   NOT NULL DEFAULT 'es',
  ADD COLUMN IF NOT EXISTS "city"           TEXT,
  ADD COLUMN IF NOT EXISTS "translationKey" TEXT,
  ADD COLUMN IF NOT EXISTS "tags"           TEXT[] NOT NULL DEFAULT '{}';

-- Copiar las etiquetas de la tabla intermedia a la nueva columna antes de borrar nada.
DO $$
BEGIN
  IF to_regclass('"_ArticleToTag"') IS NOT NULL THEN
    UPDATE "Article" a
       SET "tags" = COALESCE(
             (SELECT array_agg(j."B" ORDER BY j."B") FROM "_ArticleToTag" j WHERE j."A" = a."id"),
             '{}');
  END IF;
END $$;

DROP TABLE IF EXISTS "_ArticleToTag";
DROP TABLE IF EXISTS "Tag";

ALTER TABLE "Article" DROP CONSTRAINT IF EXISTS "Article_categorySlug_fkey";
DROP TABLE IF EXISTS "Category";

-- La dirección de una guía ahora es única por web y por idioma, no en toda la base.
ALTER TABLE "Article" DROP CONSTRAINT IF EXISTS "Article_slug_key";
DROP INDEX IF EXISTS "Article_slug_key";
CREATE UNIQUE INDEX IF NOT EXISTS "Article_site_locale_slug_key" ON "Article"("site", "locale", "slug");

DROP INDEX IF EXISTS "Article_status_publishedAt_idx";
DROP INDEX IF EXISTS "Article_categorySlug_status_idx";
CREATE INDEX IF NOT EXISTS "Article_site_locale_status_publishedAt_idx"  ON "Article"("site", "locale", "status", "publishedAt");
CREATE INDEX IF NOT EXISTS "Article_site_locale_categorySlug_status_idx" ON "Article"("site", "locale", "categorySlug", "status");
CREATE INDEX IF NOT EXISTS "Article_site_translationKey_idx"             ON "Article"("site", "translationKey");

ALTER TABLE "Article" DROP CONSTRAINT IF EXISTS "Article_locale_check";
ALTER TABLE "Article" ADD  CONSTRAINT "Article_locale_check" CHECK ("locale" IN ('es', 'en'));

-- A partir de aquí el código siempre envía sitio e idioma de forma explícita.
ALTER TABLE "Article" ALTER COLUMN "site"   DROP DEFAULT;
ALTER TABLE "Article" ALTER COLUMN "locale" DROP DEFAULT;
