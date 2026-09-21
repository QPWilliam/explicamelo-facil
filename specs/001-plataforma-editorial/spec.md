# Feature Specification: Plataforma editorial Explicamelo Facil

**Feature Branch**: sin rama (directorio aún sin Git)
**Created**: 2026-09-21
**Status**: Ready for planning
**Input**: Web editorial en español, fácil publicación de artículos e imágenes, SEO y preparación de AdSense. La última instrucción sustituye testimonio por recomendaciones generales de visa.

## User Scenarios & Testing

### User Story 1 — Encontrar y comprender una guía (Priority: P1)
Un principiante encuentra una guía por tema, la lee y consulta sus fuentes oficiales.
**Why this priority**: el contenido útil es el producto y la base del tráfico.
**Independent Test**: abrir portada, filtrar/buscar y leer una guía completa con JavaScript desactivado.
**Acceptance Scenarios**:
1. Dadas guías publicadas, al buscar por palabras o categoría aparecen coincidencias y una recuperación útil si no las hay.
2. Dada una URL publicada, al abrirla aparece título, autor editorial, fecha de revisión, imagen, contenido y fuentes.
3. Dado un borrador o slug inexistente, un visitante recibe página no encontrada y no ve el texto.
4. Dada la guía de visa, se explica intención temporal, vínculos e itinerario sin aconsejar ocultar familiares o falsear datos.

### User Story 2 — Publicar sin programar (Priority: P1)
El propietario accede a un editor privado, redacta, añade imágenes, previsualiza, guarda y publica.
**Why this priority**: evitar desarrollar una página por artículo.
**Independent Test**: crear borrador, comprobar que es privado, subir imagen, publicar, verificar nueva URL y volver a borrador.
**Acceptance Scenarios**:
1. Sin autenticación, toda lectura administrativa y escritura se rechaza.
2. Con autenticación, un artículo nuevo guardado sobrevive al reinicio.
3. Tras publicar, su página se incorpora a portada, búsqueda y sitemap sin editar código.
4. Tras retirar publicación, desaparece de los canales públicos al invalidarse su caché.
5. Un error al guardar conserva el formulario y muestra cómo reintentar.

### User Story 3 — Operar un sitio preparado para crecer (Priority: P2)
El propietario dispone de contenido estructurado, documentación de despliegue y monetización configurable.
**Why this priority**: facilitar mantenimiento sin activar cuentas o recursos inexistentes.
**Independent Test**: revisar metadatos y sitemap, iniciar persistencia y comprobar que no se solicitan anuncios cuando están desactivados.
**Acceptance Scenarios**:
1. Cada guía publica título, descripción, URL canónica y datos estructurados coherentes con su texto.
2. Sin configuración publicitaria válida no se carga código de anuncios ni aparecen anuncios falsos.
3. La documentación permite iniciar el proyecto, publicar otro artículo y preparar su alojamiento.

### Edge Cases
Búsquedas vacías/sin resultados; títulos largos; imágenes inválidas o mayores de 5 MB;
slug duplicado; sesión caducada; fallo de base de datos/API; contenido malicioso;
artículo retirado; sitios sin contacto configurado; intento de cambiar una URL publicada.

## Requirements

### Functional Requirements
- **FR-001**: Ofrecer portada editorial, categorías y búsqueda de guías publicadas.
- **FR-002**: Renderizar artículos completos por URL, legibles sin JavaScript.
- **FR-003**: Mostrar autor editorial, fecha de revisión, fuentes y texto alternativo de imágenes.
- **FR-004**: Publicar guía general de visa B1/B2 sin relato inventado, comprobada con fuentes oficiales.
- **FR-005**: Añadir guías de apoyo de pasaporte Guatemala y orientación para estudiar en Japón con sus fuentes.
- **FR-006**: Proteger editor, borradores y escrituras mediante autenticación y validación del servidor.
- **FR-007**: Crear/editar artículos con título, slug, categoría, etiquetas, resumen, portada, cuerpo y fuentes.
- **FR-008**: Subir imágenes de hasta 5 MB, validar contenido y guardar una versión optimizada persistente.
- **FR-009**: Permitir vista previa, borrador y publicación; conservar URL de artículos ya publicados.
- **FR-010**: Persistir artículos, categorías y etiquetas y limitar operaciones públicas a publicados.
- **FR-011**: Invalidar contenido público tras cambios editoriales; no indexar área privada.
- **FR-012**: Publicar metadata, sitemap, robots y datos estructurados del artículo.
- **FR-013**: Reservar integración AdSense desactivada por defecto y exigir configuración válida para activarla.
- **FR-014**: Explicar política editorial, privacidad real y vía de contacto solo cuando exista.
- **FR-015**: Ofrecer navegación móvil, teclado, zoom, estados de error y movimiento reducido.
- **FR-016**: Documentar instalación, edición, almacenamiento, despliegue, secretos y activación de anuncios.

### Key Entities
Artículo: identidad, slug, texto, portada, estado, fechas, categoría, etiquetas, fuentes y checklist.
Categoría: tema que agrupa artículos. Etiqueta: relación transversal entre artículos.
Imagen: archivo optimizado y texto alternativo. Sesión editorial: acceso temporal privado.

## Success Criteria

### Measurable Outcomes
- **SC-001**: Publicar un artículo preparado con una imagen en menos de cinco minutos sin editar código.
- **SC-002**: Las tres guías iniciales se leen a 390 y 1440 px sin desbordamiento horizontal.
- **SC-003**: Ninguna ruta pública, búsqueda o sitemap devuelve borradores en las pruebas.
- **SC-004**: Crear, editar, publicar y retirar se reflejan al siguiente acceso tras confirmar guardado.
- **SC-005**: Toda recomendación migratoria verificable enlaza fuentes oficiales y fecha de revisión.
- **SC-006**: Un cambio de datos sobrevive a reiniciar la aplicación y el editor rechaza sesiones inválidas.

## Assumptions
Un editor propietario, sin registros de lectores; contenido en Markdown seguro, sin HTML arbitrario.
Los slugs de artículos publicados son inmutables en v1 para preservar enlaces.
Las guías no son asesoría legal individual ni garantizan aprobación. Sin tarifas o plazos no verificados.
Alojamiento de pago, DNS y activación real de anuncios dependen de las cuentas del propietario;
la entrega actual es local y preparada para desplegar. No se promete volumen de tráfico ni ingresos.
