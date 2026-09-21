// Logo: globo de diálogo con una "e" (explicar) y un punto de idea. Mismo dibujo que app/icon.svg.
export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <path d="M14 6h36a10 10 0 0 1 10 10v24a10 10 0 0 1-10 10H26l-12 10v-10a10 10 0 0 1-10-10V16A10 10 0 0 1 14 6z" fill="var(--brand)" />
      <path d="M21 28.5h22a11 11 0 1 0-3.2 7.8" fill="none" stroke="#fff" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="52" cy="12" r="6.5" fill="var(--accent)" stroke="var(--surface)" strokeWidth="2.5" />
    </svg>
  );
}

export function Logo({ size = 40 }: { size?: number }) {
  return (
    <span className="logo-lockup">
      <LogoMark size={size} />
      <span className="wordmark">Explícamelo <em>Fácil</em></span>
    </span>
  );
}
