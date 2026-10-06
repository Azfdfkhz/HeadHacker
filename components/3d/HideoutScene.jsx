"use client";
import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, ContactShadows, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { proceduralModels } from "./models";
import { sound } from "@/utils/sound";

// Camera focus target positions per object
const TARGET_MAP = {
  computer: { pos: [0, 1.6, 1.5], look: [0, 1.2, -0.2] },
  laptop: { pos: [-1.1, 1.3, 1.1], look: [-1.1, 0.9, 0] },
  flashdisk: { pos: [0.3, 1.15, 0.9], look: [0.3, 0.85, 0.25] },
  "handheld-hack": { pos: [1.0, 1.25, 1.0], look: [1.0, 0.9, 0.15] },
  radio: { pos: [1.4, 1.35, 0.7], look: [1.4, 0.95, -0.3] },
  backpack: { pos: [-1.4, 0.8, 1.6], look: [-1.4, 0.4, 0.5] },
};

const DEFAULT_CAM = { pos: [0, 2.3, 4.2], look: [0, 1.0, 0] };

function CameraRig({ selectedId, isInteracting }) {
  const currentLook = useRef(new THREE.Vector3(...DEFAULT_CAM.look));
  const currentPos = useRef(new THREE.Vector3(...DEFAULT_CAM.pos));

  useFrame((state, delta) => {
    if (isInteracting) return; // User is manually orbiting

    const targetConfig = (selectedId && TARGET_MAP[selectedId]) || DEFAULT_CAM;
    const destPos = new THREE.Vector3(...targetConfig.pos);
    const destLook = new THREE.Vector3(...targetConfig.look);

    // Subtle breathing drift when idle overview
    if (!selectedId) {
      destPos.x += Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
      destPos.y += Math.cos(state.clock.elapsedTime * 0.3) * 0.08;
    }

    currentPos.current.lerp(destPos, delta * 2.8);
    currentLook.current.lerp(destLook, delta * 3.2);

    state.camera.position.copy(currentPos.current);
    state.camera.lookAt(currentLook.current);
  });

  return null;
}

// Interactive 3D object wrapper
function InteractiveObject({
  id,
  name,
  category,
  position,
  rotation = [0, 0, 0],
  scale = 1,
  isSelected,
  isDiscovered,
  onSelect,
  children,
}) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef();

  useEffect(() => {
    if (hovered) sound.playHover();
  }, [hovered]);

  const handleClick = (e) => {
    e.stopPropagation();
    sound.playSelect();
    onSelect(id);
  };

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const targetScale = hovered || isSelected ? scale * 1.04 : scale;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 8);
  });

  return (
    <group
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      {children}

      {/* Floating 3D HUD Pin */}
      <Html
        position={[0, 0.45, 0]}
        center
        distanceFactor={6.5}
        zIndexRange={[40, 0]}
      >
        <div
          onClick={handleClick}
          className={`pointer-events-auto flex cursor-pointer items-center gap-1.5 whitespace-nowrap border px-2 py-1 font-mono text-[10px] transition-all duration-300 ${
            isSelected
              ? "border-accent bg-accent text-bg shadow-[0_0_12px_rgba(145,170,165,0.4)]"
              : hovered
              ? "border-accent bg-surface2/95 text-ink shadow-[0_0_8px_rgba(145,170,165,0.25)] scale-105"
              : "border-line bg-bg/85 text-mute opacity-80 hover:opacity-100"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isDiscovered ? "bg-accent" : "bg-mute animate-pulse"
            }`}
          />
          <span className="font-semibold uppercase tracking-wider">{name}</span>
          {isDiscovered && <span className="text-[9px] text-accent">✓</span>}
        </div>
      </Html>
    </group>
  );
}

// Surveillance Camera with blinking red LED
function SurveillanceCamera() {
  const ledRef = useRef();

  useFrame((state) => {
    if (ledRef.current) {
      const blink = Math.sin(state.clock.elapsedTime * 4) > 0.3;
      ledRef.current.intensity = blink ? 0.8 : 0.05;
    }
  });

  return (
    <group position={[2.6, 2.7, -1.8]} rotation={[0.4, -0.6, 0]}>
      {/* Wall mount */}
      <mesh position={[0, 0, -0.2]}>
        <cylinderGeometry args={[0.08, 0.08, 0.1, 12]} />
        <meshStandardMaterial color="#1a2024" metalness={0.7} roughness={0.4} />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.09, 0.3, 16]} />
        <meshStandardMaterial color="#2d373c" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Lens */}
      <mesh position={[0, 0, 0.26]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
        <meshStandardMaterial color="#0b1012" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Red LED */}
      <mesh position={[0.06, 0.06, 0.22]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshBasicMaterial color="#ff3333" />
      </mesh>
      <pointLight ref={ledRef} position={[0.06, 0.06, 0.24]} color="#ff2222" distance={0.8} />
    </group>
  );
}

