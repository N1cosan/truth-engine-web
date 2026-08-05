"use client";

import { useState } from "react";
import { checkPassword, PasswordResult } from "@/lib/api";

const RISK_STYLE: Record<string, string> = {
  bajo: "border-mint/40 bg-mint/10 text-mint",
  medio: "border-keyhole/40 bg-keyhole/10 text-keyhole",
  alto: "border-red-400/40 bg-red-400/10 text-red-400",
  desconocido: "border-sand/20 bg-sand/5 text-stone",
};

export default function PasswordTool() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PasswordResult | null>(null);

  async function onSubmit() {
    if (!password) {
      setError("Escribe una contraseña para verificar.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await checkPassword(password);
      setResult(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <label className="block text-xs font-mono uppercase tracking-wide text-stone">Contraseña a verificar</label>
      <div className="flex gap-3">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••••"
          className="flex-1 rounded-input border border-sand/25 bg-cocoa/60 p-3 text-sm text-cream placeholder:text-stone focus:border-mint focus:outline-none"
        />
        <button
          onClick={onSubmit}
          disabled={loading}
          className="whitespace-nowrap rounded-full bg-keyhole px-6 py-2 text-sm font-bold uppercase tracking-wide text-black transition hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Verificando..." : "Verificar"}
        </button>
      </div>
      <p className="text-xs text-stone">
        Nunca enviamos tu contraseña completa: solo un fragmento de su huella digital (k-Anonymity), el mismo método que usa Have I Been Pwned.
      </p>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {result && (
        <div className="space-y-2 rounded-card border border-sand/15 bg-cocoa/40 p-5">
          <span className={`inline-block rounded-full border px-3 py-1 text-xs font-mono ${RISK_STYLE[result.riesgo]}`}>
            RIESGO {result.riesgo.toUpperCase()}
          </span>
          <p className="text-sm text-cream/80">{result.mensaje}</p>
        </div>
      )}
    </div>
  );
}
