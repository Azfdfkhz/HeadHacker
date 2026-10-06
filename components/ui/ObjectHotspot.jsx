"use client";
import { useDiscoveryContext } from "@/context/DiscoveryContext";

/**
 * ObjectHotspot — interactive hotspot marker on the room image.
 *
 * On click: triggers discovery (if not already found) and opens the detail panel.
 * Discovered items show a solid dot instead of pulsing ring.
 * Touch-friendly: minimum 44px tap target.
 */
export default function ObjectHotspot({ item, onSelect }) {
  const { discover, isDiscovered } = useDiscoveryContext();
  const found = isDiscovered(item.id);

  const handle = () => {
    discover(item.id);
    onSelect(item);
  };

  return (
    <button
      type="button"
      onClick={handle}
      style={{ left: `${item.hotspot.x}%`, top: `${item.hotspot.y}%` }}
      className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full p-4 focus:outline-none"
      aria-label={`Inspect ${item.name}${found ? " (discovered)" : ""}`}
    >
      <span className="relative block h-3 w-3">
        {/* Pulse ring — only for undiscovered items */}
        {!found && (
          <span
            className="absolute inset-0 animate-ping rounded-full bg-accent/50"
            style={{ animationDuration: "2.6s" }}
            aria-hidden="true"
          />
        )}
        {/* Core dot — solid when discovered */}
        <span
          className={`relative block h-3 w-3 rounded-full border transition duration-300 group-hover:scale-150 group-focus:scale-150 ${
            found
              ? "border-accent bg-accent"
              : "border-accent bg-accent/40 group-hover:bg-accent group-hover:shadow-[0_0_0_6px_rgba(145,170,165,.25)] group-focus:bg-accent group-focus:shadow-[0_0_0_6px_rgba(145,170,165,.25)]"
          }`}
        />
      </span>

      {/* Tooltip label */}
      <span className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 translate-x-1 whitespace-nowrap border border-line bg-surface/95 px-3 py-1.5 text-left text-xs opacity-0 shadow-lg transition group-hover:translate-x-0 group-hover:opacity-100 group-focus:translate-x-0 group-focus:opacity-100">
        <span className="block font-mono uppercase tracking-wider">
          {found && <span className="mr-1 text-accent">✓</span>}
          {item.name}
        </span>
        <span className="block text-xs text-mute">{item.category} · Inspect →</span>
      </span>
    </button>
  );
}
