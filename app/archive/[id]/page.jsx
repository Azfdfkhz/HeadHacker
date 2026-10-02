import { notFound } from "next/navigation";
import { equipment, getEquipment } from "@/data/equipment";
import ItemDetail from "@/components/sections/ItemDetail";

export function generateStaticParams() { return equipment.map((e) => ({ id: e.id })); }

export default function ArchiveItem({ params }) {
  const item = getEquipment(params.id);
  if (!item) notFound();
  const index = equipment.indexOf(item);
  const total = equipment.length;
  return (
    <ItemDetail
      item={item}
      index={index}
      total={total}
      prevId={equipment[(index - 1 + total) % total].id}
      nextId={equipment[(index + 1) % total].id}
    />
  );
}
