"use client";
import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugify, type Article } from "@/lib/schema";
import { articlePath, categoryName, defaultLocale, site, type Locale } from "@/lib/sites";

type Draft = {
  slug: string; title: string; excerpt: string; category: string; country: string;
  locale: Locale; city: string; translationKey: string;
  cover: string; coverAlt: string; coverCredit: string; body: string; author: string;
  status: "draft" | "published"; featured: boolean; tags: string; checklist: string; sources: string;
};

const empty: Draft = {
  slug: "", title: "", excerpt: "", category: site.categories[0].slug, country: "General",
  locale: defaultLocale, city: "", translationKey: "",
  cover: "", coverAlt: "", coverCredit: "",
  body: "**Explicado fácil:** resume aquí la respuesta en 2 o 3 frases.\n\n## Paso 1: …\n\nTexto…\n",
  author: site.author, status: "draft", featured: false, tags: "", checklist: "", sources: ""
};

function toDraft(a: Article): Draft {
  return { ...a, city: a.city ?? "", translationKey: a.translationKey ?? "",
    tags: a.tags.join(", "), checklist: a.checklist.join("\n"),
    sources: a.sources.map(s => `${s.title} | ${s.url}`).join("\n") };
}

function toArticle(d: Draft, original?: Article) {
  const now = new Date().toISOString();
  return {
    ...d,
    tags: d.tags.split(",").map(t => t.trim()).filter(Boolean),
    checklist: d.checklist.split("\n").map(t => t.trim()).filter(Boolean),
    sources: d.sources.split("\n").map(l => l.trim()).filter(Boolean).map(l => {
      const i = l.lastIndexOf("|");
      return i === -1 ? { title: l, url: l } : { title: l.slice(0, i).trim(), url: l.slice(i + 1).trim() };
    }),
    city: d.city.trim() || null,
    translationKey: d.translationKey.trim() || null,
    publishedOnce: original?.publishedOnce ?? false,
    publishedAt: original?.publishedAt ?? now, updatedAt: now
  };
}

async function upload(file: File) {
  const form = new FormData(); form.append("image", file);
  const res = await fetch("/api/editor/upload", { method: "POST", body: form });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "No se pudo subir la imagen.");
  return data.url as string;
}

