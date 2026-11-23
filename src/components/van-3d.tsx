import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls, RoundedBox } from "@react-three/drei";
import type { Group } from "three";

function Wheel({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.38, 0.38, 0.28, 28]} />
        <meshStandardMaterial color="#141414" roughness={0.9} metalness={0.05} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 0.3, 20]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.35} metalness={0.65} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
        <torusGeometry args={[0.32, 0.05, 10, 28]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.55} metalness={0.4} />
      </mesh>
    </group>
  );
}

function Seat({ position, rotateY = 0 }: { position: [number, number, number]; rotateY?: number }) {
  return (
    <group position={position} rotation={[0, rotateY, 0]}>
      <RoundedBox args={[0.42, 0.12, 0.42]} radius={0.04} smoothness={3} position={[0, 0.42, 0]} castShadow>
        <meshStandardMaterial color="#3a3f45" roughness={0.75} />
      </RoundedBox>
      <RoundedBox args={[0.42, 0.48, 0.1]} radius={0.04} smoothness={3} position={[0, 0.7, -0.16]} castShadow>
        <meshStandardMaterial color="#32363c" roughness={0.72} />
      </RoundedBox>
      <mesh position={[0, 0.95, -0.16]}>
        <boxGeometry args={[0.28, 0.08, 0.08]} />
        <meshStandardMaterial color="#2c3036" roughness={0.7} />
      </mesh>
    </group>
  );
}

function CabinInterior() {
  const rows = useMemo(
    () =>
      [
        { z: 0.95, seats: [-0.55, 0.55] as const },
        { z: 0.05, seats: [-0.55, 0, 0.55] as const },
        { z: -0.85, seats: [-0.55, 0, 0.55] as const },
        { z: -1.7, seats: [-0.55, 0, 0.55] as const },
      ] as const,
    [],
  );

  return (
    <group>
      {/* Floor carpet */}
      <mesh position={[0, 0.22, -0.15]} receiveShadow>
        <boxGeometry args={[1.75, 0.04, 4.0]} />
        <meshStandardMaterial color="#1e2226" roughness={0.95} />
      </mesh>
      {/* Ceiling */}
      <mesh position={[0, 1.78, -0.1]}>
        <boxGeometry args={[1.7, 0.04, 3.9]} />
        <meshStandardMaterial color="#ececea" roughness={0.85} />
      </mesh>
      {/* Driver + front passenger */}
      <Seat position={[-0.55, 0.05, 1.55]} />
      <Seat position={[0.55, 0.05, 1.55]} />
      {rows.map((row) =>
        row.seats.map((x) => <Seat key={`${row.z}-${x}`} position={[x, 0.05, row.z]} />),
      )}
      {/* Steering wheel hint */}
      <mesh position={[-0.55, 0.95, 1.95]} rotation={[0.35, 0, 0]}>
        <torusGeometry args={[0.16, 0.018, 10, 24]} />
        <meshStandardMaterial color="#222" roughness={0.5} metalness={0.2} />
      </mesh>
      {/* Dash */}
      <RoundedBox args={[1.7, 0.28, 0.45]} radius={0.04} smoothness={3} position={[0, 0.72, 2.05]}>
        <meshStandardMaterial color="#2a2e32" roughness={0.6} />
      </RoundedBox>
    </group>
  );
}

function Glass({
  position,
  args,
  rotation = [0, 0, 0],
}: {
  position: [number, number, number];
  args: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={args} />
      <meshPhysicalMaterial
        color="#8aa8a4"
        metalness={0.05}
        roughness={0.05}
        transmission={0.72}
        thickness={0.35}
        ior={1.45}
        transparent
        opacity={0.95}
        envMapIntensity={0.9}
      />
    </mesh>
  );
}

