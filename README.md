# MADRIU AI — The Truth Engine (frontend)

Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion.
Conecta directo a tu API en Render (`/analyze`, `/check-breach`,
`/check-ip`, `/check-password`).

## Correrlo local

Necesitas [Node.js](https://nodejs.org) instalado (18+ recomendado).

```powershell
cd truth-engine-web
npm install
npm run dev
```

Abre http://localhost:3000

Si `npm install` o `npm run dev` te dan un error, cópiame el mensaje
completo — no pude compilar este proyecto en mi entorno (sin acceso a
internet), así que puede haber algún ajuste de import o versión que
falte afinar la primera vez que corra en tu máquina.

## Desplegar en Vercel

1. Sube esta carpeta a un repo de GitHub (puede ser el mismo
   `ai-ids-proyecto` en una subcarpeta, o uno nuevo — lo segundo es
   más simple para que Vercel no se confunda con el resto del repo
   de Python).
2. Ve a [vercel.com](https://vercel.com) → **Add New Project** → importa
   el repo.
3. Si el proyecto quedó en una subcarpeta, en **Root Directory**
   selecciona esa subcarpeta (ej. `truth-engine-web`).
4. Vercel detecta Next.js automáticamente — no hace falta configurar
   nada más. Deploy.

## Seguridad pendiente (no lo dejes así para producción real)

`lib/api.ts` tiene la API key de tu backend escrita directamente en
el código del cliente — cualquiera puede verla con "ver código
fuente". Está bien para la fase piloto, pero antes de compartir esto
públicamente hay que mover las llamadas a través de una
[API Route de Next.js](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
que guarde la key del lado del servidor.

## Estructura

```
app/
  layout.tsx       Layout raíz, fuentes
  page.tsx          Hero + Security Suite
  globals.css       Tailwind + fuentes + estilos base
components/
  Navbar.tsx
  Footer.tsx
  Globe.tsx         Globo de puntos animado (canvas, sin dependencias)
  SecuritySuite.tsx Panel de tabs (glassmorphism + Framer Motion)
  tools/
    PhishingTool.tsx
    BreachTool.tsx
    IpTool.tsx
    PasswordTool.tsx
lib/
  api.ts            Llamadas a la API + tipos
```
