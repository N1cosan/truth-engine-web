import React from "react";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiPython,
  SiFastapi,
  SiScikitlearn,
} from "react-icons/si";
import { FiWifi, FiShield, FiKey } from "react-icons/fi";

// Logos reales para el stack conocido (vía react-icons / Simple Icons,
// libre de licencia). Para los ítems propios del proyecto, que no
// tienen marca/logo público (Networking, Threat Detect, Reserved_ID),
// usamos un ícono genérico equivalente en vez de una palabra.
const TECH_ITEMS: { label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { label: "Next.js", Icon: SiNextdotjs },
  { label: "React", Icon: SiReact },
  { label: "Tailwind CSS", Icon: SiTailwindcss },
  { label: "Python", Icon: SiPython },
  { label: "FastAPI", Icon: SiFastapi },
  { label: "scikit-learn", Icon: SiScikitlearn },
  { label: "Redes", Icon: FiWifi },
  { label: "Detección de amenazas", Icon: FiShield },
  { label: "Reserved_ID", Icon: FiKey },
];

export const TechTicker = () => {
  return (
    <div className="w-full bg-black py-10 overflow-hidden border-y border-zinc-900">
      <div className="text-center text-xs font-mono text-keyhole uppercase tracking-widest mb-6">
        {`{ SE INTEGRA CON TU STACK DE SEGURIDAD }`}
      </div>
      <div className="flex w-[200%] animate-marquee whitespace-nowrap gap-4">
        {/* Renderizamos la lista 2 veces para bucle infinito continuo */}
        {[...TECH_ITEMS, ...TECH_ITEMS].map((item, index) => (
          <div
            key={index}
            title={item.label}
            className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-md border border-zinc-900 bg-zinc-950 text-keyhole"
          >
            <item.Icon className="h-6 w-6" />
            <span className="sr-only">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechTicker;
