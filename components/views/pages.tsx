import Link from "next/link";
import { tr } from "@/lib/i18n";
import { routePath, site, type Locale } from "@/lib/sites";

// Páginas fijas (Acerca, Privacidad, Contacto) de todas las webs, en todos sus idiomas.
// El texto de "Acerca de" cambia por web; el de privacidad es la misma plantilla con el nombre cambiado.

export function AboutView({ locale }: { locale: Locale }) {
  const d = tr(locale);
  if (site.key === "nolandmarks") {
    return (
      <div className="narrow page prose">
        {locale === "es" ? (
          <>
            <h1>Acerca de No Landmarks</h1>
            <p>No Landmarks son guías de Londres para gente que ya vio las fotos de siempre y quiere saber cómo es la ciudad de verdad: dónde come la gente que vive allí, cómo moverse sin pagar de más y qué atracción famosa se puede saltar sin remordimiento.</p>
            <h2>Cómo hacemos las guías</h2>
            <ul>
              <li>Cada guía responde una pregunta concreta y dice cuánto cuesta cada cosa.</li>
              <li>Las fotos son nuestras o de colaboradores que viven en la ciudad, salvo que se indique lo contrario debajo de la imagen.</li>
              <li>Comprobamos precios y horarios el día que publicamos, y anotamos la fecha de la última revisión.</li>
              <li>Ningún negocio nos paga por aparecer. Cuando tenemos relación personal con un sitio del que hablamos, lo decimos en el propio artículo.</li>
            </ul>
            <h2>Publicidad</h2>
            <p>El sitio se mantiene con anuncios. La publicidad no decide de qué escribimos ni en qué orden aparecen los lugares. Más detalles en la <Link href={routePath("privacy", locale)}>política de privacidad y cookies</Link>.</p>
            <h2>¿Viste algo mal?</h2>
            <p>Los precios suben y los sitios cierran. Si algo ya no cuadra, <Link href={routePath("contact", locale)}>escríbenos</Link> y lo corregimos.</p>
          </>
        ) : (
          <>
            <h1>About No Landmarks</h1>
            <p>No Landmarks is a set of London guides for people who have already seen the postcards and want to know what the city is actually like: where locals eat, how to get around without overpaying, and which famous attraction you can skip without regret.</p>
            <h2>How we make the guides</h2>
            <ul>
              <li>Every guide answers one specific question and tells you what things cost.</li>
              <li>Photos are ours or come from contributors who live in the city, unless the caption says otherwise.</li>
              <li>We check prices and opening times on the day we publish, and show the date of the last review.</li>
              <li>No business pays to appear here. When we have a personal connection to a place we write about, we say so in the article itself.</li>
            </ul>
            <h2>Advertising</h2>
            <p>The site is funded by ads. Advertising does not decide what we cover or the order places appear in. More detail in our <Link href={routePath("privacy", locale)}>privacy and cookie policy</Link>.</p>
            <h2>Spotted something wrong?</h2>
            <p>Prices go up and places close. If something no longer adds up, <Link href={routePath("contact", locale)}>tell us</Link> and we'll fix it.</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="narrow page prose">
      <h1>Acerca de {site.name}</h1>
      <p>Explícamelo Fácil es un sitio en español que explica, paso a paso y sin palabras complicadas, las dudas que todos tenemos en el día a día: cómo usar una tarjeta de crédito, cómo cuidar el celular, cómo hacer un trámite o cómo preparar un viaje.</p>
      <h2>Cómo preparamos las guías</h2>
      <ul>
        <li>Cada guía responde una pregunta concreta y termina con una lista de pasos para actuar.</li>
        <li>Consultamos fuentes oficiales o de los fabricantes y las enlazamos al final de cada artículo.</li>
        <li>Indicamos la fecha de la última revisión, porque precios y requisitos cambian.</li>
        <li>No damos consejos médicos, legales de casos concretos ni recomendaciones de inversión.</li>
      </ul>
      <h2>Publicidad</h2>
      <p>El sitio se financia con anuncios. La publicidad no influye en el contenido de las guías. Más detalles en nuestra <Link href={routePath("privacy", locale)}>{d.privacy.toLowerCase()}</Link>.</p>
      <h2>¿Encontraste un error?</h2>
      <p>Si algo cambió o está mal explicado, <Link href={routePath("contact", locale)}>escríbenos</Link> y lo revisamos.</p>
    </div>
  );
}

// Plantilla general. No es asesoría legal: revísala según tu país y tus proveedores reales.
export function PrivacyView({ locale }: { locale: Locale }) {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  if (locale === "en") {
    return (
      <div className="narrow page prose">
        <h1>Privacy and cookie policy</h1>
        <p className="muted">Last updated: 22 September 2026.</p>
        <h2>What we collect</h2>
        <p>You don't need an account to read the guides. Our hosting provider may log technical data (IP address, browser, pages visited) for security and statistics. If you email us, we use your address only to reply.</p>
        <h2>Analytics</h2>
        <p>We use Google Analytics to see, in aggregate, how many people visit and which guides are useful. It sets its own cookies. You can read <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">how Google uses this data</a> or install the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">opt-out add-on</a>.</p>
        <h2>Advertising and third-party cookies</h2>
        <p>We use Google AdSense to show ads. Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this or other websites.</p>
        <p>You can opt out of personalised advertising in <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>, or for other vendors at <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">aboutads.info</a>.</p>
        <h2>Consent</h2>
        <p>Visitors from the European Economic Area, the United Kingdom and Switzerland are shown a notice to accept or reject advertising cookies before they are used.</p>
        <h2>External links</h2>
        <p>Our guides link to official and third-party sites. We are not responsible for their privacy policies.</p>
        <h2>Your rights and contact</h2>
        <p>You can ask us what data we hold about you, or ask us to delete it, by writing to {email || "the address on the contact page"}.</p>
      </div>
    );
  }
  return (
    <div className="narrow page prose">
      <h1>Política de privacidad y cookies</h1>
      <p className="muted">Última actualización: 22 de septiembre de 2026.</p>
      <h2>Qué datos recogemos</h2>
      <p>No pedimos registro para leer las guías. Nuestro proveedor de alojamiento puede registrar datos técnicos (dirección IP, navegador, páginas visitadas) para seguridad y estadísticas. Si nos escribes por correo, usaremos tu dirección solo para responderte.</p>
      <h2>Estadísticas (Google Analytics)</h2>
      <p>Usamos Google Analytics para saber, de forma agregada, cuántas personas visitan el sitio y qué guías les resultan útiles. Google Analytics usa cookies propias. Puedes consultar <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">cómo usa Google estos datos</a> o instalar el <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">complemento de inhabilitación</a>.</p>
      <h2>Publicidad y cookies de terceros</h2>
      <p>Usamos Google AdSense para mostrar anuncios. Proveedores externos, incluido Google, usan cookies para mostrar anuncios basados en visitas anteriores de un usuario a este u otros sitios web.</p>
      <p>Puedes desactivar la publicidad personalizada en la <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">configuración de anuncios de Google</a> o, para otros proveedores, en <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">aboutads.info</a>.</p>
      <h2>Consentimiento</h2>
      <p>A los visitantes del Espacio Económico Europeo, Reino Unido y Suiza se les muestra un aviso para aceptar o rechazar las cookies de publicidad antes de usarlas.</p>
      <h2>Enlaces externos</h2>
      <p>Las guías enlazan a sitios oficiales y de terceros. No somos responsables de sus políticas de privacidad.</p>
      <h2>Tus derechos y contacto</h2>
      <p>Puedes pedirnos información o la eliminación de los datos que tengamos sobre ti escribiendo a {email || "el correo de la página de contacto"}.</p>
    </div>
  );
}

export function ContactView({ locale }: { locale: Locale }) {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const en = locale === "en";
  return (
    <div className="narrow page prose">
      <h1>{en ? "Contact" : "Contacto"}</h1>
      <p>
        {en
          ? "Want us to cover something, found a price that's out of date, or have a suggestion? Get in touch."
          : "¿Quieres que expliquemos algún tema, encontraste un dato desactualizado o tienes una propuesta? Escríbenos."}
      </p>
      {email ? (
        <p><a className="btn" href={`mailto:${email}`}>{email}</a></p>
      ) : (
        <p className="notice">Configura NEXT_PUBLIC_CONTACT_EMAIL para mostrar el correo de contacto.</p>
      )}
      <p className="muted small">
        {en
          ? "We can't book tickets or plan individual trips. For official requirements, always check the source we link to."
          : "No podemos revisar casos personales de trámites, visas ni finanzas. Para eso, consulta la institución oficial o a un profesional."}
      </p>
    </div>
  );
}
