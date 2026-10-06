"use client";
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { sound } from "@/utils/sound";

// Camera trajectory during sequence
// Stage 0: Street view [0, 1.8, 9] looking at building [0, 2.5, 0]
// Stage 1: Approach building [1.2, 1.4, 4.5] looking at door [1.2, 1.1, 0]
// Stage 2: Approach entrance [1.2, 1.2, 1.8]
// Stage 3: Inside threshold [1.2, 1.1, 0.4] -> fade to dark
function CinematicCamera({ entering, onDoorOpen, onComplete }) {
  const currentPos = useRef(new THREE.Vector3(0, 1.8, 8.5));
  const currentLook = useRef(new THREE.Vector3(0, 2.2, 0));
  const startTime = useRef(null);
  const doorTriggered = useRef(false);

  useFrame((state, delta) => {
    if (!entering) {
      // Idle gentle float
      const t = state.clock.elapsedTime * 0.4;
      const targetX = Math.sin(t) * 0.4;
      const targetY = 1.8 + Math.cos(t * 0.8) * 0.15;
      currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, targetX, delta * 2);
      currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, targetY, delta * 2);
      currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, 8.5, delta * 2);

      state.camera.position.copy(currentPos.current);
      state.camera.lookAt(currentLook.current);
      return;
    }

    if (!startTime.current) {
      startTime.current = state.clock.elapsedTime;
    }

    const elapsed = state.clock.elapsedTime - startTime.current;

    // Timeline:
    // 0 - 2.8s: Approach building
    // 2.8 - 4.5s: Approach door & door opens
    // 4.5 - 6.0s: Step through door
    let targetPos, targetLook;

    if (elapsed < 2.8) {
      const progress = elapsed / 2.8;
      targetPos = new THREE.Vector3(
        THREE.MathUtils.lerp(0, 1.2, progress),
        THREE.MathUtils.lerp(1.8, 1.35, progress),
        THREE.MathUtils.lerp(8.5, 4.2, progress)
      );
      targetLook = new THREE.Vector3(
        THREE.MathUtils.lerp(0, 1.2, progress),
        THREE.MathUtils.lerp(2.2, 1.2, progress),
        0
      );
    } else if (elapsed < 4.5) {
      if (!doorTriggered.current) {
        doorTriggered.current = true;
        onDoorOpen?.();
      }
      const progress = (elapsed - 2.8) / 1.7;
      targetPos = new THREE.Vector3(
        1.2,
        THREE.MathUtils.lerp(1.35, 1.18, progress),
        THREE.MathUtils.lerp(4.2, 1.6, progress)
      );
      targetLook = new THREE.Vector3(1.2, 1.15, -0.5);
    } else {
      const progress = Math.min((elapsed - 4.5) / 1.5, 1);
      targetPos = new THREE.Vector3(1.2, 1.15, THREE.MathUtils.lerp(1.6, 0.2, progress));
      targetLook = new THREE.Vector3(1.2, 1.15, -1.5);
      if (progress >= 1 && onComplete) {
        onComplete();
      }
    }

    currentPos.current.lerp(targetPos, delta * 4);
    currentLook.current.lerp(targetLook, delta * 4);

    state.camera.position.copy(currentPos.current);
    state.camera.lookAt(currentLook.current);
  });

  return null;
}

