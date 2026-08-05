"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface FadeTextProps {
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  text: string;
  staggerDelay?: number;
  delay?: number;
  framerProps?: Variants;
}

const DIRECTION_OFFSET: Record<NonNullable<FadeTextProps["direction"]>, { x?: number; y?: number }> = {
  up: { y: 20 },
  down: { y: -20 },
  left: { x: 20 },
  right: { x: -20 },
};

// Revela un texto palabra por palabra, cada una entrando con fade +
// desplazamiento (dirección configurable) escalonado por
// `staggerDelay`. Se dispara una sola vez cuando el texto entra en
// viewport (whileInView + viewport once).
export function FadeText({
  direction = "up",
  className,
  staggerDelay = 0.1,
  delay = 0,
  text,
  framerProps = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { type: "spring" } },
  },
}: FadeTextProps) {
  const offset = DIRECTION_OFFSET[direction];

  const variants: Variants = {
    hidden: { ...framerProps.hidden, ...offset },
    show: { ...(framerProps.show as object), x: 0, y: 0 },
  };

  return (
    <div className={cn("flex flex-wrap justify-center", className)}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={variants}
          transition={{ delay: delay + i * staggerDelay }}
          className="mr-[0.3em] inline-block last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
