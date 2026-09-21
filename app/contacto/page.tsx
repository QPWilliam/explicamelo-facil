import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contacto", description: "Escríbenos para sugerir una guía o avisar de un error.", alternates: { canonical: "/contacto" } };

export default function Contact() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  return (
    <div className="narrow page prose">
      <h1>Contacto</h1>
      <p>¿Quieres que expliquemos algún tema, encontraste un dato desactualizado o tienes una propuesta? Escríbenos.</p>
      {email ? <p><a className="btn" href={`mailto:${email}`}>{email}</a></p>
        : <p className="notice">Configura NEXT_PUBLIC_CONTACT_EMAIL para mostrar el correo de contacto.</p>}
      <p className="muted small">No podemos revisar casos personales de trámites, visas ni finanzas. Para eso, consulta la institución oficial o a un profesional.</p>
    </div>
  );
}
