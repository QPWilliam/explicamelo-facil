import { NextResponse } from "next/server";
import { isEditor, sameOrigin } from "@/lib/admin";
import { uploadImage } from "@/lib/storage";

const allowed = ["image/jpeg", "image/png", "image/webp"];

export async function POST(request: Request) {
  if (!sameOrigin(request) || !(await isEditor())) return NextResponse.json({ error: "Inicia sesión para subir imágenes." }, { status: 401 });
  try {
    if (Number(request.headers.get("content-length")) > 6 * 1024 * 1024) return NextResponse.json({ error: "La imagen supera 5 MB." }, { status: 413 });
    const form = await request.formData();
    const file = form.get("image");
    if (!(file instanceof File) || file.size > 5 * 1024 * 1024 || !allowed.includes(file.type)) {
      return NextResponse.json({ error: "Elige una imagen JPG, PNG o WebP de hasta 5 MB." }, { status: 422 });
    }
    const result = await uploadImage(Buffer.from(await file.arrayBuffer()), file.type);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const message = error instanceof Error && error.message.startsWith("Configura") ? error.message : "La imagen no se pudo subir. Inténtalo de nuevo.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
