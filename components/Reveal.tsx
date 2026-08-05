"use client";

import { motion } from "framer-motion";
import React from "react";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  /**
   * "scroll" (default): anima cuando el elemento entra en pantalla.
   *   Pensado para secciones que están más abajo (fuera del primer
   *   viewport), como Security Suite o el Footer.
   * "mount": anima apenas la página carga, sin depender de scroll.
   *   Usar en todo lo que ya es visible sin scrollear (Hero, Globo,
   *   logos), porque ahí "entrar en pantalla" pasa en el mismo
   *   instante del load y el fade puede sentirse como que "no pasó
   *   nada".
   */
  mode?: "scroll" | "mount";
  /** Además del fade + desplazamiento, arranca un poco más chico y crece a su tamaño normal. Da un efecto más notorio en bloques grandes (paneles, tarjetas). */
  scale?: boolean;
};

// Envoltorio reutilizable: aparece con fade + leve desplazamiento.
// Se usa en todas las secciones de la página para que el "efecto"
// sea consistente en todo el sitio, no solo en el bloque de logos.
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  mode = "scroll",
  scale = false,
}: RevealProps) {
  const initial = { opacity: 0, y, ...(scale ? { scale: 0.96 } : {}) };
  const target = { opacity: 1, y: 0, ...(scale ? { scale: 1 } : {}) };
  const shared = {
    className,
    initial,
    transition: { duration: 0.7, ease: "easeOut" as const, delay },
  };

  if (mode === "mount") {
    return (
      <motion.div {...shared} animate={target}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div {...shared} whileInView={target} viewport={{ once: true, amount: 0.15 }}>
      {children}
    </motion.div>
  );
}
