"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { equipment } from "@/data/equipment";
import { rooms } from "@/data/rooms";
import ObjectHotspot from "@/components/ui/ObjectHotspot";
import SceneImage from "@/components/ui/SceneImage";

export default function Hideout() {
  const router = useRouter();
  const [ready, setReady] = useState(false); // interactive mode aktif setelah kamera "berhenti"
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReady(true);
      return;
    }
    const t = setTimeout(() => setReady(true), 1600);
    return () => clearTimeout(t);
  }, []);
  const [sel, setSel] = useState(null);

  return (
    <section className="flex min-h-screen flex-col bg-bg lg:flex-row">
      <div className="flex flex-1 items-center justify-center overflow-hidden">
        {/* aspect-video + hotspot berbasis % = posisi tetap pas di semua ukuran layar */}
        <div style={{ aspectRatio: "1100 / 770" }} className="relative w-full max-w-[calc(100vh*1.4286)] animate-settle bg-gradient-to-b from-[#2a3a30] to-[#1a2420]">
          <SceneImage src="/images/room.jpg" alt="Main Room" className="absolute inset-0 h-full w-full object-cover" />
          <div className={`transition-opacity duration-1000 ${ready ? "opacity-100" : "pointer-events-none opacity-0"}`}>
            {equipment.map((item) => <ObjectHotspot key={item.id} item={item} onSelect={setSel} />)}
          </div>
          <p className={`absolute bottom-3 left-4 bg-bg/80 px-3 py-1.5 text-sm text-ink/90 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
            Hover an object to inspect it.
          </p>
        </div>
      </div>

      <aside className="flex w-full flex-col justify-center border-t border-line bg-surface p-8 lg:w-80 lg:border-l lg:border-t-0">
        <h1 className="font-mono text-xl tracking-[0.2em]">THE HIDEOUT</h1>
        <p className="mt-4 text-sm leading-relaxed text-mute">Where all the preparation happens.<br />From here, the operation begins.</p>
        {sel && (
          <div className="mt-6 animate-fadein border border-accent/60 bg-surface2 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-widest text-mute">{sel.category}</p>
                <h2 className="mt-1 text-lg text-accent">{sel.name}</h2>
              </div>
              <button type="button" onClick={() => setSel(null)} aria-label="Close" className="px-2 text-mute hover:text-ink">✕</button>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink/90">{sel.note}</p>
            <Link href={`/archive/${sel.id}`} className="mt-3 inline-block text-sm text-accent hover:text-ink">Inspect in 3D →</Link>
          </div>
        )}
        <ol className="mt-8 text-sm">
          {rooms.map((r, i) => (
            <li key={r.id} className={`flex gap-4 border-b border-line py-2.5 ${r.active ? "text-ink" : "text-mute"}`}>
              <span className="font-mono text-mute">{String(i + 1).padStart(2, "0")}.</span>{r.name}{!r.active && <span className="ml-auto text-xs text-mute">Soon</span>}
            </li>
          ))}
        </ol>
        <Link href="/journal" className="mt-6 inline-block border border-line px-4 py-3 text-sm hover:border-accent">Open Journal →</Link>
        {/* Mobile: hover tidak ada, jadi sediakan daftar tap */}
        <ul className="mt-6 grid grid-cols-2 gap-2 text-sm lg:hidden">
          {equipment.map((e) => (
            <li key={e.id}><Link href={`/archive/${e.id}`} className="block border border-line px-3 py-3 hover:border-accent">{e.name} →</Link></li>
          ))}
        </ul>
      </aside>
    </section>
  );
}
