import Link from "next/link";

const base = "inline-flex items-center gap-3 border border-accent/70 px-6 py-3 text-sm tracking-wider text-ink transition hover:bg-accent/10 hover:border-accent";

export default function Button({ href, onClick, children, className = "", type = "button", disabled = false }) {
  const classes = `${base} ${disabled ? "cursor-not-allowed opacity-50" : ""} ${className}`;
  if (href) return <Link href={href} className={classes}>{children}</Link>;
  return <button type={type} onClick={onClick} disabled={disabled} className={classes}>{children}</button>;
}
