import "server-only";
import { cookies } from "next/headers";
import { SESSION_COOKIE, validSession } from "./session";

export async function isEditor() {
  return validSession((await cookies()).get(SESSION_COOKIE)?.value);
}

export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return origin !== null && origin === new URL(request.url).origin;
}

// Límite simple en memoria (por instancia). Suficiente para frenar intentos repetidos de contraseña.
const hits = new Map<string, { count: number; reset: number }>();
export function rateLimited(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.reset < now) { hits.set(key, { count: 1, reset: now + windowMs }); return false; }
  entry.count += 1;
  return entry.count > limit;
}

export function clientIp(request: Request) {
  return request.headers.get("x-nf-client-connection-ip") || request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
}
