"use client";

import { animate, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Stat = {
  target: number;
  decimals?: number;
  prefix?: string;
  suffix: string;
  label: string;
};

const STATS: Stat[] = [
  { target: 3.8, decimals: 1, suffix: "M+", label: "Flujos de red analizados" },
  { target: 99.99, decimals: 2, suffix: "%", label: "Precisión en tráfico benigno" },
  { target: 3, decimals: 0, suffix: "", label: "Rondas de defensa adversaria" },
  { target: 120, decimals: 0, prefix: "<", suffix: "ms", label: "Latencia de API" },
];

// Contador que arranca en 0 y sube hasta su valor final una sola vez,
// apenas la fila entra en pantalla (no depende de scroll continuo,
// como el resto de las micro-animaciones del sitio en modo "mount").
function Counter({ target, decimals = 0, prefix = "", suffix }: Stat) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState((0).toFixed(decimals));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, target, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, motionValue, target, decimals]);

  return (
    <span ref={ref} className="font-display text-4xl font-extrabold tracking-tight text-cream sm:text-5xl">
      {prefix}
      {display}
      <span className="text-keyhole">{suffix}</span>
    </span>
  );
}

// Barra de stats en vivo: cuatro números clave del proyecto, con
// estética dark/neon consistente con el resto del sitio (bordes
// zinc-800, fondo zinc-950/50, texto mono en minúscula para el label).
export default function StatsBar() {
  return (
    <section className="border-y border-zinc-800 bg-zinc-950/50 px-6 py-14 backdrop-blur sm:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-2 text-center">
            <Counter {...stat} />
            <span className="max-w-[14rem] font-mono text-xs uppercase tracking-[0.14em] text-zinc-400">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
