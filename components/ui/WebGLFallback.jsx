/**
 * WebGLFallback — shown when WebGL is unavailable.
 *
 * Displays a clean message and links to the static archive,
 * so the user can still browse content without 3D.
 */
import Link from "next/link";

export default function WebGLFallback() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 bg-[radial-gradient(ellipse_at_50%_45%,#2b373c_0%,#182024_55%,#101416_100%)] p-8 text-center">
      <div className="border border-line bg-surface2/60 px-8 py-8">
        <p className="font-mono text-sm uppercase tracking-[0.25em] text-mute">
          3D Experience Unavailable
        </p>
        <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/80">
          Your device does not support the required 3D rendering mode. You can still
          browse the equipment archive below.
        </p>
        <Link
          href="/archive"
          className="mt-6 inline-block border border-accent px-6 py-3 text-sm uppercase tracking-widest text-accent transition hover:bg-accent hover:text-bg"
        >
          View Static Archive
        </Link>
      </div>
    </div>
  );
}
