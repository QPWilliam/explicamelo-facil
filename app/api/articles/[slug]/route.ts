import { NextResponse } from "next/server";
import { getArticle } from "@/lib/content";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const article = await getArticle((await params).slug);
  if (!article) return NextResponse.json({ error: "Guía no encontrada." }, { status: 404 });
  return NextResponse.json(article, { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" } });
}
