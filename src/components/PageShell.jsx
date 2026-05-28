import { motion } from "framer-motion";

// Wraps every routed page: consistent top spacing, Framer Motion page
// transition, and the template-style giant title header.
const variants = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -14, transition: { duration: 0.28, ease: "easeIn" } },
};

export default function PageShell({
  kicker,
  title,
  intro,
  wide = false,
  bare = false,
  bgImage,
  bgPos = "center 20%",
  bgFit = "cover",
  bgHeight = "h-screen",
  children,
}) {
  return (
    <motion.main
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={bare ? "relative w-full" : "relative min-h-screen w-full pb-28 pt-28 md:pt-32"}
    >
      {/* Cinematic page backdrop — fades into the void so text stays crisp */}
      {bgImage && (
        <div className={`pointer-events-none absolute inset-x-0 top-0 z-0 overflow-hidden ${bgFit === "width" ? "" : bgHeight}`}>
          <img
            src={bgImage}
            alt=""
            aria-hidden
            className={
              bgFit === "width"
                ? "h-auto w-full opacity-75"
                : `h-full w-full opacity-80 ${bgFit === "contain" ? "object-contain" : "object-cover"}`
            }
            style={bgFit === "width" ? undefined : { objectPosition: bgPos }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(5,5,5,0.82) 0%, rgba(5,5,5,0.28) 50%, rgba(5,5,5,0.6) 100%)" }} />
          <div
            className="absolute inset-0"
            style={{
              background:
                bgFit === "width"
                  ? "linear-gradient(180deg, rgba(5,5,5,0.5) 0%, rgba(5,5,5,0.06) 16%, rgba(5,5,5,0.5) 52%, rgba(5,5,5,0.92) 82%, #050505 100%)"
                  : "linear-gradient(180deg, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.04) 22%, rgba(5,5,5,0.78) 80%, #050505 100%)",
            }}
          />
          <div className="hud-grid absolute inset-0 opacity-25" />
          <div className="absolute inset-x-0 top-0 h-px animate-scan bg-gradient-to-r from-transparent via-bat-neon/40 to-transparent" />
        </div>
      )}

      {/* Content sits above the backdrop */}
      <div className="relative z-10">
        {!bare && (
          <header className={`relative mx-auto px-6 ${wide ? "max-w-7xl" : "max-w-5xl"}`}>
            {kicker && (
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.4em] text-bat-neon">
                <span className="h-px w-12 bg-bat-neon/60" />
                <span>{kicker}</span>
              </div>
            )}
            <h1
              className="mt-4 font-display font-bold tracking-[-0.02em] text-white"
              style={{ fontSize: "clamp(44px, 8vw, 116px)", lineHeight: 0.9 }}
            >
              {title}
            </h1>
            {intro && (
              <p className="mt-6 max-w-2xl font-mono text-[13px] leading-relaxed tracking-[0.08em] text-white/55">
                {intro}
              </p>
            )}
            <div className="mt-8 h-px w-full bg-gradient-to-r from-bat-neon/40 via-white/10 to-transparent" />
          </header>
        )}

        <div className={bare ? "" : "relative mx-auto mt-10 px-6"}>
          {bare ? children : <div className={wide ? "max-w-7xl mx-auto" : "max-w-5xl mx-auto"}>{children}</div>}
        </div>
      </div>
    </motion.main>
  );
}
