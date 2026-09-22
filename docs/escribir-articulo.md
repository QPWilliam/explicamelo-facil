# Instructivo para IA: escribir y publicar una guía

Sigue estos pasos cada vez que te pidan una guía nueva para Explícamelo Fácil.

## 1. Elegir el tema

- Revisa `docs/catalogo-contenido.md` y `content/articles.json` para no repetir un slug o un tema.
- Temas permitidos: dinero cotidiano, celular y tecnología, reseñas/comparativas, trabajo, trámites, viajes, estudios, hogar, vida práctica, belleza no médica y moda.
- **No escribir:** salud, medicina, dietas o nutrición, salud mental, inversiones/cripto, asesoría legal o migratoria de un caso concreto, apuestas, piratería o cómo espiar a otras personas.

## 2. Investigar

- Busca **fuentes oficiales o del fabricante** (gobiernos, bancos centrales, Apple, Google, Samsung, WhatsApp, etc.) y usa datos actuales.
- Cada cifra, precio, requisito o ruta de menú debe venir de una fuente. Si varía por país, dilo.
- Nunca copies texto de otros sitios: redacta con tus palabras.

## 3. Escribir (tono y estructura)

La plantilla del sitio ya muestra, antes del texto, la frase de la casa **"Aquí te lo explico muy fácil."**
Escribe como si continuaras esa frase: cercano, de tú, como un amigo que sabe del tema.

1. **Título:** la pregunta como la busca la gente ("Cómo…", "Qué hacer si…", "¿Vale la pena…?"). Máx. 70 caracteres.
2. **excerpt:** 120–160 caracteres, sale en Google.
3. **Entradilla (primer párrafo):** una escena cotidiana en segunda persona que plantea el problema. 2–4 frases.
   No inventes anécdotas presentadas como reales ni testimonios.
4. **Resumen:** `> **En pocas palabras:** …` con la respuesta completa en 2–3 frases.
5. **4 a 7 secciones `##`** con titulares de periódico (no "Paso 1"). Listas para pasos, párrafos para explicar.
   **Negrita** solo para la idea clave. Enlaza la fuente en el texto cuando cites un dato.
6. **Largo:** 600–1.000 palabras.
7. Guías de dinero: termina con `*Esta guía es informativa y no sustituye la asesoría de un profesional financiero.*`
8. No uses emojis ni frases como "en este artículo te contaremos".

## 4. Crear el archivo

Guarda la guía en `content/nuevos/<slug>.json`:

```json
{
  "slug": "como-ahorrar-datos-moviles",
  "title": "Cómo ahorrar datos móviles en tu celular",
  "excerpt": "Resumen de 120 a 160 caracteres…",
  "category": "tecnologia",
  "country": "General",
  "cover": "/portada/como-ahorrar-datos-moviles",
  "coverAlt": "Ilustración de la guía: Cómo ahorrar datos móviles",
  "coverCredit": "Ilustración de Explícamelo Fácil.",
  "tags": ["datos móviles", "celular", "ahorro"],
  "checklist": ["Acción concreta 1", "Acción concreta 2", "Acción concreta 3"],
  "sources": [{ "title": "Nombre de la fuente oficial", "url": "https://…" }],
  "status": "published",
  "body": "Entradilla…\n\n> **En pocas palabras:** …\n\n## Primer titular\n\nTexto…"
}
```

- `slug`: minúsculas, sin tildes, palabras separadas por guiones.
- `category`: `dinero`, `tecnologia`, `ia`, `resenas`, `trabajo`, `tramites`, `visas`, `estudiar`, `hogar`, `vida-practica`, `belleza` o `moda`.
- `cover`: `/portada/<slug>` genera una portada automática con el diseño del sitio. Si hay foto propia, usa su URL.
- `sources`: solo URLs `https://` verificadas. `checklist`: 3–6 acciones.
- Usa `"status": "draft"` si el propietario quiere revisarla antes.

## 5. Publicar

```bash
npm run publicar -- content/nuevos/<slug>.json
```

El comando valida la guía, la guarda en Supabase, actualiza el respaldo `content/articles.json` y refresca el sitio.
Si muestra errores de validación, corrige el JSON y vuelve a ejecutarlo. Termina marcando la guía con ✅ en
`docs/catalogo-contenido.md`.
