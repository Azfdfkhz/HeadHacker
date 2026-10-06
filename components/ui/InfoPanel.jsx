"use client";
import { useDiscoveryContext } from "@/context/DiscoveryContext";

/**
 * InfoPanel — sidebar detail for archive item detail pages.
 * Shows discovery badge, item metadata, and renders children (navigation buttons).
 */
export default function InfoPanel({ item, index, total, children }) {
  const { isDiscovered } = useDiscoveryContext();
  const found = isDiscovered(item.id);
  const rows = [["Class", item.category], ["Type", item.type], ["Status", item.status], ["Location", item.location]];

  return (
    <aside className="flex flex-col justify-center border-t border-line p-8 lg:border-l lg:border-t-0">
      <div className="flex justify-between text-xs uppercase tracking-widest text-mute">
        <span>{item.category}</span>
        <span className="font-mono">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-accent">{item.name}</h1>

      {/* Discovery badge */}
      {found && (
        <div className="mt-3 inline-flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">✓ Discovered</span>
        </div>
      )}

      <p className="mt-4 max-w-sm text-base leading-relaxed text-ink/90">{item.description}</p>

      {/* Specifications */}
      <dl className="mt-8 space-y-2 border-t border-line pt-6 text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="flex gap-6">
            <dt className="w-20 text-mute">{k}</dt>
            <dd className="text-ink">: {v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8">{children}</div>
    </aside>
  );
}
