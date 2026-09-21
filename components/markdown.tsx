import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugify } from "@/lib/schema";

function text(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(text).join("");
  if (node && typeof node === "object" && "props" in node) return text((node as { props: { children?: ReactNode } }).props.children);
  return "";
}

export function Markdown({ source }: { source: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
      h2: ({ children }) => <h2 id={slugify(text(children))}>{children}</h2>,
      h3: ({ children }) => <h3 id={slugify(text(children))}>{children}</h3>,
      a: ({ href = "", children }) => href.startsWith("http")
        ? <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
        : <a href={href}>{children}</a>,
      // eslint-disable-next-line @next/next/no-img-element
      img: ({ src, alt }) => <img src={typeof src === "string" ? src : ""} alt={alt || ""} loading="lazy" decoding="async" />,
      table: ({ children }) => <div className="table-wrap"><table>{children}</table></div>
    }}>{source}</ReactMarkdown>
  );
}

// Divide el cuerpo en secciones "## " para intercalar anuncios y construir el índice.
export function splitSections(body: string) {
  return body.split(/\n(?=## )/g);
}

export function headings(body: string) {
  return [...body.matchAll(/^## (.+)$/gm)].map(m => ({ title: m[1].replace(/[*_`]/g, "").trim(), id: slugify(m[1].replace(/[*_`]/g, "").trim()) }));
}
