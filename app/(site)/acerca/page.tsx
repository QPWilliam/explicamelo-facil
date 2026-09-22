import type { Metadata } from "next";
import { AboutView } from "@/components/views/pages";
import { ensureRoute } from "@/lib/routes";
import { tr } from "@/lib/i18n";
import { routePath, defaultLocale } from "@/lib/sites";

const LOCALE = defaultLocale;
const SEGMENT = "acerca";

export const metadata: Metadata = {
  title: tr(LOCALE).about,
  alternates: { canonical: routePath("about", LOCALE) }
};

export default function Page() {
  ensureRoute("about", LOCALE, SEGMENT);
  return <AboutView locale={LOCALE} />;
}
