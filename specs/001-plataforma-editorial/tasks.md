# Tasks: Plataforma editorial
Input: spec.md, plan.md, research.md, data-model.md, contracts/api.md.

## Phase 1: Setup
- [ ] T001 Corregir dependencias y configuración en package.json, .env.example y scripts/setup.mjs (FR-016).
- [ ] T002 Crear schema, migración y seed en prisma/ para Article, Category, Tag (FR-010).

## Phase 2: Foundation
- [ ] T003 Implementar validación, repositorio y API pública/privada en lib/schema.ts y api/ (FR-006, FR-008, FR-010).
- [ ] T004 Proteger sesión y proxy en lib/session.ts y app/api/ (FR-006, FR-011).

## Phase 3: US1 — lectura (P1)
Goal: encontrar y leer guías completas. Test independiente: buscar y abrir guía con/sin JS.
- [ ] T005 [US1] Redactar tres guías y registrar fuentes/imágenes en content/articles.json y docs/assets.md (FR-003, FR-004, FR-005).
- [ ] T006 [US1] Construir portada, navegación, categorías y búsqueda en app/page.tsx, app/categorias/ y components/ (FR-001, FR-015).
- [ ] T007 [US1] Construir plantilla, índice, checklist y fuentes en app/guias/[slug]/page.tsx (FR-002, FR-003, FR-015).

## Phase 4: US2 — edición (P1)
Goal: publicar sin código. Test independiente: borrador→publicado→borrador con imagen.
- [ ] T008 [US2] Construir login y editor con preview/subida de imágenes en app/admin/ y components/editor.tsx (FR-006, FR-007, FR-008, FR-009).
- [ ] T009 [US2] Verificar flujos HTTP y persistencia con tests/ y registrar resultados (FR-006, FR-009, FR-010, FR-011).

## Phase 5: US3 — operación (P2)
Goal: SEO y despliegue reproducible. Test independiente: metadata, sitemap, DB y ads apagados.
- [ ] T010 [US3] Añadir metadata/JSON-LD, sitemap, robots, ads.txt y publicidad configurable en app/ y components/ad-slot.tsx (FR-012, FR-013).
- [ ] T011 [US3] Añadir información editorial, privacidad y contacto en app/acerca/, app/privacidad/ y app/contacto/ (FR-014).
- [ ] T012 [US3] Dockerizar y documentar arranque, edición y despliegue en Dockerfile.api, compose.yml y README.md (FR-016).

## Phase 6: Quality
- [ ] T013 Ejecutar tipos, build, pruebas críticas y revisión responsive; registrar evidencia en docs/validation.md (SC-001 a SC-006).
- [ ] T014 Completar revisión visual y DESIGN.md, actualizar docs/project-status.md y comparar cobertura final.

## Dependencies & Execution Order
T001→T002→T003→T004. T005 puede redactarse durante infraestructura. T006/T007 tras contenido y elección visual.
T008 depende de T004; T009 de editor+API. T010/T011 tras superficies. T012 no depende de elección visual.
T013/T014 cierran la entrega. Sin tareas de despliegue externo o DNS en esta entrega local.

## Parallel Opportunities
Investigar contenido de US1 durante infraestructura; documentar despliegue de US3 mientras se prueba US2.
Ninguna operación compartiendo archivos se ejecuta simultáneamente. Un solo propietario integra los cambios.

## Implementation Strategy
Primero lectura completa, luego edición, luego operación; validar cada flujo y mantener los borradores privados.
