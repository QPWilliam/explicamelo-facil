import type { Metadata } from "next";
import { PrivacyView } from "@/components/views/pages";
import { ensureRoute } from "@/lib/routes";
import { tr } from "@/lib/i18n";
import { routePath } from "@/lib/sites";

const LOCALE = "es";
const SEGMENT = "privacidad";

export const metadata: Metadata = {
  title: tr(LOCALE).privacy,
  alternates: { canonical: routePath("privacy", LOCALE) }
};

export default function Page() {
  ensureRoute("privacy", LOCALE, SEGMENT);
  return <PrivacyView locale={LOCALE} />;
}
