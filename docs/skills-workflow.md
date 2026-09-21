# Skills y orden de trabajo

**24 skills locales** en `.agents/skills/`, inventariadas el 2026-09-21.
Integrarlas significa seleccionarlas por tarea; no ejecutarlas simultáneamente ni incluirlas
en el código que descarga el visitante.

Entrada para agentes: [AGENTS.md](../AGENTS.md). Producto: [PRODUCT.md](../PRODUCT.md).
Reglas: [constitución](../.specify/memory/constitution.md).
Continuidad: [estado del proyecto](project-status.md).

## Secuencia y entregables

| Etapa | Skill principal | Resultado |
| --- | --- | --- |
| Reglas | `speckit-constitution` | Constitución del proyecto |
| Requisitos | `speckit-specify` | `specs/<feature>/spec.md` y selector de feature |
| Aclaraciones necesarias | `speckit-clarify` | Decisiones registradas |
| Plan técnico | `speckit-plan` | Plan, investigación, modelo, contratos y quickstart |
| Diseño de superficies | `impeccable` | Contexto, dirección visual y briefs según su workflow |
| Tareas | `speckit-tasks` | `tasks.md` con dependencias |
| Coherencia | `speckit-analyze` | Informe de cobertura de requisitos, plan y tareas |
| Implementación | `speckit-implement` | Funcionalidad comprobada |
| Revisión | Skills de diseño aplicables | Hallazgos y correcciones autorizadas |
| Cierre | `speckit-converge` | Pendientes concretos o evidencia de convergencia |

`speckit-checklist` se usa para evaluar requisitos de un área cuando sea útil. Los cambios
menores reutilizan documentos existentes. Cada skill conserva sus prerrequisitos y hooks.

## Catálogo completo

### Especificación y desarrollo — 10

| Skill | Aplicación y límites |
| --- | --- |
| [speckit-constitution](../.agents/skills/speckit-constitution/SKILL.md) | Principios y reglas; su paso solo modifica la constitución |
| [speckit-specify](../.agents/skills/speckit-specify/SKILL.md) | Requisitos, escenarios y éxito de una funcionalidad nueva |
| [speckit-clarify](../.agents/skills/speckit-clarify/SKILL.md) | Resolver ambigüedades relevantes y persistir respuestas |
| [speckit-plan](../.agents/skills/speckit-plan/SKILL.md) | Diseño técnico, modelo, contratos y validación |
| [speckit-tasks](../.agents/skills/speckit-tasks/SKILL.md) | Tareas ordenadas por historia y dependencias |
| [speckit-checklist](../.agents/skills/speckit-checklist/SKILL.md) | Calidad de requisitos; no equivale a pruebas de ejecución |
| [speckit-analyze](../.agents/skills/speckit-analyze/SKILL.md) | Solo lectura: coherencia entre especificación, plan y tareas |
| [speckit-implement](../.agents/skills/speckit-implement/SKILL.md) | Construir y comprobar las tareas del plan |
| [speckit-converge](../.agents/skills/speckit-converge/SKILL.md) | Comparar código y requisitos; añadir tareas pendientes |
| [speckit-taskstoissues](../.agents/skills/speckit-taskstoissues/SKILL.md) | Crear issues solo cuando se solicite y haya repositorio confirmado |

### Diseño e interacción — 7

| Skill | Aplicación y límites |
| --- | --- |
| [impeccable](../.agents/skills/impeccable/SKILL.md) | Dirección principal de UI, jerarquía, diseño y revisión; elegir su subflujo pertinente |
| [emil-design-eng](../.agents/skills/emil-design-eng/SKILL.md) | Calidad de componentes, estados y respuesta a la interacción |
| [mobile-native](../.agents/skills/mobile-native/SKILL.md) | Viewport, tacto, entradas y safe areas; distinguir emulación de hardware real |
| [apple-design](../.agents/skills/apple-design/SKILL.md) | Gestos o dirección Apple cuando corresponda; no impone esa estética al sitio |
| [ask-sonner](../.agents/skills/ask-sonner/SKILL.md) | Notificaciones si se adopta Sonner; no obliga a instalarlo |
| [pick-ui-library](../.agents/skills/pick-ui-library/SKILL.md) | Solo petición explícita de elegir una librería |
| [prototype](../.agents/skills/prototype/SKILL.md) | Solo petición explícita de comparar variantes con un selector |

