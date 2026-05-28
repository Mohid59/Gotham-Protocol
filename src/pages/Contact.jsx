import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import PageShell from "../components/PageShell";
import batLogo from "../assets/bat-logo.webp";

const CHANNELS = [
  ["DIRECT LINE", "signal@wayne.enterprises"],
  ["SECURE CHANNEL", "GCPD Rooftop // Bat-Signal"],
  ["FREQUENCY", "88.1 MHz // ENCRYPTED"],
  ["SECTOR", "Gotham City"],
];

export default function Contact() {
  const ref = useRef(null);
  const discRef = useRef(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".c-reveal", { y: 28, opacity: 0, duration: 0.6, ease: "power3.out", stagger: 0.08 });
      gsap.to(discRef.current, { scale: 1.04, duration: 2.4, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }, ref);
    return () => ctx.revert();
  }, []);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3200);
  };

  return (
    <PageShell
      kicker="SECTION_04 // OPEN CHANNEL"
      title={<>THE <span className="text-bat-neon">SIGNAL</span></>}
      intro="When Gotham calls, the protocol answers. Initialize the beacon to open a secure, encrypted channel to the Dark Knight."
      wide
    >
      <div ref={ref} className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        {/* LEFT — SIGNAL DISC + CHANNELS */}
        <div className="c-reveal flex flex-col items-center lg:items-start">
          <div className="relative mx-auto lg:mx-0">
            <div
              ref={discRef}
              className="relative grid h-56 w-56 place-items-center overflow-hidden rounded-full border border-bat-neon/20"
              style={{ boxShadow: "0 0 100px rgba(0,229,255,0.28), inset 0 0 50px rgba(0,0,0,0.6)" }}
            >
              {/* {/* DROP REPLACEMENT BAT LOGO HERE */}
              <img src={batLogo} alt="Projected Bat-Signal" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: "center 38%" }} />
              <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(circle at 50% 42%, rgba(0,229,255,0.18), transparent 60%)", mixBlendMode: "screen" }} />
              <div className="pointer-events-none absolute inset-0 animate-scan" style={{ background: "linear-gradient(180deg, transparent, rgba(0,229,255,0.12), transparent)" }} />
            </div>
          </div>

          <div className="mt-10 w-full space-y-4">
            {CHANNELS.map(([k, v]) => (
              <div key={k} className="c-reveal flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono text-[10px] tracking-[0.3em] text-bat-neon">{k}</span>
                <span className="font-mono text-[12px] tracking-[0.08em] text-white/80">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — TRANSMISSION FORM */}
        <div className="c-reveal bracket-frame border border-white/10 bg-black/40 p-7 text-bat-neon backdrop-blur-sm md:p-9">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-bat-neon">
            <span className="h-1.5 w-1.5 animate-pulse bg-bat-neon" />
            <span>NEW TRANSMISSION</span>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-5">
            <Field id="codename" label="CODENAME">
              <input id="codename" required type="text" placeholder="Identify yourself" className="hud-input" />
            </Field>
            <Field id="freq" label="RETURN FREQUENCY">
              <input id="freq" required type="email" placeholder="your@channel.com" className="hud-input" />
            </Field>
            <Field id="msg" label="MESSAGE">
              <textarea id="msg" required rows={4} placeholder="State the nature of the emergency..." className="hud-input resize-none" />
            </Field>

            <button
              type="submit"
              className="group inline-flex w-full cursor-pointer items-center justify-center gap-4 border border-bat-neon/60 bg-bat-neon/5 px-8 py-4 font-mono text-[12px] tracking-[0.4em] text-bat-neon transition-all duration-200 hover:bg-bat-neon/15 hover:shadow-neon-blue"
            >
              <span className="h-2 w-2 rounded-full bg-bat-neon transition-transform duration-200 group-hover:scale-150" />
              <span>{sent ? "SIGNAL TRANSMITTED" : "DEPLOY BEACON"}</span>
              {!sent && <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>}
            </button>
            {sent && (
              <p className="font-mono text-[10px] tracking-[0.25em] text-bat-toxic">
                ● UPLINK RECEIVED — STAND BY FOR CONTACT
              </p>
            )}
          </form>
        </div>
      </div>
    </PageShell>
  );
}

function Field({ id, label, children }) {
  return (
    <div className="c-reveal">
      <label htmlFor={id} className="mb-2 block font-mono text-[10px] tracking-[0.3em] text-white/45">
        {label}
      </label>
      {children}
    </div>
  );
}
