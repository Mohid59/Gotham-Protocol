import { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import BootSequence from "./components/BootSequence";
import HUDOverlay from "./components/HUDOverlay";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Dossier from "./pages/Dossier";
import RoguesPage from "./pages/RoguesPage";
import Allies from "./pages/Allies";
import ArmoryPage from "./pages/ArmoryPage";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const location = useLocation();
  const [booted, setBooted] = useState(false);
  const lenisRef = useRef(null);

  // Smooth scroll (Lenis) wired into the GSAP ticker so ScrollTrigger stays in sync.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Lock scroll during boot; refresh triggers once content settles.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (booted) {
      lenis?.start();
      const id = setTimeout(() => ScrollTrigger.refresh(), 140);
      return () => clearTimeout(id);
    }
    lenis?.stop();
  }, [booted]);

  // Reset scroll + refresh triggers on every route change.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    const id = setTimeout(() => ScrollTrigger.refresh(), 220);
    return () => clearTimeout(id);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen w-full bg-gotham-void text-white">
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}

      <HUDOverlay />
      <Navbar />

      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/dossier" element={<Dossier />} />
          <Route path="/rogues" element={<RoguesPage />} />
          <Route path="/allies" element={<Allies />} />
          <Route path="/armory" element={<ArmoryPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </AnimatePresence>

      <Footer />
    </div>
  );
}
