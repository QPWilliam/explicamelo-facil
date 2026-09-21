# Estado y punto de reanudación

Actualizado: 2026-09-21. Comprobar siempre este resumen contra el código.

## Última instrucción

Antes de continuar la web, el propietario pidió integrar las skills para mantener contexto,
orden y diseño. La integración prepara ese flujo; el objetivo original sigue en [PRODUCT.md](../PRODUCT.md).

## Presente

- 2026-09-21: repositorio público (MIT) en github.com/QPWilliam/explicamelo-facil. Los artículos viven en
  Supabase; `content/articles.json` (33 guías) queda solo en local, fuera de git, y se carga con `npm run db:seed`.
  En el repo solo va `content/ejemplo.json`. Carpetas de herramientas de agentes excluidas de git.

- 2026-09-21 (decisión del propietario): hosting **Netlify** gratis, base de datos e imágenes en
  **Supabase**, API dentro de Next.js (route handlers `/api/...`); se eliminó el servidor Express.
  Implementado: portada, guía `/[slug]`, categorías, búsqueda, acerca/contacto/privacidad, sitemap,
  robots, ads.txt, JSON-LD, AdSense configurable, editor `/admin` con subida a Supabase Storage,
  `prisma/seed.ts`, keepalive diario de Netlify. `tsc --noEmit` sin errores. Pasos de despliegue en `README.md`.
  Pendiente: `npm install` + `npm run dev`/`build` en el Mac del propietario, cuentas de Supabase/Netlify, DNS, AdSense.

- 2026-09-21: alcance ampliado a temas generales. Catálogo editorial en
  `docs/catalogo-contenido.md` (9 categorías, ~70 artículos priorizados). Categorías nuevas en
  `lib/schema.ts` (`dinero`, `tecnologia`, `resenas`, `trabajo`, `hogar`); `tsc` sin errores.
- 5 borradores nuevos en `content/articles.json` (tarjeta de crédito, presupuesto, batería,
  liberar espacio, WhatsApp) con portadas provisionales en `public/images/`; validan con `articleSchema`.
  Falta revisión del propietario antes de pasarlos a `published`.

- Configuración inicial de npm, Next.js y TypeScript; dependencias y lockfile instalados.
- Esquema inicial en `lib/schema.ts`, cliente en `lib/content.ts` y sesiones en `lib/session.ts`.
- `.env.example` y script inicial `scripts/setup.mjs`.
- 24 skills locales, índice completo, `AGENTS.md`, contexto de producto y constitución v1.0.0.
- Hook de Impeccable ya configurado en `.codex/hooks.json`, conservado sin modificaciones.

Todavía no hay páginas funcionales, servidor Express, esquema Prisma ni artículos de ejemplo.
No hay servidor de desarrollo iniciado, build validado ni web desplegada.
`npm run setup` aún depende de `content/articles.json`, que no existe.
La instalación informó cuatro vulnerabilidades altas y scripts de instalación pendientes
de revisión. Falta analizar su alcance; no ejecutar `npm audit fix --force` a ciegas.

## Siguiente secuencia

1. `speckit-specify`: describir la primera versión editorial desde el contexto confirmado.
2. `speckit-clarify` si quedan decisiones relevantes para alcance, datos o seguridad.
3. `speckit-plan`: arquitectura, modelo, contratos y guía de validación.
4. Impeccable: definir las superficies y documentar la dirección visual antes de editar UI.
5. `speckit-tasks` y `speckit-analyze`: tareas y revisión de cobertura.
6. `speckit-implement`: completar contenido, API, persistencia, páginas, edición y SEO.
7. Validar comportamiento y dependencias; `speckit-converge` para detectar pendientes.
8. Preparar despliegue y monetización según configuración y autorización disponibles.

Reconciliar los archivos iniciales con el plan; no contarlos como funcionalidad terminada.

## Pendientes del propietario

- Relato de la visa. La pregunta ya está hecha: no repetirla innecesariamente. Mantener el
  artículo como borrador hasta recibir los hechos; avanzar en las partes independientes.
- Proveedor y datos para conectar el dominio cuando toque desplegar.
- Contacto público e identificadores reales de monetización cuando se vaya a activarla.

## Diseño aún no decidido

Portada e índice: facilitar encontrar una explicación. Artículo: facilitar comprensión,
pasos y fuentes. Editor propuesto: facilitar preparación y publicación.
Los modos de Impeccable previstos son Read para contenido y Operate para edición; se registrarán
en los briefs de superficie al diseñarlas.

No hay dirección visual aprobada, `DESIGN.md` ni preferencia elegida entre mockup previo y
construcción directa. No convertir una propuesta verbal del asistente en una decisión del usuario.
La web necesita legibilidad móvil, foco visible, zoom permitido y movimiento reducido.
