"use client";

import { useState } from "react";
import { checkBreach, BreachResult } from "@/lib/api";

export default function BreachTool() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<BreachResult | null>(null);

  async function onSubmit() {
    if (!email.includes("@")) {
      setError("Escribe un correo válido.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await checkBreach(email);
      setResult(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <label className="block text-xs font-mono uppercase tracking-wide text-stone">Tu correo</label>
      <div className="flex gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tucorreo@ejemplo.com"
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
      <p className="text-xs text-stone">Nunca guardamos tu correo — solo se usa para la consulta, en el momento.</p>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {result && (
        <div className="space-y-3 rounded-card border border-sand/15 bg-cocoa/40 p-5">
          <span
            className={`inline-block rounded-full border px-3 py-1 text-xs font-mono ${
              result.encontrado ? "border-red-400/40 bg-red-400/10 text-red-400" : "border-mint/40 bg-mint/10 text-mint"
            }`}
          >
            {result.encontrado ? `${result.total_breaches} FILTRACIÓN(ES) · RIESGO ${result.riesgo?.toUpperCase()}` : "SIN FILTRACIONES CONOCIDAS"}
          </span>
          <p className="text-sm text-cream/80">{result.mensaje}</p>

          {result.breaches && result.breaches.length > 0 && (
            <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
              {result.breaches.map((b, i) => (
                <div key={i} className="rounded-input border border-sand/15 bg-plum/40 p-3">
                  <div className="mb-2 flex items-baseline justify-between">
                    <span className="text-sm font-medium text-cream">{b.nombre}</span>
                    <span className="text-xs text-stone">{b.fecha}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {b.datos_expuestos.map((d, j) => (
                      <span key={j} className="rounded border border-sand/15 bg-cocoa/40 px-2 py-0.5 text-[11px] text-stone">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
