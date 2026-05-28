import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// Cinematic "system booting up" overlay. Fades itself out and notifies parent.
const LINES = [
  "> WAYNE_ENTERPRISES // SECURE BOOT",
  "> DECRYPTING BATCOMPUTER MAINFRAME...........OK",
  "> ESTABLISHING UPLINK TO ORACLE NODE.........OK",
  "> CALIBRATING TACTICAL OVERLAY...............OK",
  "> LOADING ROGUE INDEX // 14 ACTIVE THREATS...OK",
  "> ARMORY DIAGNOSTICS // ALL SYSTEMS NOMINAL..OK",
  "> WELCOME, BRUCE.",
];

export default function BootSequence({ onComplete }) {
  const wrapRef = useRef(null);
  const barRef = useRef(null);
  const [printed, setPrinted] = useState([]);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let i = 0;
    const step = () => {
      if (cancelled) return;
      if (i < LINES.length) {
        setPrinted((p) => [...p, LINES[i]]);
        i += 1;
        setTimeout(step, 220);
      }
    };
    step();

    gsap.to(
      { v: 0 },
      {
        v: 100,
        duration: 1.9,
        ease: "power2.inOut",
        onUpdate() {
          setPct(Math.round(this.targets()[0].v));
        },
        onComplete() {
          if (!wrapRef.current) return;
          gsap.to(wrapRef.current, {
            opacity: 0,
            duration: 0.6,
            delay: 0.25,
            ease: "power3.out",
            onComplete: () => {
              if (wrapRef.current) wrapRef.current.style.pointerEvents = "none";
              onComplete?.();
            },
          });
        },
      }
    );

    return () => {
      cancelled = true;
    };
  }, [onComplete]);

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-gotham-void"
    >
      <div className="hud-grid absolute inset-0 opacity-40" />
      <div className="noise absolute inset-0" />

      <div className="relative z-10 mx-auto w-[min(720px,90vw)] font-mono">
        {/* TITLE */}
        <div className="mb-6 flex items-center justify-between border-b border-bat-neon/30 pb-3">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 animate-boot-blink bg-bat-neon" />
            <span className="text-[11px] tracking-[0.35em] text-bat-neon">
              GOTHAM PROTOCOL // BOOT
            </span>
          </div>
          <span className="text-[10px] tracking-[0.2em] text-white/40">
            v7.42.0001
          </span>
        </div>

        {/* PRINTED LINES */}
        <div className="min-h-[210px] space-y-1.5 text-[12px] leading-relaxed text-white/80">
          {printed.map((line, idx) => (
            <div key={idx} className="flex">
              <span className="mr-2 text-bat-neon">{`[${String(idx + 1).padStart(2, "0")}]`}</span>
              <span>{line}</span>
            </div>
          ))}
          <span className="inline-block h-3 w-2 animate-boot-blink bg-bat-neon align-middle" />
        </div>

        {/* PROGRESS BAR */}
        <div className="mt-8">
          <div className="mb-2 flex items-center justify-between text-[10px] tracking-[0.3em] text-white/50">
            <span>MAINFRAME SYNC</span>
            <span className="text-bat-neon">{pct}%</span>
          </div>
          <div className="relative h-[6px] w-full overflow-hidden border border-bat-neon/30 bg-bat-neon/5">
            <div
              ref={barRef}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-bat-neon/70 via-bat-neon to-white shadow-neon-blue"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      {/* CORNER BRACKETS */}
      <div className="pointer-events-none absolute left-6 top-6 h-4 w-4 border-l border-t border-bat-neon/70" />
      <div className="pointer-events-none absolute right-6 top-6 h-4 w-4 border-r border-t border-bat-neon/70" />
      <div className="pointer-events-none absolute left-6 bottom-6 h-4 w-4 border-l border-b border-bat-neon/70" />
      <div className="pointer-events-none absolute right-6 bottom-6 h-4 w-4 border-r border-b border-bat-neon/70" />
    </div>
  );
}
