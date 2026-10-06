"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Button from "@/components/ui/Button";
import InfoPanel from "@/components/ui/InfoPanel";
import { useDiscoveryContext } from "@/context/DiscoveryContext";

const ObjectViewer = dynamic(() => import("@/components/3d/ObjectViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full flex-col items-center justify-center gap-4 bg-[radial-gradient(ellipse_at_50%_45%,#2b373c_0%,#182024_55%,#101416_100%)]">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Loading Object</p>
      <div className="h-px w-32 overflow-hidden bg-line">
        <div className="h-full w-full origin-left animate-[shimmer_1.4s_ease-in-out_infinite] bg-accent" />
      </div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-mute">Initializing model</p>
    </div>
  ),
});

const Terminal = dynamic(() => import("@/components/terminal/Terminal"), { ssr: false });

export default function ItemDetail({ item, index, total, prevId, nextId }) {
  const { discover, isDiscovered } = useDiscoveryContext();
  const [justDiscovered, setJustDiscovered] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Auto-discover: reaching the detail page counts as inspecting the item
  useEffect(() => {
    if (!isDiscovered(item.id)) {
      setJustDiscovered(true);
      discover(item.id);
      const t = setTimeout(() => setJustDiscovered(false), 3000);
      return () => clearTimeout(t);
    }
  }, [item.id, discover, isDiscovered]);

  const showTerminal = item.id === "computer" && isDiscovered("computer");

  return (
    <>
      {terminalOpen && <Terminal onClose={() => setTerminalOpen(false)} />}
      <section className="grid min-h-screen animate-fadein grid-rows-[auto_1fr] bg-surface lg:grid-cols-[1fr_380px] lg:grid-rows-1">
        {/* 3D Viewer panel */}
        <div className="relative h-[55vh] lg:h-screen">
          <Link
            href="/explore"
            className="absolute left-6 top-6 z-10 border border-line bg-bg/60 px-4 py-2.5 text-sm text-ink transition hover:border-accent"
          >
            ← Back to Room
          </Link>

          {/* "DISCOVERED" badge — briefly shown on first inspect */}
          {justDiscovered && (
            <div className="absolute right-6 top-6 z-10 animate-fadein border border-accent/60 bg-surface2/95 px-4 py-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">Object Discovered</p>
            </div>
          )}

          {item.comingSoon ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 bg-[radial-gradient(ellipse_at_50%_45%,#2b373c_0%,#182024_55%,#101416_100%)] text-center">
              <p className="font-mono text-3xl tracking-[0.3em] text-ink/40 sm:text-4xl">STATUS</p>
              <p className="font-mono text-2xl tracking-[0.4em] text-ink sm:text-3xl">IN DEVELOPMENT</p>
              <p className="max-w-xs px-6 text-sm text-mute">{item.soonNote || "The 3D model for this item is in development."}</p>
            </div>
          ) : (
            <ObjectViewer item={item} />
          )}
        </div>

        {/* Info sidebar */}
        <InfoPanel item={item} index={index} total={total}>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Button href="/archive">Archive</Button>
              <Link href={`/archive/${prevId}`} className="px-4 py-3 text-lg text-mute hover:text-ink" aria-label="Previous item">←</Link>
              <Link href={`/archive/${nextId}`} className="px-4 py-3 text-lg text-mute hover:text-ink" aria-label="Next item">→</Link>
            </div>
            {/* Terminal easter egg — only on Computer, only after discovery */}
            {showTerminal && (
              <button
                type="button"
                onClick={() => setTerminalOpen(true)}
                className="w-full border border-line px-4 py-3 text-left font-mono text-xs uppercase tracking-widest text-mute transition hover:border-accent hover:text-accent"
              >
                ▶ Access Terminal
              </button>
            )}
          </div>
        </InfoPanel>
      </section>
    </>
  );
}
