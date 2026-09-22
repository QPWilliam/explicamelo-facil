import { HomeView } from "@/components/views/home";
import { defaultLocale } from "@/lib/sites";

export const revalidate = 3600;

export default function Home() {
  return <HomeView locale={defaultLocale} />;
}
