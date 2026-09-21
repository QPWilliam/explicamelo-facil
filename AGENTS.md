# Explicamelo Facil — contexto para agentes

## Inicio de cada tarea

1. Leer [PRODUCT.md](PRODUCT.md): objetivo, stack y decisiones del propietario.
2. Leer [.specify/memory/constitution.md](.specify/memory/constitution.md): principios del proyecto.
3. Consultar [docs/project-status.md](docs/project-status.md) y comprobar el estado real del código.
4. Seleccionar las skills pertinentes mediante [docs/skills-workflow.md](docs/skills-workflow.md).
   Abrir su `SKILL.md` antes de aplicarlas; no cargar todos los paquetes indiscriminadamente.
5. Si existe `.specify/feature.json`, leer la especificación, el plan y las tareas de esa feature.
6. Para UI, leer `DESIGN.md` y su brief cuando existan. No inventar preferencias confirmadas.

Las instrucciones del usuario y del entorno tienen prioridad. No volver a preguntar decisiones
ya tomadas. Preservar el trabajo existente y continuar desde el hito documentado.

## Responsabilidades y orden

- Spec Kit organiza requisitos, planificación, tareas y cobertura de la implementación.
- Impeccable dirige las superficies y el sistema visual. Ejecutar su contexto una vez por sesión
  cuando corresponda, seguir el subflujo aplicable y leer `craft-floor` antes de editar UI.
- Emil design engineering aporta calidad de componentes e interacciones dentro de esa dirección.
- Mobile native aporta comportamiento móvil; la web editorial conserva scroll y texto seleccionable.
- Movimiento: elegir entre identificar, proponer, implementar o auditar según la petición.
- `prototype`, `pick-ui-library` y `review-animations` conservan su invocación explícita.
- Swift y Expo están disponibles para un futuro alcance nativo; no se aplican a Next.js.
- No instalar librerías, crear issues o cambiar de stack solo para utilizar una skill.

Para funcionalidades nuevas: `speckit-specify` → `speckit-clarify` cuando haya ambigüedades
relevantes → `speckit-plan` → diseño de superficies → `speckit-tasks` → `speckit-analyze`
→ `speckit-implement` → validación → `speckit-converge` cuando haga falta cerrar diferencias.
Los cambios pequeños reutilizan los documentos existentes; no reinician toda la planificación.

Las auditorías de solo lectura no modifican implementación. Aplicar correcciones en un paso
separado dentro del alcance autorizado. Comprobar los gates de cada skill y la autorización
ya existente antes de pedir confirmación. No ejecutar automáticamente el workflow completo
de distribución de Spec Kit: tiene sus propios gates de revisión.

## Escribir y publicar guías

Para crear una guía nueva, sigue [docs/escribir-articulo.md](docs/escribir-articulo.md) y publícala con
`npm run publicar -- content/nuevos/<slug>.json`.

## Reglas de producto y código

- Web en español: **Explicamelo Facil**, dominio objetivo `explicamelofacil.com`.
- Stack solicitado: Next.js/React/TypeScript, Express y PostgreSQL/Prisma; backend con Docker.
- Un artículo es contenido con slug y plantilla reutilizable, no un nuevo componente de página.
- Entregar el contenido principal como HTML generado en servidor o estáticamente.
- Mantener borradores fuera de API pública, búsquedas, sitemap y páginas públicas.
- Conservar URL publicadas o establecer redirecciones cuando cambien.
- Validar entradas y permisos en el servidor; nunca exponer secretos al navegador.
- Verificar requisitos migratorios con fuentes oficiales y registrar fechas de revisión.
- El artículo principal será una guía general de visa de turista, sin testimonio personal.
  No inventar experiencias ni sugerir negar familiares por falta de contacto; explicar honestidad.
- No prometer tráfico, ingresos, aprobación de AdSense ni capacidad sin mediciones.
- No activar anuncios con identificadores ficticios ni presentar textos legales como revisados.
- No aprovisionar recursos de pago ni modificar DNS sin configuración y autorización necesarias.

## Validación y continuidad

Ejecutar comprobaciones proporcionales al cambio. En código: tipos, build y comportamientos
críticos de autenticación, publicación y persistencia. En UI: escritorio, móvil, teclado,
errores y movimiento reducido. No afirmar que la emulación equivale a un teléfono físico.
En documentación: coherencia, enlaces y exactitud; no ejecutar tests ajenos al cambio.

Actualizar `docs/project-status.md` al completar un hito o cambiar el siguiente paso.
No marcar tareas completas sin evidencia. Conservar los paquetes originales de `.agents/skills/`,
`skills-lock.json` y los hooks instalados; no reescribir skills de terceros durante el desarrollo.
