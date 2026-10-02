import Link from "next/link";

const base =
  "inline-flex items-center gap-3 border border-accent/70 px-6 py-3 text-sm tracking-wider text-ink transition hover:bg-accent/10 hover:border-accent";

export default function Button({ href, onClick, children, className = "" }) {
  if (href) return <Link href={href} className={`${base} ${className}`}>{children}</Link>;
  return <button onClick={onClick} className={`${base} ${className}`}>{children}</button>;
}
