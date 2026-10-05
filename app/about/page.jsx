import Link from "next/link";
export const metadata = { title: "About — HEADHACKER" };

const Section = ({ label, children }) => (
  <section className="mt-12 border-t border-line pt-6">
    <p className="font-mono text-xs uppercase tracking-[0.25em] text-mute">{label}</p>
    <div className="mt-3 space-y-3 text-base leading-relaxed text-ink/90">{children}</div>
  </section>
);

export default function About() {
  return (
    <main className="mx-auto min-h-screen max-w-2xl px-6 pb-24 pt-32">
      <h1 className="font-mono text-3xl tracking-[0.2em]">HEADHACKER</h1>
      <p className="mt-6 text-lg leading-relaxed text-ink/90">A VR surveillance experience. Not just a game: it&apos;s a place, a system, a story.</p>
      <Section label="Concept">
        <p>This site introduces the world through exploration instead of long text. You start outside the hideout, step in, and learn what happens there through the equipment on the desk.</p>
        <p className="font-mono text-sm tracking-widest text-accent">ENTER → EXPLORE → INSPECT</p>
      </Section>
      <Section label="Why a CCTV head?">
        <p>In the city, almost every street, office and building is watched by CCTV. Before HEADHACKER can act, he has to hack those cameras first: the city&apos;s, an office&apos;s, or anything else that watches. That is why he is drawn with the head of the very camera he has to take over.</p>
      </Section>
      <Section label="How to explore">
        <p>Hover the glowing points in the Main Room to read about each object, then inspect it in 3D: drag to rotate, scroll to zoom. The Journal collects everything in one notebook you can flip through.</p>
      </Section>
      <Section label="Development">
        <p>Built with Next.js, React Three Fiber and Tailwind. Models are made in Blender and exported as GLB. Status: in development, with more rooms, characters and environments planned.</p>
      </Section>
      <div className="mt-12 flex flex-wrap gap-3">
        <Link href="/explore" className="border border-accent bg-accent px-6 py-3 text-sm font-medium tracking-wider text-bg transition hover:bg-ink hover:border-ink">Explore the Hideout</Link>
        <Link href="/journal" className="border border-accent/70 px-6 py-3 text-sm tracking-wider transition hover:bg-accent/10">Open Journal</Link>
      </div>
    </main>
  );
}
