import Image from "next/image";
import Link from "next/link";
import { readingMinutes, type Article } from "@/lib/schema";
import { articlePath, categoryName, defaultLocale, type Locale } from "@/lib/sites";
import { tr } from "@/lib/i18n";

export function ArticleCard({
  article,
  locale = defaultLocale,
  priority = false
}: {
  article: Article;
  locale?: Locale;
  priority?: boolean;
}) {
  const d = tr(locale);
  return (
    <article className="card">
      <Link href={articlePath(article.slug, locale)} className="card-link">
        <div className="card-img">
          <Image src={article.cover} alt={article.coverAlt} fill sizes="(max-width: 700px) 100vw, 360px" priority={priority} />
        </div>
        <div className="card-body">
          <span className="chip">{categoryName(article.category, locale)}</span>
          <h3>{article.title}</h3>
          <p>{article.excerpt}</p>
          <span className="muted small">{d.readingTime(readingMinutes(article.body))}</span>
        </div>
      </Link>
    </article>
  );
}
