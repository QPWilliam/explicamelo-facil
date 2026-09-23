import { ImageResponse } from "next/og";
import { getArticle } from "@/lib/content";
import { categoryName, defaultLocale, site } from "@/lib/sites";

// Portada automática (1600×900) para cada guía: /portada/<slug>
// Úsala en el campo "cover" como "/portada/<slug>" cuando no tengas una foto propia.
export const revalidate = 86400;

// [color de acento, fondo] por sección. El tema oscuro sólo usa el acento.
const palette: Record<string, [string, string]> = {
  // Explícamelo Fácil
  dinero: ["#1f6f5c", "#e8f3ee"], tecnologia: ["#2b4c9b", "#e9eefb"], ia: ["#4338ca", "#ecebfd"],
  resenas: ["#7a36e0", "#f1eafe"], trabajo: ["#b4531b", "#fbeee6"], hogar: ["#a2195b", "#fbe9f1"],
  "vida-practica": ["#0f7c8c", "#e5f5f7"], visas: ["#1d5fa8", "#e7f0fa"], estudiar: ["#6b5b00", "#f7f2d9"],
  tramites: ["#3c4a57", "#eceff2"], belleza: ["#b4236a", "#fceaf3"], moda: ["#6d3f8c", "#f3eafa"],
  // No Landmarks
  "things-to-do": ["#f2b544", "#141a21"], "food-drink": ["#ef6a4c", "#141a21"],
  "getting-around": ["#4aa8ef", "#141a21"], "tickets-passes": ["#c084fc", "#141a21"],
  neighbourhoods: ["#4ade80", "#141a21"], "money-costs": ["#fbbf24", "#141a21"],
  "trip-basics": ["#38bdf8", "#141a21"],
  // Ground Level Japan
  "start-here": ["#e05a47", "#f4ede1"], "moving-settling": ["#54765a", "#edf2e9"],
  "daily-life": ["#bb6b35", "#f6ede4"], "food-shopping": ["#9e3f35", "#f7ebe8"],
  "culture-etiquette": ["#76507e", "#f1eaf2"], "places-weekends": ["#34777c", "#e8f2f1"]
};

const japanPalette: Record<string, [string, string]> = {
  "getting-around": ["#315f88", "#e8eff4"],
  "money-costs": ["#806727", "#f4f0df"]
};

const fallback = site.categories[0].slug;
const dark = site.theme === "visual";

function Mark({ color, background }: { color: string; background: string }) {
  if (site.key === "nolandmarks") {
    return (
      <svg width="300" height="300" viewBox="0 0 64 64">
        <rect x="3" y="3" width="58" height="58" rx="14" fill={background} />
        <path d="M14 46c6-2 9-6 8-11-1-6-9-6-10-1-1 6 6 10 14 10 7 0 11-4 12-10 1-7-3-12-3-12"
          fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeDasharray="1 8" />
        <circle cx="35" cy="22" r="6.5" fill={color} />
      </svg>
    );
  }
  if (site.key === "groundleveljapan") {
    return (
      <svg width="300" height="300" viewBox="0 0 64 64">
        <rect x="3" y="3" width="58" height="58" rx="14" fill={background} />
        <circle cx="45" cy="18" r="7" fill="#e05a47" />
        <path d="M13 49h38M24 49l6-25h4l6 25" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32 29v5M32 40v5" fill="none" stroke="#e05a47" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="300" height="300" viewBox="0 0 64 64">
      <path d="M14 6h36a10 10 0 0 1 10 10v24a10 10 0 0 1-10 10H26l-12 10v-10a10 10 0 0 1-10-10V16A10 10 0 0 1 14 6z" fill="#ffffff" />
      <path d="M21 28.5h22a11 11 0 1 0-3.2 7.8" fill="none" stroke={color} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="52" cy="12" r="6.5" fill="#f2c14e" />
    </svg>
  );
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const article = await getArticle((await params).slug);
  const locale = article?.locale ?? defaultLocale;
  const title = article?.title ?? site.name;
  const category = article?.category ?? fallback;
  const [accent, background] = (site.key === "groundleveljapan" ? japanPalette[category] : undefined) ?? palette[category] ?? palette[fallback];
  const ink = dark ? "#f4f6f8" : "#1b1f24";
  const size = title.length > 60 ? 76 : title.length > 40 ? 88 : 100;
  const kicker = `${site.name.toUpperCase()} · ${article ? categoryName(article.category, locale).toUpperCase() : ""}`.replace(/ · $/, "");

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background, padding: "90px 100px", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", width: 1000, justifyContent: "center" }}>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700, letterSpacing: 4, color: accent }}>{kicker}</div>
          <div style={{ display: "flex", fontSize: size, fontWeight: 800, lineHeight: 1.08, color: ink, marginTop: 28 }}>{title}</div>
        </div>
        <div style={{
          position: "absolute", right: 70, top: 160, width: 520, height: 520, borderRadius: 520,
          background: dark ? "rgba(255,255,255,0.06)" : accent,
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <Mark color={dark ? accent : "#ffffff"} background={dark ? "transparent" : accent} />
        </div>
      </div>
    ),
    { width: 1600, height: 900 }
  );
}
