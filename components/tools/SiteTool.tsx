"use client";

import { useState } from "react";
import { analyzeMessage, AnalyzeResult } from "@/lib/api";

const VERDICT_STYLE: Record<AnalyzeResult["etiqueta"], { label: string; color: string }> = {
  phishing: { label: "SITIO SOSPECHOSO", color: "text-red-400 border-red-400/40 bg-red-400/10" },
  sospechoso: { label: "REVISALO CON CUIDADO", color: "text-keyhole border-keyhole/40 bg-keyhole/10" },
  legitimo: { label: "SIN SEÑALES CLARAS", color: "text-mint border-mint/40 bg-mint/10" },
};

// Reutiliza el mismo endpoint /analyze que PhishingTool — una URL es
// simplemente texto donde el motor busca señales de phishing (dominio
// disfrazado, typosquatting, lenguaje de urgencia, etc). No existe un
// endpoint /check-url dedicado en el backend, así que canal="web" es
// lo que distingue este análisis del de un mensaje de chat.
export default function SiteTool() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalyzeResult | null>(null);

  async function onSubmit() {
    if (!url.trim()) {
      setError("Pega una URL o un dominio antes de escanear.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await analyzeMessage(url, "web");
      setResult(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <label className="block text-xs font-mono uppercase tracking-wide text-stone">
        URL o dominio
      </label>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Ej: gnow-secure-login.com/verify"
        className="w-full rounded-input border border-sand/25 bg-cocoa/60 p-4 text-sm text-cream placeholder:text-stone focus:border-mint focus:outline-none"
      />
      <div className="flex justify-end">
        <button
          onClick={onSubmit}
          disabled={loading}
          className="flex w-full items-center justify-center whitespace-nowrap rounded-full bg-keyhole px-6 py-2 text-sm font-bold uppercase tracking-wide text-black transition hover:opacity-90 disabled:opacity-50 sm:w-auto"
        >
          {loading ? "Escaneando..." : "Escanear sitio"}
        </button>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {result && (
        <div className="space-y-3 rounded-card border border-sand/15 bg-cocoa/40 p-5">
          <span
            className={`inline-block rounded-full border px-3 py-1 text-xs font-mono ${VERDICT_STYLE[result.etiqueta].color}`}
          >
            {VERDICT_STYLE[result.etiqueta].label} · {Math.round(result.score)}/100
          </span>
          <ul className="space-y-2 text-sm text-cream/80">
            {(result.motivos.length ? result.motivos : ["Sin indicadores específicos"]).map((m, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-mint" />
                {m}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
