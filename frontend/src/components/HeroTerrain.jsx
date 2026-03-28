import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

function buildTerrainGeometry() {
  const geometry = new THREE.PlaneGeometry(12, 9, 180, 140);
  const positions = geometry.attributes.position;
  const noise2D = createNoise2D();

  for (let index = 0; index < positions.count; index += 1) {
    const x = positions.getX(index);
    const y = positions.getY(index);

    const broadShape = noise2D(x * 0.18, y * 0.14) * 1.25;
    const detailShape = noise2D(x * 0.42 + 40, y * 0.38 + 20) * 0.46;
    const ridgeBias = Math.max(0, noise2D(x * 0.11 - 32, y * 0.19 + 12)) * 2.4;
    const edgeFade = 1 - Math.min(0.86, Math.abs(x) / 6.4);
    const depthFade = 1 - Math.min(0.68, (y + 4.5) / 8.8);

    positions.setZ(index, (broadShape + detailShape + ridgeBias) * edgeFade * depthFade);
  }

  geometry.computeVertexNormals();

  return geometry;
}

function MountainRange() {
  const meshRef = useRef(null);
  const geometryRef = useRef(null);

  if (!geometryRef.current) {
    geometryRef.current = buildTerrainGeometry();
  }

  useEffect(() => {
    return () => geometryRef.current?.dispose();
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometryRef.current}
      rotation={[-1.1, -0.42, 0.08]}
      position={[0, -1.2, 0]}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial color="#A8C4D8" roughness={0.85} metalness={0.1} />
    </mesh>
  );
}

export default function HeroTerrain() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      camera={{ position: [0.6, 2.8, 8], fov: 42 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={1.25} />
      <hemisphereLight args={['#ffffff', '#b7c8d6', 0.6]} />
      <directionalLight
        color="#f8fbff"
        intensity={2.8}
        position={[-6, 8, 6]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight color="#8fb2c8" intensity={0.7} position={[6, 2, -2]} />
      <group position={[0, -0.3, 0]}>
        <MountainRange />
      </group>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={0.86}
        maxPolarAngle={1.46}
        rotateSpeed={0.35}
      />
    </Canvas>
  );
}
