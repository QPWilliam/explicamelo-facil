import { NextResponse } from "next/server";
import { getArticles } from "@/lib/content";

// API pública (lista de guías publicadas). Pensada también para una futura app móvil.
export async function GET() {
  const articles = await getArticles();
  return NextResponse.json(articles, { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" } });
}
