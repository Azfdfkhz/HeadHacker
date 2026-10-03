import Link from "next/link";

const base = "inline-flex items-center gap-3 border border-accent/70 px-6 py-3 text-sm tracking-wider text-ink transition hover:bg-accent/10 hover:border-accent";

const primaryCls = "inline-flex items-center gap-3 border border-accent bg-accent px-6 py-3 text-sm font-medium tracking-wider text-bg transition hover:border-ink hover:bg-ink";

export default function Button({ primary = false, href, onClick, children, className = "", type = "button", disabled = false }) {
  const classes = `${primary ? primaryCls : base} ${disabled ? "cursor-not-allowed opacity-50" : ""} ${className}`;
  if (href) return <Link href={href} className={classes}>{children}</Link>;
  return <button type={type} onClick={onClick} disabled={disabled} className={classes}>{children}</button>;
}
