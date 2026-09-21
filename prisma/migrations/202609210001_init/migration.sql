CREATE TABLE "Category" ("slug" TEXT PRIMARY KEY, "name" TEXT NOT NULL);
CREATE TABLE "Tag" ("name" TEXT PRIMARY KEY);
CREATE TABLE "Article" (
 "id" TEXT PRIMARY KEY, "slug" TEXT NOT NULL UNIQUE,
 "title" TEXT NOT NULL, "excerpt" TEXT NOT NULL, "country" TEXT NOT NULL,
 "cover" TEXT NOT NULL, "coverAlt" TEXT NOT NULL, "coverCredit" TEXT NOT NULL DEFAULT '',
 "body" TEXT NOT NULL, "author" TEXT NOT NULL, "status" TEXT NOT NULL DEFAULT 'draft',
 "featured" BOOLEAN NOT NULL DEFAULT false, "publishedOnce" BOOLEAN NOT NULL DEFAULT false,
 "publishedAt" TIMESTAMP(3) NOT NULL, "updatedAt" TIMESTAMP(3) NOT NULL,
 "categorySlug" TEXT NOT NULL REFERENCES "Category"("slug") ON UPDATE CASCADE,
 "sources" JSONB NOT NULL, "checklist" JSONB NOT NULL,
 CONSTRAINT "Article_status_check" CHECK ("status" IN ('draft', 'published'))
);
CREATE TABLE "_ArticleToTag" (
 "A" TEXT NOT NULL REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE,
 "B" TEXT NOT NULL REFERENCES "Tag"("name") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "_ArticleToTag_AB_unique" ON "_ArticleToTag"("A", "B");
CREATE INDEX "_ArticleToTag_B_index" ON "_ArticleToTag"("B");
CREATE INDEX "Article_status_publishedAt_idx" ON "Article"("status", "publishedAt");
CREATE INDEX "Article_categorySlug_status_idx" ON "Article"("categorySlug", "status");
