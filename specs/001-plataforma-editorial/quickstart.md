# Quickstart validation
1. npm install; npm run setup; disponer de PostgreSQL local o Docker.
2. Configurar DATABASE_URL y secretos de .env; npm run db:migrate; npm run db:seed.
3. npm run dev; abrir localhost:3000 y /admin con ADMIN_PASSWORD de .env.
4. Crear artículo de prueba, subir imagen, previsualizar, guardar borrador y confirmar 404 público.
5. Publicar, comprobar página, portada y sitemap; editar texto y verificar invalidación.
6. Retirar a borrador y confirmar ausencia pública; reiniciar y comprobar persistencia.
7. npm run typecheck; npm test; npm run build. Registrar resultados en docs/validation.md.
8. Revisar escritorio/móvil, teclado, fallos y consola. No confundir emulación con hardware físico.
