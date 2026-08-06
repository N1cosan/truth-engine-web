"use client";

import { motion } from "framer-motion";

import ScrollChars from "./ScrollChars";
import TextRoll from "./TextRoll";

const TRUST = ["XPOSEDORNOT", "HAVE I BEEN PWNED", "IP-API", "ANTHROPIC"];

const FOOTER_LINKS = [
  { name: "Plataforma", link: "/#architecture" },
  { name: "Compañía", link: "/company" },
  { name: "Contacto", link: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 pb-10 pt-14 sm:px-10">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10">
        {/* logo + tagline + nav */}
        <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div />

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((item) => (
              <a
                key={item.name}
                href={item.link}
                className="font-roboto-mono text-[13px] uppercase tracking-[-0.02em] text-stone transition-colors hover:text-cream"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>

        <div className="h-px w-full bg-white/10" />

        {/* copyright + logos de confianza */}
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <p className="font-mono text-xs tracking-wide text-stone">
            <ScrollChars text="© 2026 MADRIU AI — THE TRUTH ENGINE" />
          </p>
          <motion.div
            className="flex flex-wrap items-center justify-center gap-6"
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, amount: 0.4 }}
            variants={{
              hidden: {},
              shown: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {TRUST.map((name) => (
              <motion.span
                key={name}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  shown: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="font-mono text-[11px] tracking-wide text-cream/25"
              >
                <TextRoll bold={false}>{name}</TextRoll>
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
