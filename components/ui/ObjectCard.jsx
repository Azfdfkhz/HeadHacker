"use client";
import Link from "next/link";
import SceneImage from "./SceneImage";

export default function ObjectCard({ item, index }) {
  return (
    <Link
      href={`/archive/${item.id}`}
      className="group flex flex-col border border-line bg-surface p-3 transition hover:border-accent"
    >
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-surface2">
        {item.comingSoon && <span className="absolute right-2 top-2 z-10 border border-line bg-bg/70 px-2 py-1 text-[10px] uppercase tracking-widest text-ink">Coming soon</span>}
        <span className="absolute font-mono text-3xl text-white/10">{String(index + 1).padStart(2, "0")}</span>
        <SceneImage src={`/images/thumbs/${item.id}.png`} alt={item.name} className="relative h-full w-full object-contain p-3 mix-blend-lighten transition duration-500 group-hover:scale-105" />
      </div>
      <div className="mt-3 flex items-baseline justify-between text-base">
        <span>{item.name}</span>
        <span className="font-mono text-xs text-mute">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <p className="mt-1 text-xs uppercase tracking-widest text-mute">{item.category}</p>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-mute">{item.description}</p>
    </Link>
  );
}