function HiaceVan({ autoRotate }: { autoRotate: boolean }) {
  const group = useRef<Group>(null);
  const body = "#f2f2ef";
  const trim = "#1f1f1f";
  const light = "#f5ebcf";
  const accent = "#c9b896";

  useFrame((_, dt) => {
    if (!group.current || !autoRotate) return;
    group.current.rotation.y += dt * 0.18;
  });

  return (
    <group ref={group} position={[0, 0.38, 0]} rotation={[0, Math.PI * 0.28, 0]} dispose={null}>
      <CabinInterior />

      {/* Lower body */}
      <RoundedBox args={[2.05, 0.85, 4.6]} radius={0.09} smoothness={5} position={[0, 0.55, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={body} roughness={0.28} metalness={0.12} envMapIntensity={0.8} />
      </RoundedBox>

      {/* High roof — cut open on right for sliding door view */}
      <RoundedBox args={[1.98, 1.05, 4.2]} radius={0.1} smoothness={5} position={[0, 1.35, -0.12]} castShadow>
        <meshStandardMaterial color={body} roughness={0.26} metalness={0.12} envMapIntensity={0.8} />
      </RoundedBox>

      {/* Open sliding door panel (parked open) */}
      <RoundedBox
        args={[0.08, 1.15, 1.55]}
        radius={0.03}
        smoothness={3}
        position={[1.55, 1.05, -0.35]}
        rotation={[0, 0.08, 0]}
        castShadow
      >
        <meshStandardMaterial color={body} roughness={0.28} metalness={0.1} />
      </RoundedBox>
      <Glass position={[1.55, 1.25, -0.35]} args={[0.05, 0.55, 1.25]} rotation={[0, 0.08, 0]} />

      {/* Door opening void — dark frame */}
      <mesh position={[1.01, 1.05, 0.05]}>
        <boxGeometry args={[0.04, 1.15, 1.55]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>

      {/* Nose */}
      <RoundedBox args={[1.95, 0.55, 0.7]} radius={0.06} smoothness={4} position={[0, 0.72, 2.05]} castShadow>
        <meshStandardMaterial color={body} roughness={0.28} metalness={0.12} />
      </RoundedBox>
      <RoundedBox args={[1.9, 0.85, 0.5]} radius={0.05} smoothness={4} position={[0, 1.28, 1.88]} castShadow>
        <meshStandardMaterial color={body} roughness={0.26} metalness={0.12} />
      </RoundedBox>

      {/* Lower accent stripe */}
      <mesh position={[0, 0.38, 0]}>
        <boxGeometry args={[2.08, 0.08, 4.55]} />
        <meshStandardMaterial color={accent} roughness={0.4} metalness={0.25} />
      </mesh>

      {/* Bumpers */}
      <mesh position={[0, 0.28, 2.38]} castShadow>
        <boxGeometry args={[1.85, 0.28, 0.22]} />
        <meshStandardMaterial color={trim} roughness={0.55} metalness={0.25} />
      </mesh>
      <mesh position={[0, 0.28, -2.38]} castShadow>
        <boxGeometry args={[1.85, 0.28, 0.22]} />
        <meshStandardMaterial color={trim} roughness={0.55} metalness={0.25} />
      </mesh>

      {/* Grille + lights */}
      <mesh position={[0, 0.55, 2.42]}>
        <boxGeometry args={[1.1, 0.28, 0.05]} />
        <meshStandardMaterial color="#0d0d0d" roughness={0.55} metalness={0.45} />
      </mesh>
      <mesh position={[-0.72, 0.55, 2.42]}>
        <boxGeometry args={[0.32, 0.18, 0.06]} />
        <meshStandardMaterial color={light} emissive={light} emissiveIntensity={0.45} roughness={0.2} />
      </mesh>
      <mesh position={[0.72, 0.55, 2.42]}>
        <boxGeometry args={[0.32, 0.18, 0.06]} />
        <meshStandardMaterial color={light} emissive={light} emissiveIntensity={0.45} roughness={0.2} />
      </mesh>
      <mesh position={[-0.78, 0.7, -2.42]}>
        <boxGeometry args={[0.22, 0.28, 0.05]} />
        <meshStandardMaterial color="#7a1c1c" emissive="#3a0808" emissiveIntensity={0.25} roughness={0.35} />
      </mesh>
      <mesh position={[0.78, 0.7, -2.42]}>
        <boxGeometry args={[0.22, 0.28, 0.05]} />
        <meshStandardMaterial color="#7a1c1c" emissive="#3a0808" emissiveIntensity={0.25} roughness={0.35} />
      </mesh>

      {/* Roof rails */}
      <mesh position={[-0.55, 1.95, -0.15]}>
        <boxGeometry args={[0.05, 0.04, 3.2]} />
        <meshStandardMaterial color="#333" metalness={0.55} roughness={0.35} />
      </mesh>
      <mesh position={[0.55, 1.95, -0.15]}>
        <boxGeometry args={[0.05, 0.04, 3.2]} />
        <meshStandardMaterial color="#333" metalness={0.55} roughness={0.35} />
      </mesh>

      {/* Glass — clear enough to read cabin */}
      <Glass position={[0, 1.12, 2.08]} args={[1.65, 0.7, 0.05]} rotation={[-0.2, 0, 0]} />
      <Glass position={[-0.99, 1.15, 0.85]} args={[0.05, 0.58, 0.85]} />
      <Glass position={[-0.99, 1.15, -0.2]} args={[0.05, 0.58, 0.85]} />
      <Glass position={[-0.99, 1.15, -1.25]} args={[0.05, 0.58, 0.85]} />
      <Glass position={[0.99, 1.15, 0.95]} args={[0.05, 0.58, 0.7]} />
      {/* Right mid open — no glass covering door gap */}
      <Glass position={[0.99, 1.15, -1.25]} args={[0.05, 0.58, 0.85]} />
      <Glass position={[0, 1.18, -2.35]} args={[1.5, 0.68, 0.05]} />

      {/* Mirrors */}
      <mesh position={[-1.15, 1.15, 1.55]} castShadow>
        <boxGeometry args={[0.18, 0.14, 0.28]} />
        <meshStandardMaterial color={body} roughness={0.3} />
      </mesh>
      <mesh position={[1.15, 1.15, 1.55]} castShadow>
        <boxGeometry args={[0.18, 0.14, 0.28]} />
        <meshStandardMaterial color={body} roughness={0.3} />
      </mesh>

      <Wheel position={[-0.85, 0, 1.45]} />
      <Wheel position={[0.85, 0, 1.45]} />
      <Wheel position={[-0.85, 0, -1.55]} />
      <Wheel position={[0.85, 0, -1.55]} />
    </group>
  );
}

function Scene({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <>
      <color attach="background" args={["#e4e8de"]} />
      <fog attach="fog" args={["#e4e8de", 14, 28]} />
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[5, 8, 4]}
        intensity={1.45}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={22}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={7}
        shadow-camera-bottom={-7}
      />
      <directionalLight position={[-4, 3, -3]} intensity={0.4} color="#d4c4a0" />
      <spotLight position={[2.5, 4, 1.5]} intensity={1.1} angle={0.55} penumbra={0.6} color="#fff5e6" castShadow />
      <hemisphereLight args={["#f2f4ec", "#3a5230", 0.4]} />

      <HiaceVan autoRotate={!reduceMotion} />
      <ContactShadows position={[0, 0.01, 0]} opacity={0.5} scale={11} blur={2.2} far={4.5} color="#0e1410" />
      <Suspense fallback={null}>
        <Environment preset="apartment" environmentIntensity={0.55} />
      </Suspense>

      <OrbitControls
        enablePan={false}
        minPolarAngle={Math.PI / 3.4}
        maxPolarAngle={Math.PI / 2.02}
        minDistance={4.2}
        maxDistance={10}
        target={[0.2, 0.95, 0]}
        autoRotate={false}
      />
    </>
  );
}

export function Van3D({ className = "" }: { className?: string }) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className={`bg-mist ${className}`} aria-hidden>
        <div className="h-full w-full animate-pulse bg-hush/60" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-mist ${className}`}>
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [5.4, 2.1, 4.6], fov: 28, near: 0.1, far: 60 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor("#e4e8de");
          gl.toneMappingExposure = 1.08;
        }}
      >
        <Scene reduceMotion={reduceMotion} />
      </Canvas>
      <p className="pointer-events-none absolute bottom-3 left-4 text-[11px] uppercase tracking-[0.18em] text-ink/40 font-semibold">
        Drag to look inside
      </p>
    </div>
  );
}
