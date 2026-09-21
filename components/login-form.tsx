"use client";
import { useState } from "react";

export function LoginForm() {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true); setError("");
    const password = new FormData(e.currentTarget).get("password");
    const res = await fetch("/api/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    if (res.ok) location.reload();
    else { setError((await res.json().catch(() => ({}))).error || "No se pudo iniciar sesión."); setBusy(false); }
  }
  return (
    <form className="form narrow" onSubmit={submit} style={{ maxWidth: 420 }}>
      <h1>Editor</h1>
      <label>Contraseña<input name="password" type="password" autoComplete="current-password" required /></label>
      {error && <p className="notice error" role="alert">{error}</p>}
      <button className="btn" disabled={busy}>{busy ? "Entrando…" : "Entrar"}</button>
    </form>
  );
}
