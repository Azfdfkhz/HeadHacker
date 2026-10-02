"use client";
import { RoundedBox } from "@react-three/drei";

// Model prosedural (tanpa file GLB). Dipakai sebagai fallback sampai GLB dari Blender tersedia.
const Box = ({ args, pos = [0, 0, 0], rot = [0, 0, 0], color, metal = 0.3, rough = 0.5, emissive, r = 0.04 }) => (
  <RoundedBox args={args} radius={r} smoothness={3} position={pos} rotation={rot}>
    <meshStandardMaterial color={color} metalness={metal} roughness={rough} emissive={emissive} emissiveIntensity={emissive ? 0.8 : 0} />
  </RoundedBox>
);
const Cyl = ({ args, pos, rot, color, metal = 0.3, rough = 0.5 }) => (
  <mesh position={pos} rotation={rot}>
    <cylinderGeometry args={args} />
    <meshStandardMaterial color={color} metalness={metal} roughness={rough} />
  </mesh>
);

// Mengikuti foto referensi: bodi aluminium, konektor USB 3.0 biru, tutup geser di belakang
function Flashdisk() {
  return (
    <group rotation={[0.25, 0.5, 0]}>
      <Box args={[0.75, 0.22, 2]} color="#c4c8ca" metal={0.7} rough={0.35} r={0.05} />
      <Box args={[0.5, 0.1, 0.9]} pos={[0, 0, 1.35]} color="#d9d9d4" metal={0.8} rough={0.3} r={0.01} />
      <Box args={[0.42, 0.045, 0.7]} pos={[0, -0.05, 1.4]} color="#2a68d0" r={0.01} />
      <Box args={[0.78, 0.24, 0.5]} pos={[0, 0, -1.15]} color="#aeb3b5" metal={0.4} rough={0.5} r={0.06} />
      <Box args={[0.3, 0.012, 0.2]} pos={[0, 0.115, 0.1]} color="#222" rough={0.8} r={0.003} />
    </group>
  );
}

function Laptop() {
  return (
    <group>
      <Box args={[2, 0.1, 1.4]} color="#2c3236" metal={0.5} />
      <Box args={[1.7, 0.012, 0.7]} pos={[0, 0.06, -0.15]} color="#14181a" rough={0.9} r={0.005} />
      <Box args={[0.6, 0.012, 0.35]} pos={[0, 0.06, 0.45]} color="#3a4247" r={0.005} />
      <group position={[0, 0.05, -0.7]} rotation={[-0.35, 0, 0]}>
        <Box args={[2, 1.3, 0.06]} pos={[0, 0.65, 0]} color="#2c3236" metal={0.5} />
        <Box args={[1.8, 1.1, 0.01]} pos={[0, 0.65, 0.035]} color="#2f4b66" emissive="#3d6a94" r={0.004} />
      </group>
    </group>
  );
}

function Computer() {
  return (
    <group>
      <Box args={[2.2, 1.3, 0.1]} pos={[0, 0.95, 0]} color="#1e2427" />
      <Box args={[2, 1.1, 0.01]} pos={[0, 0.95, 0.055]} color="#2f4b66" emissive="#3d6a94" r={0.004} />
      <Cyl args={[0.08, 0.1, 0.5, 16]} pos={[0, 0.2, -0.05]} color="#2c3236" />
      <Box args={[0.9, 0.05, 0.5]} pos={[0, -0.05, -0.05]} color="#2c3236" />
    </group>
  );
}

function Handheld() {
  const keys = [-0.2, 0, 0.2];
  return (
    <group>
      <Box args={[0.9, 1.7, 0.3]} color="#23282b" rough={0.6} r={0.1} />
      <Box args={[0.62, 0.5, 0.02]} pos={[0, 0.45, 0.16]} color="#3a6a95" emissive="#4a86b8" r={0.01} />
      {[-0.1, -0.35, -0.6].map((y) =>
        keys.map((x) => <Cyl key={`${x}${y}`} args={[0.07, 0.07, 0.04, 16]} pos={[x, y, 0.16]} rot={[Math.PI / 2, 0, 0]} color="#e0752d" />)
      )}
      <Cyl args={[0.04, 0.04, 0.5, 12]} pos={[0.3, 1.1, 0]} color="#111" />
    </group>
  );
}

function Radio() {
  return (
    <group>
      <Box args={[0.7, 1.3, 0.4]} color="#2a3034" rough={0.6} r={0.08} />
      <Box args={[0.5, 0.4, 0.02]} pos={[0, 0.25, 0.21]} color="#1a1f21" r={0.01} />
      <Box args={[0.5, 0.01, 0.02]} pos={[0, -0.15, 0.21]} color="#555d60" r={0.003} />
      <Cyl args={[0.1, 0.1, 0.1, 16]} pos={[-0.18, 0.8, 0]} color="#111" />
      <Cyl args={[0.04, 0.04, 0.9, 12]} pos={[0.2, 1.1, 0]} color="#111" />
    </group>
  );
}

function Backpack() {
  return (
    <group>
      <Box args={[1.2, 1.6, 0.6]} color="#3d433d" rough={0.9} r={0.15} />
      <Box args={[1, 0.6, 0.25]} pos={[0, -0.35, 0.4]} color="#343a34" rough={0.9} r={0.08} />
      <Box args={[0.14, 1.3, 0.05]} pos={[-0.35, 0, -0.33]} color="#22262a" rough={0.9} r={0.02} />
      <Box args={[0.14, 1.3, 0.05]} pos={[0.35, 0, -0.33]} color="#22262a" rough={0.9} r={0.02} />
      <Box args={[0.3, 0.12, 0.1]} pos={[0, 0.85, 0]} color="#22262a" r={0.03} />
    </group>
  );
}

export const proceduralModels = {
  flashdisk: Flashdisk, laptop: Laptop, computer: Computer,
  "handheld-hack": Handheld, radio: Radio, backpack: Backpack,
};
