import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PhoneMockup from "@/components/PhoneMockup";
import TechStackScroll from "@/components/TechStackScroll";
import Reveal from "@/components/Reveal";
import TextRoll, { TextRollWords } from "@/components/TextRoll";
import StatsBar from "@/components/StatsBar";
import GlobalCoverageSection from "@/components/GlobalCoverageSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import RoadmapSection from "@/components/RoadmapSection";
import PhishingChatCard from "@/components/PhishingChatCard";
import ActionSelector from "@/components/ActionSelector";
import ContactSection from "@/components/ContactSection";
import { AnimatedShinyButton } from "@/components/eldoraui/animated-shiny-button";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-clip bg-cocoa pt-24 font-body">
      <Navbar />

      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 px-6 py-12 sm:px-10 lg:grid-cols-12 lg:gap-8 lg:py-16">
        <Reveal mode="mount" className="lg:col-span-7">
          <div>
            <h1 className="font-anton uppercase leading-[0.88] tracking-tighter text-cream text-6xl md:text-8xl lg:text-[5.5rem]">
              <TextRoll bold={false} className="text-mint">
                Evita
              </TextRoll>{" "}
              <TextRoll bold={false}>fugas</TextRoll>
              <br />
              <TextRoll bold={false}>de credenciales.</TextRoll>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-stone">
              <TextRollWords>
                Pega un mensaje sospechoso, revisa si tu correo fue filtrado, verifica una IP o una
                contraseña — en segundos, con evidencia explicable, no una caja negra.
              </TextRollWords>
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <AnimatedShinyButton url="#demo">Comenzar</AnimatedShinyButton>
              <AnimatedShinyButton url="#contact">Contactar</AnimatedShinyButton>
            </div>
          </div>
        </Reveal>

        <Reveal mode="mount" delay={0.2} className="lg:col-span-5">
          <PhoneMockup />
        </Reveal>
      </section>

      <section id="demo" className="mx-auto max-w-2xl scroll-mt-28 px-6 py-16 sm:px-10">
        <Reveal mode="mount" delay={0.3}>
          <PhishingChatCard />
        </Reveal>
        <Reveal mode="mount" delay={0.45} className="mt-8">
          <ActionSelector />
        </Reveal>
      </section>

      <StatsBar />

      <GlobalCoverageSection />

      <div id="architecture" className="scroll-mt-28">
        <ArchitectureSection />
      </div>

      <RoadmapSection />

      <TechStackScroll />

      <ContactSection />

      <Reveal y={12}>
        <Footer />
      </Reveal>
    </main>
  );
}
