"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

// Marcadores de ejemplo: nodos de red / puntos de verificación
// iluminados en el acento neón de la marca (#c5ff4a).
const MARKERS: { location: [number, number]; size: number }[] = [
  { location: [4.711, -74.0721], size: 0.06 }, // Bogotá
  { location: [40.7128, -74.006], size: 0.05 }, // New York
  { location: [51.5074, -0.1278], size: 0.05 }, // London
  { location: [19.4326, -99.1332], size: 0.05 }, // CDMX
  { location: [-23.5505, -46.6333], size: 0.05 }, // São Paulo
  { location: [35.6762, 139.6503], size: 0.04 }, // Tokyo
  { location: [1.3521, 103.8198], size: 0.04 }, // Singapore
];

const KEYHOLE: [number, number, number] = [197 / 255, 1, 74 / 255];

export default function InteractiveGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  useEffect(() => {
    let phi = 0;
    let width = 0;

    const onResize = () => {
      if (wrapRef.current) width = wrapRef.current.offsetWidth;
    };
    window.addEventListener("resize", onResize);
    onResize();

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.32,
      dark: 1,
      diffuse: 1.1,
      scale: 1,
      mapSamples: 16000,
      mapBrightness: 5.5,
      baseColor: [0.06, 0.06, 0.06],
      markerColor: KEYHOLE,
      glowColor: KEYHOLE,
      markers: MARKERS,
      opacity: 0.95,
      onRender: (state) => {
        if (pointerInteracting.current === null) {
          phi += 0.0045;
        }
        state.phi = phi + pointerInteractionMovement.current;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    // Fade-in tras el primer frame para evitar el "pop" inicial.
    requestAnimationFrame(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    });

    return () => {
      window.removeEventListener("resize", onResize);
      globe.destroy();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto flex h-[480px] w-[480px] max-w-full items-center justify-center overflow-hidden"
      style={{ transform: "translateZ(0)" }}
    >
      {/* resplandor neón de fondo — chico y centrado para que el blur
          no llegue a los bordes del wrapper cuadrado: si toca el
          borde, overflow-hidden lo recorta en línea recta y se ve un
          cuadrado tenue detrás del círculo en vez de un halo circular */}
      <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-keyhole/10 blur-3xl" />

      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
          if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta * 0.005;
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta * 0.005;
          }
        }}
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "100%",
          aspectRatio: 1,
          cursor: "grab",
          opacity: 0,
          transition: "opacity 0.6s ease",
          contain: "layout paint size",
          transform: "translateZ(0)",
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      />
    </div>
  );
}
