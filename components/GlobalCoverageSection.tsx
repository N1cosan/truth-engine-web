import Reveal from "./Reveal";
import InteractiveGlobe from "./InteractiveGlobe";

// Sección dedicada al Globo 3D, reubicado desde el Hero: va completo
// (sin recortes, sin atenuar opacidad) y totalmente interactivo — el
// usuario puede arrastrarlo, igual que en su ubicación original. Vive
// como su propia sección, justo antes de MacbookScroll, reforzando la
// idea de cobertura de red global.
export default function GlobalCoverageSection() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 text-center sm:px-10">
      <Reveal>
        <p className="mx-auto max-w-2xl text-2xl font-bold tracking-tight text-cream md:text-4xl">
          Cada día más de 300 personas son víctimas de fraude digital en Colombia.{" "}
          <span className="text-keyhole">Detecta la amenaza antes de que sea tarde.</span>
        </p>
      </Reveal>

      <p className="mx-auto mt-14 max-w-md text-sm leading-relaxed text-stone">
        Cada punto es un nodo de verificación en vivo. Arrastrá el globo para explorar la red.
      </p>

      <div className="mt-10">
        <InteractiveGlobe />
      </div>
    </section>
  );
}
