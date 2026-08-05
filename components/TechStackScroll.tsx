"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import React, { useRef } from "react";
import type { IconType } from "react-icons";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiPython,
  SiFastapi,
  SiScikitlearn,
} from "react-icons/si";
import { FiWifi, FiShield } from "react-icons/fi";

import ScrollChars from "./ScrollChars";

// Logos del stack (Simple Icons vía react-icons) + íconos genéricos
// para los módulos propios que no tienen marca pública.
const TECH_ICONS: { Icon: IconType; label: string }[] = [
  { Icon: SiNextdotjs, label: "Next.js" },
  { Icon: SiReact, label: "React" },
  { Icon: SiTailwindcss, label: "Tailwind CSS" },
  { Icon: SiPython, label: "Python" },
  { Icon: SiFastapi, label: "FastAPI" },
  { Icon: SiScikitlearn, label: "scikit-learn" },
  { Icon: FiWifi, label: "Redes" },
  { Icon: FiShield, label: "Detección de amenazas" },
];

const CENTER_INDEX = Math.floor((TECH_ICONS.length - 1) / 2);

// Un logo individual: aparece con fade + slide a medida que avanza el
// scroll real de la fila (no un timer), con un pequeño offset según su
// distancia al centro para que el orden visual sea "centro → costados".
const Logo = ({
  Icon,
  label,
  index,
  progress,
}: {
  Icon: IconType;
  label: string;
  index: number;
  progress: MotionValue<number>;
}) => {
  const distance = Math.abs(index - CENTER_INDEX);
  const direction = Math.sign(index - CENTER_INDEX);
  const start = distance * 0.08;
  const end = start + 0.55;

  const opacity = useTransform(progress, [start, end], [0, 1]);
  const scale = useTransform(progress, [start, end], [0.4, 1]);
  const x = useTransform(progress, [start, end], [direction * 60, 0]);

  return (
    <motion.span
      title={label}
      style={{ opacity, scale, x }}
      className="inline-flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl border border-keyhole/20 bg-zinc-950 text-keyhole sm:h-20 sm:w-20"
    >
      <Icon className="h-7 w-7 sm:h-9 sm:w-9" />
      <span className="sr-only">{label}</span>
    </motion.span>
  );
};

// Esta sección ya NO se clava en pantalla: nada de sticky, nada de
// h-screen. El texto ya se armaba con el scroll real (ScrollChars
// trackea su propia posición al entrar en viewport); ahora los íconos
// usan exactamente el mismo mecanismo — trackean la posición de su
// propia fila con useScroll, sin target de pin — así que ambos se
// arman en cámara junto con el gesto de scroll, sin que uno "explote"
// de golpe mientras el otro sigue en curso.
export default function TechStackScroll() {
  const iconsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: iconsProgress } = useScroll({
    target: iconsRef,
    offset: ["start 0.9", "start 0.35"],
  });

  return (
    <section className="relative w-full bg-black px-6 py-16 sm:px-10 sm:py-20">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center">
        <p className="mb-10 flex items-center justify-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.18em] text-keyhole sm:text-sm">
          <Bracket className="h-8 w-auto text-keyhole" />
          <ScrollChars text="Se integra con tu stack de seguridad" />
          <Bracket className="h-8 w-auto scale-x-[-1] text-keyhole" />
        </p>

        <div ref={iconsRef} className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {TECH_ICONS.map(({ Icon, label }, index) => (
            <Logo key={label} Icon={Icon} label={label} index={index} progress={iconsProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Corchete decorativo curvo, tomado del ejemplo de referencia (Skiper UI).
const Bracket = ({ className }: { className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 27 78" className={className}>
    <path
      fill="currentColor"
      d="M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z"
    ></path>
  </svg>
);
