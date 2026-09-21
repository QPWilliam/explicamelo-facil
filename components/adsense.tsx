"use client";
import { useEffect, useRef } from "react";

export const adsClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "";
export const adsEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true" && adsClient.startsWith("ca-pub-");

// Script de AdSense como etiqueta <script> real en el <head> del HTML (así lo pide Google y así lo
// detecta su rastreador al verificar el sitio). Con "anuncios automáticos", Google coloca los anuncios solo.
// El aviso de cookies (CMP) para Europa se configura en AdSense > Privacidad y mensajes y usa este mismo script.
export function AdSenseHead() {
  if (!adsEnabled) return null;
  return (
    // eslint-disable-next-line @next/next/no-sync-scripts
    <script async crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsClient}`} />
  );
}

declare global { interface Window { adsbygoogle?: unknown[] } }

// Espacio manual de anuncio. Solo se muestra si hay un bloque (slot) configurado.
export function AdSlot({ slot = process.env.NEXT_PUBLIC_ADSENSE_SLOT, label = "Publicidad" }: { slot?: string; label?: string }) {
  const pushed = useRef(false);
  useEffect(() => {
    if (!adsEnabled || !slot || pushed.current) return;
    pushed.current = true;
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch { /* bloqueador de anuncios */ }
  }, [slot]);
  if (!adsEnabled || !slot) return null;
  return (
    <aside className="ad" aria-label={label}>
      <span className="ad-label">{label}</span>
      <ins className="adsbygoogle" style={{ display: "block" }} data-ad-client={adsClient} data-ad-slot={slot}
        data-ad-format="auto" data-full-width-responsive="true" />
    </aside>
  );
}
