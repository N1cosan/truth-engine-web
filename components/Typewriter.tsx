"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

// Puerto del Typewriter que pasaste: misma lógica (tipeo letra por
// letra + cursor parpadeante + loop de textos), pero importando de
// "framer-motion" en vez de "motion/react" porque es el paquete que
// ya está instalado en este proyecto — la API es la misma.

export interface TypewriterProps {
  delay: number;
  texts: string[];
  baseText?: string;
  className?: string;
}

export function Typewriter({ delay, texts, baseText = "", className }: TypewriterProps) {
  const [animationComplete, setAnimationComplete] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => baseText.slice(0, latest));

  useEffect(() => {
    const controls = animate(count, baseText.length, {
      type: "tween",
      delay,
      duration: 1,
      ease: [0.42, 0, 0.58, 1] as const,
      onComplete: () => setAnimationComplete(true),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, baseText.length, delay]);

  return (
    <span className={className}>
      <motion.span>{displayText}</motion.span>
      {animationComplete && <RepeatedTextAnimation texts={texts} delay={delay + 1} />}
      <BlinkingCursor />
    </span>
  );
}

interface RepeatedTextAnimationProps {
  delay: number;
  texts: string[];
}

// Ciclo infinito: escribe el texto, lo borra, pasa al siguiente. Sirve
// para simular al "motor" analizando en loop dentro del chat — nunca
// se queda quieto, siempre está "pensando" algo nuevo.
function RepeatedTextAnimation({ delay, texts }: RepeatedTextAnimationProps) {
  const textIndex = useMotionValue(0);
  const baseText = useTransform(textIndex, (latest) => texts[latest] || "");
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => baseText.get().slice(0, latest));
  const updatedThisRound = useMotionValue(true);
  const longest = Math.max(...texts.map((t) => t.length), 1);

  useEffect(() => {
    const animation = animate(count, longest, {
      type: "tween",
      delay,
      duration: 1.1,
      ease: [0.42, 0, 1, 1] as const,
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 1.1,
      onUpdate(latest) {
        if (updatedThisRound.get() && latest > 0) {
          updatedThisRound.set(false);
        } else if (!updatedThisRound.get() && latest === 0) {
          textIndex.set((textIndex.get() + 1) % texts.length);
          updatedThisRound.set(true);
        }
      },
    });
    return () => animation.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, delay, textIndex, texts, updatedThisRound, longest]);

  return <motion.span className="inline">{displayText}</motion.span>;
}

function BlinkingCursor() {
  return (
    <motion.span
      variants={{
        blinking: {
          opacity: [0, 0, 1, 1],
          transition: {
            duration: 1,
            repeat: Infinity,
            repeatDelay: 0,
            ease: [0, 0, 1, 1] as const,
            times: [0, 0.5, 0.5, 1],
          },
        },
      }}
      animate="blinking"
      className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-current"
    />
  );
}
