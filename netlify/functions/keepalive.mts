// Tarea programada diaria: consulta /api/health para que el proyecto gratis de Supabase
// no se pause por inactividad (Supabase pausa tras 7 días sin actividad).
export default async () => {
  const base = process.env.URL || "https://explicamelofacil.com";
  const res = await fetch(`${base}/api/health`, { headers: { "User-Agent": "keepalive" } });
  console.log("keepalive", res.status);
  return new Response("ok");
};

export const config = { schedule: "@daily" };
