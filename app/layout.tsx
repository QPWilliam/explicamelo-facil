import type { Metadata, Viewport } from "next";
import { Manrope, Newsreader } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AdSenseScript } from "@/components/adsense";
import { GoogleAnalytics } from "@/components/analytics";
import { siteName, siteUrl } from "@/lib/content";

// Newsreader: tipografía editorial (titulares y texto de las guías). Manrope: interfaz.
const serif = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-serif", display: "swap", axes: ["opsz"] });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${siteName}: guías claras para el día a día`, template: `%s | ${siteName}` },
  description: "Explicaciones fáciles en español sobre dinero, celulares, trámites, viajes, trabajo y dudas cotidianas.",
  openGraph: { type: "website", siteName, locale: "es_419", url: siteUrl },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } } : {})
};

export const viewport: Viewport = { themeColor: "#1f6f5c", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a href="#contenido" className="skip">Saltar al contenido</a>
        <SiteHeader />
        <main id="contenido">{children}</main>
        <SiteFooter />
        <AdSenseScript />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
