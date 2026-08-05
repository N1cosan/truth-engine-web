"use client";

import ReactLenis, { useLenis } from "lenis/react";
import React, { useEffect } from "react";

// Los links internos (navbar, botones "Get Started") usan href="#seccion".
// Sin esto, el navegador hace su salto NATIVO e instantáneo al hacer click,
// que aterriza literalmente a mitad de una animación atada al scroll (como
// el Macbook, que va cambiando de escala/rotación según cuánto bajaste) —
// por eso "cuando se abre la pantalla no sale bien": el salto nativo cae en
// un frame intermedio roto, y encima el scroll de Lenis (que lleva su propia
// posición interna) queda desincronizado del salto real y "pelea" contra
// él un instante — eso es el efecto de que algo "se queda pegado".
// La solución: interceptar esos clicks y pedirle a Lenis que anime el
// scroll él mismo, así todo el recorrido (y la animación atada a él) se ve
// completo y en un solo sistema, nunca un salto crudo.
function AnchorScrollFix() {
  const lenis = useLenis();

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      lenis?.scrollTo(target as HTMLElement, {
        offset: -96, // deja aire para que el navbar fijo no tape el destino
        duration: 1.2,
      });
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  return null;
}

// Envuelve toda la app una sola vez (en app/layout.tsx) para que el
// scroll suave (Lenis) aplique a todo el sitio, no solo a una sección.
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  // El navegador intenta "restaurar" la posición de scroll de una
  // visita anterior al recargar (scroll restoration automática). Con
  // secciones que cambian de alto dinámicamente (como el bloque
  // pinneado de logos), eso puede hacer que la página abra ya
  // scrolleada en un punto raro, como si hubiera arrancado "desde
  // abajo". Lo desactivamos y forzamos siempre arriba del todo.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // La causa raíz real: Lenis con "duration" (aunque sea corta, 0.7s)
  // no mueve el scroll al toque — apunta a una posición destino y la
  // anima ("tween") a lo largo de esa duración. Eso significa que
  // cuando soltás la rueda/trackpad, el scroll (y con él el progreso
  // de framer-motion que arma el texto/logos) SIGUE moviéndose solo
  // durante esa fracción de segundo, como "cargando" sin que vos
  // sigas bajando. Es justo lo que se ve en el video: el cursor
  // queda quieto y la animación continúa sola un instante.
  //
  // Para que el progreso quede pegado 1:1 al gesto de scroll (avanza
  // solo mientras vos bajás/subís, nada de animación residual al
  // soltar), cambiamos de "duration" (tween con easing) a "lerp" con
  // un valor alto: en vez de animar hacia el destino, interpola casi
  // instantáneamente cuadro a cuadro. Sigue habiendo un pelín de
  // suavizado (evita el salto brusco típico del scroll nativo), pero
  // sin el "sigue solo" que causaba el problema.
  // Volvimos de lerp:1 para acá: sin ningún suavizado, cada "tick"
  // de la rueda del mouse mueve el scroll en saltos discretos (a
  // diferencia del trackpad, que ya manda deltas pequeños y
  // continuos), y eso es lo que rompía la animación letra por letra
  // — scrollYProgress saltaba en escalones en vez de avanzar
  // continuo. La solución no es volver al extremo opuesto (Gemini
  // sugería lerp: 0.08 / duration: 1.2, que es básicamente el
  // suavizado pesado original que causaba el otro bug — que el
  // scroll "siga solo" un rato después de soltar la rueda). 0.18 es
  // un punto medio real de Lenis: suficiente interpolación para que
  // el wheel-scroll se sienta continuo, sin inercia notable después
  // de soltar.
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.18,
        wheelMultiplier: 1,
        touchMultiplier: 1,
      }}
    >
      <AnchorScrollFix />
      {children}
    </ReactLenis>
  );
}
