"use client";

export default function ObjectHotspot({ item, onSelect }) {
  return (
    <button type="button" onClick={() => onSelect(item)}
      style={{ left: `${item.hotspot.x}%`, top: `${item.hotspot.y}%` }}
      className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full p-1 focus:outline-none"
      aria-label={`Inspect ${item.name}`}>
      <span className="relative block h-3 w-3">
        <span className="absolute inset-0 animate-ping rounded-full bg-accent/50" style={{ animationDuration: "2.6s" }} />
        <span className="relative block h-3 w-3 rounded-full border border-accent bg-accent/40 transition group-hover:scale-150 group-hover:bg-accent group-focus:scale-150 group-focus:bg-accent" />
      </span>
      <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 translate-x-1 whitespace-nowrap border border-line bg-surface/95 px-3 py-1.5 text-left text-xs opacity-0 shadow-lg transition group-hover:translate-x-0 group-hover:opacity-100 group-focus:translate-x-0 group-focus:opacity-100">
        <span className="block font-mono uppercase tracking-wider">{item.name}</span>
        <span className="block text-[10px] text-mute">{item.category} · Inspect →</span>
      </span>
    </button>
  );
}
