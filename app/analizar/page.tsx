import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SecuritySuite from "@/components/SecuritySuite";

type AnalyzeType = "whatsapp" | "site" | "email" | "ip";

const CONFIG: Record<
  AnalyzeType,
  { tab: "phishing" | "site" | "breach" | "ip"; title: string; subtitle: string }
> = {
  whatsapp: {
    tab: "phishing",
    title: "Revisar un mensaje",
    subtitle: "Pegá el mensaje sospechoso de WhatsApp tal cual lo recibiste.",
  },
  site: {
    tab: "site",
    title: "Escanear un sitio",
    subtitle: "Pegá la URL o el dominio que querés verificar.",
  },
  email: {
    tab: "breach",
    title: "Revisar tu correo",
    subtitle: "Ingresá tu email para saber si apareció en alguna filtración conocida.",
  },
  ip: {
    tab: "ip",
    title: "Revisar una IP",
    subtitle: "Ingresá la dirección IP que querés verificar.",
  },
};

// Server component: Next entrega ?type= como prop `searchParams`, sin
// necesidad de useSearchParams ni Suspense del lado del cliente.
export default function AnalizarPage({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  const rawType = searchParams.type;
  const type: AnalyzeType = rawType && rawType in CONFIG ? (rawType as AnalyzeType) : "whatsapp";
  const config = CONFIG[type];

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-cocoa pt-24 font-body">
      <Navbar />

      <section className="mx-auto max-w-2xl px-6 py-16 sm:px-10 sm:py-20">
        <Reveal mode="mount">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-stone transition hover:text-keyhole"
          >
            <FiArrowLeft className="h-3.5 w-3.5" />
            Volver
          </Link>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-cream sm:text-4xl">
            {config.title}
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-stone">{config.subtitle}</p>
        </Reveal>

        <Reveal mode="mount" delay={0.15} className="mt-10">
          <SecuritySuite initialTab={config.tab} />
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
