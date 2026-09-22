import type { Metadata } from "next";
import { SearchView } from "@/components/views/search";
import { ensureRoute } from "@/lib/routes";
import { tr } from "@/lib/i18n";
import { defaultLocale } from "@/lib/sites";

const SEGMENT = "search";

export const metadata: Metadata = { title: tr(defaultLocale).searchTitle, robots: { index: false, follow: true } };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  ensureRoute("search", defaultLocale, SEGMENT);
  return <SearchView query={(await searchParams).q || ""} locale={defaultLocale} />;
}
