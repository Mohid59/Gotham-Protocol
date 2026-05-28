import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import BatSymbol from "./BatSymbol";

const LINKS = [
  { label: "HOME", to: "/" },
  { label: "DOSSIER", to: "/dossier" },
  { label: "ROGUES", to: "/rogues" },
  { label: "ALLIES", to: "/allies" },
  { label: "ARMORY", to: "/armory" },
  { label: "CONTACT", to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const linkClass = ({ isActive }) =>
    `relative cursor-pointer px-1 py-1 font-mono text-[11px] tracking-[0.3em] transition-colors duration-200 ${
      isActive ? "text-bat-neon" : "text-white/60 hover:text-white"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-[58]">
      <nav className="border-b border-white/8 bg-gotham-void/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* BRAND */}
          <Link to="/" className="group flex cursor-pointer items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-bat-neon/30 bg-gradient-to-br from-bat-neon/15 to-transparent transition-colors duration-200 group-hover:border-bat-neon/60">
              <BatSymbol className="h-3.5 w-6 text-white" />
            </span>
            <span className="hidden font-mono text-[12px] font-bold tracking-[0.32em] text-white sm:block">
              GOTHAM<span className="text-bat-neon">·</span>PROTOCOL
            </span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden items-center gap-6 lg:flex">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === "/"}>
                {({ isActive }) => (
                  <>
                    {l.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-bat-neon transition-all duration-300 ${
                        isActive ? "w-full opacity-100" : "w-0 opacity-0"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* RIGHT: status + socials + mobile toggle */}
          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-white/40 lg:flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-bat-toxic" />
              UPLINK SECURE
            </span>
            <div className="hidden items-center gap-3 sm:flex">
              <Social label="Comms"><path d="M2 4h20v13H6l-4 4z" /></Social>
              <Social label="Network"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2c3 3 3 17 0 20M12 2c-3 3-3 17 0 20" /></Social>
            </div>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 cursor-pointer place-items-center border border-white/15 text-white/80 transition-colors duration-200 hover:border-bat-neon/60 hover:text-bat-neon lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span className="font-mono text-[14px]">{open ? "✕" : "≡"}</span>
            </button>
          </div>
        </div>

        {/* MOBILE PANEL */}
        <div
          className={`overflow-hidden border-t border-white/8 bg-gotham-ink/95 backdrop-blur-md transition-[max-height] duration-300 lg:hidden ${
            open ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="flex flex-col px-6 py-2">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `border-b border-white/5 py-3 font-mono text-[12px] tracking-[0.3em] transition-colors duration-200 ${
                    isActive ? "text-bat-neon" : "text-white/65"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* page-load progress sliver under the bar */}
      <div key={location.pathname} className="h-px w-full origin-left animate-[boot-blink_0.8s_ease-out] bg-gradient-to-r from-bat-neon/0 via-bat-neon/50 to-bat-neon/0" />
    </header>
  );
}

function Social({ label, children }) {
  return (
    <a
      href="#"
      aria-label={label}
      onClick={(e) => e.preventDefault()}
      className="cursor-pointer text-white/45 transition-colors duration-200 hover:text-bat-neon"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </a>
  );
}
