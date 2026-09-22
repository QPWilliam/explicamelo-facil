import type { Metadata } from "next";
import { ContactView } from "@/components/views/pages";
import { ensureRoute } from "@/lib/routes";
import { tr } from "@/lib/i18n";
import { routePath } from "@/lib/sites";

const LOCALE = "es";
const SEGMENT = "contacto";

export const metadata: Metadata = {
  title: tr(LOCALE).contact,
  alternates: { canonical: routePath("contact", LOCALE) }
};

export default function Page() {
  ensureRoute("contact", LOCALE, SEGMENT);
  return <ContactView locale={LOCALE} />;
}
