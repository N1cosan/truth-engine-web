"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PhishingTool from "./tools/PhishingTool";
import SiteTool from "./tools/SiteTool";
import BreachTool from "./tools/BreachTool";
import IpTool from "./tools/IpTool";
import PasswordTool from "./tools/PasswordTool";
import TextRoll from "./TextRoll";

const TABS = [
  { key: "phishing", label: "Mensajes", component: PhishingTool },
  { key: "site", label: "Sitio", component: SiteTool },
  { key: "breach", label: "Correo filtrado", component: BreachTool },
  { key: "ip", label: "IP", component: IpTool },
  { key: "password", label: "Contraseña", component: PasswordTool },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function SecuritySuite({ initialTab = "phishing" }: { initialTab?: TabKey }) {
  const [active, setActive] = useState<TabKey>(initialTab);
  const ActiveComponent = TABS.find((t) => t.key === active)!.component;

  return (
    <div className="rounded-card border border-sand/15 bg-plum/60 p-2 shadow-[0_0_50px_-12px_rgba(197,255,74,0.15)] backdrop-blur-xl sm:p-3">
      <div className="mb-2 flex gap-1 overflow-x-auto p-1">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`relative shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-mono uppercase tracking-wide transition sm:px-4 ${
              active === tab.key ? "font-bold text-black" : "text-stone hover:text-cream"
            }`}
          >
            {active === tab.key && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 rounded-full bg-keyhole"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">
              <TextRoll bold={false}>{tab.label}</TextRoll>
            </span>
          </button>
        ))}
      </div>

      <div className="p-3 sm:p-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
