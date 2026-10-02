"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [["Home", "/"], ["Archive", "/archive"], ["About", "/about"]];

export default function Navbar() {
  const path = usePathname();
  if (path.startsWith("/archive/")) return null; // halaman detail punya header sendiri
  const solid = path !== "/"; // di landing, navbar transparan di atas gambar
  const showLinks = path !== "/explore";
  return (
    <header className={`absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-5 sm:px-8 ${solid ? "" : "text-ink"}`}>
      <Link href="/" className="flex items-center gap-3 font-mono text-sm tracking-[0.3em]">
        <span className="text-lg italic">//</span> HEADHACKER
      </Link>
      {showLinks && (
        <nav className="flex gap-6 text-xs">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className={`transition hover:text-accent ${path === href ? "text-accent" : ""}`}>{label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}
