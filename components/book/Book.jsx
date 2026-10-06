"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { buildPages, tabs } from "./pages";
import { useDiscoveryContext } from "@/context/DiscoveryContext";

const TURN_MS = 900;

export default function Book() {
  const { discovered } = useDiscoveryContext();

  // Rebuild pages whenever discovered list changes (new field notes appear)
  const pages = useMemo(() => buildPages(discovered), [discovered]);
  const leaves = pages.length / 2;

  const [f, setF] = useState(0);
  const [moving, setMoving] = useState({});
  const fRef = useRef(0);
  const timers = useRef([]);

  const step = useCallback(
    (dir) => {
      const next = fRef.current + dir;
      if (next < 0 || next > leaves) return;
      const leaf = dir > 0 ? fRef.current : next;
      fRef.current = next;
      setF(next);
      setMoving((m) => ({ ...m, [leaf]: true }));
      timers.current.push(setTimeout(() => setMoving((m) => ({ ...m, [leaf]: false })), TURN_MS));
    },
    [leaves]
  );

  const goTo = useCallback(
    (target) => {
      const dir = Math.sign(target - fRef.current);
      let n = Math.abs(target - fRef.current);
      if (!n) return;
      const run = () => { step(dir); if (--n > 0) timers.current.push(setTimeout(run, 320)); };
      run();
    },
    [step]
  );

  useEffect(() => {
    const onKey = (e) => { if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); };
    window.addEventListener("keydown", onKey);
    const t = timers.current;
    return () => { window.removeEventListener("keydown", onKey); t.forEach(clearTimeout); };
  }, [step]);

  // Auto-open on first load
  useEffect(() => {
    const t = setTimeout(() => { if (fRef.current === 0) step(1); }, 900);
    return () => clearTimeout(t);
  }, [step]);

  let active = -1;
  tabs.forEach(([, s], i) => { if (f >= s) active = i; });

  return (
    <div className="overflow-x-auto px-24 py-4">
      <div
        className="relative mx-auto w-[min(calc(94vw-12rem),calc((100vh-9rem)*1.5))] min-w-[640px]"
        style={{
          aspectRatio: "3 / 2",
          containerType: "inline-size",
          transform: f === 0 ? "translateX(-25%)" : "none",
          transition: "transform .9s cubic-bezier(.45,.05,.25,1)",
        }}
      >
        <div
          className="leather absolute inset-0 rounded-xl"
          style={{
            clipPath: f === 0 ? "inset(0 0 0 50% round 12px)" : "inset(0 0 0 0 round 12px)",
            transition: "clip-path .9s cubic-bezier(.45,.05,.25,1)",
          }}
        />

        <nav
          aria-label="Journal sections"
          className={`absolute right-full top-[12%] z-[80] flex flex-col gap-2 transition-opacity duration-500 ${f === 0 ? "pointer-events-none opacity-0" : "opacity-100"}`}
        >
          {tabs.map(([label, spread], i) => (
            <button
              key={label}
              onClick={() => goTo(spread)}
              aria-current={active === i}
              className={`paper-tab font-type text-sm uppercase tracking-wider transition-transform ${
                active === i ? "translate-x-3 bg-[#161616] text-[#e6e3d8]" : "translate-x-4 hover:translate-x-2"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        <div
          className="absolute inset-x-[1.5%] inset-y-[2.5%]"
          style={{ perspective: "2600px", cursor: f === 0 ? "pointer" : "auto" }}
          onClick={() => { if (fRef.current === 0) step(1); }}
        >
          <div className="paper page-l absolute inset-y-0 left-0 w-1/2 transition-opacity duration-500" style={{ opacity: f === 0 ? 0 : 1 }} />
          <div className="paper page-r absolute inset-y-0 right-0 w-1/2" />

          {Array.from({ length: leaves }, (_, k) => {
            const flipped = k < f;
            return (
              <div
                key={k}
                className="leaf absolute inset-y-0 right-0 w-1/2"
                style={{
                  zIndex: (moving[k] ? 50 : flipped ? k : leaves - k) + 1,
                  transform: flipped ? "rotateY(-180deg)" : "none",
                }}
              >
                <div className={`face ${k === 0 ? "cover-front" : "paper page-r"}`}>{pages[2 * k]}</div>
                <div className="face back paper page-l">{pages[2 * k + 1]}</div>
              </div>
            );
          })}

          <div
            className="spine pointer-events-none absolute inset-y-0 left-1/2 z-[60] w-[3%] -translate-x-1/2 transition-opacity duration-500"
            style={{ opacity: f === 0 ? 0 : 1 }}
          />
          <button
            onClick={() => step(-1)}
            disabled={f === 0}
            aria-label="Previous page"
            style={{ visibility: f === 0 ? "hidden" : "visible" }}
            className="arrow absolute bottom-[3%] left-[3%] z-[70]"
          >
            ←
          </button>
          <button
            onClick={() => step(1)}
            disabled={f === leaves}
            aria-label="Next page"
            className="arrow absolute bottom-[3%] right-[3%] z-[70]"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
