import Link from "next/link";
export const metadata = { title: "About" };

const Divider = () => <div className="border-t border-line" />;

const Section = ({ label, children }) => (
  <section>
    <Divider />
    <div className="pt-6">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-mute">{label}</p>
      <div className="mt-3 space-y-3 text-base leading-relaxed text-ink/90">{children}</div>
    </div>
  </section>
);

const timeline = [
  ["v0.1", "Main Room + equipment hotspots"],
  ["v0.2", "Equipment Archive + 3D viewer"],
  ["v0.3", "Discovery system + Journal unlock"],
  ["v0.4", "Terminal + Easter eggs"],
  ["v1.0", "Full experience"],
];

const stack = [
  ["Renderer", "Next.js 14 App Router"],
  ["3D", "React Three Fiber + Drei"],
  ["Engine", "Three.js"],
  ["Models", "Blender → GLB"],
  ["Styling", "Tailwind CSS"],
  ["Fonts", "Inter · JetBrains Mono · Caveat · Special Elite"],
];

export default function About() {
  return (
    <main className="mx-auto min-h-screen max-w-2xl px-6 pb-24 pt-32">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-mute">// Dossier</p>
      <h1 className="mt-3 font-mono text-3xl tracking-[0.2em]">HEADHACKER</h1>
      <p className="mt-6 text-base leading-relaxed text-ink/90">
        A VR surveillance experience.
      </p>
      <p className="mt-1 text-sm text-mute">
        Not just a game: it&apos;s a place, a system, a story.
      </p>

      <div className="mt-12 space-y-10">
        <Section label="Concept">
          <p>
            This site introduces the world through exploration — not through long text.
            You start outside the hideout, step inside, and learn what happens there
            through the equipment on the desk.
          </p>
          <p className="font-mono text-sm tracking-widest text-accent">ENTER → EXPLORE → INSPECT</p>
        </Section>

        <Section label="The World">
          <p>
            In the city, almost every street, office and building is watched by CCTV.
            Before HEADHACKER can act, he has to hack those cameras first —
            the city&apos;s, an office&apos;s, or anything else that watches.
          </p>
          <p>
            That is why he is drawn with the head of the very camera he has to take over.
          </p>
        </Section>

        <Section label="How to Explore">
          <p>
            Hover the glowing points in the Main Room to read about each object.
            Click to inspect it in 3D: drag to rotate, scroll to zoom, tap the markers
            for part annotations.
          </p>
          <p>
            The Journal collects everything into one field notebook you can flip through.
            Discover items to unlock new journal entries.
          </p>
        </Section>

        <Section label="Technology">
          <dl className="space-y-2 text-sm">
            {stack.map(([k, v]) => (
              <div key={k} className="flex gap-6">
                <dt className="w-24 text-mute">{k}</dt>
                <dd className="text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section label="Development Timeline">
          <div className="space-y-3">
            {timeline.map(([v, t]) => (
              <div key={v} className="flex items-baseline gap-6">
                <span className="w-10 shrink-0 font-mono text-sm text-accent">{v}</span>
                <span className="text-sm text-ink/80">{t}</span>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <div className="mt-14 flex flex-wrap gap-3">
        <Link
          href="/explore"
          className="border border-accent bg-accent px-6 py-3 text-sm font-medium tracking-wider text-bg transition hover:bg-ink hover:border-ink"
        >
          Explore the Hideout
        </Link>
        <Link
          href="/journal"
          className="border border-accent/70 px-6 py-3 text-sm tracking-wider transition hover:bg-accent/10"
        >
          Open Journal
        </Link>
        <Link
          href="/archive"
          className="border border-line px-6 py-3 text-sm tracking-wider text-mute transition hover:border-accent hover:text-ink"
        >
          View Archive
        </Link>
      </div>
    </main>
  );
}
