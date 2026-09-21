import { z } from "zod";
export const categories = [
  { slug: "dinero", name: "Dinero y bancos", description: "Tu dinero, sin letra pequeña", icon: "wallet" },
  { slug: "tecnologia", name: "Celular y tecnología", description: "Tu celular, más fácil y seguro", icon: "smartphone" },
  { slug: "resenas", name: "Reseñas y comparativas", description: "Qué comprar sin arrepentirte", icon: "star" },
  { slug: "trabajo", name: "Trabajo y empleo", description: "Del CV a tu primer día", icon: "briefcase" },
  { slug: "tramites", name: "Trámites", description: "El papeleo, paso a paso", icon: "file" },
  { slug: "visas", name: "Visas y viajes", description: "Tu próximo destino empieza aquí", icon: "plane" },
  { slug: "estudiar", name: "Estudiar fuera", description: "Aprende más allá de tus fronteras", icon: "graduation" },
  { slug: "hogar", name: "Casa y hogar", description: "Trucos que sí funcionan en casa", icon: "home" },
  { slug: "vida-practica", name: "Vida práctica", description: "Pequeñas dudas, respuestas claras", icon: "sparkles" }
] as const;
export type CategorySlug = (typeof categories)[number]["slug"];
export const categorySchema = z.enum(categories.map(c => c.slug) as [CategorySlug, ...CategorySlug[]]);
const imageUrl = z.string().max(2000).refine(v => /^\/((images|uploads)\/)\S+$/.test(v) || /^https:\/\//.test(v), "Usa una imagen local o una URL HTTPS.");
export const reservedSlugs = ["admin", "api", "categoria", "buscar", "acerca", "privacidad", "contacto", "sitemap", "robots", "ads", "images", "uploads", "_next"];
export const articleSchema = z.object({
  slug: z.string().min(3).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).refine(v => !reservedSlugs.includes(v), "Esa dirección está reservada por el sitio."),
  title: z.string().min(8).max(160), excerpt: z.string().min(20).max(320),
  category: categorySchema, country: z.string().min(2).max(60),
  cover: imageUrl, coverAlt: z.string().min(8).max(240), coverCredit: z.string().max(300).default(""),
  body: z.string().min(80).max(100000),
  author: z.string().min(2).max(100),
  status: z.enum(["draft", "published"]), featured: z.boolean(), publishedOnce: z.boolean().default(false),
  tags: z.array(z.string().min(1).max(50)).max(12),
  sources: z.array(z.object({ title: z.string().min(3).max(160), url: z.url().refine(v => v.startsWith("https://")) })).max(20),
  checklist: z.array(z.string().min(3).max(200)).max(20),
  publishedAt: z.iso.datetime(), updatedAt: z.iso.datetime()
});
export type Article = z.infer<typeof articleSchema>;
export function readingMinutes(body: string) { return Math.max(1, Math.ceil(body.split(/\s+/).length / 200)); }
export function categoryName(slug: string) { return categories.find(c => c.slug === slug)?.name ?? slug; }
export function slugify(text: string) { return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
