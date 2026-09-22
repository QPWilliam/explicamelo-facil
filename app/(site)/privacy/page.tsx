import type { Metadata } from "next";
import { PrivacyView } from "@/components/views/pages";
import { ensureRoute } from "@/lib/routes";
import { tr } from "@/lib/i18n";
import { routePath, defaultLocale } from "@/lib/sites";

const LOCALE = defaultLocale;
const SEGMENT = "privacy";

export const metadata: Metadata = {
  title: tr(LOCALE).privacy,
  alternates: { canonical: routePath("privacy", LOCALE) }
};

export default function Page() {
  ensureRoute("privacy", LOCALE, SEGMENT);
  return <PrivacyView locale={LOCALE} />;
}
