import { HomeView } from "@/components/views/home";
import { ensureLocale } from "@/lib/routes";

export const revalidate = 3600;

export default function SpanishHome() {
  ensureLocale("es");
  return <HomeView locale="es" />;
}
