import { createHmac, timingSafeEqual, createHash } from "node:crypto";
export const SESSION_COOKIE = "ef_editor";
function secret() {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value || value.length < 32) throw new Error("Configura ADMIN_SESSION_SECRET (32 caracteres como mínimo).");
  return value;
}
export function safeEqual(a: string, b: string) { return timingSafeEqual(createHash("sha256").update(a).digest(), createHash("sha256").update(b).digest()); }
export function createSession(now = Date.now()) {
  const payload = Buffer.from(JSON.stringify({ expires: now + 8 * 60 * 60 * 1000 })).toString("base64url");
  return `${payload}.${createHmac("sha256", secret()).update(payload).digest("base64url")}`;
}
export function validSession(value?: string, now = Date.now()) {
  try {
    if (!value) return false;
    const parts = value.split(".");
    if (parts.length !== 2) return false;
    const [payload, signature] = parts;
    const expected = createHmac("sha256", secret()).update(payload).digest("base64url");
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    return safeEqual(signature, expected) && typeof data.expires === "number" && data.expires > now;
  } catch { return false; }
}
