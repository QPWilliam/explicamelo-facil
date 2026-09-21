import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { safeEqual } from "@/lib/session";

// Refresca el sitio después de publicar con `npm run publicar` (Authorization: Bearer REVALIDATE_SECRET).
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || secret.length < 24) return NextResponse.json({ error: "REVALIDATE_SECRET no configurado." }, { status: 503 });
  if (!safeEqual(request.headers.get("authorization") || "", `Bearer ${secret}`)) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }
  revalidateTag("articles", { expire: 0 });
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
