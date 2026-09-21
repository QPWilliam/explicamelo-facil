import { NextResponse } from "next/server";
import { hasDatabase } from "@/lib/content";

export const dynamic = "force-dynamic";

// También lo usa la tarea diaria de Netlify para que Supabase gratis no pause la base de datos.
export async function GET() {
  if (!hasDatabase) return NextResponse.json({ status: "ok", database: "sin configurar" });
  try {
    const { ping } = await import("@/lib/repository");
    await ping();
    return NextResponse.json({ status: "ok", database: "ok" }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ status: "unavailable" }, { status: 503 });
  }
}
