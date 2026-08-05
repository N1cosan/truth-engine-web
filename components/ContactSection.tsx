"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import Reveal from "./Reveal";
import { FadeText } from "./eldoraui/fade-text";

// Sección de contacto/ventas — destino real de "Contact Sales" (Hero)
// y "Newsroom" / "Work with us" (Navbar). Sin backend todavía, así que
// el submit no manda nada por la red: solo valida en el cliente y
// muestra una confirmación. El día que haya una API de verdad, el
// único cambio es reemplazar el setTimeout de handleSubmit por el
// fetch correspondiente — el formulario y el estado ya están listos.
export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 700);
  }

  return (
    <section id="contact" className="mx-auto max-w-2xl scroll-mt-28 px-6 py-20 sm:px-10">
      <div className="mb-10 text-center">
        <span className="mb-4 inline-block font-mono text-xs uppercase tracking-[0.24em] text-mint">
          Contacto
        </span>
        <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-cream sm:text-3xl">
          <FadeText text="Hablemos de tu equipo" direction="up" staggerDelay={0.06} />
        </h2>
        <Reveal>
          <p className="mx-auto mt-3 max-w-md text-sm text-stone">
            Contanos qué querés proteger y te respondemos con una demo a medida.
          </p>
        </Reveal>
      </div>

      <Reveal>
        {status === "sent" ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-keyhole/30 bg-keyhole/5 px-6 py-10 text-center"
          >
            <p className="font-mono text-sm font-bold uppercase tracking-wide text-keyhole">
              Gracias, {form.name.split(" ")[0]}
            </p>
            <p className="mt-2 text-sm text-stone">
              Recibimos tu mensaje. Nuestro equipo te va a escribir a {form.email} en breve.
            </p>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/10 bg-[#111113] p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-[11px] uppercase tracking-wide text-zinc-500">
                  Nombre
                </span>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-cream outline-none transition focus:border-keyhole/50"
                  placeholder="Tu nombre"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-[11px] uppercase tracking-wide text-zinc-500">
                  Email de trabajo
                </span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-cream outline-none transition focus:border-keyhole/50"
                  placeholder="vos@empresa.com"
                />
              </label>
            </div>

            <label className="mt-4 flex flex-col gap-1.5">
              <span className="font-mono text-[11px] uppercase tracking-wide text-zinc-500">
                Contanos qué necesitás
              </span>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="resize-none rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-cream outline-none transition focus:border-keyhole/50"
                placeholder="Equipo, volumen de mensajes, qué querés cubrir primero..."
              />
            </label>

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-6 w-full rounded-full bg-keyhole py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:opacity-90 disabled:opacity-60"
            >
              {status === "sending" ? "Enviando..." : "Enviar"}
            </button>
          </form>
        )}
      </Reveal>
    </section>
  );
}
