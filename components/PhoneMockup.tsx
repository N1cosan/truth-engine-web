"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

/* ────────────────────────────────────────────────────────────────────────
   MADRIU AI · Phone Mockup — marco hiperrealista tipo iPhone + 3 capas 3D
   de fondo desfasadas + secuencia animada en loop de 4 fases que muestra
   el workflow completo del agente (escaneo → capas de análisis → amenaza
   → resolución). Inspirado en la construcción del mockup de Kippo.com:
   biseles finos, tipografía monoespaciada en mayúsculas, acentos de color
   racionados y profundidad por capas superpuestas en vez de sombras.
   ──────────────────────────────────────────────────────────────────────── */

type PhaseId = "scan" | "layers" | "threat" | "resolved";
const PHASE_ORDER: PhaseId[] = ["scan", "layers", "threat", "resolved"];
const PHASE_MS = 3600;

const fadeSlide = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -18 },
  transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] as const },
};

/* ── Fase 1 — Escaneo en vivo: mensaje entrante, línea láser
   recorriéndolo, ecualizador de actividad y barra de progreso con
   porcentaje contando en tiempo real. Reemplaza al radar estático:
   más movimiento, más lectura de "está pasando algo ahora mismo". ── */
function ScanPhase() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 2400;
    let raf: number;
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(100, Math.round((elapsed / duration) * 100));
      setPct(p);
      if (p < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div {...fadeSlide} className="flex h-full flex-col">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
        Fase 1 · Escaneo en vivo
      </p>

      <div className="relative mt-3 self-start overflow-hidden rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.04] px-3 py-2.5">
        <p className="font-mono text-[11px] leading-snug text-zinc-300">
          "Oye, ¿me revisás este link?"
        </p>
        <p className="mt-1 font-mono text-[11px] text-mint underline underline-offset-2">
          gnow-secure-login.com/verify
        </p>
        {/* línea láser recorriendo el mensaje en loop */}
        <motion.span
          className="pointer-events-none absolute inset-x-0 h-[2px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(162,246,245,0.9), transparent)",
            boxShadow: "0 0 8px 1px rgba(162,246,245,0.7)",
          }}
          animate={{ top: ["6%", "94%", "6%"] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ecualizador de actividad — barras "escuchando" el tráfico */}
      <div className="mx-auto mt-5 flex h-12 items-end gap-1.5">
        {[0.4, 0.8, 1, 0.55, 0.9, 0.35, 0.7].map((base, i) => (
          <motion.span
            key={i}
            className="w-1.5 rounded-full bg-mint/80"
            animate={{ height: [`${base * 30}%`, "100%", `${base * 45}%`, "80%", `${base * 30}%`] }}
            transition={{
              duration: 1.1 + (i % 3) * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.08,
            }}
          />
        ))}
      </div>

      <div className="mt-auto">
        <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.12em] text-zinc-500">
          <span>Analizando enlace...</span>
          <span className="text-mint">{pct}%</span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${pct}%`,
              background: "linear-gradient(90deg, #33beff, #a2f6f5)",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ── Fase 2 — Desglose por capas de análisis ── */
const LAYER_ROWS = [
  { label: "Remitente", detail: "Dominio no coincide con banco oficial" },
  { label: "Verificación URL / IP", detail: "Redirección fuera del dominio real" },
  { label: "Modelo AI-IDS", detail: "Patrón coincide con campaña activa" },
];

function LayersPhase() {
  return (
    <motion.div {...fadeSlide} className="flex h-full flex-col">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
        Fase 2 · Desglose por capas
      </p>

      <motion.div
        className="mt-3 flex flex-1 flex-col gap-2"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.55, delayChildren: 0.2 } },
        }}
      >
        {LAYER_ROWS.map((row, i) => (
          <motion.div
            key={row.label}
            variants={{
              hidden: { opacity: 0, x: -12 },
              show: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.35 }}
            className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 + i * 0.55, type: "spring", stiffness: 300, damping: 16 }}
              className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-keyhole text-[9px] font-bold text-black"
            >
              ✓
            </motion.span>
            <div className="min-w-0">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-white">
                {row.label}
              </p>
              <p className="mt-0.5 font-mono text-[9px] leading-snug text-zinc-500">
                {row.detail}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ── Fase 3 — Detección de amenaza ── */
function ThreatPhase() {
  return (
    <motion.div {...fadeSlide} className="flex h-full flex-col items-center justify-center text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
        Fase 3 · Detección
      </p>

      <div className="relative mt-5 flex h-24 w-24 items-center justify-center rounded-full border border-red-500/40">
        <span
          className="absolute inset-0 rounded-full border border-red-500/30"
          style={{ animation: "pulse-dot 1.6s ease-in-out infinite" }}
        />
        <span className="font-mono text-3xl font-bold text-red-400">!</span>
      </div>

      <p className="mt-5 font-mono text-4xl font-bold leading-none text-red-400">99.2%</p>
      <p className="mt-2.5 font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-white">
        Phishing detectado
      </p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-500">
        Estafa · WhatsApp
      </p>
    </motion.div>
  );
}

/* ── Fase 4 — Resolución automática ── */
function ResolvedPhase() {
  return (
    <motion.div {...fadeSlide} className="flex h-full flex-col items-center justify-center text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
        Fase 4 · Resolución
      </p>

      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
        className="relative mt-5 flex h-24 w-24 items-center justify-center rounded-full border border-keyhole/60 shadow-[0_0_28px_-4px_rgba(197,255,74,0.6)]"
      >
        <span className="font-mono text-3xl font-bold text-keyhole">✓</span>
      </motion.div>

      <p className="mt-5 font-mono text-base font-bold uppercase tracking-[0.1em] text-keyhole">
        Amenaza eliminada
      </p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-500">
        Reporte forense listo
      </p>
    </motion.div>
  );
}

function PhaseContent({ phase }: { phase: PhaseId }) {
  if (phase === "scan") return <ScanPhase />;
  if (phase === "layers") return <LayersPhase />;
  if (phase === "threat") return <ThreatPhase />;
  return <ResolvedPhase />;
}

const PHASE_DOT_COLOR: Record<PhaseId, string> = {
  scan: "bg-mint",
  layers: "bg-keyhole",
  threat: "bg-red-400",
  resolved: "bg-keyhole",
};

export default function PhoneMockup() {
  const [phase, setPhase] = useState<PhaseId>("scan");

  useEffect(() => {
    const id = setInterval(() => {
      setPhase((p) => PHASE_ORDER[(PHASE_ORDER.indexOf(p) + 1) % PHASE_ORDER.length]);
    }, PHASE_MS);
    return () => clearInterval(id);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  // -0.5 → 0.5 en cada eje, relativo al centro del contenedor
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), {
    stiffness: 150,
    damping: 20,
  });

  // 3 capas traseras — cada una se mueve a una profundidad distinta
  // (parallax multicapa real: la más lejana se mueve más).
  const backX = useSpring(useTransform(x, [-0.5, 0.5], [-16, 16]), { stiffness: 110, damping: 18 });
  const backY = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 110, damping: 18 });
  const midX = useSpring(useTransform(x, [-0.5, 0.5], [-26, 26]), { stiffness: 120, damping: 18 });
  const midY = useSpring(useTransform(y, [-0.5, 0.5], [18, -18]), { stiffness: 120, damping: 18 });
  const frontX = useSpring(useTransform(x, [-0.5, 0.5], [30, -30]), { stiffness: 130, damping: 18 });
  const frontY = useSpring(useTransform(y, [-0.5, 0.5], [-22, 22]), { stiffness: 130, damping: 18 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto w-full max-w-[260px] py-6 sm:max-w-[300px] lg:max-w-[330px]"
      style={{ perspective: 1000 }}
    >
      {/* flotación idle — siempre activa; el tilt del cursor se suma
          encima gracias al spring, nunca la reemplaza. SIN preserve-3d
          acá: con varias capas "planas" (misma z), pedirle al navegador
          que las ordene por profundidad 3D es inestable — a veces pinta
          la capa de color ENCIMA del teléfono en vez de detrás (el bug
          del video). El orden correcto lo garantiza z-index normal. */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {/* ── Capa 1 (más lejana) — magenta/púrpura. Respira sola
            (rotate + scale en loop) además de reaccionar al mouse:
            nunca queda "muerta" como una franja plana estática. ── */}
        <motion.div
          className="absolute -left-4 top-8 z-0 h-[90%] w-[95%] rounded-[42px]"
          style={{
            background: "linear-gradient(155deg, #7b2ff7, #ee1f66)",
            x: backX,
            y: backY,
          }}
          animate={{ rotate: [0, 4, 0, -3, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* ── Capa 2 (media) — cian terminal ── */}
        <motion.div
          className="absolute -right-5 top-11 z-0 h-[90%] w-[95%] rounded-[42px]"
          style={{
            background: "linear-gradient(155deg, #33beff, #33ffb8)",
            x: midX,
            y: midY,
          }}
          animate={{ rotate: [0, -3, 0, 4, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        />
        {/* ── Capa 3 (más cercana, la que más asoma) — sunset ── */}
        <motion.div
          className="absolute -left-3 top-6 z-0 h-[92%] w-full rounded-[46px]"
          style={{
            background: "linear-gradient(160deg, #ffc400, #ee1f66)",
            x: frontX,
            y: frontY,
          }}
          animate={{ rotate: [0, 2.5, 0, -2.5, 0], scale: [1, 1.03, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
        />

        {/* marco del smartphone — inclinación 3D siguiendo el cursor.
            z-10 explícito: SIEMPRE por encima de las 3 capas, sin
            depender del orden 3D. Bisel grueso tipo titanio, esquinas
            redondeadas, sombra profunda y botones laterales reales. */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
          animate={{
            boxShadow: [
              "0 0 0px 0px rgba(238,31,102,0)",
              "0 0 26px 2px rgba(238,31,102,0.35)",
              "0 0 0px 0px rgba(238,31,102,0)",
            ],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 rounded-[46px] bg-gradient-to-br from-zinc-500 via-zinc-900 to-black p-[3.5%] shadow-2xl shadow-black/80"
        >
          {/* botones laterales — izquierda: acción + volumen */}
          <span className="absolute -left-[2px] top-[16%] h-[5%] w-[2px] rounded-l-sm bg-zinc-600" />
          <span className="absolute -left-[2px] top-[23%] h-[8%] w-[2px] rounded-l-sm bg-zinc-600" />
          <span className="absolute -left-[2px] top-[32%] h-[8%] w-[2px] rounded-l-sm bg-zinc-600" />
          {/* botón lateral — derecha: power */}
          <span className="absolute -right-[2px] top-[24%] h-[11%] w-[2px] rounded-r-sm bg-zinc-600" />

          <div className="relative rounded-[38px] border border-white/10 bg-black p-[3%]">
            {/* isla / notch en píldora, con el punto de cámara */}
            <div className="absolute left-1/2 top-[2.6%] z-30 flex h-[2.6%] w-[30%] -translate-x-1/2 items-center justify-end rounded-full bg-black pr-1.5 ring-1 ring-white/10">
              <span className="h-[35%] w-[6%] min-h-[3px] min-w-[3px] rounded-full bg-zinc-700" />
            </div>

            <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[30px] bg-black">
              {/* brillo tipo "shine" recorriendo la pantalla — el toque
                  extra de vida que le falta a un mockup estático */}
              <motion.div
                className="pointer-events-none absolute inset-y-0 z-30 w-1/3"
                style={{
                  background:
                    "linear-gradient(115deg, transparent, rgba(255,255,255,0.16), transparent)",
                }}
                animate={{ x: ["-120%", "220%"] }}
                transition={{
                  duration: 2.2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 4.5,
                }}
              />

              {/* barra de estado — hora + señal/wifi/batería */}
              <div className="relative z-20 flex items-center justify-between px-6 pt-4">
                <span className="font-mono text-[13px] font-semibold tracking-tight text-white">
                  9:41
                </span>
                <div className="flex items-center gap-0.5">
                  <svg width="17" height="11" viewBox="0 0 14 9" fill="none">
                    <rect x="0" y="5" width="2" height="4" rx="0.5" fill="white" />
                    <rect x="4" y="3" width="2" height="6" rx="0.5" fill="white" />
                    <rect x="8" y="1" width="2" height="8" rx="0.5" fill="white" />
                    <rect x="12" y="0" width="2" height="9" rx="0.5" fill="white" />
                  </svg>
                  <svg width="16" height="11" viewBox="0 0 13 9" fill="none">
                    <path d="M6.5 8.4 0.6 3.1a8.6 8.6 0 0 1 11.8 0Z" fill="white" />
                  </svg>
                  <span className="ml-0.5 flex h-[11px] w-[22px] items-center rounded-[3px] border border-white/70 p-[1.5px]">
                    <span className="h-full w-[75%] rounded-[1px] bg-white" />
                  </span>
                </div>
              </div>

              {/* header MADRIU AI */}
              <div className="relative z-20 mt-4 flex items-center justify-between px-5">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                  MADRIU AI <span className="text-[#ee1f66]">· Agente</span>
                </span>
                <span
                  className={`h-1.5 w-1.5 rounded-full ${PHASE_DOT_COLOR[phase]}`}
                  style={{ animation: "pulse-dot 1.4s ease-in-out infinite" }}
                />
              </div>

              {/* contenido animado — 4 fases en loop */}
              <div
                className="relative z-10 px-5 pb-20 pt-5"
                style={{ height: "calc(100% - 80px)" }}
              >
                <AnimatePresence mode="wait">
                  <PhaseContent key={phase} phase={phase} />
                </AnimatePresence>
              </div>

              {/* indicador de fase (dots) */}
              <div className="absolute inset-x-0 bottom-11 z-20 flex items-center justify-center gap-2">
                {PHASE_ORDER.map((p) => (
                  <span
                    key={p}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      p === phase ? `w-4 ${PHASE_DOT_COLOR[p]}` : "w-1.5 bg-white/25"
                    }`}
                  />
                ))}
              </div>

              {/* barra de navegación inferior — 3 íconos, activo en pink */}
              <div className="absolute inset-x-0 bottom-3 z-20 flex items-center justify-around px-9">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ee1f66]/15 text-[13px] text-[#ee1f66]">
                  ◎
                </span>
                <span className="flex h-7 w-7 items-center justify-center text-[13px] text-zinc-600">
                  ◆
                </span>
                <span className="flex h-7 w-7 items-center justify-center text-[13px] text-zinc-600">
                  ▤
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
