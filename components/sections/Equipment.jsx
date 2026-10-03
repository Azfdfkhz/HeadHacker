import { equipment } from "@/data/equipment";
import ObjectCard from "@/components/ui/ObjectCard";

const tabs = ["Equipment", "Environment", "Characters"];

export default function Equipment() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 pb-20 pt-28">
      <header className="border-b border-line pb-5">
        <div className="flex gap-8 text-sm">
          {tabs.map((tab, i) => (
            <span key={tab} className={`pb-3 ${i === 0 ? "border-b border-accent text-accent" : "text-mute"}`}>{tab}{i > 0 && <sup className="ml-1 text-[10px] uppercase tracking-wider">soon</sup>}</span>
          ))}
        </div>
      </header>
      <div className="mt-10 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-mute">Archive / 01</p>
          <h1 className="mt-2 text-3xl tracking-tight text-accent">Equipment</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-mute">Equipment that supports operations inside the HEADHACKER world.</p>
        </div>
        <p className="font-mono text-sm text-mute">{String(equipment.length).padStart(2, "0")} ITEMS</p>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {equipment.map((item, i) => <ObjectCard key={item.id} item={item} index={i} />)}
      </div>
    </main>
  );
}