export function EditorApp() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [editing, setEditing] = useState<{ draft: Draft; original?: Article } | null>(null);
  const [message, setMessage] = useState<{ text: string; error?: boolean } | null>(null);
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);

  async function load() {
    const res = await fetch("/api/editor/articles", { cache: "no-store" });
    const data = await res.json();
    if (res.ok) setArticles(data); else setMessage({ text: data.error, error: true });
  }
  useEffect(() => { void load(); }, []);

  const d = editing?.draft;
  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setEditing(e => e && {
    ...e, draft: { ...e.draft, [k]: v, ...(k === "title" && !slugTouched && !e.original ? { slug: slugify(String(v)) } : {}) }
  });
  const words = useMemo(() => (d ? d.body.split(/\s+/).filter(Boolean).length : 0), [d]);

  async function save(status?: "draft" | "published") {
    if (!editing) return;
    setBusy(true); setMessage(null);
    const draft = status ? { ...editing.draft, status } : editing.draft;
    const res = await fetch("/api/editor/articles", {
      method: editing.original ? "PUT" : "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ article: toArticle(draft, editing.original), previousSlug: editing.original?.slug })
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) { setMessage({ text: data.error || "No se pudo guardar.", error: true }); return; }
    setEditing({ draft: toDraft(data), original: data });
    setMessage({ text: data.status === "published" ? `Publicado: /${data.slug}` : "Borrador guardado." });
    void load();
  }

  async function onImage(e: React.ChangeEvent<HTMLInputElement>, target: "cover" | "body") {
    const file = e.target.files?.[0]; e.target.value = "";
    if (!file) return;
    setBusy(true); setMessage(null);
    try {
      const url = await upload(file);
      if (target === "cover") set("cover", url);
      else set("body", `${d?.body.trimEnd()}\n\n![Describe la imagen](${url})\n`);
      setMessage({ text: "Imagen subida." });
    } catch (err) { setMessage({ text: (err as Error).message, error: true }); }
    setBusy(false);
  }

  async function logout() {
    await fetch("/api/session", { method: "DELETE" }); location.reload();
  }

  if (!editing) {
    return (
      <>
        <div className="toolbar" style={{ justifyContent: "space-between", marginBottom: 16 }}>
          <h1 style={{ margin: 0 }}>Guías</h1>
          <div className="toolbar">
            <button className="btn" onClick={() => { setSlugTouched(false); setEditing({ draft: { ...empty } }); }}>+ Nueva guía</button>
            <button className="btn secondary" onClick={logout}>Salir</button>
          </div>
        </div>
        {message && <p className={`notice ${message.error ? "error" : ""}`}>{message.text}</p>}
        <ul className="admin-list">
          {articles.map(a => (
            <li key={a.slug}>
              <div>
                <strong>{a.title}</strong><br />
                <span className="muted small">{articlePath(a.slug, a.locale)} · {categoryName(a.category, a.locale)}</span>
              </div>
              <div className="toolbar">
                <span className={`status ${a.status}`}>{a.status === "published" ? "Publicado" : "Borrador"}</span>
                {a.status === "published" && <a className="btn secondary" href={articlePath(a.slug, a.locale)} target="_blank">Ver</a>}
                <button className="btn secondary" onClick={() => { setSlugTouched(true); setEditing({ draft: toDraft(a), original: a }); setMessage(null); }}>Editar</button>
              </div>
            </li>
          ))}
        </ul>
        {articles.length === 0 && <p className="empty">Aún no hay guías. Crea la primera o ejecuta <code>npm run db:seed</code>.</p>}
      </>
    );
  }

  return (
    <div className="form">
      <div className="toolbar" style={{ justifyContent: "space-between" }}>
        <button className="btn secondary" onClick={() => { setEditing(null); setMessage(null); }}>← Volver</button>
        <div className="toolbar">
          <button className="btn secondary" onClick={() => setPreview(p => !p)}>{preview ? "Editar texto" : "Vista previa"}</button>
          <button className="btn secondary" disabled={busy} onClick={() => save("draft")}>Guardar borrador</button>
          <button className="btn" disabled={busy} onClick={() => save("published")}>Publicar</button>
        </div>
      </div>
      {message && <p className={`notice ${message.error ? "error" : ""}`} role="status">{message.text}</p>}
      <label>Título<input value={d!.title} onChange={e => set("title", e.target.value)} placeholder="Cómo … (como lo buscaría la gente)" /></label>
      <div className="row">
        <label>Dirección (URL)
          <input value={d!.slug} disabled={Boolean(editing.original?.publishedOnce)} onChange={e => { setSlugTouched(true); set("slug", slugify(e.target.value)); }} />
          <span className="hint">{site.domain}{articlePath(d!.slug || "…", d!.locale)}{editing.original?.publishedOnce ? " (ya publicada: no se puede cambiar)" : ""}</span>
        </label>
        <label>Categoría
          <select value={d!.category} onChange={e => set("category", e.target.value)}>
            {site.categories.map(c => <option key={c.slug} value={c.slug}>{categoryName(c.slug, d!.locale)}</option>)}
          </select>
        </label>
        <label>País<input value={d!.country} onChange={e => set("country", e.target.value)} /><span className="hint">“General” si aplica a todos</span></label>
      </div>
      {site.locales.length > 1 && (
        <div className="row">
          <label>Idioma
            <select value={d!.locale} onChange={e => set("locale", e.target.value as Locale)} disabled={Boolean(editing.original)}>
              {site.locales.map(l => <option key={l} value={l}>{l === "en" ? "English" : "Español"}</option>)}
            </select>
            <span className="hint">{editing.original ? "No se cambia una guía ya creada" : "Cada idioma es una guía distinta"}</span>
          </label>
          <label>Ciudad<input value={d!.city} onChange={e => set("city", e.target.value)} placeholder="Londres" /></label>
          <label>Clave de traducción
            <input value={d!.translationKey} onChange={e => set("translationKey", e.target.value)} placeholder="camden-guide" />
            <span className="hint">La misma en las dos versiones para enlazarlas</span>
          </label>
        </div>
      )}
      <label>Resumen (aparece en Google y en las tarjetas)<textarea value={d!.excerpt} onChange={e => set("excerpt", e.target.value)} maxLength={320} style={{ minHeight: 70 }} />
        <span className="hint">{d!.excerpt.length}/320 · ideal 120–160</span></label>
      <div className="row">
        <label>Portada (URL o sube una)<input value={d!.cover} onChange={e => set("cover", e.target.value)} placeholder="/images/… o https://…" />
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={e => onImage(e, "cover")} /></label>
        <label>Texto alternativo de la portada<input value={d!.coverAlt} onChange={e => set("coverAlt", e.target.value)} placeholder="Describe la imagen" /></label>
        <label>Crédito de la imagen<input value={d!.coverCredit} onChange={e => set("coverCredit", e.target.value)} /></label>
      </div>
      <label>Contenido (Markdown: ## Subtítulo, **negrita**, - lista, [enlace](https://…))
        {preview
          ? <div className="preview prose"><ReactMarkdown remarkPlugins={[remarkGfm]}>{d!.body}</ReactMarkdown></div>
          : <textarea className="body-input" value={d!.body} onChange={e => set("body", e.target.value)} />}
        <span className="hint">{words} palabras · recomendado: 600 o más</span>
      </label>
      <label>Insertar imagen en el texto<input type="file" accept="image/jpeg,image/png,image/webp" onChange={e => onImage(e, "body")} /></label>
      <div className="row">
        <label>Checklist (una por línea)<textarea value={d!.checklist} onChange={e => set("checklist", e.target.value)} /></label>
        <label>Fuentes (una por línea: Título | https://…)<textarea value={d!.sources} onChange={e => set("sources", e.target.value)} /></label>
      </div>
      <div className="row">
        <label>Etiquetas (separadas por coma)<input value={d!.tags} onChange={e => set("tags", e.target.value)} /></label>
        <label>Autor<input value={d!.author} onChange={e => set("author", e.target.value)} /></label>
        <label style={{ alignContent: "center" }}><span><input type="checkbox" checked={d!.featured} onChange={e => set("featured", e.target.checked)} style={{ width: "auto" }} /> Destacada</span></label>
      </div>
      <p className="muted small">Estado actual: {d!.status === "published" ? "Publicado" : "Borrador"}. “Guardar borrador” la oculta del sitio.</p>
    </div>
  );
}
