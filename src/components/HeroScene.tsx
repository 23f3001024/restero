"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  Lightformer,
  ContactShadows,
  Instances,
  Instance,
} from "@react-three/drei";
import * as THREE from "three";

/* ---------- Glazed ceramic bowl (lathe profile with a footed base) ---------- */
function Bowl() {
  const geo = useMemo(() => {
    const profile: THREE.Vector2[] = [
      [0.0, 0.16],
      [0.66, 0.14],
      [1.02, 0.28],
      [1.22, 0.6],
      [1.31, 0.9],
      [1.42, 0.94], // rim lip
      [1.4, 0.62],
      [1.19, 0.24],
      [0.82, 0.05],
      [0.52, 0.02], // foot ring
      [0.5, 0.06],
      [0.0, 0.09],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    return new THREE.LatheGeometry(profile, 128);
  }, []);

  return (
    <mesh geometry={geo} castShadow receiveShadow>
      <meshPhysicalMaterial
        color="#241012"
        roughness={0.12}
        metalness={0.0}
        clearcoat={1}
        clearcoatRoughness={0.08}
        reflectivity={0.6}
        side={THREE.DoubleSide}
        envMapIntensity={1.1}
      />
    </mesh>
  );
}

/* ---------- Thin gold rim ring for a fine-china finish ---------- */
function GoldRim() {
  return (
    <mesh position={[0, 0.93, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.36, 0.022, 24, 128]} />
      <meshStandardMaterial color="#fde68a" metalness={1} roughness={0.18} envMapIntensity={1.4} />
    </mesh>
  );
}

/* ---------- Saucy, clear-coated curry mound ---------- */
function Curry() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const s = 1 + Math.sin(clock.elapsedTime * 1.1) * 0.008;
      ref.current.scale.set(1.16 * s, 0.66 * s, 1.16 * s);
    }
  });
  return (
    <mesh ref={ref} position={[0, 0.6, 0]} receiveShadow>
      <sphereGeometry args={[1, 96, 96]} />
      <meshPhysicalMaterial
        color="#8f2f10"
        roughness={0.5}
        metalness={0}
        clearcoat={0.9}
        clearcoatRoughness={0.25}
        sheen={0.6}
        sheenColor={new THREE.Color("#e0a86a")}
        sheenRoughness={0.5}
        envMapIntensity={0.8}
      />
    </mesh>
  );
}

/* ---------- Basmati rice grains scattered over the mound ---------- */
type Placed = { p: [number, number, number]; r: [number, number, number]; s: number };

function useOnDome(count: number, spread: number, yLift: number): Placed[] {
  return useMemo(
    () =>
      [...Array(count)].map(() => {
        const a = Math.random() * Math.random() * 1.15; // bias toward the top
        const b = Math.random() * Math.PI * 2;
        const rr = 1.12 * spread;
        return {
          p: [
            Math.sin(a) * Math.cos(b) * rr,
            0.6 + Math.cos(a) * 0.64 + yLift,
            Math.sin(a) * Math.sin(b) * rr,
          ] as [number, number, number],
          r: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [
            number,
            number,
            number,
          ],
          s: 0.85 + Math.random() * 0.5,
        };
      }),
    [count, spread, yLift],
  );
}

function Rice() {
  const grains = useOnDome(70, 1, 0.02);
  return (
    <Instances limit={80} castShadow>
      <capsuleGeometry args={[0.022, 0.075, 4, 8]} />
      <meshStandardMaterial color="#f4ebd6" roughness={0.55} />
      {grains.map((g, i) => (
        <Instance key={i} position={g.p} rotation={g.r} scale={g.s} />
      ))}
    </Instances>
  );
}

/* ---------- Coriander flecks ---------- */
function Coriander() {
  const bits = useOnDome(16, 0.95, 0.05);
  return (
    <Instances limit={20} castShadow>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial color="#2f6b28" roughness={0.7} />
      {bits.map((g, i) => (
        <Instance key={i} position={g.p} rotation={g.r} scale={[g.s, g.s * 0.35, g.s]} />
      ))}
    </Instances>
  );
}

