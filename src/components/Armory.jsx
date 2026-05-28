import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SUITS } from "../data/suits";
import { VEHICLES } from "../data/vehicles";
import { GADGETS } from "../data/gadgets";
import BatSymbol from "./BatSymbol";
import { BlueprintScan, VehicleArt, GadgetIcon } from "./ArmoryArt";

gsap.registerPlugin(ScrollTrigger);

// Render the scan art for any suit/vehicle item.
function ItemArt({ item, large = false }) {
  return (
    <BlueprintScan color={item.color} large={large}>
      {item.kind === "vehicle" ? (
        <VehicleArt type={item.art} className={large ? "w-72" : "w-48"} />
      ) : (
        <BatSymbol className={large ? "w-44" : "w-28"} title={`${item.name} emblem`} />
      )}
    </BlueprintScan>
  );
}

export default function Armory() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current?.children || [], {
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
        y: 36, opacity: 0, duration: 0.6, stagger: 0.07, ease: "power3.out",
      });
      sectionRef.current?.querySelectorAll("[data-reveal]").forEach((row) => {
        gsap.from(row.querySelectorAll("[data-tile]"), {
          scrollTrigger: { trigger: row, start: "top 88%" },
          y: 46, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="armory" ref={sectionRef} className="relative w-full overflow-hidden bg-gotham-ink py-28">
      <div className="hud-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,229,255,0.10), transparent 60%)" }} />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <div ref={headerRef} className="mb-14 flex flex-col items-start gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.4em] text-bat-neon">
              <span className="h-px w-12 bg-bat-neon/60" />
              <span>SECTION_03 // RESTRICTED</span>
            </div>
            <h2 className="mt-4 font-display font-bold tracking-[-0.02em] text-white" style={{ fontSize: "clamp(38px, 6.5vw, 96px)", lineHeight: 0.92 }}>
              THE <span className="text-bat-neon">ARMORY</span>
            </h2>
            <p className="mt-4 max-w-xl font-mono text-[12px] leading-relaxed tracking-[0.12em] text-white/55">
              Wayne Enterprises black-budget inventory. Suits, vehicles, and
              utility-belt ordnance. Select an asset to retrieve full specs.
            </p>
          </div>
          <div className="bracket-frame border border-bat-neon/30 p-3 text-bat-neon">
            <div className="font-mono text-[9px] tracking-[0.3em] text-white/50">VAULT STATUS</div>
            <div className="mt-1 font-mono text-[15px] tracking-[0.15em]">ALL SYSTEMS NOMINAL</div>
          </div>
        </div>

        {/* SUITS */}
        <SubHeader index="01" label="COMBAT SUITS" accent="#00e5ff" count={SUITS.length} />
        <div data-reveal className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {SUITS.map((s) => (
            <AssetTile key={s.id} item={s} onOpen={() => setOpen(s)} />
          ))}
        </div>

        {/* VEHICLES */}
        <SubHeader index="02" label="VEHICLES" accent="#9dff00" count={VEHICLES.length} />
        <div data-reveal className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {VEHICLES.map((v) => (
            <AssetTile key={v.id} item={v} onOpen={() => setOpen(v)} />
          ))}
        </div>

        {/* GADGETS */}
        <SubHeader index="03" label="UTILITY-BELT GADGETS" accent="#ff8c1a" count={GADGETS.length} />
        <div data-reveal className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {GADGETS.map((g) => (
            <GadgetCard key={g.id} gadget={g} />
          ))}
        </div>
      </div>

      <ItemModal item={open} onClose={() => setOpen(null)} />
    </section>
  );
}

/* ============================================================ */

