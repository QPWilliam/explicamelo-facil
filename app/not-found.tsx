import Link from "next/link";
import { tr } from "@/lib/i18n";
import { defaultLocale, localePrefix, routePath } from "@/lib/sites";

export default function NotFound() {
  const d = tr(defaultLocale);
  return (
    <div className="narrow page">
      <h1>{d.notFoundTitle}</h1>
      <p>{d.notFoundBody}</p>
      <p>
        <Link href={localePrefix(defaultLocale) || "/"} className="btn">{d.backHome}</Link>{" "}
        <Link href={routePath("search", defaultLocale)} className="btn secondary">{d.goSearch}</Link>
      </p>
    </div>
  );
}
