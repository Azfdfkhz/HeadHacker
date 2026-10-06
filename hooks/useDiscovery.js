/**
 * useDiscovery — manages the set of discovered equipment IDs.
 *
 * Persisted to localStorage so discovery survives page refreshes.
 * Returns helpers consumed by Hideout, ItemDetail, Archive, Journal.
 */
"use client";
import { useCallback, useEffect, useState } from "react";

const KEY = "hh_discovered_v1";

function load() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save(ids) {
  try { window.localStorage.setItem(KEY, JSON.stringify(ids)); } catch { /* quota / private mode */ }
}

export function useDiscovery() {
  const [discovered, setDiscovered] = useState([]); // array of id strings

  // hydrate from localStorage once on client
  useEffect(() => { setDiscovered(load()); }, []);

  const discover = useCallback((id) => {
    setDiscovered((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      save(next);
      return next;
    });
  }, []);

  const isDiscovered = useCallback((id) => discovered.includes(id), [discovered]);

  const reset = useCallback(() => { setDiscovered([]); save([]); }, []);

  return { discovered, discover, isDiscovered, reset };
}
