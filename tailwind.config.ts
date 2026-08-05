import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cocoa: "#000000",
        cream: "#fcfaf9",
        sand: "#e3ccc0",
        ash: "#e5e7eb",
        stone: "#a69f9d",
        plum: "#2b2538",
        aubergine: "#4d3f3b",
        mint: "#a2f6f5",
        keyhole: "#c5ff4a",
        // Kippo — panel "carbon" para la navbar y superficies elevadas
        // sobre el fondo negro puro (cocoa).
        carbon: "#29292a",
        // Integrated Biosciences — tokens exactos para la navbar estilo
        // "darkroom laboratory".
        "abyssal-ink": "#222f30",
        "bone-white": "#f7f7f5",
        paper: "#ffffff",
        graphite: "#4d5757",
        lichen: "#c9cbbe",
        tissue: "#e7e8e1",
        frost: "#eeeeee",
        void: "#000000",
        "bio-lime": "#cef79e",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        anton: ["var(--font-anton)", "sans-serif"],
        "roboto-mono": ["var(--font-roboto-mono)", "monospace"],
      },
      borderRadius: {
        card: "8px",
        input: "4px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        "marquee-fast": "marquee 16s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