// Room Architecture (Floor, Walls, Desk, Chair, Lamp)
function RoomEnvironment({ isDimmed }) {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 10]} />
        <meshStandardMaterial
          color={isDimmed ? "#0c1012" : "#141a1d"}
          roughness={0.65}
          metalness={0.2}
        />
      </mesh>

      {/* Grid line accent on floor */}
      <gridHelper args={[10, 20, "#1d262b", "#161d21"]} position={[0, 0.005, 0]} />

      {/* Back Wall */}
      <mesh position={[0, 2.5, -2.5]} receiveShadow>
        <planeGeometry args={[12, 5]} />
        <meshStandardMaterial
          color={isDimmed ? "#0e1316" : "#1a2226"}
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>

      {/* Baseboard */}
      <mesh position={[0, 0.08, -2.48]}>
        <boxGeometry args={[12, 0.16, 0.04]} />
        <meshStandardMaterial color="#0e1315" roughness={0.7} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-4.5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#161c20" roughness={0.9} />
      </mesh>

      {/* Conduit pipe on back wall */}
      <mesh position={[-2.2, 2.5, -2.46]}>
        <cylinderGeometry args={[0.025, 0.025, 5, 12]} />
        <meshStandardMaterial color="#2d383e" metalness={0.7} roughness={0.35} />
      </mesh>
      <mesh position={[2.2, 2.5, -2.46]}>
        <cylinderGeometry args={[0.025, 0.025, 5, 12]} />
        <meshStandardMaterial color="#2d383e" metalness={0.7} roughness={0.35} />
      </mesh>

      {/* Industrial Work Desk */}
      <group position={[0, 0, 0]}>
        {/* Tabletop */}
        <RoundedBox args={[3.4, 0.08, 1.5]} radius={0.02} smoothness={4} position={[0, 0.76, 0]}>
          <meshStandardMaterial color="#1c2428" roughness={0.45} metalness={0.4} />
        </RoundedBox>

        {/* Steel Legs */}
        {[-1.55, 1.55].map((x) =>
          [-0.6, 0.6].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, 0.36, z]}>
              <cylinderGeometry args={[0.03, 0.03, 0.72, 12]} />
              <meshStandardMaterial color="#111618" metalness={0.8} roughness={0.3} />
            </mesh>
          ))
        )}

        {/* Crossbar frame */}
        <mesh position={[0, 0.3, -0.6]}>
          <boxGeometry args={[3.1, 0.04, 0.04]} />
          <meshStandardMaterial color="#111618" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* Industrial Chair */}
      <group position={[0, 0, 1.1]} rotation={[0, Math.PI, 0]}>
        {/* Seat */}
        <RoundedBox args={[0.65, 0.08, 0.6]} radius={0.04} smoothness={3} position={[0, 0.48, 0]}>
          <meshStandardMaterial color="#161b1e" roughness={0.8} />
        </RoundedBox>
        {/* Backrest */}
        <RoundedBox args={[0.6, 0.6, 0.06]} radius={0.04} smoothness={3} position={[0, 0.85, 0.28]}>
          <meshStandardMaterial color="#161b1e" roughness={0.8} />
        </RoundedBox>
        {/* Stem & Base */}
        <mesh position={[0, 0.24, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.44, 12]} />
          <meshStandardMaterial color="#0e1214" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Surveillance Camera */}
      <SurveillanceCamera />

      {/* Desk Lamp Prop */}
      <group position={[-1.4, 0.8, -0.45]} rotation={[0, 0.4, 0]}>
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.03, 16]} />
          <meshStandardMaterial color="#222b30" metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.55, 8]} />
          <meshStandardMaterial color="#182024" metalness={0.7} />
        </mesh>
        <mesh position={[0.15, 0.55, 0.1]} rotation={[-0.5, 0, -0.3]}>
          <coneGeometry args={[0.1, 0.18, 16]} />
          <meshStandardMaterial color="#2d383e" metalness={0.5} roughness={0.3} />
        </mesh>
        {/* Warm focused lamp light */}
        <spotLight
          position={[0.2, 0.55, 0.1]}
          target-position={[0, 0.76, 0]}
          color="#dbe6e4"
          intensity={1.8}
          angle={0.65}
          penumbra={0.7}
          distance={4}
          castShadow
        />
      </group>

      {/* Subtle floor contact shadow */}
      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.5}
        scale={8}
        blur={2}
        far={2}
        resolution={512}
      />
    </group>
  );
}

