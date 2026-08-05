"use client";

import { FiCheckCircle, FiEye, FiShield } from "react-icons/fi";

import Reveal from "./Reveal";
import { FadeText } from "./eldoraui/fade-text";

// Timeline de 2 nodos: lo que ya está en producción (hoy) y hacia
// dónde va el proyecto (próxima generación). Un solo hito futuro,
// como pidió el brief — sin inventar etapas intermedias.
export default function RoadmapSection() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 sm:px-10">
      <div className="mb-14 text-center">
        <span className="mb-4 inline-block font-mono text-xs uppercase tracking-[0.24em] text-mint">
          Hoja de ruta
        </span>
        <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-cream sm:text-3xl">
          <FadeText text="Visión a futuro" direction="up" staggerDelay={0.08} />
        </h2>
      </div>

      <div className="relative pl-10">
        {/* línea vertical del timeline */}
        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-zinc-800" />

        <Reveal>
          <div className="relative mb-10">
            <span className="absolute -left-10 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-keyhole/40 bg-black text-keyhole">
              <FiCheckCircle className="h-4 w-4" />
            </span>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">Hoy</p>
            <h3 className="mt-1 font-display text-lg font-bold text-white">
              Detección de red + anti-phishing en producción
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              AI-IDS y Truth Engine cubriendo la capa de red y la capa de mensajes con evidencia
              explicable en cada veredicto.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12} scale>
          <div className="relative rounded-2xl border border-keyhole/30 bg-zinc-950/50 p-8 backdrop-blur">
            <span className="absolute -left-10 top-9 flex h-8 w-8 items-center justify-center rounded-full border border-keyhole bg-keyhole text-black">
              <FiEye className="h-4 w-4" />
            </span>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-keyhole">
              Próxima generación
            </p>
            <h3 className="mt-2 font-display text-xl font-bold text-white sm:text-2xl">
              Protección de Marca y SaaS Anti-Fraude
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">
              El próximo salto es proteger la marca, no solo la bandeja de entrada: identificar
              réplicas y falsificaciones apenas aparecen, y automatizar la respuesta legal.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-zinc-800 bg-black/60 p-4">
                <FiEye className="h-5 w-5 text-keyhole" />
                <p className="mt-3 text-sm font-semibold text-white">Visión por Computadora</p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                  Detecta sitios, logos y apps réplica o falsificados que buscan hacerse pasar por
                  la marca original.
                </p>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-black/60 p-4">
                <FiShield className="h-5 w-5 text-keyhole" />
                <p className="mt-3 text-sm font-semibold text-white">Retiros automatizados</p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                  Automatiza el proceso de reporte y retiro DMCA una vez confirmada la
                  falsificación, sin intervención manual.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
