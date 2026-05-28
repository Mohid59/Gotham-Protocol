import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageShell from "../components/PageShell";
import ClassifiedFiles from "../components/ClassifiedFiles";
import dossierBg from "../assets/dossier-bg.webp";

gsap.registerPlugin(ScrollTrigger);

const IDENTITY = [
  ["DESIGNATION", "THE BATMAN"],
  ["IDENTITY", "Bruce Wayne"],
  ["BASE", "Batcave // Wayne Manor"],
  ["AFFILIATION", "Justice League"],
  ["BLOOD TYPE", "O-Negative"],
  ["STATUS", "ACTIVE"],
];

const TRAINING = [
  { t: "League of Shadows", s: "Ninjutsu // Stealth // Mentor: Ra's al Ghul", d: "Seven years across the globe mastering infiltration, silent takedowns, and the psychology of fear." },
  { t: "Detective Sciences", s: "Criminology // Forensics", d: "The world's greatest detective — crime-scene reconstruction, profiling, and deductive reasoning without peer." },
  { t: "Master Combatant", s: "127 Martial Arts Disciplines", d: "Keysi, Muay Thai, Jiu-Jitsu, and pressure-point combat fused into a single relentless fighting style." },
  { t: "Chemistry & Escapology", s: "Toxicology // Disguise", d: "Antidote synthesis, lockpicking, and escape from any restraint — survival engineered, never improvised." },
];

const OPERATIONS = [
  { t: "Year One — The War Begins", s: "YEAR 1", d: "Bruce Wayne returns to Gotham and dons the cowl, declaring a one-man war on organized crime." },
  { t: "Founding the Justice League", s: "YEAR 4", d: "Co-founds Earth's premier defense coalition — the lone human standing shoulder-to-shoulder with gods." },
  { t: "The Knightfall Campaign", s: "YEAR 9", d: "Broken by Bane and rebuilt. Reclaimed the mantle and redefined what the symbol could endure." },
  { t: "No Man's Land", s: "YEAR 14", d: "When Gotham was abandoned by the nation, the Bat held the line block by block until order returned." },
];

const COMMENDATIONS = [
  { t: "WORLD'S GREATEST DETECTIVE", s: "GCPD — Unofficial" },
  { t: "JUSTICE LEAGUE — FOUNDING MEMBER", s: "Charter Signatory" },
  { t: "ZERO-CASUALTY DOCTRINE", s: "The One Rule — Upheld" },
];

export default function Dossier() {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.from(el, { scrollTrigger: { trigger: el, start: "top 90%" }, y: 30, opacity: 0, duration: 0.6, ease: "power3.out" });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <PageShell
      kicker="SECTION_01 // SUBJECT FILE"
      title={<>THE <span className="text-bat-neon">DOSSIER</span></>}
      intro="Subject exhibits peak human conditioning, genius-level intellect, and an unbreakable will. Operates exclusively after dark. Considered the single most prepared individual on the planet."
      bgImage={dossierBg}
      bgFit="width"
    >
      <div ref={ref}>
        {/* SECONDARY BIO */}
        <p className="reveal max-w-2xl font-mono text-[13px] leading-relaxed tracking-[0.06em] text-white/55">
          Orphaned in Crime Alley as a child, Bruce Wayne transformed grief into
          a mission. He is not a man with powers — he is a man who turned
          obsession, money, and discipline into the most effective deterrent
          Gotham has ever known. The mask is not what hides him. It is what
          frees him.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.4fr]">
          {/* IDENTITY MATRIX */}
          <aside className="reveal h-fit lg:sticky lg:top-28">
            <SectionLabel n="//" label="IDENTITY MATRIX" color="#00e5ff" />
            <div className="mt-4 border border-white/10 bg-black/40 backdrop-blur-sm">
              {IDENTITY.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between border-b border-white/5 px-4 py-3 last:border-b-0">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-white/40">{k}</span>
                  <span className="font-mono text-[11px] tracking-[0.12em] text-white/85">{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 hazard-stripes h-1.5 w-full opacity-50" />
          </aside>

          {/* RIGHT COLUMN */}
          <div className="space-y-16">
            <div>
              <SectionLabel n="01" label="TRAINING" color="#00e5ff" />
              <div className="mt-6 space-y-7">
                {TRAINING.map((x) => <ListItem key={x.t} {...x} color="#00e5ff" />)}
              </div>
            </div>

            <div>
              <SectionLabel n="02" label="OPERATIONS HISTORY" color="#ff2a3d" />
              <div className="mt-6 space-y-7">
                {OPERATIONS.map((x) => <ListItem key={x.t} {...x} color="#ff2a3d" />)}
              </div>
            </div>

            <div>
              <SectionLabel n="03" label="COMMENDATIONS" color="#9dff00" />
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {COMMENDATIONS.map((c) => (
                  <div key={c.t} className="reveal border border-white/10 bg-gotham-ink p-4">
                    <div className="font-display text-[13px] font-bold leading-snug text-white">{c.t}</div>
                    <div className="mt-2 font-mono text-[9px] tracking-[0.2em]" style={{ color: "#9dff00" }}>{c.s}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <ClassifiedFiles />
        </div>
      </div>
    </PageShell>
  );
}

function SectionLabel({ n, label, color }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-[11px] tracking-[0.3em]" style={{ color }}>{n}</span>
      <h2 className="font-display text-[20px] font-bold tracking-[0.04em] text-white">{label}</h2>
      <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${color}55, transparent)` }} />
    </div>
  );
}

function ListItem({ t, s, d, color }) {
  return (
    <div className="reveal group relative border-l border-white/10 pl-6 transition-colors duration-200 hover:border-white/30">
      <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-gotham-void" style={{ background: color }} />
      <h3 className="font-display text-[18px] font-bold tracking-tight text-white">{t}</h3>
      <div className="mt-0.5 font-mono text-[10px] tracking-[0.22em]" style={{ color }}>{s}</div>
      {d && <p className="mt-2 max-w-xl font-mono text-[12px] leading-relaxed tracking-[0.04em] text-white/55">{d}</p>}
    </div>
  );
}
