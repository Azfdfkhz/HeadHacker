/**
 * DiscoveryContext — provides discovery state globally so any component
 * (Hideout HUD, ItemDetail, Archive, Journal) can read/write without prop-drilling.
 *
 * Usage:
 *   const { discovered, discover, isDiscovered } = useDiscoveryContext();
 */
"use client";
import { createContext, useContext } from "react";
import { useDiscovery } from "@/hooks/useDiscovery";

const Ctx = createContext(null);

export function DiscoveryProvider({ children }) {
  const value = useDiscovery();
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useDiscoveryContext() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useDiscoveryContext must be used inside <DiscoveryProvider>");
  return ctx;
}
