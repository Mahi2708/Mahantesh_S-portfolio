# DREAMER — Mahanthesh S

A React + TypeScript cinematic automotive portfolio for **Mahanthesh S**.

## Stack

- React + TypeScript
- Vite
- GSAP + ScrollTrigger
- Express server for O-01
- OpenAI Responses API through a server-side route
- CSS design system

## Run locally

```bash
npm install
npm run dev
```

The Vite client runs on `http://localhost:5173` and the O-01 server runs on `http://localhost:8787`.

## Enable O-01

Copy `.env.example` to `.env` and add your server-side key:

```env
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-5.6-luna
PORT=8787
```

Never put `OPENAI_API_KEY` in React client code.

Without a key, the chat UI remains available in demo mode.

## Build

```bash
npm run build
npm run preview
```

## Content

Edit `src/data/portfolio.json` for verified portfolio information. The chatbot reads the same file, so it stays grounded in the portfolio data.

## Main structure

```text
src/
  components/
    hero/
    navigation/
    sections/
    chat/
  data/
  lib/
  App.tsx
  main.tsx
  styles.css
server/
  index.js
public/assets/
  hero/
  profile/
  projects/
  certifications/
  experience/
  resume/
```

The current hero artwork is stored at `public/assets/hero/hero-scene.png`.
