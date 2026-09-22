import type { Metadata } from "next";
import { SearchView } from "@/components/views/search";
import { ensureRoute } from "@/lib/routes";
import { tr } from "@/lib/i18n";

export const metadata: Metadata = { title: tr("es").searchTitle, robots: { index: false, follow: true } };

export default async function SpanishSearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  ensureRoute("search", "es", "buscar");
  return <SearchView query={(await searchParams).q || ""} locale="es" />;
}
