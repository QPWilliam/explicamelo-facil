"use client";

import { useEffect, useState } from "react";

const fallbackUrl = "https://nolandmarks.com";

export function TranslatePageLink({ label }: { label: string }) {
  const [pageUrl, setPageUrl] = useState(fallbackUrl);

  useEffect(() => setPageUrl(window.location.href), []);

  const href = `https://translate.google.com/translate?sl=en&tl=es&u=${encodeURIComponent(pageUrl)}`;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" hrefLang="es">
      {label}
    </a>
  );
}
