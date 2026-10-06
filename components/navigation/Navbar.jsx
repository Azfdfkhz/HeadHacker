"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDiscoveryContext } from "@/context/DiscoveryContext";
import { equipment } from "@/data/equipment";

const links = [["Home", "/"], ["Archive", "/archive"], ["Journal", "/journal"], ["About", "/about"]];

export default function Navbar() {
  const path = usePathname();
  const { discovered } = useDiscoveryContext();

  if (path.startsWith("/archive/")) return null; // detail page has its own header
  const solid = path !== "/";
  const showLinks = path !== "/explore";

  const discoveredCount = discovered.length;
  const total = equipment.filter((e) => !e.comingSoon).length; // only items with models count

  return (
    <header
      className={`absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-5 sm:px-8 ${solid ? "" : "text-ink"}`}
    >
      <Link href="/" className="flex items-center gap-3 font-mono text-sm tracking-[0.3em]">
        <span className="text-lg italic">//</span> HEADHACKER
      </Link>

      <div className="flex items-center gap-4">
        {showLinks && (
          <nav className="flex gap-2 text-sm" aria-label="Main navigation">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                aria-current={path === href ? "page" : undefined}
                className={`px-3 py-2 transition hover:text-accent ${path === href ? "text-accent" : ""}`}
              >
                {label}
              </Link>
            ))}
          </nav>
        )}

        {/* System status indicator */}
        <div className="hidden items-center gap-2 border border-line bg-surface/80 px-3 py-1.5 text-xs sm:flex">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" aria-hidden="true" />
          <span className="font-mono tracking-widest text-mute">
            {discoveredCount > 0
              ? `${String(discoveredCount).padStart(2, "0")}/${String(total).padStart(2, "0")} FOUND`
              : "SYSTEM ONLINE"}
          </span>
        </div>
      </div>
    </header>
  );
}
