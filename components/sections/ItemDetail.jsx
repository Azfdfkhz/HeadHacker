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
        <ObjectViewer item={item} />
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
