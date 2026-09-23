import { site } from "@/lib/sites";

// Cada web tiene su propia marca. El mismo dibujo se usa en app/icon.svg.

// Explícamelo Fácil: globo de diálogo con una "e" (explicar) y un punto de idea.
function ExplicaMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <path d="M14 6h36a10 10 0 0 1 10 10v24a10 10 0 0 1-10 10H26l-12 10v-10a10 10 0 0 1-10-10V16A10 10 0 0 1 14 6z" fill="var(--brand)" />
      <path d="M21 28.5h22a11 11 0 1 0-3.2 7.8" fill="none" stroke="#fff" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="52" cy="12" r="6.5" fill="var(--accent)" stroke="var(--surface)" strokeWidth="2.5" />
    </svg>
  );
}

// No Landmarks: una ruta a trazos que se sale del recuadro y termina en un punto.
// La idea es "el camino, no el monumento".
function LandmarksMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect x="3" y="3" width="58" height="58" rx="14" fill="var(--brand)" />
      <path
        d="M14 46c6-2 9-6 8-11-1-6-9-6-10-1-1 6 6 10 14 10 7 0 11-4 12-10 1-7-3-12-3-12"
        fill="none"
        stroke="var(--on-brand)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="1 8"
      />
      <circle cx="35" cy="22" r="6.5" fill="var(--accent)" />
    </svg>
  );
}

// Ground Level Japan: una calle vista desde arriba que se abre hacia el horizonte.
// Une la idea de orientación, vida cotidiana y observar Japón desde el nivel de la calle.
function GroundLevelMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect x="3" y="3" width="58" height="58" rx="14" fill="var(--brand)" />
      <circle cx="45" cy="18" r="7" fill="var(--accent)" />
      <path d="M13 49h38M24 49l6-25h4l6 25" fill="none" stroke="var(--on-brand)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 29v5M32 40v5" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function LogoMark({ size = 40 }: { size?: number }) {
  if (site.key === "nolandmarks") return <LandmarksMark size={size} />;
  if (site.key === "groundleveljapan") return <GroundLevelMark size={size} />;
  return <ExplicaMark size={size} />;
}

export function Logo({ size = 40 }: { size?: number }) {
  return (
    <span className="logo-lockup">
      <LogoMark size={size} />
      {site.key === "nolandmarks" ? (
        <span className="wordmark">
          No <em>Landmarks</em>
        </span>
      ) : site.key === "groundleveljapan" ? (
        <span className="wordmark">
          Ground Level <em>Japan</em>
        </span>
      ) : (
        <span className="wordmark">
          Explícamelo <em>Fácil</em>
        </span>
      )}
    </span>
  );
}
