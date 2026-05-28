// Blueprint "chassis scan" frame + vehicle silhouettes + gadget icons.
// All art uses currentColor so the parent can tint it per-item.

export function BlueprintScan({ color, large = false, children }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse at 50% 42%, ${color}1f, transparent 62%), linear-gradient(160deg, #0b0c11 0%, #050507 100%)` }}
      />
      <div className="hud-grid absolute inset-0 opacity-50" />
      <div className="hud-grid-fine absolute inset-0 opacity-40 mix-blend-overlay" />

      {/* targeting rings */}
      <div className="absolute inset-0 grid place-items-center">
        <div className={`rounded-full border ${large ? "h-72 w-72" : "h-44 w-44"}`} style={{ borderColor: `${color}26` }} />
      </div>
      <div className="absolute inset-0 grid place-items-center">
        <div className={`rounded-full border ${large ? "h-52 w-52" : "h-32 w-32"} animate-pulse-slow`} style={{ borderColor: `${color}40` }} />
      </div>

      {/* art */}
      <div className="absolute inset-0 grid place-items-center" style={{ color, filter: `drop-shadow(0 0 22px ${color}88)` }}>
        {children}
      </div>

      {/* crosshair */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2" style={{ background: `linear-gradient(${color}00, ${color}33, ${color}00)` }} />
      <div className="pointer-events-none absolute top-1/2 left-0 h-px w-full -translate-y-1/2" style={{ background: `linear-gradient(90deg, ${color}00, ${color}33, ${color}00)` }} />
      {/* scan bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px animate-scan" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
    </div>
  );
}

export function VehicleArt({ type, className = "" }) {
  if (type === "batmobile") {
    return (
      <svg viewBox="0 0 240 120" className={className} aria-hidden>
        <g fill="currentColor">
          <path d="M14 80 C 24 62 46 53 72 49 C 98 45 132 47 162 53 C 187 58 210 63 228 71 L 228 86 C 200 82 40 82 14 86 Z" />
          <path d="M96 51 C 104 37 130 37 140 51 L 135 57 C 122 49 108 49 101 57 Z" />
          <path d="M222 57 L 237 40 L 234 71 Z" />
          <path d="M6 84 L 22 84 L 15 91 Z" />
        </g>
        <g>
          <circle cx="66" cy="88" r="20" fill="#0a0a0e" />
          <circle cx="66" cy="88" r="20" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="66" cy="88" r="7" fill="currentColor" />
          <circle cx="178" cy="88" r="20" fill="#0a0a0e" />
          <circle cx="178" cy="88" r="20" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="178" cy="88" r="7" fill="currentColor" />
        </g>
      </svg>
    );
  }
  if (type === "batwing") {
    return (
      <svg viewBox="0 0 240 120" className={className} aria-hidden>
        <g fill="currentColor">
          <path d="M120 30 C 112 30 106 36 104 46 L 38 86 L 80 80 L 94 94 L 109 81 C 113 97 127 97 131 81 L 146 94 L 160 80 L 202 86 L 136 46 C 134 36 128 30 120 30 Z" />
        </g>
        <ellipse cx="120" cy="48" rx="7" ry="11" fill="#0a0a0e" />
        <ellipse cx="120" cy="46" rx="3.5" ry="6" fill="currentColor" opacity="0.5" />
      </svg>
    );
  }
  // batpod
  return (
    <svg viewBox="0 0 240 120" className={className} aria-hidden>
      <g>
        <circle cx="60" cy="74" r="34" fill="#0a0a0e" stroke="currentColor" strokeWidth="3" />
        <circle cx="60" cy="74" r="10" fill="currentColor" />
        <circle cx="184" cy="74" r="34" fill="#0a0a0e" stroke="currentColor" strokeWidth="3" />
        <circle cx="184" cy="74" r="10" fill="currentColor" />
      </g>
      <g fill="currentColor">
        <path d="M60 60 L 122 44 L 184 60 L 184 70 L 122 56 L 60 70 Z" />
        <path d="M98 46 L 152 46 L 144 36 L 106 36 Z" />
        <rect x="40" y="40" width="24" height="5" rx="2" />
      </g>
    </svg>
  );
}

const ICON_STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function GadgetIcon({ type, className = "" }) {
  switch (type) {
    case "batarang":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
          <path d="M12 7c-1 2-3 3-5 2l-1 2 2 1-2 1c2 1 4 0 5-2 1 2 3 3 5 2l2-1-2-1 1-2c-2 1-4 0-5-2z" />
        </svg>
      );
    case "grapnel":
      return (
        <svg viewBox="0 0 24 24" className={className} {...ICON_STROKE} aria-hidden>
          <path d="M5 17v-5h8V9" />
          <path d="M13 12h6" />
          <path d="M19 8.5v5" />
          <path d="M19 8.5 17 6.5M19 8.5l2-2" />
        </svg>
      );
    case "smoke":
      return (
        <svg viewBox="0 0 24 24" className={className} {...ICON_STROKE} aria-hidden>
          <circle cx="9" cy="16" r="3.4" />
          <path d="M12 9c3-1 2-4 2-4M15 12c3 0 3-3 3-3M13 13c4 1 5-2 5-2" />
        </svg>
      );
    case "gel":
      return (
        <svg viewBox="0 0 24 24" className={className} {...ICON_STROKE} aria-hidden>
          <rect x="8" y="8" width="7" height="11" rx="1.5" />
          <path d="M10 8V6h3v2" />
          <path d="M16 6h3M16.5 9h2" />
        </svg>
      );
    case "sequencer":
      return (
        <svg viewBox="0 0 24 24" className={className} {...ICON_STROKE} aria-hidden>
          <rect x="6" y="9" width="12" height="9" rx="1.5" />
          <path d="M9 12h6M9 15h4" />
          <path d="M15 9l2-4 1 2-2 1" />
        </svg>
      );
    case "launcher":
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} {...ICON_STROKE} aria-hidden>
          <rect x="4" y="10" width="9" height="6" rx="1.5" />
          <path d="M13 13h6" />
          <circle cx="20" cy="13" r="1.3" />
          <path d="M6 16v2" />
        </svg>
      );
  }
}
