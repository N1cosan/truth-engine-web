import Link from "next/link";
import { FiArrowLeft, FiCpu, FiShield, FiTarget } from "react-icons/fi";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { FadeText } from "@/components/eldoraui/fade-text";

const MISSION_STATS = [
  { value: "300+", label: "víctimas de fraude digital por día en Colombia" },
  { value: "2", label: "motores propios — red y mensaje — sin depender de terceros" },
  { value: "100%", label: "veredictos con evidencia explicable, nunca caja negra" },
];

export default function CompanyPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-cocoa pt-24 font-body">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-2xl px-6 pt-4 sm:px-10">
        <Reveal mode="mount">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-stone transition hover:text-cream"
          >
            <FiArrowLeft className="h-3.5 w-3.5" />
            Volver al inicio
          </Link>
        </Reveal>

        <Reveal mode="mount" delay={0.05}>
          <span className="mt-8 inline-block font-mono text-xs uppercase tracking-[0.24em] text-mint">
            Company
          </span>
          <h1 className="mt-2 font-anton text-4xl uppercase leading-[0.9] tracking-tight text-cream sm:text-5xl">
            <FadeText text="Seguridad ofensiva y defensiva de nueva generación" direction="up" staggerDelay={0.03} />
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-stone">
            Somos el equipo detrás de MADRIU AI — construyendo la infraestructura de
            ciberseguridad que Colombia necesita, en vez de esperar a que alguien más la traiga.
          </p>
        </Reveal>
      </section>

      {/* Quiénes somos */}
      <section className="mx-auto max-w-4xl px-6 py-16 sm:px-10">
        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-[#111113] p-8 sm:p-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-keyhole/15 text-keyhole">
              <FiCpu className="h-5 w-5" />
            </div>
            <h2 className="mt-5 font-anton text-2xl uppercase tracking-tight text-cream sm:text-3xl">
              Quiénes somos
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-300">
              Somos desarrolladores e investigadores enfocados en seguridad ofensiva y
              defensiva de nueva generación. No partimos de un producto genérico adaptado
              después al problema — partimos del problema: cómo se ve el fraude digital y la
              intrusión de red en el terreno real, y qué hace falta para detectarlos con
              evidencia, no con corazonadas.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-300">
              Trabajamos a la vez en el nivel más bajo posible — paquetes de red, modelos
              entrenados desde cero — y en el nivel más alto — cómo se lee un mensaje de
              WhatsApp y por qué engaña a alguien. Esa doble mirada es la que sostiene la
              arquitectura de dos motores de MADRIU AI.
            </p>
          </div>
        </Reveal>

        {/* Qué hacemos */}
        <Reveal delay={0.05}>
          <div className="mt-6 rounded-3xl border border-white/10 bg-[#111113] p-8 sm:p-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-mint/15 text-mint">
              <FiShield className="h-5 w-5" />
            </div>
            <h2 className="mt-5 font-anton text-2xl uppercase tracking-tight text-cream sm:text-3xl">
              Qué hacemos
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-300">
              Desarrollamos infraestructura soberana de ciberseguridad impulsada por IA
              explicable — soberana en el sentido de que no depende de una plataforma
              extranjera para decidir qué es o no una amenaza en el contexto colombiano.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-300">
              Eso incluye automatización de la mitigación de fraude — detectar, puntuar y
              generar la evidencia forense de un intento de estafa o intrusión sin que una
              persona tenga que revisar cada caso manualmente — y hacerlo con modelos cuyo
              razonamiento se puede auditar, no una caja negra que solo entrega un número.
            </p>
          </div>
        </Reveal>

        {/* Misión en Colombia */}
        <Reveal delay={0.1}>
          <div className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0a1128] via-[#190f2e] to-[#0d2e29] p-8 sm:p-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-keyhole/15 text-keyhole">
              <FiTarget className="h-5 w-5" />
            </div>
            <h2 className="mt-5 font-anton text-2xl uppercase tracking-tight text-cream sm:text-3xl">
              Nuestra misión en Colombia
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-cream/80">
              MADRIU AI nació de un problema muy concreto: el robo de credenciales, las estafas
              por WhatsApp y el fraude digital en Colombia no están bajando — están creciendo
              de forma exponencial, y afectan tanto a personas comunes como a empresas que no
              tienen equipo de seguridad propio para defenderse.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-cream/80">
              El "hola mamá", la suplantación de Nequi o Bancolombia, el robo de cuenta de
              WhatsApp, el SOAT falso — no son casos aislados, son un patrón que se repite todos
              los días contra gente que no tiene cómo verificar si lo que le llegó es real.
              Construimos MADRIU AI para cambiar esa asimetría: que verificar un mensaje sospechoso
              sea tan fácil como recibirlo, y que la seguridad digital del país deje de depender
              de que cada persona aprenda a desconfiar por experiencia propia.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
              {MISSION_STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="font-anton text-3xl uppercase text-keyhole">{stat.value}</div>
                  <p className="mt-1 text-xs leading-relaxed text-cream/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
