import "server-only";
import { randomUUID } from "node:crypto";

// Sube imágenes a Supabase Storage mediante su API REST (sin dependencias extra).
// Requiere SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY y un bucket PÚBLICO (SUPABASE_BUCKET, por defecto "imagenes").
export async function uploadImage(input: Buffer, contentType: string) {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const bucket = process.env.SUPABASE_BUCKET || "imagenes";
  if (!url || !key) throw new Error("Configura SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY para subir imágenes.");

  let body: Buffer = input;
  let type = contentType;
  let width: number | undefined;
  let height: number | undefined;
  try {
    const sharp = (await import("sharp")).default;
    const result = await sharp(input, { limitInputPixels: 25_000_000 }).rotate()
      .resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer({ resolveWithObject: true });
    body = result.data; type = "image/webp"; width = result.info.width; height = result.info.height;
  } catch {
    // Si sharp no está disponible en el servidor, se sube la imagen original.
  }
  const ext = type === "image/webp" ? "webp" : type === "image/png" ? "png" : "jpg";
  const now = new Date();
  const path = `${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, "0")}/${randomUUID()}.${ext}`;
  const res = await fetch(`${url}/storage/v1/object/${bucket}/${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, apikey: key, "Content-Type": type, "Cache-Control": "31536000", "x-upsert": "false" },
    body: new Uint8Array(body)
  });
  if (!res.ok) throw new Error(`Supabase Storage respondió ${res.status}`);
  return { url: `${url}/storage/v1/object/public/${bucket}/${path}`, width, height };
}
