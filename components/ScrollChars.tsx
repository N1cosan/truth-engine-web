"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import React, { useRef } from "react";

import { cn } from "@/lib/utils";

type CharProps = {
  char: string;
  index: number;
  centerIndex: number;
  progress: MotionValue<number>;
};

// Cada letra parte desde su posición "dispersa" (alejada del centro,
// rotada, con perspectiva) y converge a su lugar normal a medida que
// el progreso de scroll de la sección va de 0 a 1.
const Char = ({ char, index, centerIndex, progress }: CharProps) => {
  const distance = index - centerIndex;
  const x = useTransform(progress, [0, 1], [distance * 9, 0]);
  const rotate = useTransform(progress, [0, 1], [distance * 12, 0]);
  const y = useTransform(progress, [0, 1], [-Math.abs(distance) * 8, 0]);
  const opacity = useTransform(progress, [0, 0.85], [0.02, 1]);

  return (
    <motion.span
      style={{ x, rotate, y, opacity, display: "inline-block", willChange: "transform" }}
    >
      {char}
    </motion.span>
  );
};

// Versión de la letra para el modo "mount": no depende de scroll,
// anima una sola vez al montar, con delay creciente según distancia
// al centro (mismo efecto visual "converge desde afuera").
const MountChar = ({
  char,
  index,
  centerIndex,
  baseDelay,
}: {
  char: string;
  index: number;
  centerIndex: number;
  baseDelay: number;
}) => {
  const distance = index - centerIndex;

  return (
    <motion.span
      initial={{ x: distance * 9, y: -Math.abs(distance) * 8, rotate: distance * 12, opacity: 0.12 }}
      animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: baseDelay + Math.abs(distance) * 0.018 }}
      style={{ display: "inline-block", willChange: "transform" }}
    >
      {char}
    </motion.span>
  );
};

// Componente reutilizable: le pasás el texto y anima letra por letra.
// mode="scroll" (default): converge según el scroll de la sección.
// mode="mount": converge una sola vez al cargar la página.
// progress: opcional — le pasás un MotionValue ya calculado (p. ej.
// el progreso de un bloque "sticky") y lo usa en vez de trackear su
// propio scroll.
//
// Agrupamos letra por letra PERO por palabra: cada palabra queda en
// su propio bloque "sin salto de línea" (whitespace-nowrap), y el
// salto entre palabras lo maneja el contenedor con flex-wrap. Así, en
// pantallas angostas (celular) el texto baja de línea entre palabras
// como cualquier párrafo normal, en vez de forzarse a una sola línea
// y salirse del contenedor (el bug de antes).
export default function ScrollChars({
  text,
  className,
  mode = "scroll",
  delay = 0,
  progress: externalProgress,
}: {
  text: string;
  className?: string;
  mode?: "scroll" | "mount";
  delay?: number;
  progress?: MotionValue<number>;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });

  const progress = externalProgress ?? scrollYProgress;
  const isMount = mode === "mount" && !externalProgress;
  const centerIndex = Math.floor(text.length / 2);

  // Índice global de cada letra (para el efecto centro -> lados,
  // calculado sobre la frase completa), agrupado por palabra.
  const words: { char: string; globalIndex: number }[][] = [];
  let cursor = 0;
  for (const word of text.split(" ")) {
    words.push(word.split("").map((char) => ({ char, globalIndex: cursor++ })));
    cursor += 1; // el espacio entre palabras
  }

  return (
    <span
      ref={ref}
      className={cn("inline-flex flex-wrap items-baseline gap-x-[0.3em] gap-y-1", className)}
      style={{ perspective: 500 }}
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.map(({ char, globalIndex }, ci) =>
            isMount ? (
              <MountChar key={ci} char={char} index={globalIndex} centerIndex={centerIndex} baseDelay={delay} />
            ) : (
              <Char key={ci} char={char} index={globalIndex} centerIndex={centerIndex} progress={progress} />
            ),
          )}
        </span>
      ))}
    </span>
  );
}
