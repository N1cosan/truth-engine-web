// Config central de la API de THE TRUTH ENGINE.
//
// NOTA DE SEGURIDAD: esta key vive en el bundle del cliente (visible en
// devtools / "ver código fuente"). Aceptable para la fase piloto con
// pocos usuarios de confianza. Antes de compartir esto públicamente o
// cobrar por el servicio, esto debe pasar por un backend/proxy propio
// que guarde la key del lado del servidor (API Route de Next.js, por
// ejemplo) en vez de exponerla al navegador.
export const API_BASE = "https://ai-ids-proyecto.onrender.com";
export const API_KEY = "TruthEngine-2026-Secreto-X9kP2m";

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const resp = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "X-API-Key": API_KEY,
      ...(init?.headers || {}),
    },
  });
  if (!resp.ok) {
    throw new Error(`La API respondió con error ${resp.status}`);
  }
  return resp.json();
}

export type AnalyzeResult = {
  score: number;
  etiqueta: "phishing" | "sospechoso" | "legitimo";
  motivos: string[];
};

export function analyzeMessage(texto: string, canal: string) {
  return apiFetch<AnalyzeResult>("/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texto, canal, alertar: false }),
  });
}

export type BreachItem = {
  nombre: string;
  fecha: string;
  datos_expuestos: string[];
};

export type BreachResult = {
  encontrado: boolean;
  desde_cache: boolean;
  limite_agotado: boolean;
  total_breaches: number;
  riesgo: string | null;
  breaches: BreachItem[] | null;
  mensaje: string;
};

export function checkBreach(email: string) {
  return apiFetch<BreachResult>(`/check-breach?email=${encodeURIComponent(email)}`);
}

export type IPResult = {
  ip: string;
  pais: string | null;
  ciudad: string | null;
  isp: string | null;
  es_proxy_o_vpn: boolean;
  es_datacenter: boolean;
  riesgo: "bajo" | "medio" | "alto" | "desconocido";
  mensaje: string;
};

export function checkIP(ip: string) {
  return apiFetch<IPResult>(`/check-ip?ip=${encodeURIComponent(ip)}`);
}

export type PasswordResult = {
  veces_filtrada: number;
  riesgo: "bajo" | "medio" | "alto" | "desconocido";
  mensaje: string;
};

export function checkPassword(password: string) {
  return apiFetch<PasswordResult>("/check-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
}
