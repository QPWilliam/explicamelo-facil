import { NextResponse } from "next/server";
import { clientIp, rateLimited, sameOrigin } from "@/lib/admin";
import { createSession, safeEqual, SESSION_COOKIE } from "@/lib/session";

export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Origen no permitido." }, { status: 403 });
  if (rateLimited(`login:${clientIp(request)}`, 8, 15 * 60 * 1000)) {
    return NextResponse.json({ error: "Demasiados intentos. Espera 15 minutos e inténtalo de nuevo." }, { status: 429 });
  }
  const password = process.env.ADMIN_PASSWORD;
  if (!password || password.length < 12) {
    return NextResponse.json({ error: "Configura ADMIN_PASSWORD (12 caracteres como mínimo)." }, { status: 503 });
  }
  try {
    const body = await request.json();
    if (typeof body.password !== "string" || body.password.length > 200 || !safeEqual(password, body.password)) {
      return NextResponse.json({ error: "La contraseña no es correcta." }, { status: 401 });
    }
    const result = NextResponse.json({ ok: true });
    result.cookies.set(SESSION_COOKIE, createSession(), {
      httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", maxAge: 28800, path: "/"
    });
    return result;
  } catch {
    return NextResponse.json({ error: "No se pudo iniciar sesión." }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Origen no permitido." }, { status: 403 });
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(SESSION_COOKIE);
  return response;
}
