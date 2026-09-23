# Poner No Landmarks en línea

Pasos en orden. El sitio actual (Explícamelo Fácil) no se toca en ningún momento.

## 1. Actualizar la base de datos (una sola vez)

En la Mac donde está el proyecto, con el `.env` de Explícamelo Fácil:

```bash
npm install                 # por si acaso
npx prisma migrate deploy   # aplica prisma/migrations/202609220001_multisitio
npx prisma generate         # regenera el cliente con los campos nuevos
npm run typecheck           # debe quedar en 0 errores
```

Si `migrate deploy` se queja de que la migración inicial no está registrada, abre el **SQL Editor**
de Supabase y pega tal cual el contenido de
`prisma/migrations/202609220001_multisitio/migration.sql`. Es idempotente: se puede ejecutar dos veces.

Qué hace: marca las 61 guías actuales como `site = explicamelofacil`, `locale = es`, y convierte las
etiquetas en una columna. **Antes de ejecutarlo**, comprueba que tienes `content/articles.json` en la
Mac: es el respaldo completo desde el que se puede reconstruir todo con `npm run db:seed`.

## 2. Comprobar que Explícamelo Fácil sigue igual

```bash
npm run dev     # http://localhost:3000 — deben verse las 61 guías y /admin funcionar
```

Cuando esté bien, `git push`. Netlify vuelve a desplegar explicamelofacil.com sin cambios visibles.

## 3. Crear el segundo sitio en Netlify

**Add new site → Import an existing project** y elige **el mismo repositorio**
(`QPWilliam/explicamelo-facil`). Netlify permite varios sitios sobre un mismo repo.

Variables de entorno del sitio nuevo (Project configuration → Environment variables):

| Variable | Valor |
| --- | --- |
| `NEXT_PUBLIC_SITE_KEY` | `nolandmarks` |
| `NEXT_PUBLIC_SITE_URL` | `https://nolandmarks.com` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | el correo de contacto de esta web |
| `DATABASE_URL` / `DIRECT_URL` | **los mismos** de Explícamelo Fácil |
| `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` / `SUPABASE_BUCKET` | los mismos |
| `ADMIN_PASSWORD` / `ADMIN_SESSION_SECRET` / `REVALIDATE_SECRET` | genera unos **nuevos** |
| `NEXT_PUBLIC_GA_ID` | una propiedad de Analytics nueva para esta web |
| `NEXT_PUBLIC_ADSENSE_ENABLED` | `false` de momento |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | `ca-pub-3486892211814364` (metaetiqueta activa aunque los anuncios sigan apagados) |

AdSense se deja apagado hasta tener contenido y hasta que la cuenta esté aprobada.

## 4. Dominio y DNS en Cloudflare

En Netlify: **Domain management → Add a domain** → `nolandmarks.com`. Netlify te dará un destino
del tipo `<algo>.netlify.app`.

En Cloudflare, en la zona de `nolandmarks.com`:

| Tipo | Nombre | Contenido | Proxy |
| --- | --- | --- | --- |
| CNAME | `www` | `<algo>.netlify.app` | **DNS only** (nube gris) |
| CNAME (o A) | `@` | lo que indique Netlify | **DNS only** (nube gris) |

La nube **gris** es obligatoria: con el proxy naranja Netlify no puede renovar el certificado, que es
exactamente el problema que tuvimos con el otro dominio.

## 5. Antes de encender los anuncios

- Publicar al menos 15–20 guías reales.
- Añadir `nolandmarks.com` en AdSense como sitio nuevo de la misma cuenta.
- Subir `ads.txt` (la ruta ya existe y se genera sola con el `NEXT_PUBLIC_ADSENSE_CLIENT`).
- Poner `NEXT_PUBLIC_ADSENSE_ENABLED=true` cuando Google apruebe el dominio.
- Dar de alta el dominio en Search Console y enviar `https://nolandmarks.com/sitemap.xml`.
