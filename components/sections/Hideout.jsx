"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { equipment } from "@/data/equipment";
import { rooms } from "@/data/rooms";
import { useDiscoveryContext } from "@/context/DiscoveryContext";
import ObjectHotspot from "@/components/ui/ObjectHotspot";
import SceneImage from "@/components/ui/SceneImage";
import DiscoveryToast from "@/components/ui/DiscoveryToast";

// Status badge colours
const STATUS_STYLE = {
  ACTIVE: "text-accent",
  CLASSIFIED: "text-amber-600/80",
  LOCKED: "text-mute",
  RESTRICTED: "text-red-700/70",
};

const DISCOVERABLE = equipment.filter((e) => !e.comingSoon);

export default function Hideout() {
  const [ready, setReady] = useState(false);
  const [sel, setSel] = useState(null);
  const { discovered, isDiscovered } = useDiscoveryContext();

  // Track the most-recently discovered item for the toast
  const prevCountRef = useRef(discovered.length);
  const [lastDiscoveredName, setLastDiscoveredName] = useState(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReady(true);
      return;
    }
    const t = setTimeout(() => setReady(true), 1600);
    return () => clearTimeout(t);
  }, []);

  // Watch discovery changes to fire the toast
  useEffect(() => {
    if (discovered.length > prevCountRef.current) {
      // Find which item was just discovered
      const newId = discovered[discovered.length - 1];
      const item = equipment.find((e) => e.id === newId);
      if (item) setLastDiscoveredName(item.name);
      // Reset toast after it clears
      const t = setTimeout(() => setLastDiscoveredName(null), 4000);
      prevCountRef.current = discovered.length;
      return () => clearTimeout(t);
    }
  }, [discovered]);

  const total = DISCOVERABLE.length;
  const count = discovered.filter((id) => DISCOVERABLE.some((e) => e.id === id)).length;
  const fillPct = total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <>
      <DiscoveryToast name={lastDiscoveredName} index={count} total={total} />

      <section className="flex min-h-screen flex-col bg-bg lg:flex-row">
        {/* ── 3D / 2.5D Scene ─────────────────────────── */}
        <div className="flex flex-1 items-center justify-center overflow-hidden">
          {/* aspect-video + hotspot % = position stays accurate at any size */}
          <div
            style={{ aspectRatio: "1100 / 770" }}
            className="relative w-full max-w-[calc(100vh*1.4286)] animate-settle bg-gradient-to-b from-[#2a3a30] to-[#1a2420]"
          >
            <SceneImage src="/images/room.jpg" alt="HEADHACKER Main Room" className="absolute inset-0 h-full w-full object-cover" />

            {/* Discovery HUD overlay — top-left */}
            <div
              className={`absolute left-4 top-4 select-none transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
              aria-hidden="true"
            >
              <div className="border border-line bg-bg/80 px-3 py-2 backdrop-blur-sm">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">Discovered</p>
                <p className="mt-0.5 font-mono text-base text-ink">
                  {String(count).padStart(2, "0")} <span className="text-mute">/</span>{" "}
                  {String(total).padStart(2, "0")}
                </p>
                {/* Progress bar */}
                <div className="mt-2 h-px w-24 bg-line">
                  <div
                    className="h-full bg-accent transition-all duration-700"
                    style={{ width: `${fillPct}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Hotspots */}
            <div
              className={`transition-opacity duration-1000 ${ready ? "opacity-100" : "pointer-events-none opacity-0"}`}
            >
              {equipment.map((item) => (
                <ObjectHotspot key={item.id} item={item} onSelect={setSel} />
              ))}
            </div>

            {/* Instruction hint */}
            <p
              className={`absolute bottom-3 left-4 bg-bg/80 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-ink/70 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
            >
              {count < total ? "Explore objects to discover them" : "All objects found"}
            </p>
          </div>
        </div>

        {/* ── Sidebar ─────────────────────────── */}
        <aside className="flex w-full flex-col justify-center border-t border-line bg-surface p-8 lg:w-80 lg:border-l lg:border-t-0">
          <h1 className="font-mono text-xl tracking-[0.2em]">THE HIDEOUT</h1>
          <p className="mt-4 text-sm leading-relaxed text-mute">
            Where all the preparation happens.
            <br />
            From here, the operation begins.
          </p>

          {/* Selected object panel */}
          {sel && (
            <div className="mt-6 animate-fadein border border-accent/60 bg-surface2 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-widest text-mute">{sel.category}</p>
                  <h2 className="mt-1 text-lg text-accent">
                    {isDiscovered(sel.id) && <span className="mr-1 text-[13px]">✓</span>}
                    {sel.name}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSel(null)}
                  aria-label="Close panel"
                  className="px-2 text-mute hover:text-ink"
                >
                  ✕
                </button>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink/90">{sel.note}</p>
              <div className="mt-4 flex items-center gap-3">
                <Link
                  href={`/archive/${sel.id}`}
                  className="inline-block border border-accent px-4 py-2 text-xs uppercase tracking-widest text-accent transition hover:bg-accent hover:text-bg"
                >
                  Inspect in 3D
                </Link>
                {isDiscovered(sel.id) && (
                  <span className="font-mono text-[10px] uppercase tracking-widest text-mute">Discovered</span>
                )}
              </div>
            </div>
          )}

          {/* Discovery checklist */}
          <div className="mt-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-mute">Equipment</p>
            <ul className="mt-3 space-y-1 text-sm" aria-label="Equipment discovery list">
              {equipment.map((e) => {
                const found = isDiscovered(e.id);
                return (
                  <li
                    key={e.id}
                    className={`flex items-center gap-2 py-1 ${found ? "text-ink" : "text-mute"}`}
                  >
                    <span className={`font-mono text-xs ${found ? "text-accent" : "text-mute/50"}`}>
                      {found ? "✓" : "○"}
                    </span>
                    {e.name}
                    {e.comingSoon && (
                      <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-mute/50">
                        Model TBD
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Rooms list */}
          <ol className="mt-8 text-sm" aria-label="Hideout rooms">
            {rooms.map((r, i) => (
              <li
                key={r.id}
                className={`flex items-center gap-4 border-b border-line py-2.5 ${r.active ? "text-ink" : "text-mute/60"}`}
              >
                <span className="font-mono text-mute">{String(i + 1).padStart(2, "0")}.</span>
                <span className="flex-1">{r.name}</span>
                {!r.active && (
                  <span
                    className={`font-mono text-[10px] uppercase tracking-widest ${STATUS_STYLE[r.status] || "text-mute"}`}
                  >
                    {r.status}
                  </span>
                )}
              </li>
            ))}
          </ol>

          <Link
            href="/journal"
            className="mt-6 inline-block border border-line px-4 py-3 text-sm transition hover:border-accent hover:text-accent"
          >
            Open Journal →
          </Link>

          {/* Mobile: fallback tap list (hover not available on touch) */}
          <ul className="mt-6 grid grid-cols-2 gap-2 text-sm lg:hidden" aria-label="Mobile equipment list">
            {equipment.map((e) => (
              <li key={e.id}>
                <Link
                  href={`/archive/${e.id}`}
                  className={`block border px-3 py-3 transition hover:border-accent ${
                    isDiscovered(e.id) ? "border-accent/40 text-ink" : "border-line text-mute"
                  }`}
                >
                  {isDiscovered(e.id) && <span className="mr-1 text-accent text-xs">✓</span>}
                  {e.name} →
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </>
  );
}
