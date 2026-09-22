import { ImageResponse } from "next/og";
import { site } from "@/lib/sites";

// Favicon de cada web (el archivo estático no serviría: el repositorio construye varias marcas).
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  const landmarks = site.key === "nolandmarks";
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        {landmarks ? (
          <svg width="64" height="64" viewBox="0 0 64 64">
            <rect x="3" y="3" width="58" height="58" rx="14" fill="#11161c" />
            <path d="M14 46c6-2 9-6 8-11-1-6-9-6-10-1-1 6 6 10 14 10 7 0 11-4 12-10 1-7-3-12-3-12"
              fill="none" stroke="#f2b544" strokeWidth="4" strokeLinecap="round" strokeDasharray="1 8" />
            <circle cx="35" cy="22" r="6.5" fill="#f2b544" />
          </svg>
        ) : (
          <svg width="64" height="64" viewBox="0 0 64 64">
            <path d="M14 6h36a10 10 0 0 1 10 10v24a10 10 0 0 1-10 10H26l-12 10v-10a10 10 0 0 1-10-10V16A10 10 0 0 1 14 6z" fill="#1f6f5c" />
            <path d="M21 28.5h22a11 11 0 1 0-3.2 7.8" fill="none" stroke="#fff" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="52" cy="12" r="6.5" fill="#f2c14e" />
          </svg>
        )}
      </div>
    ),
    size
  );
}
