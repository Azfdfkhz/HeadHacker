import Link from "next/link";
import SceneImage from "@/components/ui/SceneImage";
import { equipment } from "@/data/equipment";

export const tabs = [
  ["About", 1],
  ["Equipment", 2],
  ["Field Notes", 3],
  ["Places", 4],
  ["Dev Log", 5],
];

// ── Reusable sub-components ──────────────────────────────────────────────────

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
          <SceneImage
            src={src}
            alt={title}
            className={`relative h-full w-full ${fit === "cover" ? "object-cover" : "object-contain p-[1cqw]"} grayscale-[.55] transition duration-300 group-hover:grayscale-0`}
          />
        </div>
      </figure>
      <div>
        <h3 className="font-type text-[1.7cqw] uppercase tracking-wide">{title}</h3>
        <p className="font-hand text-[2cqw] leading-[1.1] text-black/75">{note}</p>
        {sub && (
          <p className="mt-[.6cqw] font-type text-[1.1cqw] uppercase tracking-widest text-black/50">
            {sub}{href ? " · open →" : ""}
          </p>
        )}
      </div>
    </div>
  );
  return href ? <Link href={href} className="group block">{body}</Link> : body;
};

/** Locked area placeholder */
const Locked = ({ label }) => (
  <div className="relative grid aspect-[16/6] place-items-center border border-dashed border-black/40 bg-white/40">
    <i className="tape" style={{ right: "8%", top: "-8%" }} />
    <span className="grid h-[5cqw] w-[5cqw] place-items-center rounded-full bg-[#1d1d1d] font-hand text-[3.2cqw] text-[#e6e3d8]">?</span>
    {label && (
      <span className="absolute bottom-[.6cqw] font-type text-[1cqw] uppercase tracking-widest text-black/50">
        {label} · locked
      </span>
    )}
  </div>
);

/** Locked journal entry — shown when the triggering item hasn't been discovered yet */
const LockedEntry = ({ triggerName, n }) => (
  <div className="relative flex items-center gap-[2.4cqw]">
    <div className="relative flex aspect-[4/3] w-[44%] shrink-0 items-center justify-center border border-dashed border-black/30 bg-white/30">
      <span className="font-hand text-[3.5cqw] text-black/20">?</span>
      <span className="absolute bottom-[.6cqw] left-0 right-0 text-center font-type text-[0.9cqw] uppercase tracking-widest text-black/40">
        entry locked
      </span>
    </div>
    <div>
      <p className="font-type text-[1.4cqw] uppercase tracking-wide text-black/40">Entry {n}</p>
      <p className="font-hand text-[1.8cqw] leading-[1.1] text-black/40">
        Discover: {triggerName}
      </p>
      <p className="mt-[.4cqw] font-type text-[1cqw] uppercase tracking-widest text-black/30">
        Inspect the item to unlock
      </p>
    </div>
  </div>
);

const Hand = ({ children }) => <p className="font-hand text-[2.3cqw] leading-[1.15] text-black/80">{children}</p>;

const Step = ({ n, title, text }) => (
  <div className="flex gap-[1.6cqw]">
    <span className="font-type text-[2.6cqw] leading-none text-black/35">{n}</span>
    <div>
      <h3 className="font-type text-[1.6cqw] uppercase tracking-wide">{title}</h3>
      <p className="font-hand text-[2.1cqw] leading-[1.1] text-black/75">{text}</p>
    </div>
  </div>
);

const Cover = () => (
  <div className="relative grid h-full place-items-center text-center">
    <div className="absolute inset-[4%] border border-[#e6e3d8]/15" />
    <div>
      <svg viewBox="0 0 120 80" className="mx-auto w-[16cqw] text-[#e6e3d8]/80" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
        <rect x="10" y="14" width="64" height="34" rx="6" /><path d="M74 22l22-8v38l-22-8" /><circle cx="26" cy="31" r="4" fill="currentColor" /><path d="M40 48v14h26M30 62h46" />
      </svg>
      <h1 className="mt-[2cqw] font-type text-[4.4cqw] tracking-[.15em]">HEADHACKER</h1>
      <p className="mt-[1cqw] font-type text-[1.2cqw] uppercase tracking-[.3em] text-[#e6e3d8]/55">Field Journal</p>
      <p className="mt-[5cqw] font-type text-[1.1cqw] uppercase tracking-widest text-[#e6e3d8]/40">Click to open</p>
    </div>
  </div>
);

// ── Dynamic page builder ─────────────────────────────────────────────────────

/**
 * buildPages(discovered) — returns the array of page JSX nodes.
 *
 * Accepts a list of discovered item IDs so that locked field-note entries
 * can be dynamically revealed as the user explores the hideout.
 */
