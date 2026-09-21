// ads.txt que exige AdSense. Se genera a partir de NEXT_PUBLIC_ADSENSE_CLIENT (ca-pub-XXXXXXXX).
export const dynamic = "force-static";

export function GET() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "";
  const pub = client.replace(/^ca-/, "");
  const body = pub.startsWith("pub-") ? `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n` : "# Configura NEXT_PUBLIC_ADSENSE_CLIENT para generar este archivo.\n";
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
