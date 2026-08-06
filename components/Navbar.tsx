"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

// Navbar - capsulas flotantes en oscuro.

const NAV_ITEMS = [
  { name: "Plataforma", link: "/#architecture" },
  { name: "Compañía", link: "/company" },
  { name: "Novedades", link: "/#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between">
        <div />

        {/* capsula de links + CTA - desktop */}
        <div className="hidden items-center overflow-hidden rounded-xl border border-white/10 bg-neutral-900/90 backdrop-blur-md lg:flex">
          <nav className="flex items-center gap-1 pl-5 pr-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.link}
                className="whitespace-nowrap px-3 py-2.5 font-roboto-mono text-[13px] uppercase tracking-[-0.02em] text-stone transition-colors hover:text-cream"
              >
                {item.name}
              </a>
            ))}
          </nav>
          <a
            href="/#contact"
            className="whitespace-nowrap bg-bio-lime px-4 py-2.5 font-roboto-mono text-[13px] uppercase tracking-[-0.02em] text-abyssal-ink transition hover:brightness-95"
          >
            Contáctanos
          </a>
        </div>

        {/* toggle mobile */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Abrir menú"
          aria-expanded={isOpen}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-neutral-900/90 text-cream backdrop-blur-md lg:hidden"
        >
          {isOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 flex max-w-[1200px] flex-col gap-1 overflow-hidden rounded-xl border border-white/10 bg-neutral-900/90 p-2 backdrop-blur-md lg:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.link}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-4 py-2.5 font-roboto-mono text-[13px] uppercase tracking-[-0.02em] text-stone transition-colors hover:bg-white/5 hover:text-cream"
              >
                {item.name}
              </a>
            ))}
            <a
              href="/#contact"
              onClick={() => setIsOpen(false)}
              className="mt-1 rounded-lg bg-bio-lime px-4 py-3 text-center font-roboto-mono text-[13px] uppercase tracking-[-0.02em] text-abyssal-ink"
            >
              Contáctanos
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
