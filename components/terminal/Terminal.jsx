"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Terminal — interactive CLI easter egg / lore device.
 *
 * Simulates a HEADHACKER system terminal. Supports a small set
 * of commands; includes a secret password for ACCESS GRANTED.
 *
 * Rendered as an overlay modal, triggered by clicking the Computer
 * item a second time (after it's already discovered).
 */

const SECRET_PASSWORD = "0x2F4A3D"; // the hidden access code

const BOOT_LINES = [
  "> HEADHACKER TERMINAL v2.1.4",
  "> Booting system...",
  "> Initializing subsystems...",
  "> Scanning network... 12 devices detected",
  "> Firewall active",
  "> ─────────────────────────────────",
  "> ACCESS REQUIRED",
  "> Type HELP for commands",
];

const COMMANDS = {
  help: () => [
    "> Available commands:",
    ">   STATUS     — system status",
    ">   SCAN       — network scan",
    ">   LOG        — access log",
    ">   CLEAR      — clear screen",
    ">   EXIT       — close terminal",
    ">   [password] — attempt access",
  ],
  status: () => [
    "> SYSTEM STATUS",
    "> ─────────────",
    "> CPU          [████████░░] 78%",
    "> MEMORY       [███████░░░] 64%",
    "> NETWORK      CONNECTED",
    "> FIREWALL     ACTIVE",
    "> UPTIME       14d 07h 23m",
  ],
  scan: () => [
    "> Scanning local network...",
    "> 192.168.1.1   ROUTER     [SECURE]",
    "> 192.168.1.24  WORKSTATION [LOCAL]",
    "> 192.168.1.89  UNKNOWN    [MONITORING]",
    "> 12 devices detected. 3 flagged.",
  ],
  log: () => [
    "> ACCESS LOG",
    "> ──────────",
    "> [2026-10-03 02:14] ACCESS DENIED — 3 attempts",
    "> [2026-10-03 08:47] SCAN COMPLETE",
    "> [2026-10-04 23:58] SYSTEM ALERT: Unknown device",
    "> [2026-10-05 11:18] TERMINAL OPENED",
  ],
  clear: () => null, // special: clears screen
  exit: () => "__EXIT__",
  [SECRET_PASSWORD.toLowerCase()]: () => [
    "> ─────────────────────────────────",
    "> ACCESS GRANTED",
    "> WELCOME BACK, OPERATOR",
    "> ─────────────────────────────────",
    "> Loading classified files...",
    "> SECTOR 7 UNLOCKED",
    "> OPERATION: SILENT WATCH — ACTIVE",
    "> ─────────────────────────────────",
    "> SECRET ENTRY UNLOCKED: The password was found.",
  ],
};

function processCommand(raw) {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return ["> "];
  const fn = COMMANDS[cmd];
  if (fn) return fn();
  // Wrong password attempt
  if (cmd.length > 3) {
    return [
      `> $ ${raw.toUpperCase()}`,
      "> ACCESS DENIED",
      "> Incorrect credentials. Attempt logged.",
    ];
  }
  return [`> $ ${raw}`, `> Unknown command: ${raw}. Type HELP.`];
}

export default function Terminal({ onClose }) {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [booted, setBooted] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Boot sequence — print lines one by one
  useEffect(() => {
    let i = 0;
    const tick = () => {
      if (i < BOOT_LINES.length) {
        setLines((prev) => [...prev, BOOT_LINES[i]]);
        i++;
        setTimeout(tick, 90);
      } else {
        setBooted(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    };
    const t = setTimeout(tick, 300);
    return () => clearTimeout(t);
  }, []);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  // ESC closes
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = () => {
    if (!input.trim()) return;
    const cmd = input.trim();
    setHistory((h) => [cmd, ...h]);
    setHistIdx(-1);

    const result = processCommand(cmd);
    if (result === "__EXIT__") { onClose(); return; }
    if (result === null) { setLines([]); setInput(""); return; } // CLEAR
    setLines((prev) => [...prev, `> $ ${cmd}`, ...result, ">"]);
    setInput("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") { submit(); return; }
    if (e.key === "ArrowUp") {
      const idx = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(idx);
      setInput(history[idx] || "");
    }
    if (e.key === "ArrowDown") {
      const idx = Math.max(histIdx - 1, -1);
      setHistIdx(idx);
      setInput(idx === -1 ? "" : history[idx]);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/90 p-4 backdrop-blur-sm"
      role="dialog"
      aria-label="HEADHACKER Terminal"
      aria-modal="true"
    >
      <div className="flex h-[min(500px,85vh)] w-full max-w-2xl flex-col border border-accent/40 bg-[#080c0e] shadow-2xl">
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-line px-4 py-2">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
            ▶ HEADHACKER TERMINAL
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close terminal"
            className="px-2 font-mono text-mute hover:text-ink"
          >
            ✕
          </button>
        </div>

        {/* Output */}
        <div
          className="flex-1 overflow-y-auto px-4 py-3"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line, i) => (
            <p
              key={i}
              className={`font-mono text-xs leading-relaxed ${
                line.includes("ACCESS GRANTED")
                  ? "text-accent"
                  : line.includes("ACCESS DENIED") || line.includes("ALERT")
                  ? "text-red-500/80"
                  : line.includes("SECRET")
                  ? "text-amber-500/90"
                  : line.startsWith("> $")
                  ? "text-ink/60"
                  : "text-mute"
              }`}
            >
              {line}
            </p>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        {booted && (
          <div className="flex items-center border-t border-line px-4 py-3">
            <span className="mr-2 font-mono text-xs text-accent">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              className="flex-1 bg-transparent font-mono text-xs uppercase tracking-[0.1em] text-ink caret-accent outline-none placeholder:text-mute/40"
              placeholder="Enter command..."
              autoComplete="off"
              spellCheck={false}
              aria-label="Terminal input"
            />
          </div>
        )}
      </div>

      <p className="absolute bottom-6 left-0 right-0 text-center font-mono text-[10px] uppercase tracking-widest text-mute">
        Press ESC to close · Type HELP for commands
      </p>
    </div>
  );
}