export function buildPages(discovered = []) {
  const isFound = (id) => discovered.includes(id);

  /** Field note entry for one equipment item */
  const fieldEntry = (item, idx) => {
    if (!isFound(item.id)) {
      return <LockedEntry key={item.id} triggerName={item.name} n={String(idx + 1).padStart(2, "0")} />;
    }
    return (
      <div key={item.id} className="flex items-start gap-[2cqw]">
        <div className="w-[44%] shrink-0">
          <div className="photo relative" style={{ rotate: `${idx % 2 === 0 ? -1.8 : 1.6}deg` }}>
            <i className="tape" style={{ left: "-4%", top: "-6%" }} />
            <div className="relative aspect-[4/3] overflow-hidden bg-[#c9c6bc]">
              <SceneImage
                src={`/images/thumbs/${item.id}.png`}
                alt={item.name}
                className="h-full w-full object-contain p-[1cqw] grayscale-[.45]"
              />
            </div>
          </div>
        </div>
        <div>
          <p className="font-type text-[1cqw] uppercase tracking-widest text-black/40">
            {String(idx + 1).padStart(2, "0")} · Discovered
          </p>
          <h3 className="font-type text-[1.7cqw] uppercase tracking-wide">{item.name}</h3>
          <p className="font-hand text-[1.9cqw] leading-[1.1] text-black/75">{item.note}</p>
          <Link href={`/archive/${item.id}`} className="mt-[.5cqw] block font-type text-[1cqw] uppercase tracking-widest text-black/50 hover:text-black">
            Inspect in 3D →
          </Link>
        </div>
      </div>
    );
  };

  const eq = (list, offset) =>
    list.map((e, k) => (
      <Entry
        key={e.id}
        i={k}
        n={String(offset + k + 1).padStart(2, "0")}
        title={e.name}
        sub={e.category}
        note={e.note}
        src={`/images/thumbs/${e.id}.png`}
        href={`/archive/${e.id}`}
      />
    ));

  return [
    // 0 — front cover
    <Cover key="cover" />,

    // 1 — About L
    <Page key="ab1" title="Who is HEADHACKER?">
      <p className="font-type text-[1.5cqw] uppercase tracking-widest">A hacker with a camera for a head</p>
      <Hand>In the city, almost every street, office and building is watched by CCTV. Nothing moves unseen.</Hand>
      <Hand>Before HEADHACKER can act, he has to get inside those cameras first.</Hand>
      <Hand>That&apos;s why he wears the head of a CCTV: it is the very thing he has to take over.</Hand>
    </Page>,

    // 2 — About R
    <Page key="ab2" title="The city is watching">
      <Step n="01" title="Find the camera" text="City streets, offices, any building that has one." />
      <Step n="02" title="Hack it" text="Take over the feed before anyone notices." />
      <Step n="03" title="Move" text="Only then can the operation continue." />
    </Page>,

    // 3 — Equipment L
    <Page key="eq1" title="Equipment">{eq(equipment.slice(0, 3), 0)}</Page>,

    // 4 — Equipment R
    <Page key="eq2" title="">{eq(equipment.slice(3, 6), 3)}</Page>,

    // 5 — Field Notes L  (entries unlock as user discovers items)
    <Page key="fn1" title="Field Notes">
      {equipment.slice(0, 3).map((item, k) => fieldEntry(item, k))}
    </Page>,

    // 6 — Field Notes R
    <Page key="fn2" title="">
      {equipment.slice(3, 6).map((item, k) => fieldEntry(item, k + 3))}
    </Page>,

    // 7 — Places L
    <Page key="pl1" title="Places">
      <Entry i={0} n="01" fit="cover" title="The Hideout" sub="Exterior" note="Just another rundown apartment block. Nobody looks twice." src="/images/exterior.svg" />
      <Entry i={1} n="02" fit="cover" title="Main Room" sub="Operations" note="Where the watching happens." src="/images/room.jpg" href="/explore" />
      <Locked label="Bedroom" />
    </Page>,

    // 8 — Places R
    <Page key="pl2" title=""><Locked label="Bathroom" /><Locked label="Kitchen" /><Locked /></Page>,

    // 9 — Dev Log L
    <Page key="dev1" title="Development">
      <Hand>Built with Next.js, React Three Fiber and Tailwind.</Hand>
      <Hand>Models are made in Blender and shipped as GLB.</Hand>
      <Hand>Status: in development. More rooms, characters and environments are coming.</Hand>
    </Page>,

    // 10 — Dev Log R
    <Page key="dev2" title="Version Log">
      {[
        ["v0.1", "Main Room, equipment hotspots"],
        ["v0.2", "Equipment Archive, 3D viewer"],
        ["v0.3", "Discovery system, Journal unlock"],
        ["v0.4", "Characters, Terminal"],
        ["v1.0", "Full experience"],
      ].map(([v, t]) => (
        <div key={v} className="flex gap-[2cqw]">
          <span className="font-type text-[1.6cqw] text-black/40">{v}</span>
          <p className="font-hand text-[2cqw] text-black/75">{t}</p>
        </div>
      ))}
    </Page>,

    // 11 — end
    <Page key="end" title="To be continued">
      <Locked label="Characters" />
      <Locked label="Environment" />
    </Page>,
  ];
}
