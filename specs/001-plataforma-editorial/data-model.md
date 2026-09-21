# Data model
Article: id UUID; slug único; title, excerpt, body, cover, coverAlt, country, author;
status draft|published; featured; publishedOnce; publishedAt, updatedAt; categoryId FK;
tags relación N:M; sources y checklist JSON validados. Category: slug PK, name. Tag: name PK.
Validación de longitudes, URL HTTPS/local, fechas y categorías en lib/schema.ts.
Transiciones: draft→published fija primera fecha y publishedOnce; published→draft conserva historial.
Un slug con publishedOnce no cambia. Listado público y detalle exigen published.
Media: nombre UUID.webp, carpeta de entorno persistente; nunca usar nombre original como path.
Session: cookie firmada de 8h, HttpOnly, SameSite Strict, Secure en producción; sin datos personales de lectores.
