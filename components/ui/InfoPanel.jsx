export default function InfoPanel({ item, index, total, children }) {
  const rows = [["Type", item.type], ["Status", item.status], ["Location", item.location]];
  return (
    <aside className="flex flex-col justify-center border-t border-line p-8 lg:border-l lg:border-t-0">
      <div className="flex justify-between text-xs uppercase tracking-widest text-mute">
        <span>{item.category}</span>
        <span className="font-mono">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
      </div>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-accent">{item.name}</h1>
      <p className="mt-4 max-w-sm text-base leading-relaxed text-ink/90">{item.description}</p>
      <dl className="mt-8 space-y-2 border-t border-line pt-6 text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="flex gap-6"><dt className="w-20 text-mute">{k}</dt><dd>: {v}</dd></div>
        ))}
      </dl>
      <div className="mt-8">{children}</div>
    </aside>
  );
}
