import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { FadeText } from "@/components/eldoraui/fade-text";

type Motor = {
  id: string;
  version: string;
  badge: string;
  layer: string;
  title: string;
  tagline: string;
  intro: string;
  stack: string[];
  sections: { heading: string; body: string }[];
  pipeline: string[];
  gradientClassName: string;
};

const MOTORS: Motor[] = [
  {
    id: "ai-ids",
    version: "v1.0",
    badge: "MOTOR 1",
    layer: "Capa de Red",
    title: "AI-IDS",
    tagline: "Inspección de tráfico de red en tiempo real, a nivel de paquete.",
    intro:
      "AI-IDS vive en la capa de red: no lee mensajes ni analiza texto, procesa el tráfico crudo que atraviesa la interfaz monitoreada, paquete por paquete, para detectar comportamiento hostil antes de que se convierta en incidente.",
    stack: ["PYTHON", "SCAPY", "SCIKIT-LEARN", "RANDOM FOREST", "PANDAS"],
    sections: [
      {
        heading: "Captura de paquetes de bajo nivel",
        body:
          "La captura se hace con Scapy directamente sobre la interfaz de red, sin depender de logs de terceros ni de un proxy intermedio. Cada paquete se descompone en sus campos de protocolo (IP origen/destino, puertos, flags TCP, tamaño, protocolo de transporte) apenas llega a la interfaz, en modo streaming — no se procesa por lotes ni con retraso.",
      },
      {
        heading: "Extracción de features en ventanas deslizantes",
        body:
          "Los paquetes individuales dicen poco por sí solos; el patrón aparece en el flujo. Por eso los paquetes se agrupan en ventanas deslizantes de tiempo, y de cada ventana se derivan features como frecuencia de conexión por origen, dispersión de puertos destino, tamaño promedio de paquete, y ratio de paquetes SYN sin ACK — las señales clásicas de escaneo de puertos, SYN flood o beaconing de botnet.",
      },
      {
        heading: "Clasificación con Random Forest",
        body:
          "Ese vector de features entra a un modelo Random Forest entrenado contra tráfico etiquetado como benigno vs. distintas familias de ataque (DoS, escaneo de puertos, tráfico de botnet conocido). Se eligió Random Forest sobre alternativas de caja negra (redes profundas) por dos razones: entrena rápido con datasets de red de tamaño moderado, y permite inspeccionar la importancia de cada feature en la decisión — clave para el siguiente punto.",
      },
      {
        heading: "Detección de anomalías sin firmas estáticas",
        body:
          "A diferencia de un IDS tradicional basado en firmas (que solo detecta lo que ya conoce), el modelo generaliza sobre el comportamiento del flujo. Esto le permite marcar variantes nuevas de DoS, botnets o escaneos que nunca vio en entrenamiento, siempre que el patrón de tráfico se aparte de lo que el modelo aprendió como normal — sin esperar a que alguien publique una firma para ese ataque específico.",
      },
    ],
    pipeline: [
      "Captura de paquetes en vivo con Scapy sobre la interfaz de red monitoreada.",
      "Extracción de features de flujo (tamaño, frecuencia, puertos, protocolo) en ventanas deslizantes.",
      "Clasificación con un modelo Random Forest entrenado contra tráfico benigno vs. DoS/botnet/intrusión.",
      "Score de riesgo + alerta con el paquete/flujo específico que la disparó — nunca una caja negra.",
    ],
    gradientClassName: "from-[#0a1128] via-[#0f3f63] to-[#0d2e29]",
  },
  {
    id: "truth-engine",
    version: "v1.0",
    badge: "MOTOR 2",
    layer: "Capa de Aplicación",
    title: "Truth Engine API",
    tagline: "Motor híbrido de heurísticas, modelos clásicos y LLM para fraude por mensaje.",
    intro:
      "Truth Engine API vive en la capa de aplicación: recibe el mensaje sospechoso — WhatsApp, email o SMS — que una persona pega manualmente, y decide qué tan probable es que sea una estafa, con evidencia concreta de por qué.",
    stack: ["FASTAPI", "POSTGRESQL", "LLM", "TF-IDF", "REGRESIÓN LOGÍSTICA"],
    sections: [
      {
        heading: "Heurísticas de léxico específicas de Colombia",
        body:
          "La primera capa es un motor de reglas construido sobre los patrones reales de fraude que circulan en Colombia: suplantación de Nequi/Bancolombia/DIAN, el clásico 'hola mamá', robo de cuenta de WhatsApp, SOAT y seguros falsos, estafas de herencia. Esta capa es rápida, explicable y captura los casos obvios sin necesitar un modelo.",
      },
      {
        heading: "Modelos clásicos como filtro intermedio",
        body:
          "Un clasificador TF-IDF + regresión logística entrenado sobre mensajes de phishing reales filtra los casos que no calzan directamente con el léxico pero tampoco son claramente legítimos — reduce cuánto texto ambiguo tiene que llegar al LLM, que es el paso más caro.",
      },
      {
        heading: "LLM para razonamiento contextual",
        body:
          "Los mensajes que quedan ambiguos después de reglas + modelo clásico pasan a un LLM (Claude) que evalúa el mensaje en contexto: tono, urgencia artificial, coherencia entre remitente y contenido, señales que un modelo de bolsa de palabras no puede capturar. Funciona como respaldo, no como primera línea — así el costo por análisis se mantiene bajo.",
      },
      {
        heading: "Análisis de links, dominios y reputación",
        body:
          "Cuando el mensaje incluye una URL, se extrae el dominio y se compara el nombre visible del remitente contra el dominio real (display name spoofing). El dominio y las IPs asociadas se cruzan contra fuentes de reputación — XposedOrNot, Have I Been Pwned e IP-API — para saber si aparecen en filtraciones o listas de riesgo conocidas, con los resultados persistidos en PostgreSQL para no repetir consultas.",
      },
      {
        heading: "Evidencia forense explicable",
        body:
          "El resultado nunca es solo un número. Cada score viene acompañado de la evidencia puntual que lo generó: qué frase del léxico se activó, qué dominio no coincide con el remitente, qué señal de reputación se cruzó — para que la persona (o el sistema) que recibe el veredicto pueda verificarlo, no solo confiar en él a ciegas.",
      },
    ],
    pipeline: [
      "El texto sospechoso entra por la API de FastAPI (WhatsApp, email o SMS pegado manualmente).",
      "Un clasificador clásico filtra casos obvios; los ambiguos pasan a un LLM para razonamiento contextual.",
      "Cruce contra reputación de IPs/dominios (XposedOrNot, Have I Been Pwned, IP-API) persistido en PostgreSQL.",
      "Devuelve score + evidencia explicable: qué frase, qué dominio y qué señal específica gatilló el veredicto.",
    ],
    gradientClassName: "from-[#190f2e] via-[#3a1f4d] to-[#0a1128]",
  },
];

