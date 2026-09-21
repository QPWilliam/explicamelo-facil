import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { isEditor, sameOrigin } from "@/lib/admin";
import { articleSchema } from "@/lib/schema";
import { hasDatabase } from "@/lib/content";

function noDatabase() {
  return NextResponse.json({ error: "Configura DATABASE_URL (Supabase) para poder guardar artículos." }, { status: 503 });
}

export async function GET() {
  if (!(await isEditor())) return NextResponse.json({ error: "Inicia sesión para continuar." }, { status: 401 });
  if (!hasDatabase) return noDatabase();
  try {
    const { listArticles } = await import("@/lib/repository");
    return NextResponse.json(await listArticles(true), { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "No se pudieron cargar las guías. Reintenta en un momento." }, { status: 503 });
  }
}

async function save(request: Request) {
  if (!sameOrigin(request) || !(await isEditor())) {
    return NextResponse.json({ error: "Tu sesión ha caducado. Vuelve a iniciar sesión." }, { status: 401 });
  }
  if (!hasDatabase) return noDatabase();
  try {
    const { article, previousSlug } = await request.json();
    const { saveArticle } = await import("@/lib/repository");
    const saved = await saveArticle(articleSchema.parse(article), request.method === "PUT" ? previousSlug : undefined);
    revalidateTag("articles", { expire: 0 });
    revalidatePath("/", "layout");
    return NextResponse.json(saved, { status: request.method === "POST" ? 201 : 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Revisa los campos: " + error.issues.map(i => `${i.path.join(".")}: ${i.message}`).join("; ") }, { status: 422 });
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json({ error: "Ya existe una guía con esa dirección." }, { status: 409 });
    }
    if (error instanceof Error && "status" in error) {
      return NextResponse.json({ error: error.message }, { status: Number((error as { status: number }).status) });
    }
    console.error("save article failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "No se guardó el artículo. Tu texto sigue en el formulario; inténtalo de nuevo." }, { status: 503 });
  }
}

export const POST = save;
export const PUT = save;
