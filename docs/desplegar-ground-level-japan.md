# Desplegar Ground Level Japan

La tercera web usa el mismo repositorio, Supabase y proceso de publicación que las otras dos.

## Antes del dominio

1. Crear un sitio nuevo en Netlify desde este mismo repositorio.
2. Configurar `NEXT_PUBLIC_SITE_KEY=groundleveljapan`.
3. Usar temporalmente la URL `https://<nombre>.netlify.app` como `NEXT_PUBLIC_SITE_URL`.
4. Copiar las variables privadas del proyecto principal: `DATABASE_URL`, `DIRECT_URL`,
   `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` y `REVALIDATE_SECRET`.
5. Configurar también `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_CONTACT_EMAIL` y, cuando corresponda,
   las variables públicas de Analytics y AdSense.

## Contenido inicial

El archivo `content/ejemplo-groundleveljapan.json` contiene diez temas completos en inglés y sus diez
traducciones al español. Cada pareja comparte `translationKey`.

```bash
NEXT_PUBLIC_SITE_KEY=groundleveljapan npm run publicar -- content/ejemplo-groundleveljapan.json
```

## Cuando se compre el dominio

1. Añadir el dominio personalizado en Netlify.
2. Crear los registros DNS que indique Netlify en Cloudflare.
3. Cambiar `NEXT_PUBLIC_SITE_URL` al dominio definitivo y volver a desplegar.
4. Verificar Search Console, Analytics y después solicitar AdSense; no solicitar revisión mientras el
   sitio siga en una URL temporal o no tenga contenido suficiente revisado.
