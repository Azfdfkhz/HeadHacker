"use client";
import { useState } from "react";

export default function SceneImage({ src, alt = "", className = "", style, loading = "lazy", decoding = "async" }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} style={style} className={className} loading={loading} decoding={decoding} onError={() => setFailed(true)} />;
}
