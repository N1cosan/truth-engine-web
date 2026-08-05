"use client";

import { Typewriter } from "./Typewriter";

// Veredictos que el Truth Engine va "tipeando" en loop dentro de la
// burbuja verde neón — igual que el motor real: no es un sí/no plano,
// va mostrando evidencia.
const VERDICTS = [
  "94% de probabilidad de phishing ⚠️",
  "Dominio registrado hace 2 días",
  "IP marcada en 3 bases de datos",
  "Evidencia lista para reportar ✅",
];

// Card estilo iMessage — la misma estética oscura y burbujas
// redondeadas de la referencia, pero con la respuesta final del
// "motor" en el verde neón de la marca en vez del azul de iOS, para
// que se lea como una verificación automática y no como un mensaje
// más de la conversación.
export default function PhishingChatCard() {
  return (
    <div className="mx-auto w-full max-w-sm rounded-[28px] border border-zinc-800 bg-zinc-950 p-5 shadow-[0_0_70px_-20px_rgba(197,255,74,0.25)]">
      <div className="mb-4 border-b border-zinc-800/80 pb-3">
        <p className="text-xs text-zinc-500">iMessage</p>
        <p className="text-xs text-zinc-600">Hoy 11:29</p>
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="max-w-[78%] self-start rounded-2xl rounded-bl-md bg-zinc-800 px-4 py-2 text-sm text-white">
          Oye, ¿me revisás este link? 👀
        </div>
        <div className="max-w-[78%] self-start break-all rounded-2xl rounded-bl-md bg-zinc-800 px-4 py-2 text-sm text-white">
          gnow-secure-login.com/verify
        </div>
        <div className="max-w-[85%] self-end rounded-2xl rounded-br-md bg-blue-500 px-4 py-2 text-sm text-white">
          Dale, dejame revisarlo con Truth Engine
        </div>
        <div className="max-w-[92%] self-end rounded-2xl rounded-br-md bg-keyhole px-4 py-2 text-sm font-semibold text-black">
          <Typewriter delay={0.6} baseText="Analizando... " texts={VERDICTS} />
        </div>
      </div>

      <p className="mt-4 text-xs text-zinc-600">Entregado</p>
    </div>
  );
}
