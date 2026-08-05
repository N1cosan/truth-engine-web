"use client";

import { useRouter } from "next/navigation";
import type { IconType } from "react-icons";
import { FiGlobe, FiMail, FiMessageCircle, FiWifi } from "react-icons/fi";

const ACTIONS: { label: string; type: string; Icon: IconType }[] = [
  { label: "Empieza por WhatsApp", type: "whatsapp", Icon: FiMessageCircle },
  { label: "Escanea tu sitio", type: "site", Icon: FiGlobe },
  { label: "Revisa tu correo", type: "email", Icon: FiMail },
  { label: "Revisa tu IP", type: "ip", Icon: FiWifi },
];

// Sin input libre acá — cada botón manda directo a /analizar?type=<x>,
// que es donde vive la herramienta real para ese tipo de verificación.
export default function ActionSelector() {
  const router = useRouter();

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {ACTIONS.map(({ label, type, Icon }) => (
        <button
          key={type}
          type="button"
          onClick={() => router.push(`/analizar?type=${type}`)}
          className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-950/60 px-5 py-2.5 text-sm font-medium text-zinc-300 backdrop-blur transition hover:border-keyhole hover:text-keyhole"
        >
          <Icon className="h-4 w-4" />
          {label}
        </button>
      ))}
    </div>
  );
}
