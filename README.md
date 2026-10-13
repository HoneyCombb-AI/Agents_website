# Honeycomb AI

Single-page marketing site for Honeycomb AI, the Bangalore company building agents for Indian manufacturers and distributors.

The frontend matches the tooling in [HoneyCombb-AI/Demo_RFQ](https://github.com/HoneyCombb-AI/Demo_RFQ): Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, and shadcn (`base-mira`, Base UI, `class-variance-authority`).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run typecheck
npm run lint
npm run build
```

## Page

Fixed header with an Agents menu, a full-bleed hero whose headline word rotates, an industry mosaic that filters the agent carousel, a six-agent carousel, a “works inside” system list, a scroll-pinned four-step process, a closing call to action, and a footer with a masked Honeycomb wordmark.

Demo links open `mailto:ankush@honeycombai.in`.

Factory photography is loaded from Unsplash. Swap the photo ids in `lib/content.ts`.
