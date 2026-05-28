# 🦇 Gotham Protocol

> **Batcomputer OS v7.42** — a cinematic, multi-page Batman showcase built as a tactical HUD interface.

A dark, immersive web experience styled as the classified Wayne Enterprises archive: a "system booting" intro, a parallax hero, an interactive 13-villain rogues gallery, the Bat-Family roster, an armory of suits, vehicles & gadgets, and a contact "signal." Built with React, GSAP, and Framer Motion.

**Live demo:** https://mohid59.github.io/Gotham-Protocol/ &nbsp;·&nbsp; _(activates once GitHub Pages is enabled — see [Deployment](#-deployment))_

---

## ✨ Features

- **Cinematic boot sequence** — a one-time "mainframe sync" intro on first load.
- **Persistent Batcomputer HUD** — corner brackets, scanlines, a live signal ticker, and a tactical top nav.
- **Parallax hero** — full-bleed Batman art with cursor-tracking depth and a sequenced GSAP reveal.
- **Rogues Gallery** — 13 villains in a horizontal selector rail that auto-centers the active target, each with a live dossier (bio, stats, threat score) and an ambient glow that shifts to the villain's accent color.
- **The Bat-Family** — an allied-assets roster with status badges.
- **The Armory** — combat suits, vehicles, and utility-belt gadgets, with detail modals.
- **Classified Files** — an animated accordion of "declassified" intel on the Dossier page.
- **Smooth scrolling** (Lenis) wired into the GSAP ticker, with **Framer Motion** page transitions.
- **Production-ready** — WebP-optimized imagery, vendor code-splitting, SPA routing fallbacks, social meta tags, full mobile responsiveness, and `prefers-reduced-motion` support.

## 🗺️ Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | **Home** | Hero, capability bento grid, and quick-access cards |
| `/dossier` | **Dossier** | Subject file: bio, identity matrix, training, operations history, declassified files |
| `/rogues` | **Rogues** | Interactive 13-villain threat gallery |
| `/allies` | **Allies** | The Bat-Family roster |
| `/armory` | **Armory** | Suits, vehicles & gadgets with spec modals |
| `/contact` | **Contact** | Bat-Signal channel + transmission form |

## 🛠️ Tech Stack

- **[React 19](https://react.dev)** + **[Vite](https://vite.dev)**
- **[React Router](https://reactrouter.com)** — multi-page routing
- **[Tailwind CSS](https://tailwindcss.com)** — styling & design tokens
- **[GSAP](https://gsap.com)** (+ ScrollTrigger) — scroll & entrance animations
- **[Framer Motion](https://www.framer.com/motion/)** — page transitions
- **[Lenis](https://lenis.darkroom.engineering/)** — smooth scrolling
- **[Supabase](https://supabase.com)** (Postgres) — content + contact-form backend
- **[TanStack Query](https://tanstack.com/query)** — data fetching, caching & loading states

## 🚀 Getting Started

```bash
# install dependencies
npm install

# start the dev server (http://localhost:5173)
npm run dev

# type-check lint
npm run lint

# production build → dist/
npm run build

# preview the production build locally
npm run preview
```

## 📁 Project Structure

```
src/
├── pages/          # routed pages (Home, Dossier, Rogues, Allies, Armory, Contact)
├── components/     # Navbar, Footer, HUDOverlay, BootSequence, PageShell, DataState, etc.
├── data/           # content + DB seed source: rogues, allies, suits, vehicles, gadgets
├── lib/            # supabase client, data API (+ local fallback), query hooks, image map
├── assets/         # optimized WebP imagery
├── App.jsx         # layout shell: routing, transitions, smooth scroll, boot
├── main.jsx        # entry + router + React Query provider
└── index.css       # Tailwind + HUD utility classes

supabase/schema.sql # tables + Row Level Security
scripts/seed.mjs    # seed the DB from src/data
```

## 🎨 Customization

All content lives in `src/data/` — edit those files to change characters, suits, vehicles, gadgets, bios, stats, and accent colors.

To swap imagery, drop a new file into `src/assets/` and update the matching `import` in the relevant data file (e.g. `rogues.js`). Each entry supports an `objectPos` field (CSS `object-position`) to frame the subject. Source images are stored as optimized WebP; re-export large art as WebP (~1200 px longest side) to keep load times fast.

## 🗄️ Backend (Supabase)

Content (rogues, allies, suits, vehicles, gadgets) and the contact form are
backed by **Supabase** — with a graceful fallback to bundled local content, so
the app runs perfectly even with no backend configured.

**Setup (optional — the app works without it):**

1. Create a project at [supabase.com](https://supabase.com).
2. Run [`supabase/schema.sql`](supabase/schema.sql) in the SQL Editor (creates tables + Row Level Security).
3. Copy `.env.example` → `.env` and fill in your keys (Settings → API).
4. Seed the database from the local content:
   ```bash
   npm run seed
   ```
5. `npm run dev` — the site now reads from Supabase (with HUD "decrypting" loading states); the contact form writes to the `transmissions` table.

**How it works:** [`src/lib/api.js`](src/lib/api.js) fetches each collection from Supabase when `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` are present, and falls back to [`src/data/`](src/data/) otherwise. Data is fetched via **TanStack Query**; images stay as optimized local assets attached by id. RLS makes content world-readable while keeping submitted transmissions private (insert-only).

## 🌐 Deployment

The repo ships with a **GitHub Actions → Pages** workflow ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)).

**GitHub Pages**
1. Repo → **Settings → Pages → Source: "GitHub Actions"**.
2. Push to `main` — the workflow builds with the correct base path (`/Gotham-Protocol/`) and deploys automatically.

**Vercel / Netlify** (root domain, no base path)
- Import the repo; Vite is auto-detected. SPA deep-link routing is handled by [`vercel.json`](vercel.json) and [`public/_redirects`](public/_redirects).

## ⚖️ Disclaimer

A non-commercial fan project built for educational and portfolio purposes. **Batman** and all related characters, names, and imagery are trademarks of and © **DC Comics / Warner Bros.** All rights belong to their respective owners.

---

<p align="center"><em>"It's not who I am underneath, but what I do that defines me."</em></p>