// 3D Building Exterior Model
function ExteriorBuilding({ doorOpen }) {
  const doorRef = useRef();

  useFrame((_, delta) => {
    if (doorRef.current) {
      const targetAngle = doorOpen ? -Math.PI * 0.45 : 0;
      doorRef.current.rotation.y = THREE.MathUtils.lerp(
        doorRef.current.rotation.y,
        targetAngle,
        delta * 3.5
      );
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Street ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 4]} receiveShadow>
        <planeGeometry args={[30, 20]} />
        <meshStandardMaterial color="#0c1012" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Sidewalk pavement */}
      <RoundedBox args={[14, 0.15, 2.8]} radius={0.02} smoothness={2} position={[0, 0.07, 1.4]} receiveShadow>
        <meshStandardMaterial color="#1a2226" roughness={0.7} metalness={0.1} />
      </RoundedBox>

      {/* Main Apartment / Hideout Building Volume */}
      <mesh position={[0, 4, -1.8]} receiveShadow>
        <boxGeometry args={[12, 8, 3.6]} />
        <meshStandardMaterial color="#141c20" roughness={0.85} metalness={0.1} />
      </mesh>

      {/* Building Cornice / Roof ledge */}
      <mesh position={[0, 8.05, -1.6]}>
        <boxGeometry args={[12.4, 0.3, 4.0]} />
        <meshStandardMaterial color="#0e1315" roughness={0.9} />
      </mesh>

      {/* Rooftop surveillance antenna */}
      <mesh position={[-3, 8.8, -1.5]}>
        <cylinderGeometry args={[0.03, 0.05, 1.6, 8]} />
        <meshStandardMaterial color="#2d383e" metalness={0.8} />
      </mesh>

      {/* Window Rows (grid of dark industrial surveillance windows) */}
      {[-4, -2, 0, 2, 4].map((x) =>
        [3.2, 5.2, 6.8].map((y) => (
          <group key={`${x}-${y}`} position={[x, y, 0.02]}>
            <mesh>
              <planeGeometry args={[1.1, 1.2]} />
              <meshStandardMaterial
                color={x === 2 && y === 5.2 ? "#1e3340" : "#0d1316"}
                roughness={0.2}
                metalness={0.8}
                emissive={x === 2 && y === 5.2 ? "#26485e" : "#000000"}
                emissiveIntensity={x === 2 && y === 5.2 ? 0.35 : 0}
              />
            </mesh>
            {/* Frame border */}
            <mesh position={[0, 0, 0.01]}>
              <ringGeometry args={[0.54, 0.58, 4]} />
              <meshBasicMaterial color="#1a2327" />
            </mesh>
          </group>
        ))
      )}

      {/* Entrance Door Alcove (Recessed doorway at x = 1.2) */}
      <group position={[1.2, 0, 0]}>
        {/* Recessed alcove cut into building */}
        <mesh position={[0, 1.15, -0.3]}>
          <boxGeometry args={[1.6, 2.3, 0.8]} />
          <meshStandardMaterial color="#0c1114" roughness={0.9} />
        </mesh>

        {/* Door Frame */}
        <mesh position={[0, 1.15, -0.05]}>
          <boxGeometry args={[1.3, 2.15, 0.1]} />
          <meshStandardMaterial color="#1e262b" metalness={0.6} roughness={0.4} />
        </mesh>

        {/* Door Mesh with Pivot at left hinge */}
        <group position={[-0.55, 0.1, -0.02]}>
          <group ref={doorRef}>
            <RoundedBox args={[1.1, 2.05, 0.05]} radius={0.01} smoothness={2} position={[0.55, 1.025, 0]}>
              <meshStandardMaterial color="#182226" metalness={0.7} roughness={0.4} />
            </RoundedBox>
            {/* Handle / Lock Mechanism */}
            <mesh position={[0.95, 1.0, 0.04]}>
              <boxGeometry args={[0.06, 0.18, 0.04]} />
              <meshStandardMaterial color="#a0b3b0" metalness={0.9} roughness={0.2} />
            </mesh>
          </group>
        </group>

        {/* Interior hallway glow (revealed when door opens) */}
        <pointLight
          position={[0, 1.2, -0.5]}
          color="#ffcf8a"
          intensity={doorOpen ? 2.5 : 0.1}
          distance={4}
        />

        {/* Overhead Entrance Light fixture */}
        <mesh position={[0, 2.25, 0.15]}>
          <boxGeometry args={[0.3, 0.06, 0.15]} />
          <meshStandardMaterial color="#2d383e" metalness={0.8} />
        </mesh>
        <pointLight position={[0, 2.18, 0.2]} color="#cfdad7" intensity={0.9} distance={3} />
      </group>

      {/* Streetlamp Prop on Left Sidewalk */}
      <group position={[-3.8, 0, 2.2]}>
        <mesh position={[0, 1.6, 0]}>
          <cylinderGeometry args={[0.04, 0.06, 3.2, 12]} />
          <meshStandardMaterial color="#1f282d" metalness={0.8} />
        </mesh>
        <mesh position={[0.3, 3.2, 0]} rotation={[0, 0, -0.4]}>
          <cylinderGeometry args={[0.03, 0.03, 0.7, 8]} />
          <meshStandardMaterial color="#1f282d" metalness={0.8} />
        </mesh>
        <mesh position={[0.55, 3.3, 0]}>
          <coneGeometry args={[0.15, 0.2, 16]} />
          <meshStandardMaterial color="#2c373d" metalness={0.7} />
        </mesh>
        {/* Soft cool streetlight cone */}
        <spotLight
          position={[0.55, 3.25, 0]}
          target-position={[-2.5, 0, 2.2]}
          color="#a8c2c0"
          intensity={2.2}
          angle={0.65}
          penumbra={0.8}
          distance={8}
          castShadow
        />
      </group>
    </group>
  );
}

export default function ExteriorScene({ entering, onDoorTrigger, onSequenceEnd }) {
  const [doorOpen, setDoorOpen] = useState(false);

  useEffect(() => {
    if (!entering) {
      setDoorOpen(false);
    }
  }, [entering]);

  const handleDoorOpen = () => {
    setDoorOpen(true);
    sound.playDoorMechanism();
    onDoorTrigger?.();
  };

  return (
    <div className="relative h-full w-full bg-[#101416]">
      <Canvas
        camera={{ position: [0, 1.8, 8.5], fov: 45, near: 0.1, far: 50 }}
        dpr={[1, 1.5]}
        shadows
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMappingExposure: 1.0,
        }}
      >
        <ambientLight intensity={0.4} color="#1b2540" />
        <directionalLight
          position={[-5, 8, 6]}
          intensity={0.7}
          color="#3a4b60"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <fog attach="fog" args={["#101416", 6, 22]} />

        <CinematicCamera
          entering={entering}
          onDoorOpen={handleDoorOpen}
          onComplete={onSequenceEnd}
        />

        <ExteriorBuilding doorOpen={doorOpen} />
      </Canvas>
    </div>
  );
}
