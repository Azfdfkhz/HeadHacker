"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import SceneImage from "@/components/ui/SceneImage";

const ENTER_MS = 6500; // PRD: 5-10 detik
const DOOR = "69% 80%"; // posisi pintu masuk apartemen di exterior.svg

// Timeline (detik): 0 UI memudar -> 0-5.5 kamera maju ke pintu -> 3 cahaya pintu menyala -> 4.6 fade gelap -> 6.5 pindah ke /explore
export default function Hero() {
  const router = useRouter();
  const [entering, setEntering] = useState(false);
  const timer = useRef(null);
  const layer = useRef(null);

  useEffect(() => { router.prefetch("/explore"); return () => clearTimeout(timer.current); }, [router]);

  const go = () => router.push("/explore");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setEntering(false);
  }, []);
  const enter = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return go();
    if (entering) return;
    setEntering(true);
    timer.current = setTimeout(go, ENTER_MS);
  };
  const skip = () => { clearTimeout(timer.current); go(); };

  // Parallax halus mengikuti mouse (hanya saat idle)
  const onMove = (e) => {
    if (entering || !layer.current) return;
    const x = (e.clientX / window.innerWidth - 0.5) * -16;
    const y = (e.clientY / window.innerHeight - 0.5) * -10;
    layer.current.style.translate = `${x}px ${y}px`;
  };

  return (
    <section aria-label="HEADHACKER landing page" onMouseMove={onMove} className="relative h-screen min-h-[560px] overflow-hidden bg-gradient-to-b from-[#1b2540] via-[#2b3350] to-[#101416]">
      <div ref={layer} className="absolute -inset-4 animate-drift transition-[translate] duration-700 ease-out">
        <div
          className="h-full w-full transition-transform ease-in-out"
          style={{ transform: entering ? "scale(2.6)" : "scale(1)", transformOrigin: DOOR, transitionDuration: "5.5s" }}
        >
          <SceneImage src="/images/exterior.png" alt="Hideout" className="h-full w-full object-cover" loading="eager" decoding="sync" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-bg/75 via-bg/25 to-transparent" />

      <div className={`relative z-10 flex h-full flex-col justify-center px-6 transition-all duration-700 sm:px-12 ${entering ? "-translate-x-6 opacity-0" : "opacity-100"}`}>
        <p className="font-mono text-xs tracking-[0.2em] text-ink sm:text-sm">// A VR SURVEILLANCE EXPERIENCE</p>
        <h1 className="mt-4 font-mono text-5xl tracking-[0.2em] sm:text-6xl">HEADHACKER</h1>
        <p className="mt-5 text-base leading-relaxed text-ink/90">Not just a game.<br />It&apos;s a place, a system, a story.</p>
        <div className="mt-8"><Button primary onClick={enter} className="w-56 justify-between">ENTER <span>→</span></Button></div>
      </div>

      {entering && (
        <>
          {/* cahaya hangat dari pintu */}
          <div
            className="pointer-events-none absolute z-10 h-40 w-40 rounded-full mix-blend-screen"
            style={{ left: "69%", top: "80%", background: "radial-gradient(circle, rgba(255,207,138,.75), rgba(255,207,138,0) 70%)", opacity: 0, animation: "doorlight 2.2s ease-in 3s forwards" }}
          />
          <div className="pointer-events-none absolute inset-0 z-20 bg-bg opacity-0 animate-[fadein_1.8s_ease-in_4.6s_forwards]" />
          <div className="absolute inset-x-0 bottom-0 z-30 h-px bg-line">
            <div className="h-full bg-accent" style={{ animation: `progress ${ENTER_MS}ms linear forwards` }} />
          </div>
          <button type="button" onClick={skip} className="absolute bottom-8 right-8 z-30 px-3 py-2 text-sm tracking-widest text-ink/80 hover:text-ink">SKIP →</button>
        </>
      )}
    </section>
  );
}
