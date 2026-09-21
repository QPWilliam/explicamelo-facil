import type { NextConfig } from "next";

const config: NextConfig = {
  poweredByHeader: false,
  images: {
    // Imágenes subidas desde el editor (Supabase Storage).
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" },
      // Fotos con licencia de Unsplash (uso comercial permitido; se da crédito al fotógrafo).
      { protocol: "https", hostname: "images.unsplash.com" }
    ]
  },
  async headers() {
    return [{ source: "/(.*)", headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" }
    ] }];
  }
};

export default config;
