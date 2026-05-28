import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import PageShell from "../components/PageShell";
import Capabilities from "../components/Capabilities";
import { ROGUES } from "../data/rogues";
import batmanImg from "../assets/batman.webp";
import gothamBg from "../assets/gotham-bg.webp";

const STATS = [
  { k: "YEARS ACTIVE", v: "22" },
  { k: "ROGUES INDEXED", v: String(ROGUES.length).padStart(2, "0") },
  { k: "CASE CLOSURE", v: "97%" },
  { k: "RULE", v: "NO GUNS" },
];

const QUICK = [
  { to: "/rogues", n: "02", label: "ROGUES GALLERY", desc: "Active hostile threat dossiers.", color: "#ff2a3d" },
  { to: "/armory", n: "03", label: "THE ARMORY", desc: "Suits, vehicles & belt ordnance.", color: "#00e5ff" },
  { to: "/contact", n: "04", label: "THE SIGNAL", desc: "Open a secure channel to Gotham.", color: "#9dff00" },
];

export default function Home() {
  const root = useRef(null);
  const portraitRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let onMove;
    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap.from(".hero-line", { y: 40, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.12, delay: 0.1 });
      gsap.from(".hero-fade", { y: 18, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.1, delay: 0.5 });
      gsap.from(portraitRef.current, { scale: 0.92, opacity: 0, duration: 1.2, ease: "power3.out", delay: 0.2 });
      gsap.to(portraitRef.current, { yPercent: 2.5, duration: 3.6, repeat: -1, yoyo: true, ease: "sine.inOut" });

      const qx = gsap.quickTo(portraitRef.current, "x", { duration: 0.9, ease: "power3" });
      const qy = gsap.quickTo(portraitRef.current, "y", { duration: 0.9, ease: "power3" });
      onMove = (e) => {
        const nx = (e.clientX / window.innerWidth - 0.5) * 2;
        const ny = (e.clientY / window.innerHeight - 0.5) * 2;
        qx(nx * 9);
        qy(ny * 7);
      };
      window.addEventListener("mousemove", onMove);
    }, root);
    return () => {
      if (onMove) window.removeEventListener("mousemove", onMove);
      ctx.revert();
    };
  }, []);

  return (
    <PageShell bare>
      <section ref={root} className="scanlines relative flex min-h-screen w-full items-center overflow-hidden bg-gotham-void pt-16">
        {/* BACKDROP */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 35%, #1a0a10 0%, #0a0507 50%, #050505 85%)" }} />
        <img src={gothamBg} alt="" className="absolute inset-0 h-full w-full object-cover object-center opacity-25" style={{ filter: "saturate(0.6) brightness(0.6)" }} />
        <div className="hud-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="hud-grid-fine pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay" />

        {/* BATMAN — full-height, full-bleed right, blended into the page */}
        <div ref={portraitRef} className="gpu pointer-events-none absolute inset-y-0 right-0 z-0 w-full lg:w-[66%]">
          <div className="absolute right-[10%] top-1/2 h-[120vh] w-[55vh] -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,42,61,0.18), rgba(0,229,255,0.05) 45%, transparent 70%)", filter: "blur(24px)" }} />
          {/* {/* DROP TRANSPARENT BATMAN PNG HERE */}
          <img
            src={batmanImg}
            alt="The Batman"
            className="h-full w-full object-cover"
            style={{
              objectPosition: "center 12%",
              WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 36%, #000 100%)",
              maskImage: "linear-gradient(90deg, transparent 0%, #000 36%, #000 100%)",
            }}
          />
          {/* page-colour blend on every edge — kills the rectangle */}
          <div className="absolute inset-0 bg-gradient-to-r from-gotham-void via-gotham-void/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-gotham-void to-transparent" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-gotham-void to-transparent" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gotham-void/70 to-transparent" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20">
          <div className="max-w-xl">
            <div className="hero-fade flex items-center gap-3 font-mono text-[11px] tracking-[0.4em] text-bat-neon">
              <span className="h-px w-10 bg-bat-neon/60" />
              <span>WAYNE ENTERPRISES // CLASSIFIED</span>
            </div>

            <h1 className="mt-5 font-display font-bold uppercase leading-[0.88] tracking-[-0.02em] text-white" style={{ fontSize: "clamp(46px, 7.5vw, 118px)" }}>
              <span className="hero-line block text-[0.42em] font-medium tracking-[0.1em] text-white/70">I AM THE NIGHT.</span>
              <span className="hero-line block">I'M THE</span>
              <span className="hero-line block text-bat-neon" style={{ textShadow: "0 0 44px rgba(0,229,255,0.35)" }}>DARK KNIGHT</span>
            </h1>

            <p className="hero-fade mt-6 max-w-md font-mono text-[13px] leading-relaxed tracking-[0.08em] text-white/60">
              Gotham&apos;s silent guardian. A one-man war on crime waged from the
              shadows — powered by fear, discipline, and the most advanced
              tactical arsenal ever built.
            </p>

            <div className="hero-fade mt-9 flex flex-wrap items-center gap-3">
              <Link to="/dossier" className="group inline-flex cursor-pointer items-center gap-3 border border-bat-neon/60 bg-bat-neon/5 px-7 py-3.5 font-mono text-[11px] tracking-[0.35em] text-bat-neon transition-all duration-200 hover:bg-bat-neon/15 hover:shadow-neon-blue">
                <span>OPEN DOSSIER</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
              <Link to="/armory" className="inline-flex cursor-pointer items-center gap-3 border border-white/15 bg-white/5 px-7 py-3.5 font-mono text-[11px] tracking-[0.35em] text-white/70 transition-all duration-200 hover:border-bat-crimson/60 hover:text-bat-crimson">
                VIEW ARMORY
              </Link>
            </div>

            {/* STATS STRIP */}
            <div className="hero-fade mt-12 grid max-w-lg grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.k} className="bg-gotham-void p-4">
                  <div className="font-display text-[24px] font-bold text-white">{s.v}</div>
                  <div className="mt-1 font-mono text-[8px] tracking-[0.2em] text-white/40">{s.k}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="vignette pointer-events-none absolute inset-0" />
        <div className="noise pointer-events-none absolute inset-0" />
      </section>

      {/* CAPABILITY BENTO */}
      <Capabilities />

      {/* QUICK ACCESS */}
      <section className="relative w-full border-t border-white/8 bg-gotham-ink py-20">
        <div className="hud-grid pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-10 flex items-center gap-3 font-mono text-[10px] tracking-[0.4em] text-bat-neon">
            <span className="h-px w-12 bg-bat-neon/60" />
            <span>NAVIGATE THE ARCHIVE</span>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {QUICK.map((q) => (
              <Link key={q.to} to={q.to} className="group relative flex h-44 cursor-pointer flex-col justify-between overflow-hidden border border-white/10 bg-gotham-void p-6 transition-colors duration-200 hover:border-white/25">
                <div className="hud-grid-fine pointer-events-none absolute inset-0 opacity-20" />
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: `radial-gradient(ellipse at 30% 20%, ${q.color}18, transparent 60%)` }} />
                <div className="relative flex items-center justify-between font-mono text-[10px] tracking-[0.3em]">
                  <span style={{ color: q.color }}>SECTION_{q.n}</span>
                  <span className="text-white/40 transition-transform duration-200 group-hover:translate-x-1" style={{ color: q.color }}>→</span>
                </div>
                <div className="relative">
                  <h3 className="font-display text-[22px] font-bold tracking-tight text-white">{q.label}</h3>
                  <p className="mt-1 font-mono text-[10px] leading-relaxed tracking-[0.1em] text-white/45">{q.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