/* ---------- Curved, glossy chilli with a green stem ---------- */
const CHILLI_GEO = (() => {
  const profile: THREE.Vector2[] = [
    [0.004, 0.0],
    [0.03, 0.12],
    [0.06, 0.32],
    [0.088, 0.62],
    [0.11, 0.9],
    [0.1, 1.12],
    [0.07, 1.32],
    [0.05, 1.42],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  const geo = new THREE.LatheGeometry(profile, 28);
  const pos = geo.attributes.position;
  const bend = 0.42;
  for (let i = 0; i < pos.count; i++) {
    const t = pos.getY(i) / 1.42;
    pos.setX(i, pos.getX(i) + bend * Math.sin(t * Math.PI * 0.55));
  }
  geo.computeVertexNormals();
  return geo;
})();

function Chilli({
  position,
  rotation,
  scale = 1,
  color = "#c1121f",
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
  color?: string;
}) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh geometry={CHILLI_GEO} castShadow>
        <meshPhysicalMaterial
          color={color}
          roughness={0.28}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0.18}
          envMapIntensity={1}
        />
      </mesh>
      {/* stem */}
      <mesh position={[0.34, 1.44, 0]} rotation={[0, 0, -0.5]} castShadow>
        <cylinderGeometry args={[0.02, 0.035, 0.28, 8]} />
        <meshStandardMaterial color="#3d6b2e" roughness={0.6} />
      </mesh>
    </group>
  );
}

/* ---------- Drifting spice particles ---------- */
function Spices() {
  const ref = useRef<THREE.Points>(null);
  const { positions, count } = useMemo(() => {
    const count = 180;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.2 + Math.random() * 3;
      const a = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = (Math.random() - 0.3) * 4;
      positions[i * 3 + 2] = Math.sin(a) * r;
    }
    return { positions, count };
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.035;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#f5c518" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

/* ---------- Scene group: slow spin + mouse parallax ---------- */
function Plate() {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.16;
    const tx = state.pointer.y * 0.16;
    const tz = state.pointer.x * 0.1;
    group.current.rotation.x += (tx - group.current.rotation.x) * 0.05;
    group.current.rotation.z += (tz - group.current.rotation.z) * 0.05;
  });

  return (
    <group ref={group} position={[0, -0.35, 0]}>
      {/* serving plate */}
      <mesh position={[0, -0.02, 0]} receiveShadow>
        <cylinderGeometry args={[2.05, 2.0, 0.08, 96]} />
        <meshPhysicalMaterial color="#efe7d6" roughness={0.35} metalness={0} clearcoat={0.5} envMapIntensity={0.7} />
      </mesh>

      <Bowl />
      <GoldRim />
      <Curry />
      <Rice />
      <Coriander />

      {/* chillies resting on the mound */}
      <Chilli position={[0.15, 1.02, 0.35]} rotation={[1.5, 0.3, 0.2]} scale={0.85} />
      <Chilli position={[-0.35, 1.0, -0.2]} rotation={[1.4, -0.6, -0.3]} scale={0.8} color="#a70e18" />
    </group>
  );
}

/* ---------- Locally-built studio environment (no network fetch) ---------- */
function Studio() {
  return (
    <Environment resolution={256}>
      <group rotation={[0, 0, 0]}>
        <Lightformer intensity={2.6} position={[0, 5, 2]} scale={[8, 3, 1]} color="#fff4e0" />
        <Lightformer intensity={1.4} position={[-4, 2, 2]} scale={[4, 4, 1]} color="#ffdca8" />
        <Lightformer intensity={1.2} position={[4, 1, -2]} scale={[4, 4, 1]} color="#ffffff" />
        <Lightformer intensity={0.8} position={[0, -3, 1]} scale={[6, 3, 1]} color="#ffe6c0" />
      </group>
    </Environment>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      shadows
      camera={{ position: [0, 1.7, 5.4], fov: 40 }}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.35} />
        <directionalLight
          position={[4, 7, 4]}
          intensity={2.4}
          color="#fff2d6"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0002}
        />
        <spotLight position={[-5, 5, 2]} angle={0.5} penumbra={1} intensity={1.1} color="#ffd9a0" />

        <Plate />
        <Spices />

        <ContactShadows
          position={[0, -0.42, 0]}
          opacity={0.42}
          scale={9}
          blur={2.6}
          far={4}
          color="#4a2b1a"
        />
        <Studio />
      </Suspense>
    </Canvas>
  );
}