export default function HideoutScene({
  equipmentList,
  selectedId,
  isDiscovered,
  onSelectObject,
}) {
  const [isInteracting, setIsInteracting] = useState(false);
  const controlsRef = useRef();

  // Reset camera view button
  const handleResetCamera = () => {
    onSelectObject(null);
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const isDimmed = Boolean(selectedId);

  return (
    <div className="relative h-full w-full bg-[#101416]">
      <Canvas
        camera={{ position: DEFAULT_CAM.pos, fov: 42, near: 0.1, far: 50 }}
        dpr={[1, 1.5]}
        shadows
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMappingExposure: 1.05,
        }}
        onPointerDown={() => setIsInteracting(true)}
      >
        <ambientLight intensity={isDimmed ? 0.35 : 0.65} color="#8a9ea5" />
        <directionalLight
          position={[3, 5, 4]}
          intensity={isDimmed ? 0.7 : 1.2}
          color="#cfdcd9"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-3, 2, -2]} intensity={0.3} color="#455e69" />

        <CameraRig selectedId={selectedId} isInteracting={isInteracting} />

        <Suspense fallback={null}>
          <RoomEnvironment isDimmed={isDimmed} />

          {/* --- 1. Computer Workstation (Center Desk) --- */}
          <InteractiveObject
            id="computer"
            name="Computer"
            category="Workstation"
            position={[0, 0.8, -0.15]}
            rotation={[0, 0, 0]}
            scale={0.55}
            isSelected={selectedId === "computer"}
            isDiscovered={isDiscovered("computer")}
            onSelect={onSelectObject}
          >
            {proceduralModels.computer && <proceduralModels.computer />}
          </InteractiveObject>

          {/* --- 2. Laptop (Left Desk) --- */}
          <InteractiveObject
            id="laptop"
            name="Laptop"
            category="Portable"
            position={[-1.0, 0.8, 0.05]}
            rotation={[0, 0.3, 0]}
            scale={0.5}
            isSelected={selectedId === "laptop"}
            isDiscovered={isDiscovered("laptop")}
            onSelect={onSelectObject}
          >
            {proceduralModels.laptop && <proceduralModels.laptop />}
          </InteractiveObject>

          {/* --- 3. Flashdisk (Front Desk) --- */}
          <InteractiveObject
            id="flashdisk"
            name="Flashdisk"
            category="Storage"
            position={[0.32, 0.81, 0.28]}
            rotation={[0, -0.4, 0]}
            scale={0.4}
            isSelected={selectedId === "flashdisk"}
            isDiscovered={isDiscovered("flashdisk")}
            onSelect={onSelectObject}
          >
            {proceduralModels.flashdisk && <proceduralModels.flashdisk />}
          </InteractiveObject>

          {/* --- 4. Handheld Hack (Right Desk) --- */}
          <InteractiveObject
            id="handheld-hack"
            name="Handheld Hack"
            category="Field Device"
            position={[0.95, 0.82, 0.15]}
            rotation={[-Math.PI / 2, 0, -0.3]}
            scale={0.35}
            isSelected={selectedId === "handheld-hack"}
            isDiscovered={isDiscovered("handheld-hack")}
            onSelect={onSelectObject}
          >
            {proceduralModels.handheld && <proceduralModels.handheld />}
          </InteractiveObject>

          {/* --- 5. Radio (Right Rear Desk) --- */}
          <InteractiveObject
            id="radio"
            name="Radio"
            category="Communication"
            position={[1.35, 0.82, -0.3]}
            rotation={[0, -0.5, 0]}
            scale={0.4}
            isSelected={selectedId === "radio"}
            isDiscovered={isDiscovered("radio")}
            onSelect={onSelectObject}
          >
            {proceduralModels.radio && <proceduralModels.radio />}
          </InteractiveObject>

          {/* --- 6. Backpack (Floor, Left of Chair) --- */}
          <InteractiveObject
            id="backpack"
            name="Backpack"
            category="Carry Gear"
            position={[-1.35, 0.35, 0.6]}
            rotation={[0.1, 0.6, -0.1]}
            scale={0.5}
            isSelected={selectedId === "backpack"}
            isDiscovered={isDiscovered("backpack")}
            onSelect={onSelectObject}
          >
            {proceduralModels.backpack && <proceduralModels.backpack />}
          </InteractiveObject>
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableDamping
          dampingFactor={0.06}
          minDistance={1.8}
          maxDistance={5.8}
          maxPolarAngle={Math.PI / 2 - 0.05} // don't go below floor
          minPolarAngle={0.3}
          onStart={() => setIsInteracting(true)}
          onEnd={() => setTimeout(() => setIsInteracting(false), 2500)}
        />
      </Canvas>

      {/* Room Controls Overlay */}
      <div className="pointer-events-none absolute bottom-4 right-4 z-20 flex gap-2">
        {selectedId && (
          <button
            type="button"
            onClick={handleResetCamera}
            className="pointer-events-auto border border-line bg-surface/90 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-ink backdrop-blur-sm transition hover:border-accent hover:text-accent"
          >
            Reset View
          </button>
        )}
      </div>
    </div>
  );
}
