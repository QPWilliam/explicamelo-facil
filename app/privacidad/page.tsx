import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacidad y cookies", description: "Cómo usamos las cookies y los datos en Explícamelo Fácil.", alternates: { canonical: "/privacidad" } };

// Plantilla general. No es asesoría legal: revísala según tu país y tus proveedores reales.
export default function Privacy() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "el correo de la página de contacto";
  return (
    <div className="narrow page prose">
      <h1>Política de privacidad y cookies</h1>
      <p className="muted">Última actualización: 21 de septiembre de 2026.</p>
      <h2>Qué datos recogemos</h2>
      <p>No pedimos registro para leer las guías. Nuestro proveedor de alojamiento puede registrar datos técnicos (dirección IP, navegador, páginas visitadas) para seguridad y estadísticas. Si nos escribes por correo, usaremos tu dirección solo para responderte.</p>
      <h2>Estadísticas (Google Analytics)</h2>
      <p>Usamos Google Analytics para saber, de forma agregada, cuántas personas visitan el sitio y qué guías les resultan útiles. Google Analytics usa cookies propias. Puedes consultar <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">cómo usa Google estos datos</a> o instalar el <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">complemento de inhabilitación</a>.</p>
      <h2>Publicidad y cookies de terceros</h2>
      <p>Usamos Google AdSense para mostrar anuncios. Proveedores externos, incluido Google, usan cookies para mostrar anuncios basados en visitas anteriores de un usuario a este u otros sitios web.</p>
      <p>El uso de cookies de publicidad permite a Google y a sus socios mostrar anuncios basados en las visitas a este sitio o a otros sitios de Internet. Puedes desactivar la publicidad personalizada en la <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">configuración de anuncios de Google</a> o, para otros proveedores, en <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">aboutads.info</a>.</p>
      <p>Más información sobre <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">cómo usa Google los datos de los sitios que usan sus servicios</a>.</p>
      <h2>Consentimiento</h2>
      <p>A los visitantes del Espacio Económico Europeo, Reino Unido y Suiza se les muestra un aviso para aceptar o rechazar las cookies de publicidad antes de usarlas.</p>
      <h2>Enlaces externos</h2>
      <p>Las guías enlazan a sitios oficiales y de terceros. No somos responsables de sus políticas de privacidad.</p>
      <h2>Tus derechos y contacto</h2>
      <p>Puedes pedirnos información o la eliminación de los datos que tengamos sobre ti escribiendo a {email}.</p>
    </div>
  );
}
