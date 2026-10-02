import { equipment } from "@/data/equipment";
import ObjectCard from "@/components/ui/ObjectCard";

const tabs = ["Equipment", "Environment", "Characters"]; // hanya Equipment yang aktif (MVP)

export default function Equipment() {
  return (
    <section className="mx-auto min-h-screen max-w-6xl px-6 pb-16 pt-28">
      <div className="flex gap-8 border-b border-line text-sm">
        {tabs.map((t, i) => (
          <span key={t} className={`pb-3 ${i === 0 ? "border-b border-accent text-accent" : "text-mute/50"}`}>{t}</span>
        ))}
      </div>
      <h1 className="mt-8 text-2xl text-accent">Equipment</h1>
      <p className="mt-1 text-xs text-mute">Peralatan yang mendukung operasi.</p>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {equipment.map((item, i) => <ObjectCard key={item.id} item={item} index={i} />)}
      </div>
    </section>
  );
}
