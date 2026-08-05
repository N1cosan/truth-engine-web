"use client";

import { motion } from "framer-motion";
import React from "react";

import { cn } from "@/lib/utils";

// Efecto "text roll" al pasar el mouse: la palabra gira sobre sí
// misma letra por letra (la actual sube y desaparece, una copia
// idéntica entra desde abajo). Basado en el patrón de Skiper UI
// (skiper58), adaptado para usarse en textos chicos como el navbar.
const STAGGER = 0.025;

export const TextRoll: React.FC<{
  children: string;
  className?: string;
  center?: boolean;
  bold?: boolean;
}> = ({ children, className, center = false, bold = true }) => {
  // Si por error se le pasan children mezclados (ej. `{" "}texto`),
  // React los junta en un array en vez de un string — los unimos acá
  // para no romper en tiempo de ejecución.
  const text = Array.isArray(children) ? (children as string[]).join("") : children;

  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={cn(
        "relative inline-block overflow-hidden align-top",
        bold && "font-display font-extrabold uppercase tracking-tight",
        className,
      )}
      style={{ lineHeight: 1.1 }}
    >
      <span className="block">
        {text.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (text.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{ initial: { y: 0 }, hovered: { y: "-100%" } }}
              transition={{ ease: "easeInOut", delay }}
              className="inline-block"
              key={i}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          );
        })}
      </span>
      <span className="absolute inset-0 block">
        {text.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (text.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{ initial: { y: "100%" }, hovered: { y: 0 } }}
              transition={{ ease: "easeInOut", delay }}
              className="inline-block"
              key={i}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          );
        })}
      </span>
    </motion.span>
  );
};

export default TextRoll;

// Para textos de varias palabras (título, párrafo): separa por
// palabra y envuelve cada una en su propio TextRoll, con espacios
// normales entre ellas para que el texto siga haciendo wrap como
// cualquier párrafo. Cada palabra gira de forma independiente al
// pasarle el mouse por encima.
export const TextRollWords: React.FC<{
  children: string;
  className?: string;
}> = ({ children, className }) => {
  const words = children.split(" ");
  return (
    <span className="inline-flex flex-wrap gap-x-[0.28em]">
      {words.map((word, i) => (
        <TextRoll key={i} className={className} bold={false}>
          {word}
        </TextRoll>
      ))}
    </span>
  );
};
