import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageShell from "../components/PageShell";
import BatSymbol from "../components/BatSymbol";
import { useAllies } from "../lib/hooks";
import { HudLoader, HudError } from "../components/DataState";

gsap.registerPlugin(ScrollTrigger);

export default function Allies() {
  const { data: allies = [], isLoading, isError, refetch } = useAllies();
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".ally-card", {
        scrollTrigger: { trigger: ".ally-grid", start: "top 85%" },
        y: 48, opacity: 0, duration: 0.6, ease: "power3.out", stagger: 0.09,
      });
    }, ref);
    return () => ctx.revert();
  }, [allies.length]);

  return (
    <PageShell
      kicker="SECTION_02B // ALLIED ASSETS"
      title={<>THE <span className="text-bat-neon">BAT-FAMILY</span></>}
      intro="Batman works alone — except when he doesn't. A vetted network of operatives, each trained in the cave and trusted with the mission."
      wide
    >
      <div ref={ref}>
        {isError && !allies.length ? (
          <HudError onRetry={refetch} />
        ) : isLoading && !allies.length ? (
          <HudLoader label="LOADING ALLIED ASSETS" />
        ) : (
          <div className="ally-grid grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {allies.map((a) => (
              <AllyCard key={a.id} ally={a} />
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}

function AllyCard({ ally }) {
  const ref = useRef(null);
  const enter = () =>
    gsap.to(ref.current, { y: -8, duration: 0.4, ease: "power3.out", boxShadow: `0 24px 44px -22px ${ally.color}66, 0 0 30px ${ally.color}22` });
  const leave = () =>
    gsap.to(ref.current, { y: 0, duration: 0.4, ease: "power3.out", boxShadow: "0 0 0 rgba(0,0,0,0)" });

  return (
    <article
      ref={ref}
      onMouseEnter={enter}
      onMouseLeave={leave}
      className="ally-card group relative flex flex-col overflow-hidden border border-white/10 bg-gotham-ink transition-colors duration-200 hover:border-white/25"
    >
      {/* AVATAR */}
      <div className="relative h-52 overflow-hidden">
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 35%, ${ally.color}26, transparent 65%), linear-gradient(160deg, #0c0d12, #050507)` }} />
        {ally.image ? (
          /* DROP TRANSPARENT ALLY PNG HERE — swap the import in allies.js */
          <img
            src={ally.image}
            alt={`${ally.codename} — ${ally.realName}`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            style={{ objectPosition: ally.objectPos || "center 22%" }}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-display text-[64px] font-bold leading-none" style={{ color: ally.color, textShadow: `0 0 30px ${ally.color}66` }}>
              {ally.mono}
            </span>
          </div>
        )}
        <div className="hud-grid-fine pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gotham-ink via-gotham-ink/15 to-transparent" />
        <div className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-300 group-hover:opacity-0" style={{ background: `linear-gradient(180deg, transparent 40%, ${ally.color}14 100%)`, mixBlendMode: "screen" }} />
        <BatSymbol className="absolute bottom-3 right-3 h-3 w-6 opacity-30" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px animate-scan" style={{ background: `linear-gradient(90deg, transparent, ${ally.color}, transparent)` }} />
        <div className="absolute left-3 top-3 flex items-center gap-2 font-mono text-[9px] tracking-[0.3em]">
          <span className="h-1.5 w-1.5 animate-pulse" style={{ background: ally.color }} />
          <span style={{ color: ally.color }}>{ally.status}</span>
        </div>
        <div className="pointer-events-none absolute left-2 bottom-2 h-3 w-3 border-l border-b" style={{ borderColor: ally.color }} />
      </div>

      {/* META */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-[22px] font-bold tracking-tight text-white">{ally.codename}</h3>
        <div className="mt-1 flex items-center gap-2">
          <span className="font-mono text-[10px] tracking-[0.2em] text-white/45">{ally.realName}</span>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: ally.color }}>{ally.role}</span>
        </div>
        <p className="mt-3 font-mono text-[11px] leading-relaxed tracking-[0.04em] text-white/55">{ally.bio}</p>
      </div>
    </article>
  );
}
