import Image from "next/image";
import Link from "next/link";
import { categoryName, readingMinutes, type Article } from "@/lib/schema";

export function ArticleCard({ article, priority = false }: { article: Article; priority?: boolean }) {
  return (
    <article className="card">
      <Link href={`/${article.slug}`} className="card-link">
        <div className="card-img">
          <Image src={article.cover} alt={article.coverAlt} fill sizes="(max-width: 700px) 100vw, 360px" priority={priority} />
        </div>
        <div className="card-body">
          <span className="chip">{categoryName(article.category)}</span>
          <h3>{article.title}</h3>
          <p>{article.excerpt}</p>
          <span className="muted small">{readingMinutes(article.body)} min de lectura</span>
        </div>
      </Link>
    </article>
  );
}
