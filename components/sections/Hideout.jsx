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
  useEffect(() => { const t = setTimeout(() => setReady(true), 1600); return () => clearTimeout(t); }, []);
  const open = (item) => router.push(`/archive/${item.id}`);

  return (
    <section className="flex min-h-screen flex-col bg-bg lg:flex-row">
      <div className="flex flex-1 items-center justify-center overflow-hidden">
        {/* aspect-video + hotspot berbasis % = posisi tetap pas di semua ukuran layar */}
        <div style={{ aspectRatio: "1100 / 770" }} className="relative w-full max-w-[calc(100vh*1.4286)] animate-settle bg-gradient-to-b from-[#2a3a30] to-[#1a2420]">
          <SceneImage src="/images/room.jpg" alt="Ruang Utama" className="absolute inset-0 h-full w-full object-cover" />
          <div className={`transition-opacity duration-1000 ${ready ? "opacity-100" : "pointer-events-none opacity-0"}`}>
            {equipment.map((item) => <ObjectHotspot key={item.id} item={item} onSelect={open} />)}
          </div>
          <p className={`absolute bottom-3 left-4 bg-bg/70 px-2 py-1 text-xs text-mute transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
            Arahkan kursor ke objek untuk melihat detailnya.
          </p>
        </div>
      </div>

      <aside className="flex w-full flex-col justify-center border-t border-line bg-surface p-8 lg:w-80 lg:border-l lg:border-t-0">
        <h1 className="font-mono text-xl tracking-[0.2em]">THE HIDEOUT</h1>
        <p className="mt-4 text-xs leading-relaxed text-mute">Tempat dimana semua persiapan dilakukan.<br />Dari sini, operasi dimulai.</p>
        <ol className="mt-8 text-sm">
          {rooms.map((r, i) => (
            <li key={r.id} className={`flex gap-4 border-b border-line py-2.5 ${r.active ? "text-ink" : "text-mute/50"}`}>
              <span className="font-mono text-mute">{String(i + 1).padStart(2, "0")}.</span>{r.name}
            </li>
          ))}
        </ol>
        {/* Mobile: hover tidak ada, jadi sediakan daftar tap */}
        <ul className="mt-6 grid grid-cols-2 gap-2 text-xs lg:hidden">
          {equipment.map((e) => (
            <li key={e.id}><Link href={`/archive/${e.id}`} className="block border border-line px-3 py-2 hover:border-accent">{e.name} →</Link></li>
          ))}
        </ul>
      </aside>
    </section>
  );
}
