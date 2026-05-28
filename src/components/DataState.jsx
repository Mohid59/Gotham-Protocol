// Shared HUD-styled loading / error states for data-driven sections.

export function HudLoader({ label = "DECRYPTING DATABASE" }) {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center gap-5 font-mono">
      <div className="flex items-center gap-3 text-[11px] tracking-[0.35em] text-bat-neon">
        <span className="h-2 w-2 animate-ping rounded-full bg-bat-neon" />
        {label}
        <span className="animate-boot-blink">_</span>
      </div>
      <div className="relative h-1 w-64 max-w-[70vw] overflow-hidden bg-white/10">
        <div className="absolute inset-y-0 left-0 w-1/3 animate-[scanx_1.3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-bat-neon to-transparent" />
      </div>
      <div className="font-mono text-[9px] tracking-[0.3em] text-white/35">ESTABLISHING SECURE UPLINK</div>
    </div>
  );
}

export function HudError({ onRetry, label = "UPLINK FAILED" }) {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 font-mono">
      <div className="flex items-center gap-3 text-[11px] tracking-[0.35em] text-bat-crimson">
        <span className="h-2 w-2 animate-pulse rounded-full bg-bat-crimson" />
        {label}
      </div>
      <p className="max-w-sm text-center text-[10px] leading-relaxed tracking-[0.2em] text-white/40">
        The Batcomputer could not reach the archive node. Check the connection and retry.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="cursor-pointer border border-bat-crimson/50 bg-bat-crimson/5 px-5 py-2 text-[10px] tracking-[0.3em] text-bat-crimson transition-colors duration-200 hover:bg-bat-crimson/15"
        >
          RE-ESTABLISH LINK
        </button>
      )}
    </div>
  );
}
