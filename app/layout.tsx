import type { Metadata } from "next";
import { Anton } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

// Fuente condensada ultra-bold solo para el titular hero — estilo
// DICE/editorial. Se expone como variable CSS y se mapea a la clase
// utilitaria `font-anton` en tailwind.config.ts, sin tocar font-display
// (Inter), que sigue usándose en el resto de los encabezados del sitio.
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

export const metadata: Metadata = {
  title: "MADRIU AI — Evita fugas de credenciales",
  description:
    "Suite de seguridad: detección de phishing, verificación de brechas de datos, reputación de IP y análisis de contraseñas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`dark ${anton.variable}`}>
      <body className="font-body">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
