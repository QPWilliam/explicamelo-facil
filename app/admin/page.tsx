import type { Metadata } from "next";
import { isEditor } from "@/lib/admin";
import { hasDatabase } from "@/lib/content";
import { LoginForm } from "@/components/login-form";
import { EditorApp } from "@/components/editor";

export const metadata: Metadata = { title: "Editor", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const editor = await isEditor().catch(() => false);
  return (
    <div className="wrap admin">
      {!hasDatabase && <p className="notice error">Falta DATABASE_URL: puedes ver el sitio con los artículos de ejemplo, pero no guardar cambios.</p>}
      {editor ? <EditorApp /> : <LoginForm />}
    </div>
  );
}
