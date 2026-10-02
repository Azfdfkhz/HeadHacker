"use client";
import { Component, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Box3, Vector3 } from "three";
import { Canvas } from "@react-three/fiber";
import { Center, ContactShadows, Environment, Lightformer, OrbitControls, useGLTF } from "@react-three/drei";
import { materialOverrides } from "./textures";
import { proceduralModels } from "./models";

// Skala otomatis: model dari Blender bisa berukuran apa saja
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

// Kalau file GLB belum ada / gagal dimuat, tampilkan placeholder (halaman tidak crash)
class ModelBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

// Placeholder sampai file GLB tersedia
function Placeholder({ dims = [1, 1, 1] }) {
  return (
    <mesh>
      <boxGeometry args={dims} />
      <meshStandardMaterial color="#2d383d" roughness={0.55} metalness={0.35} />
    </mesh>
  );
}

export default function ObjectViewer({ item }) {
  const controls = useRef();
  const [auto, setAuto] = useState(true); // putar pelan sampai user menyentuh
  const Procedural = proceduralModels[item.id];
  const fallback = Procedural ? <Procedural /> : <Placeholder dims={item.dims} />;
  return (
    <div className="relative h-full w-full cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [3.2, 2.2, 4.6], fov: 34, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        shadows
        gl={{ antialias: true, powerPreference: "high-performance", toneMappingExposure: 1.05 }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 3]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-0.0002} />
        <directionalLight position={[-4, 2, -3]} intensity={0.5} color="#91AAA5" />
        <ContactShadows position={[0, -1.05, 0]} opacity={0.32} scale={5} blur={2.5} far={3} resolution={256} />
        <Environment resolution={256}>
          <Lightformer intensity={2} position={[0, 5, -5]} scale={[10, 5, 1]} />
          <Lightformer intensity={1.2} position={[-5, 1, 3]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} />
          <Lightformer intensity={1} position={[5, 2, 3]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} />
        </Environment>
        <Suspense fallback={<Placeholder dims={item.dims} />}>
          <Center>
            {item.hasModel ? (
              <ModelBoundary fallback={fallback}>
                <GLBModel url={item.model} id={item.id} />
              </ModelBoundary>
            ) : (
              fallback
            )}
          </Center>
        </Suspense>
        <OrbitControls ref={controls} enablePan={false} enableDamping minDistance={2.5} maxDistance={9} autoRotate={auto} autoRotateSpeed={1.2} onStart={() => setAuto(false)} />
      </Canvas>
      <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-4 text-xs text-mute">
        <span>Drag untuk memutar · Scroll untuk zoom</span>
        <button onClick={() => { controls.current?.reset(); setAuto(true); }} className="border border-line px-3 py-1 transition hover:border-accent hover:text-ink">Reset</button>
      </div>
    </div>
  );
}


["/models/laptop.glb", "/models/flashdisk.glb", "/models/computer.glb", "/models/handheld-hack.glb", "/models/radio.glb", "/models/backpack.glb"].forEach(useGLTF.preload);
