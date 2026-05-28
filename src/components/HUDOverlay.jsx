import { useEffect, useState } from "react";

// Persistent fullscreen HUD frame: bottom corners, scanline, signal ticker.
export default function HUDOverlay() {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const p = setInterval(() => setPulse((v) => (v + 1) % 100), 90);
    return () => clearInterval(p);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]">
      {/* CORNER BRACKETS (below the nav line) */}
      <Corner pos="bottom-left" />
      <Corner pos="bottom-right" />

      {/* BOTTOM TICKER */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-white/5 bg-black/40 px-6 py-2 font-mono text-[10px] tracking-[0.2em] text-white/60 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <span className="text-bat-crimson">●</span>
          <span>VIGILANCE: ACTIVE</span>
          <span className="hidden text-white/20 md:inline">|</span>
          <span className="hidden md:inline">SECTOR-07 // CRIME ALLEY</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/40">SIGNAL</span>
          <SignalBars pulse={pulse} />
        </div>
      </div>

      {/* MOVING SCANLINE */}
      <div className="absolute inset-x-0 top-0 h-px animate-scan bg-gradient-to-r from-transparent via-bat-neon/40 to-transparent" />
    </div>
  );
}

function Corner({ pos }) {
  const map = {
    "top-left": "top-3 left-3 border-t border-l",
    "top-right": "top-3 right-3 border-t border-r",
    "bottom-left": "bottom-3 left-3 border-b border-l",
    "bottom-right": "bottom-3 right-3 border-b border-r",
  };
  return (
    <div
      className={`absolute h-5 w-5 border-bat-neon/70 ${map[pos]}`}
      aria-hidden
    />
  );
}

function SignalBars({ pulse }) {
  const bars = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-end gap-[2px]">
      {bars.map((b) => (
        <span
          key={b}
          className="block w-[3px] bg-bat-neon"
          style={{
            height: `${4 + b * 2}px`,
            opacity: ((pulse + b * 7) % 100) / 100,
          }}
        />
      ))}
    </div>
  );
}
