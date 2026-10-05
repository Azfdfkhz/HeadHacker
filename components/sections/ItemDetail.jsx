"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import Button from "@/components/ui/Button";
import InfoPanel from "@/components/ui/InfoPanel";

// Lazy-load 3D (PRD: jangan load semua sekaligus)
const ObjectViewer = dynamic(() => import("@/components/3d/ObjectViewer"), {
  ssr: false,
  loading: () => <div className="flex h-full items-center justify-center text-sm text-mute">Loading 3D…</div>,
});

export default function ItemDetail({ item, index, total, prevId, nextId }) {
  return (
    <section className="grid min-h-screen animate-fadein grid-rows-[auto_1fr] bg-surface lg:grid-cols-[1fr_380px] lg:grid-rows-1">
      <div className="relative h-[55vh] lg:h-screen">
        <Link href="/explore" className="absolute left-6 top-6 z-10 border border-line bg-bg/60 px-4 py-2.5 text-sm text-ink transition hover:border-accent">← Back to Room</Link>
        {item.comingSoon ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 bg-[radial-gradient(ellipse_at_50%_45%,#2b373c_0%,#182024_55%,#101416_100%)] text-center">
            <p className="font-mono text-3xl tracking-[0.3em] text-ink sm:text-4xl">COMING SOON</p>
            <p className="max-w-xs px-6 text-sm text-mute">{item.soonNote || "The 3D model for this item is in development."}</p>
          </div>
        ) : (
          <ObjectViewer item={item} />
        )}
      </div>
      <InfoPanel item={item} index={index} total={total}>
        <div className="flex items-center gap-3">
          <Button href="/archive">Archive</Button>
          <Link href={`/archive/${prevId}`} className="px-4 py-3 text-lg text-mute hover:text-ink" aria-label="Previous">←</Link>
          <Link href={`/archive/${nextId}`} className="px-4 py-3 text-lg text-mute hover:text-ink" aria-label="Next">→</Link>
        </div>
      </InfoPanel>
    </section>
  );
}
