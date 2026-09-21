# API v1
GET /healthz: 200 con estado DB o 503.
GET /api/articles: publicados; GET /api/articles/:slug: publicado o 404.
GET /api/categories: categorías y conteos publicados.
POST /api/auth/verify: clave interna + contraseña, 204/401; límite de intentos.
GET /api/admin/articles: todos, requiere Authorization Bearer INTERNAL_API_KEY.
POST /api/admin/articles: validar Article, slug único, 201/409/422.
PUT /api/admin/articles/:slug: actualizar existente, 200/404/409/422; slug publicado inmutable.
POST /api/admin/upload: multipart campo image <=5 MB, jpeg/png/webp, devolver URL y dimensiones.
Errores JSON {error:string}. Sin filtrado silencioso a datos de muestra si la DB falla.
Next: POST/DELETE /api/session; GET/POST/PUT /api/editor/articles; POST /api/editor/upload.
Next verifica sesión y Origin en mutaciones; adjunta clave privada al proxy sin exponerla.
Después de guardar, invalida cache etiquetada articles y vistas públicas.