### Movimiento — 5

| Skill | Aplicación y límites |
| --- | --- |
| [animation-vocabulary](../.agents/skills/animation-vocabulary/SKILL.md) | Identificar el nombre de un efecto; no implementa movimiento |
| [find-animation-opportunities](../.agents/skills/find-animation-opportunities/SKILL.md) | Solo lectura: proponer movimiento útil y descartar lo innecesario |
| [animate](../.agents/skills/animate/SKILL.md) | Implementar animación web con propósito, interrupción y accesibilidad |
| [review-animations](../.agents/skills/review-animations/SKILL.md) | Invocación explícita para revisar movimiento existente |
| [improve-animations](../.agents/skills/improve-animations/SKILL.md) | Solo lectura del código: auditoría global y planes de mejora |

### Plataformas futuras — 2

| Skill | Aplicación y límites |
| --- | --- |
| [animate-expo](../.agents/skills/animate-expo/SKILL.md) | Una futura app React Native/Expo; fuera de la web actual |
| [write-swift](../.agents/skills/write-swift/SKILL.md) | Desarrollo Swift solicitado; fuera de la web actual |

## Cómo evitar conflictos

Spec Kit establece qué construir y cómo verificarlo. Impeccable organiza cómo se presenta y
utiliza cada superficie. Emil y Mobile Native aportan criterios especializados dentro de esa
dirección. Las skills de movimiento atienden problemas concretos y no redefinen todo el diseño.

Prevalecen el brief del usuario, la plataforma y el sistema visual existente. No combinar
estilos incompatibles, multiplicar auditorías iguales o introducir librerías para ejercitar skills.
La integración del catálogo no es una invocación permanente de todas las skills explícitas.

Abrir el `SKILL.md` completo antes de usar una skill y las referencias necesarias para esa tarea.
Respetar su alcance de solo lectura o implementación. Las correcciones de una auditoría son
otro paso autorizado. Comprobar autorizaciones previas antes de pedir confirmación.

## Instalación y hooks existentes

- Se conservan los paquetes originales de `.agents/skills/`.
- `skills-lock.json` registra las 13 skills de `emilkowalski/skill`; no es el catálogo completo.
  Spec Kit e Impeccable proceden de otras distribuciones y también están presentes.
- `.specify/` contiene scripts, plantillas y workflow de Spec Kit. El workflow completo tiene
  gates propios; no se ejecuta por el solo hecho de estar instalado.
- `.codex/hooks.json` ya contiene comprobaciones PostToolUse y Stop de Impeccable.
  Se conserva la configuración y el consentimiento local existentes.
- Un hook configurado no prueba la calidad de una UI: aún no hay superficies implementadas.

## Skills del entorno

Las skills globales y de plugins dependen de la sesión de Codex. No se copian al repositorio.
Se seleccionan desde el catálogo activo cuando la tarea las necesite:

- `imagegen` y `visualize`: imágenes originales o explicaciones visuales pertinentes.
- `documents`, `pdf`, `presentations`, `spreadsheets` y `excel-live-control`: sus artefactos
  y aplicaciones correspondientes, únicamente si forman parte del encargo.
- `openai-docs`: preguntas sobre productos OpenAI, no el desarrollo ordinario de esta web.
- `find-skills`, `skill-installer`, `skill-creator`, `plugin-creator`, `plugin-management`
  y `template-creator`: descubrimiento o creación de esas capacidades cuando se solicite.
- Las skills de Sites se reservan para tareas que usen Sites; no sustituyen el stack ni el
  alojamiento elegido para esta web sin una petición que corresponda a ese producto.

Este índice no instala plugins, concede acceso a cuentas ni activa servicios de pago.
