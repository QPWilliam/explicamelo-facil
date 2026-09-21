# Estado del proyecto

Actualizado: 2026-09-22.

## En producción

- **https://explicamelofacil.com** en Netlify con HTTPS; `www` redirige al dominio principal.
- Supabase conectado (`/api/health` → database ok). Guías cargadas con `npm run publicar`.
- Páginas: portada, guía `/[slug]`, categorías (10), búsqueda, acerca, contacto, privacidad, editor `/admin`.
- SEO: metadatos, JSON-LD, `sitemap.xml`, `robots.txt`. Search Console configurado por el dueño.
- Google Analytics activo. AdSense: sitio verificado (fragmento de código), revisión solicitada.
  Mensaje de consentimiento de Google (3 opciones) configurado para EEE/Reino Unido/Suiza.
- Unas 61 guías publicadas o listas para publicar (`content/nuevos/lote-ia-y-fotos.json`).

## Pendiente

- Esperar la aprobación de AdSense. Luego: activar anuncios automáticos y, opcional,
  crear un bloque "In-article" y ponerlo en `NEXT_PUBLIC_ADSENSE_SLOT` (Netlify).
- Reescribir con el estilo nuevo las 3 guías antiguas (visa EE. UU., pasaporte Guatemala, Japón).
- Alargar las guías más visitadas a 700–1.000 palabras (usar datos de Search Console/Analytics).
- Seguir el catálogo (`docs/catalogo-contenido.md`): 2–3 guías por semana.
- Revisar cada 3 meses precios y datos de guías que cambian (planes de IA, visas, tarifas).
- Antes de cobrar desde Japón: el dueño debe revisar el permiso de actividades fuera de su visa.
