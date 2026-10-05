import Link from "next/link";
import SceneImage from "@/components/ui/SceneImage";
import { equipment } from "@/data/equipment";

export const tabs = [["About", 1], ["Equipment", 2], ["Places", 3], ["Notes", 4]]; // [label, jumlah lembar yang harus terbalik]

const Page = ({ title, children }) => (
  <div className="flex h-full flex-col gap-[2.2cqw]">
    <h2 className="bar font-type text-[2.6cqw] uppercase tracking-wide text-[#e6e3d8]">{title || "\u00a0"}</h2>
    {children}
  </div>
);

const Entry = ({ i, title, sub, note, src, href, n, fit = "contain" }) => {
  const flip = i % 2 === 1;
  const body = (
    <div className={`flex items-center gap-[2.4cqw] ${flip ? "flex-row-reverse text-right" : ""}`}>
      <figure className="photo relative w-[44%] shrink-0" style={{ rotate: `${flip ? 1.6 : -1.8}deg` }}>
        <i className="tape" style={{ left: "-4%", top: "-6%" }} />
        <div className="relative aspect-[4/3] overflow-hidden bg-[#c9c6bc]">
          <span className="absolute inset-0 grid place-items-center font-type text-[4cqw] text-black/10">{n}</span>
          <SceneImage src={src} alt={title} className={`relative h-full w-full ${fit === "cover" ? "object-cover" : "object-contain p-[1cqw]"} grayscale-[.55] transition duration-300 group-hover:grayscale-0`} />
        </div>
      </figure>
      <div>
        <h3 className="font-type text-[1.7cqw] uppercase tracking-wide">{title}</h3>
        <p className="font-hand text-[2cqw] leading-[1.1] text-black/75">{note}</p>
        {sub && <p className="mt-[.6cqw] font-type text-[1.1cqw] uppercase tracking-widest text-black/50">{sub}{href ? " · open →" : ""}</p>}
      </div>
    </div>
  );
  return href ? <Link href={href} className="group block">{body}</Link> : body;
};

const Locked = ({ label }) => (
  <div className="relative grid aspect-[16/6] place-items-center border border-dashed border-black/40 bg-white/40">
    <i className="tape" style={{ right: "8%", top: "-8%" }} />
    <span className="grid h-[5cqw] w-[5cqw] place-items-center rounded-full bg-[#1d1d1d] font-hand text-[3.2cqw] text-[#e6e3d8]">?</span>
    {label && <span className="absolute bottom-[.6cqw] font-type text-[1cqw] uppercase tracking-widest text-black/50">{label} · locked</span>}
  </div>
);

const Hand = ({ children }) => <p className="font-hand text-[2.3cqw] leading-[1.15] text-black/80">{children}</p>;

const eq = (list, offset) => list.map((e, k) => (
  <Entry key={e.id} i={k} n={String(offset + k + 1).padStart(2, "0")} title={e.name} sub={e.category} note={e.note}
    src={`/images/thumbs/${e.id}.png`} href={`/archive/${e.id}`} />
));

const Cover = () => (
  <div className="relative grid h-full place-items-center text-center">
    <div className="absolute inset-[4%] border border-[#e6e3d8]/15" />
    <div>
      <svg viewBox="0 0 120 80" className="mx-auto w-[16cqw] text-[#e6e3d8]/80" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
        <rect x="10" y="14" width="64" height="34" rx="6" /><path d="M74 22l22-8v38l-22-8" /><circle cx="26" cy="31" r="4" fill="currentColor" /><path d="M40 48v14h26M30 62h46" />
      </svg>
      <h1 className="mt-[2cqw] font-type text-[4.4cqw] tracking-[.15em]">HEADHACKER</h1>
      <p className="mt-[1cqw] font-type text-[1.2cqw] uppercase tracking-[.3em] text-[#e6e3d8]/55">Field notes</p>
      <p className="mt-[5cqw] font-type text-[1.1cqw] uppercase tracking-widest text-[#e6e3d8]/40">Click to open</p>
    </div>
  </div>
);

const Step = ({ n, title, text }) => (
  <div className="flex gap-[1.6cqw]">
    <span className="font-type text-[2.6cqw] leading-none text-black/35">{n}</span>
    <div><h3 className="font-type text-[1.6cqw] uppercase tracking-wide">{title}</h3><p className="font-hand text-[2.1cqw] leading-[1.1] text-black/75">{text}</p></div>
  </div>
);

// Index 0 = sampul depan; ganjil = sisi kiri, genap = sisi kanan (tiap 2 halaman = 1 lembar)
export function buildPages() {
  return [
    <Cover key="cover" />,
    <Page key="ab1" title="Who is HEADHACKER?">
      <p className="font-type text-[1.5cqw] uppercase tracking-widest">A hacker with a camera for a head</p>
      <Hand>In the city, almost every street, office and building is watched by CCTV. Nothing moves unseen.</Hand>
      <Hand>Before HEADHACKER can act, he has to get inside those cameras first.</Hand>
      <Hand>That&apos;s why he wears the head of a CCTV: it is the very thing he has to take over.</Hand>
    </Page>,
    <Page key="ab2" title="The city is watching">
      <Step n="01" title="Find the camera" text="City streets, offices, any building that has one." />
      <Step n="02" title="Hack it" text="Take over the feed before anyone notices." />
      <Step n="03" title="Move" text="Only then can the operation continue." />
    </Page>,
    <Page key="eq1" title="Equipment">{eq(equipment.slice(0, 3), 0)}</Page>,
    <Page key="eq2" title="">{eq(equipment.slice(3, 6), 3)}</Page>,
    <Page key="pl1" title="Places">
      <Entry i={0} n="01" fit="cover" title="The Hideout" sub="Exterior" note="Just another rundown apartment block. Nobody looks twice." src="/images/exterior.svg" />
      <Entry i={1} n="02" fit="cover" title="Main Room" sub="Operations" note="Where the watching happens." src="/images/room.jpg" href="/explore" />
      <Locked label="Bedroom" />
    </Page>,
    <Page key="pl2" title=""><Locked label="Bathroom" /><Locked label="Kitchen" /><Locked /></Page>,
    // TODO: ganti teks Notes dengan cerita game yang sebenarnya
    <Page key="n1" title="Notes">
      <p className="font-type text-[1.5cqw] uppercase tracking-widest">A VR surveillance experience</p>
      <Hand>You enter the hideout, find the room where operations happen, and learn this world through the gear on the desk.</Hand>
      <Hand>Enter. Explore. Inspect.</Hand>
    </Page>,
    <Page key="n2" title="Development">
      <Hand>Built with Next.js, React Three Fiber and Tailwind.</Hand>
      <Hand>Models are made in Blender and shipped as GLB.</Hand>
      <Hand>Status: in development. More rooms, characters and environments are coming.</Hand>
    </Page>,
    <Page key="end" title="To be continued"><Locked label="Characters" /><Locked label="Environment" /></Page>,
  ];
}
