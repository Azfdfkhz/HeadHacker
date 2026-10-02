"use client";
import { useState } from "react";

// Gambar dengan fallback: kalau file belum ada, tampil gradient gelap saja.
export default function SceneImage({ src, alt = "", className = "", style }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} style={style} className={className} onError={() => setFailed(true)} />;
}
