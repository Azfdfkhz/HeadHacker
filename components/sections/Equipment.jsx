"use client";
import Link from "next/link";
import { useState } from "react";
import { equipment } from "@/data/equipment";
import { useDiscoveryContext } from "@/context/DiscoveryContext";
import SceneImage from "@/components/ui/SceneImage";

// Filter categories derived from equipment data + ALL shortcut
const FILTERS = ["ALL", "EQUIPMENT", "FIELD", "COMMUNICATION", "STORAGE"];

const CATEGORY_MAP = {
  EQUIPMENT: "Equipment",
  FIELD: "Field Device",
  COMMUNICATION: "Communication",
  STORAGE: "Data Storage",
};

function ObjectCard({ item, index, discovered }) {
  const found = discovered.includes(item.id);
  return (
    <Link
      href={`/archive/${item.id}`}
      className={`group flex flex-col border bg-surface p-3 transition hover:border-accent ${found ? "border-accent/30" : "border-line"}`}
    >
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-surface2">
        {found && (
          <span className="absolute left-2 top-2 z-10 border border-accent/50 bg-bg/80 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-accent">
            ✓ Found
          </span>
        )}
        {item.comingSoon && !found && (
          <span className="absolute right-2 top-2 z-10 border border-line bg-bg/70 px-2 py-1 text-[10px] uppercase tracking-widest text-mute">
            Model TBD
          </span>
        )}
        <span className="absolute font-mono text-3xl text-white/10">{String(index + 1).padStart(2, "0")}</span>
        <SceneImage
          src={`/images/thumbs/${item.id}.png`}
          alt={item.name}
          className={`relative h-full w-full object-contain p-3 mix-blend-lighten transition duration-500 group-hover:scale-105 ${found ? "" : "grayscale-[.4]"}`}
        />
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

export default function Equipment() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const { discovered } = useDiscoveryContext();

  const filtered =
    activeFilter === "ALL"
      ? equipment
      : equipment.filter((e) => e.category === CATEGORY_MAP[activeFilter]);

  const foundCount = discovered.filter((id) => equipment.some((e) => e.id === id)).length;

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 pb-20 pt-28">
      <header className="border-b border-line pb-5">
        {/* Filter tabs */}
        <nav className="flex flex-wrap gap-6 text-sm" aria-label="Archive filter">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActiveFilter(f)}
              aria-pressed={activeFilter === f}
              className={`pb-3 font-mono text-xs tracking-[0.2em] transition ${
                activeFilter === f
                  ? "border-b border-accent text-accent"
                  : "text-mute hover:text-ink"
              }`}
            >
              {f}
            </button>
          ))}
        </nav>
      </header>

      <div className="mt-10 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-mute">Archive / Equipment</p>
          <h1 className="mt-2 text-3xl tracking-tight text-accent">
            {activeFilter === "ALL" ? "All Equipment" : activeFilter.charAt(0) + activeFilter.slice(1).toLowerCase()}
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-mute">
            Equipment that supports operations inside the HEADHACKER world.
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <p className="font-mono text-sm text-mute">{String(filtered.length).padStart(2, "0")} ITEMS</p>
          {foundCount > 0 && (
            <p className="font-mono text-xs text-accent">
              {String(foundCount).padStart(2, "0")} / {String(equipment.length).padStart(2, "0")} DISCOVERED
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {filtered.map((item, i) => (
          <ObjectCard key={item.id} item={item} index={equipment.indexOf(item)} discovered={discovered} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-20 text-center font-mono text-sm text-mute tracking-widest">
            NO ITEMS IN THIS CATEGORY
          </p>
        )}
      </div>
    </main>
  );
}
