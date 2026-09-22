import type { Metadata, Viewport } from "next";
import { Manrope, Newsreader } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AdSenseHead } from "@/components/adsense";
import { GoogleAnalytics } from "@/components/analytics";
import { siteName, siteUrl } from "@/lib/content";

// Newsreader: tipografía editorial (titulares y texto de las guías). Manrope: interfaz.
// Sin el eje "opsz" los archivos de fuente pesan bastante menos; Manrope no se precarga porque solo
// se usa en menús y etiquetas (mientras carga se ve la fuente del sistema).
const serif = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${siteName}: guías claras para el día a día`, template: `%s | ${siteName}` },
  description: "Explicaciones fáciles en español sobre dinero, celulares, trámites, viajes, trabajo y dudas cotidianas.",
  openGraph: { type: "website", siteName, locale: "es_419", url: siteUrl, images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Explícamelo Fácil" }] },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } } : {}),
  // Metaetiqueta de verificación de AdSense (método "Metaetiqueta" en AdSense > Sitios).
  ...(process.env.NEXT_PUBLIC_ADSENSE_CLIENT ? { other: { "google-adsense-account": process.env.NEXT_PUBLIC_ADSENSE_CLIENT } } : {})
};

export const viewport: Viewport = { themeColor: "#1f6f5c", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${serif.variable} ${sans.variable}`}>
      <head>
        <AdSenseHead />
      </head>
      <body>
        <a href="#contenido" className="skip">Saltar al contenido</a>
        <SiteHeader />
        <main id="contenido">{children}</main>
        <SiteFooter />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
