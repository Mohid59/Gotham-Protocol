import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRogues } from "../lib/hooks";
import { HudLoader, HudError } from "./DataState";

gsap.registerPlugin(ScrollTrigger);

export default function RoguesGallery() {
  const { data: rogues = [], isLoading, isError, refetch } = useRogues();
  const [index, setIndex] = useState(0);
  const safeIndex = rogues.length ? Math.min(index, rogues.length - 1) : 0;
  const active = rogues[safeIndex];

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const ambientRef = useRef(null);
  const railRef = useRef(null);
  const chipRefs = useRef([]);
  const featureImgRef = useRef(null);
  const dossierRef = useRef(null);

  const go = (i) => rogues.length && setIndex((i + rogues.length) % rogues.length);

  // ENTRANCE — runs once the records (and their refs) are actually rendered, so
  // it never targets null elements while the data query is still loading.
  // Chips animate transform-only so none can get stuck invisible.
  useEffect(() => {
    if (!rogues.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current?.children || [], {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 36, opacity: 0, duration: 0.6, ease: "power3.out", stagger: 0.07,
      });
      gsap.from(chipRefs.current.filter(Boolean), {
        x: 24, duration: 0.5, ease: "power3.out", stagger: 0.04,
      });
      if (featureImgRef.current && dossierRef.current) {
        gsap.from([featureImgRef.current, dossierRef.current], {
          scrollTrigger: { trigger: featureImgRef.current, start: "top 85%" },
          y: 40, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.1,
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [rogues.length]);

  // Keep the active chip scrolled into view inside the horizontal rail.
  useEffect(() => {
    const el = chipRefs.current[safeIndex];
    const rail = railRef.current;
    if (!el || !rail) return;
    const left = el.offsetLeft - rail.clientWidth / 2 + el.clientWidth / 2;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  }, [safeIndex]);

  // ACTIVE CHANGE — ambient shift + crossfade feature + slide dossier
  useEffect(() => {
    if (!active || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.to(ambientRef.current, {
        background: `radial-gradient(ellipse at 30% 25%, ${active.accentSoft}, transparent 60%)`,
        duration: 0.7, ease: "power2.out",
      });
      gsap.fromTo(featureImgRef.current, { opacity: 0.3, scale: 1.05 }, { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" });
      gsap.fromTo(dossierRef.current, { opacity: 0, x: 22 }, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" });
    }, sectionRef);
    return () => ctx.revert();
  }, [active?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isError && !rogues.length) {
    return (
      <section id="rogues" className="relative w-full bg-gotham-void py-28">
        <div className="mx-auto max-w-7xl px-6"><HudError onRetry={refetch} /></div>
      </section>
    );
  }
  if (isLoading && !rogues.length) {
    return (
      <section id="rogues" className="relative w-full bg-gotham-void py-28">
        <div className="mx-auto max-w-7xl px-6"><HudLoader label="DECRYPTING ROGUE INDEX" /></div>
      </section>
    );
  }

  return (
    <section id="rogues" ref={sectionRef} className="relative w-full overflow-hidden bg-gotham-void py-28">
      <div ref={ambientRef} className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(ellipse at 30% 25%, ${active.accentSoft}, transparent 60%)` }} />
      <div className="hud-grid pointer-events-none absolute inset-0 opacity-25" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <div ref={headerRef} className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.4em] text-bat-neon">
              <span className="h-px w-12 bg-bat-neon/60" />
              <span>SECTION_02 // CLASSIFIED</span>
            </div>
            <h2 className="mt-4 font-display font-bold tracking-[-0.02em] text-white" style={{ fontSize: "clamp(38px, 6.5vw, 96px)", lineHeight: 0.92 }}>
              ROGUES <span className="text-bat-crimson">GALLERY</span>
            </h2>
          </div>
          <p className="max-w-sm font-mono text-[11px] leading-relaxed tracking-[0.12em] text-white/55">
            {rogues.length} active hostiles flagged by the Batcomputer. Select a
            target below to open its live dossier.
          </p>
        </div>

        {/* SELECTOR RAIL — prominent, always visible */}
        <div className="mb-4 flex items-center justify-between font-mono text-[10px] tracking-[0.3em] text-white/45">
          <span>SELECT TARGET</span>
          <div className="flex items-center gap-3">
            <span style={{ color: active.accent }}>
              {String(safeIndex + 1).padStart(2, "0")} / {String(rogues.length).padStart(2, "0")}
            </span>
            <div className="flex gap-1.5">
              <button onClick={() => go(safeIndex - 1)} aria-label="Previous target" className="grid h-7 w-7 cursor-pointer place-items-center border border-white/15 text-white/70 transition-colors duration-200 hover:border-bat-neon/60 hover:text-bat-neon">‹</button>
              <button onClick={() => go(safeIndex + 1)} aria-label="Next target" className="grid h-7 w-7 cursor-pointer place-items-center border border-white/15 text-white/70 transition-colors duration-200 hover:border-bat-neon/60 hover:text-bat-neon">›</button>
            </div>
          </div>
        </div>

        <div ref={railRef} className="rail-scroll mb-6 flex snap-x gap-2.5 overflow-x-auto pb-3">
          {rogues.map((r, i) => {
            const isActive = i === safeIndex;
            return (
              <button
                key={r.id}
                ref={(el) => (chipRefs.current[i] = el)}
                type="button"
                onMouseEnter={() => setIndex(i)}
                onFocus={() => setIndex(i)}
                onClick={() => setIndex(i)}
                aria-pressed={isActive}
                aria-label={`Select ${r.codename}`}
                className="rogue-chip group relative h-28 w-[150px] flex-shrink-0 cursor-pointer snap-center overflow-hidden border bg-gotham-ink transition-all duration-200 sm:w-[165px]"
                style={{
                  borderColor: isActive ? r.accentRing : "rgba(255,255,255,0.10)",
                  boxShadow: isActive ? `0 12px 30px -12px ${r.accentRing}, inset 0 0 0 1px ${r.accentRing}` : "none",
                }}
              >
                <img
                  src={r.image}
                  alt={r.codename}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                  style={{ objectPosition: r.objectPos || "center 25%", filter: isActive ? "grayscale(0)" : "grayscale(0.7) brightness(0.65)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gotham-ink via-gotham-ink/25 to-transparent" />
                {isActive && <div className="absolute left-0 top-0 h-0.5 w-full" style={{ background: r.accent, boxShadow: `0 0 10px ${r.accent}` }} />}
                <div className="absolute inset-x-0 bottom-0 p-2">
                  <span className="block truncate font-display text-[11px] font-bold tracking-tight" style={{ color: isActive ? r.accent : "#ffffff" }}>
                    {r.codename}
                  </span>
                  <span className="block font-mono text-[8px] tracking-[0.2em] text-white/45">{r.threatLevel}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* FEATURE: image + dossier */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_1fr]">
          {/* IMAGE PANEL */}
          <div
            ref={featureImgRef}
            className="bracket-frame relative h-[420px] overflow-hidden border bg-gotham-ink md:h-[500px]"
            style={{ borderColor: active.accentRing, color: active.accent }}
          >
            {/* {/* DROP TRANSPARENT ROGUE PNG HERE */}
            <img
              key={active.id}
              src={active.image}
              alt={`${active.codename} — ${active.realName}`}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: active.objectPos || "center 25%" }}
            />
            <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(circle at 50% 35%, ${active.accentSoft}, transparent 65%)`, mixBlendMode: "screen" }} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gotham-ink via-gotham-ink/20 to-transparent" />
            <div className="hud-grid-fine pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px animate-scan" style={{ background: `linear-gradient(90deg, transparent, ${active.accent}, transparent)` }} />

            <div className="absolute left-4 top-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.3em]">
              <span className="h-1.5 w-1.5 animate-pulse" style={{ background: active.accent }} />
              <span style={{ color: active.accent }}>THREAT // {active.threatLevel}</span>
            </div>
            <div className="absolute right-4 top-4 font-mono text-[10px] tracking-[0.3em] text-white/60">ID-{active.id.toUpperCase()}</div>

            <div className="absolute inset-x-0 bottom-0 p-6">
              <h3 className="font-display font-bold tracking-tight text-white" style={{ fontSize: "clamp(28px, 4.2vw, 48px)", lineHeight: 1 }}>
                {active.codename}
              </h3>
              <p className="mt-1 font-mono text-[11px] tracking-[0.22em] text-white/55">{active.realName} // {active.firstSeen}</p>
            </div>
          </div>

          {/* DOSSIER */}
          <aside
            ref={dossierRef}
            className="bracket-frame relative flex flex-col border bg-black/55 p-6 backdrop-blur-sm md:p-7"
            style={{ borderColor: active.accentRing, color: active.accent }}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em]">
                <span className="h-1.5 w-1.5 animate-pulse" style={{ background: active.accent }} />
                <span>DOSSIER // LIVE</span>
              </div>
              <span className="font-mono text-[10px] tracking-[0.3em] text-white/40">ENCRYPTED</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {active.tags.map((t) => (
                <span key={t} className="border px-2 py-1 font-mono text-[9px] tracking-[0.25em] text-white/85" style={{ borderColor: active.accentRing, background: active.accentSoft }}>
                  {t}
                </span>
              ))}
            </div>

            <p className="mt-4 font-mono text-[12px] leading-relaxed tracking-[0.04em] text-white/75">{active.bio}</p>

            <div className="mt-5 space-y-2.5">
              {Object.entries(active.stats).map(([k, v]) => (
                <StatBar key={k} label={k} value={v} accent={active.accent} />
              ))}
            </div>

            <div className="mt-5 border-t border-white/10 pt-4">
              <div className="mb-1 flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-white/45">
                <span>AGGREGATE THREAT SCORE</span>
                <span style={{ color: active.accent }}>{active.threatScore}/100</span>
              </div>
              <div className="h-[4px] w-full bg-white/8">
                <div className="h-full transition-all duration-500" style={{ width: `${active.threatScore}%`, background: active.accent, boxShadow: `0 0 10px ${active.accentRing}` }} />
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div className="hazard-stripes pointer-events-none absolute bottom-0 left-0 right-0 h-1.5 opacity-60" />
    </section>
  );
}

/* ============================================================ */

function StatBar({ label, value, accent }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between font-mono text-[9px] tracking-[0.25em]">
        <span className="text-white/50">{label.toUpperCase()}</span>
        <span style={{ color: accent }}>{value}</span>
      </div>
      <div className="h-[2px] w-full bg-white/8">
        <div className="h-full transition-all duration-700" style={{ width: `${value}%`, background: accent, boxShadow: `0 0 6px ${accent}` }} />
      </div>
    </div>
  );
}
