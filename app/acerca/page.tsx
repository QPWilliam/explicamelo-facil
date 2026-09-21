import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Acerca de", description: "Qué es Explícamelo Fácil y cómo preparamos nuestras guías.", alternates: { canonical: "/acerca" } };

export default function About() {
  return (
    <div className="narrow page prose">
      <h1>Acerca de Explícamelo Fácil</h1>
      <p>Explícamelo Fácil es un sitio en español que explica, paso a paso y sin palabras complicadas, las dudas que todos tenemos en el día a día: cómo usar una tarjeta de crédito, cómo cuidar el celular, cómo hacer un trámite o cómo preparar un viaje.</p>
      <h2>Cómo preparamos las guías</h2>
      <ul>
        <li>Cada guía responde una pregunta concreta y termina con una lista de pasos para actuar.</li>
        <li>Consultamos fuentes oficiales o de los fabricantes y las enlazamos al final de cada artículo.</li>
        <li>Indicamos la fecha de la última revisión, porque precios y requisitos cambian.</li>
        <li>No damos consejos médicos, legales de casos concretos ni recomendaciones de inversión.</li>
      </ul>
      <h2>Publicidad</h2>
      <p>El sitio se financia con anuncios. La publicidad no influye en el contenido de las guías. Más detalles en nuestra <Link href="/privacidad">política de privacidad y cookies</Link>.</p>
      <h2>¿Encontraste un error?</h2>
      <p>Si algo cambió o está mal explicado, <Link href="/contacto">escríbenos</Link> y lo revisamos.</p>
    </div>
  );
}