function MotorSection({ motor, index }: { motor: Motor; index: number }) {
  return (
    <section id={motor.id} className="mx-auto max-w-4xl px-6 py-16 sm:px-10">
      <Reveal>
        <div
          className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${motor.gradientClassName} px-6 py-10 sm:px-10`}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
          <div className="relative">
            <span className="inline-block rounded-full border border-white/10 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-keyhole">
              {motor.badge} · {motor.layer}
            </span>
            <h2 className="mt-4 font-anton text-4xl uppercase leading-[0.9] tracking-tight text-cream sm:text-5xl">
              {motor.title}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream/70">
              {motor.tagline}
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-stone">
          {motor.intro}
        </p>
      </Reveal>

      <div className="mt-10 flex flex-wrap gap-2">
        {motor.stack.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-zinc-400"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-10 space-y-8">
        {motor.sections.map((s, i) => (
          <Reveal key={s.heading} delay={i * 0.05}>
            <div className="border-l-2 border-keyhole/30 pl-5">
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-keyhole">
                {String(i + 1).padStart(2, "0")} — {s.heading}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-12 rounded-2xl border border-white/10 bg-[#111113] p-6 sm:p-8">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-mint">
            Pipeline resumido
          </h3>
          <ol className="mt-5 space-y-3">
            {motor.pipeline.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-keyhole/15 font-mono text-[10px] font-bold text-keyhole">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      {index === 0 && <div className="mx-auto mt-16 h-px max-w-2xl bg-white/10" />}
    </section>
  );
}

export default function ArchitecturePage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-cocoa pt-24 font-body">
      <Navbar />

      <section className="mx-auto max-w-2xl px-6 pt-4 sm:px-10">
        <Reveal mode="mount">
          <Link
            href="/#architecture"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-stone transition hover:text-cream"
          >
            <FiArrowLeft className="h-3.5 w-3.5" />
            Volver al inicio
          </Link>
        </Reveal>

        <Reveal mode="mount" delay={0.05}>
          <span className="mt-8 inline-block font-mono text-xs uppercase tracking-[0.24em] text-mint">
            Arquitectura técnica
          </span>
          <h1 className="mt-2 font-anton text-4xl uppercase leading-[0.9] tracking-tight text-cream sm:text-5xl">
            <FadeText text="Arquitectura de doble motor" direction="up" staggerDelay={0.08} />
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-stone">
            MADRIU AI corre sobre dos motores independientes — uno para la red, uno para el
            mensaje — cada uno con su propio pipeline y su propio modelo, unidos por el mismo
            estándar: nunca un veredicto sin evidencia explicable detrás.
          </p>
        </Reveal>
      </section>

      {MOTORS.map((motor, i) => (
        <MotorSection key={motor.id} motor={motor} index={i} />
      ))}

      <Footer />
    </main>
  );
}
