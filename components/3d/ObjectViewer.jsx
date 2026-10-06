"use client";
import { Component, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box3, Vector3 } from "three";
import { Canvas } from "@react-three/fiber";
import { Center, ContactShadows, Environment, Html, Lightformer, OrbitControls, useGLTF } from "@react-three/drei";
import { materialOverrides } from "./textures";
import { proceduralModels } from "./models";

// ── Helpers ─────────────────────────────────────────────────────────────────

function GLBModel({ url, id }) {
  const { scene } = useGLTF(url);
  useEffect(() => {
    const overrides = materialOverrides[id];
    scene.traverse((o) => {
      if (!o.isMesh) return;
      o.castShadow = true;
      o.receiveShadow = true;
      if (!overrides) return;
      (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => overrides[m.name]?.(m));
    });
  }, [scene, id]);
  const scale = useMemo(() => {
    const size = new Box3().setFromObject(scene).getSize(new Vector3());
    return 2.5 / (Math.max(size.x, size.y, size.z) || 1);
  }, [scene]);
  return <primitive object={scene} scale={scale} />;
}

class ModelBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

function Placeholder({ dims = [1, 1, 1] }) {
  return (
    <mesh>
      <boxGeometry args={dims} />
      <meshStandardMaterial color="#2d383d" roughness={0.55} metalness={0.35} />
    </mesh>
  );
}

// ── Loading state (shown while Canvas initialises or GLB streams) ────────────
function ModelLoading({ name }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 bg-[radial-gradient(ellipse_at_50%_45%,#2b373c_0%,#182024_55%,#101416_100%)]">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-mute">Loading Object</p>
      <p className="font-mono text-sm tracking-widest text-ink">{name?.toUpperCase()}</p>
      <div className="h-px w-32 overflow-hidden bg-line">
        <div className="h-full animate-[shimmer_1.4s_ease-in-out_infinite] bg-accent" style={{ transformOrigin: "left" }} />
      </div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-mute">Initializing model</p>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function ObjectViewer({ item }) {
  const controls = useRef();
  const [auto, setAuto] = useState(true);
  const [size, setSize] = useState(null);
  const [showAnn, setShowAnn] = useState(true);
  const [sel, setSel] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const notes = item.annotations || [];

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const onCentered = useCallback(({ width, height, depth }) => {
    setFloorY(-height / 2);
    setSize((s) => (s && s[0] === width && s[1] === height && s[2] === depth ? s : [width, height, depth]));
  }, []);

  const [floorY, setFloorY] = useState(-1.05);
  const Procedural = proceduralModels[item.id];
  const fallback = Procedural ? <Procedural /> : <Placeholder dims={item.dims} />;

  return (
    <div className="relative h-full w-full cursor-grab bg-[radial-gradient(ellipse_at_50%_45%,#2b373c_0%,#182024_55%,#101416_100%)] active:cursor-grabbing">
      <Canvas
        camera={{ position: [3.2, 2.2, 4.6], fov: 34, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        shadows
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance", toneMappingExposure: 1.05 }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 3]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-0.0002} />
        <directionalLight position={[-4, 2, -3]} intensity={0.5} color="#91AAA5" />
        <ContactShadows position={[0, floorY - 0.02, 0]} opacity={0.32} scale={5} blur={2.5} far={3} resolution={256} />
        <Environment resolution={256}>
          <Lightformer intensity={2} position={[0, 5, -5]} scale={[10, 5, 1]} />
          <Lightformer intensity={1.2} position={[-5, 1, 3]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} />
          <Lightformer intensity={1} position={[5, 2, 3]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} />
        </Environment>
        <Suspense fallback={<Placeholder dims={item.dims} />}>
          <Center onCentered={onCentered}>
            {item.hasModel ? (
              <ModelBoundary fallback={fallback}>
                <GLBModel url={item.model} id={item.id} />
              </ModelBoundary>
            ) : (
              fallback
            )}
          </Center>
        </Suspense>

        {/* Annotation markers */}
        {showAnn && size && notes.map((a, i) => (
          <Html key={a.label} position={a.at.map((v, k) => (v - 0.5) * size[k])} center zIndexRange={[20, 0]}>
            <button
              type="button"
              aria-label={a.label}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => { setSel(i); setAuto(false); }}
              className={`grid h-7 w-7 place-items-center rounded-full border text-xs transition ${sel === i ? "border-accent bg-accent text-bg" : "border-accent bg-bg/70 text-ink hover:bg-accent hover:text-bg"}`}
            >
              {i + 1}
            </button>
          </Html>
        ))}

        <OrbitControls
          ref={controls}
          enablePan={false}
          enableDamping
          minDistance={2.5}
          maxDistance={9}
          autoRotate={auto}
          autoRotateSpeed={1.2}
          onStart={() => setAuto(false)}
        />
      </Canvas>

      {/* Annotation tooltip */}
      {showAnn && sel !== null && notes[sel] && (
        <div className="absolute bottom-20 left-6 w-72 max-w-[calc(100%-3rem)] animate-fadein border border-accent/60 bg-surface2/95 p-4">
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs uppercase tracking-widest text-mute">
              ① {String(sel + 1).padStart(2, "0")} / {String(notes.length).padStart(2, "0")}
            </p>
            <button type="button" onClick={() => setSel(null)} aria-label="Close annotation" className="px-1 text-mute hover:text-ink">✕</button>
          </div>
          <h3 className="mt-1 text-base text-accent">{notes[sel].label}</h3>
          <p className="mt-1 text-sm leading-relaxed text-ink/90">{notes[sel].text}</p>
        </div>
      )}

      {/* Annotation index (when panel is closed) */}
      {showAnn && sel === null && notes.length > 0 && (
        <div className="absolute bottom-20 left-6 flex gap-2">
          {notes.map((a, i) => (
            <button
              key={a.label}
              type="button"
              onClick={() => { setSel(i); setAuto(false); }}
              className="border border-accent/40 bg-bg/70 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-mute transition hover:border-accent hover:text-ink"
              aria-label={`View annotation: ${a.label}`}
            >
              {i + 1} {a.label}
            </button>
          ))}
        </div>
      )}

      {/* Controls hint + action buttons */}
      <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-4 text-sm text-mute">
        <span className="font-mono text-[11px] tracking-widest">
          {isMobile ? "DRAG TO ROTATE · PINCH TO ZOOM" : "DRAG TO ROTATE · SCROLL TO ZOOM"}
          {notes.length > 0 && " · TAP MARKER"}
        </span>
        {notes.length > 0 && (
          <button
            onClick={() => { setShowAnn((v) => !v); setSel(null); }}
            aria-pressed={showAnn}
            className="border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition hover:border-accent hover:text-ink"
          >
            Notes {showAnn ? "ON" : "OFF"}
          </button>
        )}
        <button
          onClick={() => { controls.current?.reset(); setAuto(true); }}
          className="border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition hover:border-accent hover:text-ink"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
