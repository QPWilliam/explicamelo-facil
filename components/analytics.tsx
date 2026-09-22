import Script from "next/script";

// Google Analytics 4. Solo se carga si NEXT_PUBLIC_GA_ID (G-XXXXXXXXXX) está configurado.
// "lazyOnload": se carga cuando la página ya terminó, para no retrasar lo que ve el lector.
export function GoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id || !/^G-[A-Z0-9]+$/.test(id)) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="lazyOnload" />
      <Script id="ga4" strategy="lazyOnload">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${id}');
      `}</Script>
    </>
  );
}
