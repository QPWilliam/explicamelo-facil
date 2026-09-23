# Estado del proyecto

Actualizado: 2026-09-22.

## En producción

- **https://explicamelofacil.com** en Netlify con HTTPS; `www` redirige al dominio principal.
- Supabase conectado (`/api/health` → database ok). Guías cargadas con `npm run publicar`.
- Páginas: portada, guía `/[slug]`, categorías (12), búsqueda, acerca, contacto, privacidad, editor `/admin`.
- SEO: metadatos, JSON-LD, `sitemap.xml`, `robots.txt`. Search Console configurado por el dueño.
- Google Analytics activo. AdSense: sitio verificado (fragmento de código), revisión solicitada.
  Mensaje de consentimiento de Google (3 opciones) configurado para EEE/Reino Unido/Suiza.
- Unas 61 guías publicadas o listas para publicar (`content/nuevos/lote-ia-y-fotos.json`).
- Diez borradores nuevos de belleza y moda en `content/nuevos/lote-belleza-y-moda.json`, pendientes de revisión y publicación.
- **https://nolandmarks.com** en Netlify con HTTPS y Supabase compartido. El contenido editorial
  se publica en inglés y la cabecera permite traducir la página completa al español bajo demanda.
  Tiene 15 guías en inglés publicadas; tres están relacionadas con 67 Sourdough y las demás cubren
  transporte, barrios, planes, entradas y costes de Londres.
- **Ground Level Japan** preparado como tercera marca, todavía sin dominio. Publica cada tema completo
  en inglés (raíz) y español (`/es/`) y comparte la misma base de Supabase filtrada por
  `site=groundleveljapan`. Su lote inicial contiene 10 temas y 20 versiones enlazadas.

## Pendiente

- Esperar la aprobación de AdSense. Luego: activar anuncios automáticos y, opcional,
  crear un bloque "In-article" y ponerlo en `NEXT_PUBLIC_ADSENSE_SLOT` (Netlify).
- Reescribir con el estilo nuevo las 3 guías antiguas (visa EE. UU., pasaporte Guatemala, Japón).
- Alargar las guías más visitadas a 700–1.000 palabras (usar datos de Search Console/Analytics).
- Seguir el catálogo (`docs/catalogo-contenido.md`): 2–3 guías por semana.
- Revisar cada 3 meses precios y datos de guías que cambian (planes de IA, visas, tarifas).
- Antes de cobrar desde Japón: el dueño debe revisar el permiso de actividades fuera de su visa.
- Comprar el dominio de Ground Level Japan, crear su sitio de Netlify y configurar sus variables.
- Sustituir gradualmente las portadas automáticas de Ground Level Japan por fotos y videos propios.
