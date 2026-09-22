import type { Metadata, Viewport } from "next";
import { Manrope, Newsreader, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AdSenseHead } from "@/components/adsense";
import { GoogleAnalytics } from "@/components/analytics";
import { siteUrl } from "@/lib/content";
import { brand } from "@/lib/i18n";
import { defaultLocale, htmlLang, ogLocale, site } from "@/lib/sites";

// Cada tema usa sus tipografías. Se declaran las tres: aplicar la variable CSS no descarga nada,
// el navegador sólo baja la fuente que el CSS del tema activo llega a usar de verdad.
// `preload` tiene que ser un valor escrito tal cual (next/font no admite expresiones), y como aquí
// no se puede saber qué tema se está construyendo, va en false en las tres: se descargan al usarse.
const serif = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-serif", display: "swap", preload: false });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap", preload: false });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap", preload: false });

const { name, tagline, description } = brand(defaultLocale);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${name}: ${tagline}`, template: `%s | ${name}` },
  description,
  openGraph: {
    type: "website",
    siteName: name,
    locale: ogLocale[defaultLocale],
    url: siteUrl,
    images: [{ url: "/portada/inicio", width: 1600, height: 900, alt: name }]
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } } : {}),
  // Metaetiqueta de verificación de AdSense (método "Metaetiqueta" en AdSense > Sitios).
  ...(process.env.NEXT_PUBLIC_ADSENSE_CLIENT ? { other: { "google-adsense-account": process.env.NEXT_PUBLIC_ADSENSE_CLIENT } } : {})
};

export const viewport: Viewport = { themeColor: site.themeColor, width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={htmlLang[defaultLocale]}
      data-theme={site.theme}
      className={`${serif.variable} ${sans.variable} ${display.variable}`}
    >
      <head>
        <AdSenseHead />
      </head>
      <body>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
