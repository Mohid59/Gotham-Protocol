import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const FILES = [
  { q: "Does the subject possess metahuman abilities?", a: "Negative. Every capability on record is the product of relentless training, genius-level intellect, and purpose-built equipment. The most dangerous thing about him is that he is only human.", clr: "PUBLIC" },
  { q: "Confirmed identity of the operative?", a: "[REDACTED]. Persistent speculation links the cowl to Wayne Enterprises, but no admissible proof has ever surfaced. The file remains sealed.", clr: "OMEGA" },
  { q: "Is lethal force authorized?", a: "No. The operative maintains an absolute zero-kill doctrine — the one rule that has never been broken, no matter the provocation.", clr: "SIGMA" },
  { q: "Known base of operations?", a: "Unconfirmed. Signal triangulation places a command node beneath the Palisades, but the location behaves like a ghost — there one scan, gone the next.", clr: "OMEGA" },
  { q: "Relationship with the GCPD?", a: "Cooperative but unofficial. Commissioner Gordon maintains a direct rooftop channel. The partnership exists in the gap between the law and what the law cannot reach.", clr: "DELTA" },
  { q: "Can the operative be recruited or controlled?", a: "Negative. The subject answers to a personal code that supersedes every institutional authority. He cannot be bought, drafted, or commanded.", clr: "OMEGA" },
];

export default function ClassifiedFiles() {
  const [open, setOpen] = useState(0);

  return (
    <div className="reveal">
      <div className="flex items-center gap-4">
        <span className="font-mono text-[11px] tracking-[0.3em] text-bat-crimson">04</span>
        <h2 className="font-display text-[20px] font-bold tracking-[0.04em] text-white">DECLASSIFIED FILES</h2>
        <span className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(255,42,61,0.35), transparent)" }} />
      </div>

      <div className="mt-6 divide-y divide-white/8 border border-white/10 bg-black/30">
        {FILES.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i}>
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-center gap-4 px-5 py-4 text-left transition-colors duration-200 hover:bg-white/[0.03]"
              >
                <span className="font-mono text-[10px] tracking-[0.2em] text-bat-neon">{`FILE-${String(i + 1).padStart(2, "0")}`}</span>
                <span className={`flex-1 font-display text-[15px] font-bold tracking-tight transition-colors duration-200 ${isOpen ? "text-white" : "text-white/75"}`}>
                  {f.q}
                </span>
                <span className={`font-mono text-[16px] leading-none text-bat-neon transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>+</span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pl-[4.5rem]">
                      <p className="max-w-2xl font-mono text-[12px] leading-relaxed tracking-[0.04em] text-white/60">{f.a}</p>
                      <div className="mt-3 inline-flex items-center gap-2 border border-white/10 px-2 py-1 font-mono text-[9px] tracking-[0.25em] text-white/45">
                        <span className="h-1 w-1 rounded-full bg-bat-crimson" />
                        CLEARANCE // {f.clr}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
