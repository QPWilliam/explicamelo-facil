import Link from "next/link";

export default function NotFound() {
  return (
    <div className="narrow page">
      <h1>No encontramos esta página</h1>
      <p>Puede que la guía haya cambiado de dirección o que el enlace tenga un error.</p>
      <p><Link href="/" className="btn">Volver al inicio</Link> <Link href="/buscar" className="btn secondary">Buscar una guía</Link></p>
    </div>
  );
}
