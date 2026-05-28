import { Link } from "react-router-dom";
import BatSymbol from "./BatSymbol";

const SITEMAP = [
  { label: "HOME", to: "/" },
  { label: "DOSSIER", to: "/dossier" },
  { label: "ROGUES", to: "/rogues" },
  { label: "ALLIES", to: "/allies" },
  { label: "ARMORY", to: "/armory" },
  { label: "CONTACT", to: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-white/10 bg-gotham-ink">
      <div className="hud-grid-fine pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 120%, rgba(0,229,255,0.10), transparent 60%)" }} />

      <div className="relative mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {/* BRAND */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex cursor-pointer items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-full border border-bat-neon/30 bg-gradient-to-br from-bat-neon/15 to-transparent">
                <BatSymbol className="h-3.5 w-6 text-white" />
              </span>
              <span className="font-mono text-[12px] font-bold tracking-[0.3em] text-white">
                GOTHAM<span className="text-bat-neon">·</span>PROTOCOL
              </span>
            </Link>
            <p className="mt-4 max-w-xs font-mono text-[10px] leading-relaxed tracking-[0.12em] text-white/40">
              Wayne Enterprises classified tactical archive. Built for the war on
              crime. For authorized eyes only.
            </p>
          </div>

          {/* SITEMAP */}
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.3em] text-bat-neon">ARCHIVE</h4>
            <ul className="mt-4 space-y-2.5">
              {SITEMAP.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="cursor-pointer font-mono text-[10px] tracking-[0.2em] text-white/55 transition-colors duration-200 hover:text-bat-neon">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CHANNELS */}
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.3em] text-bat-neon">SECURE CHANNEL</h4>
            <ul className="mt-4 space-y-2.5 font-mono text-[10px] tracking-[0.15em] text-white/55">
              <li>signal@wayne.enterprises</li>
              <li>88.1 MHz // ENCRYPTED</li>
              <li>GCPD Rooftop // Bat-Signal</li>
              <li>Gotham City</li>
            </ul>
          </div>

          {/* STATUS */}
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.3em] text-bat-neon">SYSTEM STATUS</h4>
            <ul className="mt-4 space-y-2.5 font-mono text-[10px] tracking-[0.2em]">
              <li className="flex items-center gap-2 text-white/55"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-bat-toxic" /> UPLINK SECURE</li>
              <li className="flex items-center gap-2 text-white/55"><span className="h-1.5 w-1.5 rounded-full bg-bat-toxic" /> ALL SYSTEMS NOMINAL</li>
              <li className="flex items-center gap-2 text-white/55"><span className="h-1.5 w-1.5 rounded-full bg-bat-crimson" /> VIGILANCE: ACTIVE</li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-6 font-mono text-[9px] tracking-[0.25em] text-white/35 md:flex-row">
          <span>© {new Date().getFullYear()} WAYNE ENTERPRISES — CLASSIFIED ARCHIVE</span>
          <span className="flex items-center gap-3">
            <span>BATCOMPUTER OS</span>
            <span className="text-white/20">/</span>
            <span className="text-bat-neon/70">v7.42</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
