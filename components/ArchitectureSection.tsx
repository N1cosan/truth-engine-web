"use client";

import { motion } from "motion/react";
import Link from "next/link";

import Reveal from "./Reveal";
import { FadeText } from "./eldoraui/fade-text";
import {
  CutoutCard,
  CutoutCardContent,
  CutoutCardFooter,
  CutoutCardMedia,
  CutoutCardPin,
} from "@/components/ui/cutout-card";
import { cn } from "@/lib/utils";

type Card = {
  id: string;
  version: string;
  badge: string;
  title: string;
  description: string;
  tags: string;
  cta: string;
  gradientClassName: string;
  pipeline: string[];
};

const CARDS: Card[] = [
  {
    id: "ai-ids",
    version: "v1.0",
    badge: "CAPA DE RED",
    title: "AI-IDS",
    description:
      "Inspección de tráfico de red a bajo nivel en tiempo real. Analiza paquetes y flujos para detectar DoS, botnets e intentos de intrusión mediante Random Forest sin depender de firmas estáticas.",
    tags: "PYTHON • SCIKIT-LEARN • SCAPY",
    cta: "Ver Arquitectura",
    gradientClassName: "from-[#0a1128] via-[#0f3f63] to-[#0d2e29]",
    pipeline: [
      "Captura de paquetes en vivo con Scapy sobre la interfaz de red monitoreada.",
      "Extracción de features de flujo (tamaño, frecuencia, puertos, protocolo) en ventanas deslizantes.",
      "Clasificación con un modelo Random Forest entrenado contra tráfico benigno vs. DoS/botnet/intrusión.",
      "Score de riesgo + alerta con el paquete/flujo específico que la disparó, nunca una caja negra.",
    ],
  },
  {
    id: "truth-engine",
    version: "v1.0",
    badge: "CAPA DE APLICACIÓN",
    title: "Truth Engine API",
    description:
      "Motor híbrido que combina Machine Learning clásico con LLM para analizar phishing en texto (WhatsApp, Email, SMS). Genera scoring de reputación de IPs/dominios y entrega evidencia forense explicable.",
    tags: "FASTAPI • POSTGRESQL • LLM",
    cta: "Ver Arquitectura",
    gradientClassName: "from-[#190f2e] via-[#3a1f4d] to-[#0a1128]",
    pipeline: [
      "El texto sospechoso entra por la API de FastAPI (WhatsApp, email o SMS pegado manualmente).",
      "Un clasificador clásico filtra casos obvios; los ambiguos pasan a un LLM para razonamiento contextual.",
      "Cruce contra reputación de IPs/dominios (XposedOrNot, Have I Been Pwned, IP-API) persistido en PostgreSQL.",
      "Devuelve score + evidencia explicable: qué frase, qué dominio y qué señal específica gatilló el veredicto.",
    ],
  },
];

/** Entrada simple (opacidad + leve desplazamiento), sin filtros de blur — el texto debe verse nítido desde el primer frame de la animación. */
const textStagger = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
  },
  item: {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.23, 1, 0.32, 1] } },
  },
} as const;

function ArchitectureCard({ card }: { card: Card }) {
  return (
    <CutoutCard
      className={cn(
        "group flex h-full flex-col justify-between overflow-hidden",
        "rounded-3xl border border-white/10 bg-[#111113] shadow-2xl",
        "transition-colors duration-300 hover:border-[#C5FF4A]/40"
      )}
    >
      {/* Banner superior: gradiente cyber + grid de puntos, sirve de "media" de la tarjeta */}
      <CutoutCardMedia className={cn("h-44 w-full bg-gradient-to-br", card.gradientClassName)}>
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[#C5FF4A]/20 blur-3xl" />
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-mint/20 blur-3xl" />

        <CutoutCardPin className="top-3 right-3">
          <span className="rounded-full border border-white/10 bg-black/70 px-3 py-1 font-mono text-xs text-white">
            {card.version}
          </span>
        </CutoutCardPin>
      </CutoutCardMedia>

      {/* Solapa con el nombre de la capa: recorte cóncavo real donde el banner "cede" hacia la solapa,
          igual que la referencia (etiqueta "FEATURED"). El arco se arma con un radial-gradient de
          20px: transparente cerca de la esquina superior-derecha de la pieza (deja ver el banner),
          sólido cerca de la esquina inferior-izquierda (se funde con la solapa). */}
      <div className="relative px-6">
        <div className="absolute -top-8 left-6">
          <div className="relative inline-flex items-center rounded-l-full bg-[#111113] py-2 pl-4 pr-6 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5FF4A]">
            {card.badge}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-5 left-full h-5 w-5"
              style={{
                background:
                  "radial-gradient(circle at 100% 0%, transparent 20px, #111113 20px)",
              }}
            />
          </div>
        </div>
      </div>

      <CutoutCardContent className="flex-1 px-6 pb-2 pt-5">
        <motion.div
          className="flex flex-col items-start"
          initial="hidden"
          variants={textStagger.container}
          viewport={{ once: true, margin: "-80px" }}
          whileInView="show"
        >
          <motion.h3 variants={textStagger.item} className="mb-2 text-2xl font-bold text-white">
            {card.title}
          </motion.h3>
          <motion.p variants={textStagger.item} className="text-sm leading-relaxed text-zinc-300">
            {card.description}
          </motion.p>
        </motion.div>
      </CutoutCardContent>

      <CutoutCardFooter className="mt-6 flex items-center justify-between border-t border-white/10 px-6 py-5">
        <span className="font-mono text-[11px] uppercase tracking-wide text-zinc-500">
          {card.tags}
        </span>
        <Link
          href={`/architecture#${card.id}`}
          className="rounded-full bg-[#C5FF4A] px-5 py-2.5 text-xs font-bold text-black transition-all duration-200 hover:bg-[#b2f033]"
        >
          {card.cta} →
        </Link>
      </CutoutCardFooter>
    </CutoutCard>
  );
}

// Dos tarjetas ejecutivas — arquitectura de doble motor del proyecto.
export default function ArchitectureSection() {
  return (
    <section id="architecture" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-20 sm:px-10">
      <div className="mb-12 text-center">
        <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-cream sm:text-3xl">
          <FadeText text="Arquitectura de doble motor" direction="up" staggerDelay={0.06} />
        </h2>
        <Reveal>
          <p className="mx-auto mt-3 max-w-xl text-sm text-stone">
            Dos motores independientes que cubren la red y el mensaje — cada uno con su propio
            modelo, unidos por el mismo estándar de evidencia explicable.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {CARDS.map((card, i) => (
          <Reveal key={card.title} delay={i * 0.12} scale>
            <ArchitectureCard card={card} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