function SubHeader({ index, label, accent, count }) {
  return (
    <div className="mb-5 flex items-center gap-4">
      <span className="font-mono text-[11px] tracking-[0.3em]" style={{ color: accent }}>{index}</span>
      <h3 className="font-display text-[18px] font-bold tracking-[0.04em] text-white">{label}</h3>
      <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${accent}55, transparent)` }} />
      <span className="font-mono text-[10px] tracking-[0.3em] text-white/40">{String(count).padStart(2, "0")} INDEXED</span>
    </div>
  );
}

function AssetTile({ item, onOpen }) {
  const ref = useRef(null);
  const enter = () => gsap.to(ref.current, { y: -8, duration: 0.4, ease: "power3.out", boxShadow: `0 25px 40px -25px ${item.color}66, 0 0 30px ${item.color}22` });
  const leave = () => gsap.to(ref.current, { y: 0, duration: 0.4, ease: "power3.out", boxShadow: "0 0 0 rgba(0,0,0,0)" });

  return (
    <button
      ref={ref}
      data-tile
      type="button"
      onMouseEnter={enter}
      onMouseLeave={leave}
      onClick={onOpen}
      className="group relative flex h-[440px] cursor-pointer flex-col overflow-hidden border border-white/10 bg-gotham-void text-left transition-colors duration-200 hover:border-white/25"
      style={{ outline: "none" }}
    >
      <div className="relative h-[260px] overflow-hidden">
        {item.image ? (
          /* {/* DROP TRANSPARENT ASSET PNG HERE */
          <img src={item.image} alt={item.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" style={{ objectPosition: item.objectPos || "center 25%" }} />
        ) : (
          <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]">
            <ItemArt item={item} />
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gotham-void via-gotham-void/25 to-transparent" />
        <div className="absolute left-3 top-3 font-mono text-[10px] tracking-[0.3em] text-white/50">{item.designation}</div>
        <div className="absolute right-3 top-3 font-mono text-[10px] tracking-[0.3em]" style={{ color: item.color }}>● ACTIVE</div>
        <div className="pointer-events-none absolute left-2 bottom-2 h-3 w-3 border-l border-b" style={{ borderColor: item.color }} />
        <div className="pointer-events-none absolute right-2 bottom-2 h-3 w-3 border-r border-b" style={{ borderColor: item.color }} />
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h4 className="font-display font-bold tracking-tight text-white" style={{ fontSize: "22px" }}>{item.name}</h4>
          <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-white/40">{item.era}</p>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[10px] tracking-[0.3em] text-white/60 transition-colors group-hover:text-white">
          <span>VIEW SPECS</span>
          <span className="inline-block transition-transform group-hover:translate-x-1" style={{ color: item.color }}>→</span>
        </div>
      </div>
    </button>
  );
}

function GadgetCard({ gadget }) {
  return (
    <div
      data-tile
      className="group relative flex flex-col gap-3 border border-white/10 bg-gotham-void p-4 transition-colors duration-200 hover:border-white/25"
    >
      <div className="hud-grid-fine pointer-events-none absolute inset-0 opacity-30" />
      <div
        className="relative grid h-12 w-12 place-items-center border"
        style={{ borderColor: `${gadget.color}40`, color: gadget.color, background: `${gadget.color}12` }}
      >
        <GadgetIcon type={gadget.icon} className="h-6 w-6" />
      </div>
      <div className="relative">
        <h4 className="font-display text-[14px] font-bold tracking-tight text-white">{gadget.name}</h4>
        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: gadget.color }}>{gadget.spec}</p>
        <p className="mt-2 font-mono text-[10px] leading-relaxed tracking-[0.04em] text-white/55">{gadget.detail}</p>
      </div>
    </div>
  );
}

/* ============================================================ */

function ItemModal({ item, onClose }) {
  const overlayRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!item) return;
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    gsap.fromTo(cardRef.current, { opacity: 0, y: 30, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" });

    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />
      <div className="hud-grid pointer-events-none absolute inset-0 opacity-30" />

      <div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        className="relative grid max-h-[90vh] w-full max-w-5xl grid-cols-1 overflow-hidden border bg-gotham-ink lg:grid-cols-[1fr_1.1fr]"
        style={{ borderColor: `${item.color}55`, boxShadow: `0 30px 80px -30px ${item.color}aa` }}
      >
        <button onClick={onClose} className="absolute right-4 top-4 z-20 flex h-9 w-9 cursor-pointer items-center justify-center border border-white/15 bg-black/60 font-mono text-[14px] text-white/70 transition-colors duration-200 hover:border-bat-crimson hover:text-bat-crimson" aria-label="Close">✕</button>

        {/* LEFT — SCAN */}
        <div className="relative h-[280px] overflow-hidden lg:h-auto lg:min-h-[460px]">
          {item.image ? (
            /* {/* DROP TRANSPARENT ASSET PNG HERE */
            <img src={item.image} alt={item.name} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: item.objectPos || "center 25%" }} />
          ) : (
            <ItemArt item={item} large />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent to-gotham-ink/70 lg:to-gotham-ink" />
          <div className="absolute bottom-5 left-5 font-mono text-[10px] tracking-[0.3em]" style={{ color: item.color }}>VAULT SCAN // {item.designation}</div>
        </div>

        {/* RIGHT — DETAILS */}
        <div className="relative overflow-y-auto p-7 lg:p-10">
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.35em]" style={{ color: item.color }}>
            <span className="h-1.5 w-1.5 animate-pulse" style={{ background: item.color }} />
            <span>SPECIFICATION // OPEN</span>
          </div>
          <h3 className="mt-3 font-display font-bold tracking-tight text-white" style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1 }}>{item.name}</h3>
          <p className="mt-1 font-mono text-[10px] tracking-[0.25em] text-white/40">{item.era}</p>
          <p className="mt-5 max-w-md font-mono text-[12px] leading-relaxed tracking-[0.05em] text-white/70">{item.summary}</p>

          <div className="mt-6">
            <div className="mb-2 font-mono text-[9px] tracking-[0.35em] text-white/40">STRUCTURAL COMPOSITION</div>
            <div className="divide-y divide-white/8 border border-white/10">
              {item.composition.map((c) => (
                <div key={c.label} className="flex items-center justify-between px-3 py-2 font-mono text-[11px] tracking-[0.12em]">
                  <span className="text-white/45">{c.label}</span>
                  <span style={{ color: item.color }}>{c.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-2 font-mono text-[9px] tracking-[0.35em] text-white/40">{item.kind === "vehicle" ? "CAPABILITIES" : "TACTICAL LOADOUT"}</div>
            <ul className="space-y-1.5">
              {item.loadout.map((l) => (
                <li key={l} className="flex items-start gap-2 font-mono text-[11px] tracking-[0.05em] text-white/75">
                  <span style={{ color: item.color }}>▸</span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-7 flex items-center gap-3">
            <button onClick={onClose} className="cursor-pointer border bg-white/5 px-4 py-2 font-mono text-[10px] tracking-[0.3em] text-white/70 transition-colors duration-200 hover:bg-white/10" style={{ borderColor: `${item.color}55` }}>CLOSE FILE</button>
            <button className="cursor-pointer border px-4 py-2 font-mono text-[10px] tracking-[0.3em] transition-colors duration-200" style={{ borderColor: `${item.color}88`, color: item.color, background: `${item.color}11` }}>
              {item.kind === "vehicle" ? "DEPLOY ASSET →" : "DEPLOY CHASSIS →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
