"use client";

import { useEffect, useState } from "react";
import { checkIP, IPResult } from "@/lib/api";

const RISK_STYLE: Record<string, string> = {
  bajo: "border-mint/40 bg-mint/10 text-mint",
  medio: "border-keyhole/40 bg-keyhole/10 text-keyhole",
  alto: "border-red-400/40 bg-red-400/10 text-red-400",
  desconocido: "border-sand/20 bg-sand/5 text-stone",
};

// Respuesta (recortada) de https://ipapi.co/json/ — se usa solo para
// autodetectar la IP pública del visitante y precargar ciudad/proveedor
// mientras el backend confirma el riesgo real.
type IpApiCoResponse = {
  ip: string;
  city?: string;
  region?: string;
  country_name?: string;
  org?: string;
};

export default function IpTool() {
  const [ip, setIp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<IPResult | null>(null);
  const [isOwnIp, setIsOwnIp] = useState(false);

  const [autoDetecting, setAutoDetecting] = useState(true);
  const [autoError, setAutoError] = useState<string | null>(null);

  // Al montar: detecta automáticamente la IP pública del visitante.
  useEffect(() => {
    let cancelled = false;

    async function detectarPropiaIp() {
      setAutoDetecting(true);
      setAutoError(null);
      try {
        const resp = await fetch("https://ipapi.co/json/");
        if (!resp.ok) throw new Error(`ipapi.co respondió ${resp.status}`);
        const data: IpApiCoResponse = await resp.json();
        if (cancelled || !data.ip) return;

        const verificado = await checkIP(data.ip);
        if (cancelled) return;

        // Completa ciudad/país/proveedor con lo que ya trae ipapi.co
        // por si el backend no los devuelve (p. ej. respuesta en caché).
        setResult({
          ...verificado,
          ciudad: verificado.ciudad || data.city || data.region || null,
          pais: verificado.pais || data.country_name || null,
          isp: verificado.isp || data.org || null,
        });
        setIsOwnIp(true);
      } catch {
        if (!cancelled) {
          setAutoError("No se pudo detectar tu IP automáticamente. Puedes escribirla manualmente abajo.");
        }
      } finally {
        if (!cancelled) setAutoDetecting(false);
      }
    }

    detectarPropiaIp();
    return () => {
      cancelled = true;
    };
  }, []);

  async function onSubmit() {
    if (!ip.trim()) {
      setError("Escribe una dirección IP.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    setIsOwnIp(false);
    try {
      const res = await checkIP(ip);
      setResult(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {autoDetecting && (
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-stone">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-keyhole" />
          Detectando tu conexión...
        </div>
      )}

      {!autoDetecting && isOwnIp && result && (
        <div
          className={`flex items-center gap-2 rounded-input border px-3 py-2 text-xs font-mono uppercase tracking-wide ${RISK_STYLE[result.riesgo]}`}
        >
          <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-current" />
          {result.riesgo === "bajo"
            ? "Tu conexión se ve limpia"
            : `Tu conexión — riesgo ${result.riesgo}`}
          {(result.ciudad || result.isp) && (
            <span className="ml-1 normal-case tracking-normal text-stone">
              · {[result.ciudad, result.isp].filter(Boolean).join(" · ")}
            </span>
          )}
        </div>
      )}

      {autoError && <p className="text-xs text-stone">{autoError}</p>}

      <label className="block text-xs font-mono uppercase tracking-wide text-stone">
        ¿Quieres consultar otra IP?
      </label>
      <div className="flex gap-3">
        <input
          type="text"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          placeholder="Ej: 8.8.8.8"
          className="flex-1 rounded-input border border-sand/25 bg-cocoa/60 p-3 text-sm text-cream placeholder:text-stone focus:border-mint focus:outline-none"
        />
        <button
          onClick={onSubmit}
          disabled={loading}
          className="whitespace-nowrap rounded-full bg-keyhole px-6 py-2 text-sm font-bold uppercase tracking-wide text-black transition hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Verificando..." : "Verificar IP"}
        </button>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {result && (
        <div className="space-y-3 rounded-card border border-sand/15 bg-cocoa/40 p-5">
          <div className="flex items-center justify-between gap-2">
            <span className={`inline-block rounded-full border px-3 py-1 text-xs font-mono ${RISK_STYLE[result.riesgo]}`}>
              RIESGO {result.riesgo.toUpperCase()}
            </span>
            {isOwnIp && (
              <span className="text-[11px] uppercase tracking-wide text-stone">Detectada automáticamente</span>
            )}
          </div>
          <p className="text-sm text-cream/80">{result.mensaje}</p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-stone">IP</p>
              <p className="text-cream">{result.ip}</p>
            </div>
            <div>
              <p className="text-xs text-stone">Ubicación</p>
              <p className="text-cream">{result.ciudad || result.pais || "—"}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-stone">ISP / Organización</p>
              <p className="text-cream">{result.isp || "—"}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {result.es_proxy_o_vpn && (
              <span className="rounded border border-red-400/30 bg-red-400/10 px-2 py-0.5 text-[11px] text-red-300">Proxy / VPN</span>
            )}
            {result.es_datacenter && (
              <span className="rounded border border-sand/15 bg-plum/40 px-2 py-0.5 text-[11px] text-stone">Centro de datos</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
