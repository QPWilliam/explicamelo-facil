import { ImageResponse } from "next/og";
import { getArticle } from "@/lib/content";
import { categoryName } from "@/lib/schema";

// Portada automática (1600×900) para cada guía: /portada/<slug>
// Úsala en el campo "cover" como "/portada/<slug>" cuando no tengas una foto propia.
export const revalidate = 86400;

const palette: Record<string, [string, string]> = {
  dinero: ["#1f6f5c", "#e8f3ee"], tecnologia: ["#2b4c9b", "#e9eefb"], resenas: ["#7a36e0", "#f1eafe"],
  trabajo: ["#b4531b", "#fbeee6"], hogar: ["#a2195b", "#fbe9f1"], "vida-practica": ["#0f7c8c", "#e5f5f7"],
  visas: ["#1d5fa8", "#e7f0fa"], estudiar: ["#6b5b00", "#f7f2d9"], tramites: ["#3c4a57", "#eceff2"]
};

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const article = await getArticle((await params).slug);
  const title = article?.title ?? "Explícamelo Fácil";
  const [fg, bg] = palette[article?.category ?? "dinero"] ?? palette.dinero;
  const size = title.length > 60 ? 76 : title.length > 40 ? 88 : 100;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: bg, padding: "90px 100px", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", width: 1000, justifyContent: "center" }}>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700, letterSpacing: 4, color: fg }}>
            {`EXPLÍCAMELO FÁCIL · ${article ? categoryName(article.category).toUpperCase() : "GUÍAS"}`}
          </div>
          <div style={{ display: "flex", fontSize: size, fontWeight: 800, lineHeight: 1.08, color: "#1b1f24", marginTop: 28 }}>{title}</div>
        </div>
        <div style={{ position: "absolute", right: 70, top: 160, width: 520, height: 520, borderRadius: 520, background: fg, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="300" height="300" viewBox="0 0 64 64">
            <path d="M14 6h36a10 10 0 0 1 10 10v24a10 10 0 0 1-10 10H26l-12 10v-10a10 10 0 0 1-10-10V16A10 10 0 0 1 14 6z" fill="#ffffff" />
            <path d="M21 28.5h22a11 11 0 1 0-3.2 7.8" fill="none" stroke={fg} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="52" cy="12" r="6.5" fill="#f2c14e" />
          </svg>
        </div>
      </div>
    ),
    { width: 1600, height: 900 }
  );
}
