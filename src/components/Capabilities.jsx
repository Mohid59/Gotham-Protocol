import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BatSymbol from "./BatSymbol";

gsap.registerPlugin(ScrollTrigger);

// Asymmetric bento of core capabilities. Spans tile a 6-col grid perfectly:
// A(3x2) B(3) C(2) D(1) E(3) F(3).
const CELLS = [
  { n: "01", t: "WORLD'S GREATEST DETECTIVE", d: "Crime-scene reconstruction, profiling, and deductive reasoning without peer. No mystery in Gotham stays unsolved.", color: "#00e5ff", span: "md:col-span-3 md:row-span-2", big: true },
  { n: "02", t: "TACTICAL ARSENAL", d: "A belt and a cave full of purpose-built tech for every contingency.", color: "#ff2a3d", span: "md:col-span-3" },
  { n: "03", t: "MASTER OF FEAR", d: "Theatricality and terror, weaponized.", color: "#9dff00", span: "md:col-span-2" },
  { n: "04", t: "∞", d: "PREP TIME", color: "#ff8c1a", span: "md:col-span-1", stat: true },
  { n: "05", t: "PEAK CONDITIONING", d: "The pinnacle of human strength, speed, and endurance — sharpened daily.", color: "#00e5ff", span: "md:col-span-3" },
  { n: "06", t: "THE WAYNE FORTUNE", d: "Effectively unlimited resources funneled into a single relentless war on crime.", color: "#cfd2da", span: "md:col-span-3" },
];

export default function Capabilities() {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".cap-cell", {
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
        y: 40, opacity: 0, duration: 0.6, ease: "power3.out", stagger: 0.08,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative w-full border-t border-white/8 bg-gotham-void py-24">
      <div className="hud-grid pointer-events-none absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-10 flex items-center gap-3 font-mono text-[10px] tracking-[0.4em] text-bat-neon">
          <span className="h-px w-12 bg-bat-neon/60" />
          <span>CAPABILITY MATRIX</span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-6 md:auto-rows-[196px]">
          {CELLS.map((c) => (
            <Cell key={c.n} cell={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Cell({ cell }) {
  const ref = useRef(null);
  const enter = () => gsap.to(ref.current, { duration: 0.35, ease: "power3.out", borderColor: `${cell.color}66`, boxShadow: `0 0 30px ${cell.color}1f` });
  const leave = () => gsap.to(ref.current, { duration: 0.35, ease: "power3.out", borderColor: "rgba(255,255,255,0.10)", boxShadow: "0 0 0 rgba(0,0,0,0)" });

  return (
    <div
      ref={ref}
      onMouseEnter={enter}
      onMouseLeave={leave}
      className={`cap-cell group relative flex flex-col justify-between overflow-hidden border border-white/10 bg-gotham-ink p-6 ${cell.span}`}
    >
      <div className="hud-grid-fine pointer-events-none absolute inset-0 opacity-20" />
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: `radial-gradient(ellipse at 20% 10%, ${cell.color}1c, transparent 60%)` }} />
      {cell.big && <BatSymbol className="pointer-events-none absolute -bottom-6 -right-4 h-28 w-52 opacity-[0.06]" />}

      <div className="relative flex items-center justify-between font-mono text-[10px] tracking-[0.3em]">
        <span style={{ color: cell.color }}>SECTOR_{cell.n}</span>
        <span className="h-1.5 w-1.5" style={{ background: cell.color }} />
      </div>

      <div className="relative">
        {cell.stat ? (
          <>
            <div className="font-display text-[52px] font-bold leading-none" style={{ color: cell.color }}>{cell.t}</div>
            <div className="mt-2 font-mono text-[10px] tracking-[0.25em] text-white/50">{cell.d}</div>
          </>
        ) : (
          <>
            <h3 className={`font-display font-bold leading-tight text-white ${cell.big ? "text-[30px]" : "text-[19px]"}`}>{cell.t}</h3>
            <p className="mt-2 max-w-md font-mono text-[11px] leading-relaxed tracking-[0.05em] text-white/55">{cell.d}</p>
          </>
        )}
      </div>
    </div>
  );
}
