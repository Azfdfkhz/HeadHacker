/**
 * useWebGLSupport — checks if the browser can create a WebGL2 or WebGL context.
 *
 * Returns:
 *   null       — still checking (SSR or initial render)
 *   true       — WebGL is available
 *   false      — WebGL is not available
 */
"use client";
import { useEffect, useState } from "react";

export function useWebGLSupport() {
  const [supported, setSupported] = useState(null);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setSupported(!!gl);
    } catch {
      setSupported(false);
    }
  }, []);

  return supported;
}
