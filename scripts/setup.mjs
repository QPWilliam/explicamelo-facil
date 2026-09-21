import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomBytes } from "node:crypto";

// Crea .env con una contraseña del editor y un secreto de sesión aleatorios.
if (existsSync(".env")) {
  console.log("Ya existe .env. Conservamos tu configuración.");
} else {
  const password = randomBytes(18).toString("base64url");
  const env = readFileSync(".env.example", "utf8")
    .replace("ADMIN_PASSWORD=", `ADMIN_PASSWORD=${password}`)
    .replace("ADMIN_SESSION_SECRET=", `ADMIN_SESSION_SECRET=${randomBytes(32).toString("hex")}`);
  writeFileSync(".env", env, { mode: 0o600 });
  console.log(`.env creado. Contraseña del editor (/admin): ${password}`);
}
