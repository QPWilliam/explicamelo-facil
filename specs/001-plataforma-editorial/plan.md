# Implementation Plan: Plataforma editorial
**Branch**: sin Git | **Date**: 2026-09-21 | **Spec**: [spec.md](spec.md)

## Summary
Next.js entrega HTML con ISR de 300 segundos y revalidación inmediata desde el editor.
Express expone API pública y administrativa; Prisma persiste en PostgreSQL. No hay proveedor externo activo.

## Technical Context
**Language/Version**: TypeScript, Node 22+ compatible con Prisma 6.
**Primary Dependencies**: Next 16, React 19, Express 5, Prisma 6, Zod, React Markdown, Sharp.
**Storage**: PostgreSQL; imágenes WebP en volumen persistente del backend servido por /media.
**Testing**: node:test vía tsx; integración HTTP y DB; build/tipos; capturas escritorio y móvil.
**Target Platform**: web responsive y backend Docker Linux.
**Project Type**: aplicación editorial y API REST separada.
**Performance Goals**: HTML inicial completo, caché compartida y dimensiones de imagen; medir sin prometer CWV.
**Constraints**: un propietario, Markdown sin HTML, imágenes <=5 MB y 25 megapíxeles.
**Scale/Scope**: tres guías, editor, categorías, búsqueda y preparación SEO/ads; sin cuentas de lectores.

## Constitution Check
Cumple cinco principios: fuentes oficiales, plantilla reutilizable, HTML y accesibilidad,
autorización en servidor, datos estructurados y pruebas proporcionales. Sin excepciones.
Reevaluación posterior al diseño: capas y controles previstos preservan los cinco principios.

## Project Structure
`app/`: portada, guias/[slug], categorias/[slug], admin, API de sesión/proxy y páginas informativas.
`components/`: navegación, índice, lectura y editor. `lib/`: schema, contenido y sesiones.
`api/`: app Express, repositorio Prisma y servidor. `prisma/`: schema, migración y seed.
`content/articles.json`: contenido inicial revisable. `public/images/`: imágenes licenciadas.
`tests/`: validación, sesión y flujos HTTP/DB. `docs/`: edición, despliegue y QA.

## Decisions
Sesión firmada HMAC HttpOnly de ocho horas; contraseña en entorno; login limitado en backend;
API key interna solo servidor; origen validado para mutaciones. Backend privado no permite CORS.
Publicados conservan slug incluso al volver a borrador (publishedOnce). Previsualización privada.
Uploads autenticados; decodificar con Sharp, limitar píxeles, eliminar metadata y servir WebP.
No API de borrado en v1: retirar a borrador evita pérdidas accidentales.
Next es el único canal del editor: tras guardar invalida etiqueta de contenido y rutas afectadas.
AdSense requiere flag, pub ID/slot válidos y CMP configurada. No se activa por defecto.

## Complexity Tracking
Sin excepciones. Mantener API separada por requisito explícito, no añadir servicios extra.
