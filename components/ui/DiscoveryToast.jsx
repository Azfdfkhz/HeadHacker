/**
 * DiscoveryToast — transient "OBJECT DISCOVERED" notification.
 *
 * Appears in the top-right corner for ~3 seconds when a new object is found.
 * Uses aria-live so screen readers announce it.
 *
 * Usage:
 *   <DiscoveryToast name={item.name} index={1} total={4} />
 *   — render only when an item was just discovered (truthy `name`).
 */
"use client";
import { useEffect, useState } from "react";

export default function DiscoveryToast({ name, index, total }) {
  const [visible, setVisible] = useState(false);
  const [displayed, setDisplayed] = useState(null);

  useEffect(() => {
    if (!name) return;
    setDisplayed(name);
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 3200);
    return () => clearTimeout(t);
  }, [name]);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed right-6 top-20 z-50"
    >
      <div
        className={`transition-all duration-500 ${visible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}
      >
        {displayed && (
          <div className="border border-accent/60 bg-surface2/98 px-5 py-4 shadow-xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
              Object Discovered
            </p>
            <p className="mt-1 text-sm font-medium tracking-wider text-ink">{displayed}</p>
            {index != null && total != null && (
              <p className="mt-2 font-mono text-[10px] text-mute">
                {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")} FOUND
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
