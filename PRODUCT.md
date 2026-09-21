# Product — Explicamelo Facil

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Decisión explícita del propietario: Next.js, React y TypeScript para el frontend; Node.js
y Express para una API REST; PostgreSQL con Prisma para contenido; Docker para el backend.

Actualización 2026-09-21 (decisión del propietario): Netlify (plan gratuito, uso comercial permitido),
Supabase (PostgreSQL + Storage) y API REST como route handlers de Next.js en lugar de Express
separado. Docker/AWS quedan descartados por ahora.

## Users

Lectores hispanohablantes con dudas cotidianas que pueden resolver siguiendo pasos claros:
dinero y bancos, celular y tecnología, reseñas de celulares, trabajo, trámites, viajes,
estudios, hogar y vida práctica. Decisión del propietario (2026-09-21): el sitio **no** es
solo de viajes; cubre temas generales que se puedan explicar con fuentes públicas.

Fuera de alcance: salud, medicina, nutrición y dietas, salud mental, inversiones/cripto,
asesoría legal o migratoria de casos concretos, apuestas, piratería. Ver
[docs/catalogo-contenido.md](docs/catalogo-contenido.md) para categorías, reglas y el plan de artículos.

El propietario necesita añadir o actualizar artículos, textos e imágenes sin desarrollar
una página distinta cada vez.

## Product Purpose

Publicar explicaciones fáciles de seguir, cada una con su dirección propia. Construir una
audiencia mediante contenido útil y tráfico orgánico; preparar monetización con Google AdSense.
El objetivo del propietario es mantener el sitio con poco esfuerzo cotidiano. Tráfico,
aprobación de anuncios e ingresos no están garantizados.

## Operating Context

Flujo solicitado: preparar artículo → almacenar contenido → servirlo mediante API → generar
página con Next.js → mostrar anuncios cuando haya configuración y aprobación reales.
La API separada permitirá reutilizar contenido en una posible aplicación futura, fuera del
alcance actual.

## Capabilities and Constraints

- Artículos con texto, imágenes, categorías, etiquetas y URL propia.
- Plantillas reutilizables y HTML generado antes de llegar al navegador.
- Componentes interactivos cuando el contenido los necesite.
- Decisión actualizada del propietario (2026-09-21): el primer artículo será una **guía de
  recomendaciones para la visa de turista**, sin testimonio personal.
- Tratar intención temporal, motivos reales de regreso, itinerario y familiares con honestidad.
  No sugerir negar familiares por falta de contacto ni inventar respuestas o situación migratoria.
- El editor privado con borradores y publicación es una propuesta del asistente para facilitar
  la carga; debe concretarse en la especificación, no presentarse como ya implementado.
- Pendientes: alojamiento definitivo, almacenamiento de imágenes, contacto público y AdSense.

## Brand Commitments

Nombre solicitado: **Explicamelo Facil**. Dominio adquirido según el propietario:
**explicamelofacil.com**. No se ha comprobado ni configurado DNS, HTTPS o alojamiento.
Explicaciones en español para principiantes. No hay paleta, tipografías, logotipo ni referencia
visual obligatoria proporcionados por el propietario.

## Evidence on Hand

Descripción del producto y stack aportados por el propietario; elección de una guía general de visa sin testimonio; 24 skills locales y esqueleto inicial de código. Todavía no hay web funcional.
No hay métricas, ingresos, testimonios, credenciales profesionales ni relato completo del
propietario que se puedan publicar como hechos.

## Product Principles

1. Ayudar al principiante a entender su siguiente paso.
2. Distinguir experiencia personal de requisitos oficiales y sus actualizaciones.
3. Añadir contenido reutilizando la estructura existente.
4. Preservar legibilidad y utilidad al incorporar publicidad.
5. Añadir complejidad técnica solo cuando resuelva una necesidad concreta.
