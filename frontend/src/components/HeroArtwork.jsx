import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const layerConfigs = [
  {
    id: 'far',
    color: '#d8e5ec',
    opacity: 0.9,
    z: -3.4,
    baseY: 0.72,
    driftX: 0.12,
    driftY: 0.04,
    speed: 0.14,
    parallaxX: 0.16,
    parallaxY: 0.04,
    maxSnowCaps: 1,
    points: [
      [-5.8, -0.8],
      [-4.7, -0.18],
      [-3.4, -0.44],
      [-2.1, 0.22],
      [-0.8, -0.18],
      [0.6, 0.34],
      [1.9, -0.06],
      [3.4, 0.16],
      [5.8, -0.58]
    ]
  },
  {
    id: 'upper-mid',
    color: '#b8cfdb',
    opacity: 0.96,
    z: -2.2,
    baseY: 0.28,
    driftX: 0.18,
    driftY: 0.05,
    speed: 0.18,
    parallaxX: 0.24,
    parallaxY: 0.06,
    maxSnowCaps: 2,
    points: [
      [-5.9, -1.14],
      [-4.8, -0.48],
      [-3.7, -0.74],
      [-2.2, 0.48],
      [-0.9, -0.12],
      [0.5, 0.66],
      [1.7, -0.16],
      [3.1, 0.46],
      [4.6, -0.02],
      [5.9, -0.74]
    ]
  },
  {
    id: 'mid',
    color: '#7c9caf',
    opacity: 0.98,
    z: -1.1,
    baseY: -0.22,
    driftX: 0.28,
    driftY: 0.08,
    speed: 0.24,
    parallaxX: 0.34,
    parallaxY: 0.1,
    maxSnowCaps: 2,
    points: [
      [-6.1, -1.54],
      [-5.0, -0.82],
      [-3.8, -1.18],
      [-2.5, 0.66],
      [-1.2, -0.08],
      [0.3, 1.04],
      [1.6, -0.22],
      [3.2, 0.76],
      [4.6, 0.06],
      [6.0, -0.96]
    ]
  },
  {
    id: 'front',
    color: '#46677b',
    opacity: 1,
    z: 0.24,
    baseY: -0.84,
    driftX: 0.38,
    driftY: 0.12,
    speed: 0.32,
    parallaxX: 0.48,
    parallaxY: 0.14,
    maxSnowCaps: 3,
    points: [
      [-6.3, -1.92],
      [-5.1, -1.06],
      [-3.9, -1.44],
      [-2.2, 0.92],
      [-0.8, -0.1],
      [0.9, 1.78],
      [2.1, 0.12],
      [3.7, 1.14],
      [5.1, 0.22],
      [6.4, -1.26]
    ]
  }
];

const mistBands = [
  { top: '36%', left: '12%', right: '16%', height: '14%', duration: 18, offset: 18, opacity: 0.26 },
  { top: '50%', left: '8%', right: '10%', height: '18%', duration: 24, offset: -20, opacity: 0.18 },
  { top: '66%', left: '14%', right: '18%', height: '12%', duration: 16, offset: 14, opacity: 0.14 }
];

function createMountainGeometry(points, baseline = -3.8) {
  const shape = new THREE.Shape();
  shape.moveTo(points[0][0], baseline);
  shape.lineTo(points[0][0], points[0][1]);

  points.slice(1).forEach(([x, y]) => {
    shape.lineTo(x, y);
  });

  shape.lineTo(points[points.length - 1][0], baseline);
  shape.closePath();

  return new THREE.ShapeGeometry(shape);
}

function detectPeaks(points, maxSnowCaps) {
  const peaks = [];

  for (let index = 1; index < points.length - 1; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    const next = points[index + 1];
    const prominence = ((current[1] - previous[1]) + (current[1] - next[1])) / 2;

    if (current[1] > previous[1] && current[1] > next[1] && prominence > 0.44) {
      peaks.push({ index, prominence });
    }
  }

  return peaks
    .sort((left, right) => right.prominence - left.prominence)
    .slice(0, maxSnowCaps)
    .map(({ index, prominence }) => {
      const peak = points[index];
      const leftNeighbor = points[index - 1];
      const rightNeighbor = points[index + 1];
      const capDrop = Math.min(0.48, Math.max(0.18, prominence * 0.38));

      const alignWithSlope = (neighbor) => {
        const totalDrop = Math.max(0.08, peak[1] - neighbor[1]);
        const t = THREE.MathUtils.clamp(capDrop / totalDrop, 0.22, 0.82);

        return [
          THREE.MathUtils.lerp(peak[0], neighbor[0], t),
          THREE.MathUtils.lerp(peak[1], neighbor[1], t)
        ];
      };

      return [[peak[0], peak[1] - 0.02], alignWithSlope(leftNeighbor), alignWithSlope(rightNeighbor)];
    });
}

function createSnowGeometry(points) {
  const shape = new THREE.Shape();
  shape.moveTo(points[0][0], points[0][1]);
  shape.lineTo(points[1][0], points[1][1]);
  shape.lineTo(points[2][0], points[2][1]);
  shape.closePath();

  return new THREE.ShapeGeometry(shape);
}

function MountainLayer({ config }) {
  const groupRef = useRef(null);
  const geometry = useMemo(() => createMountainGeometry(config.points), [config.points]);
  const snowGeometries = useMemo(
    () => detectPeaks(config.points, config.maxSnowCaps).map((points) => createSnowGeometry(points)),
    [config.maxSnowCaps, config.points]
  );

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    const time = state.clock.getElapsedTime();
    const targetX =
      Math.sin(time * config.speed) * config.driftX + state.mouse.x * config.parallaxX;
    const targetY =
      config.baseY +
      Math.cos(time * config.speed * 0.9 + config.z) * config.driftY +
      state.mouse.y * config.parallaxY;

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.04);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.04);
    groupRef.current.position.z = config.z;
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      state.mouse.x * 0.035,
      0.03
    );
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color={config.color}
          roughness={0.96}
          metalness={0.04}
          transparent
          opacity={config.opacity}
          flatShading
        />
      </mesh>

      {snowGeometries.map((snowGeometry, index) => (
        <mesh key={`${config.id}-snow-${index}`} geometry={snowGeometry} position={[0, 0, 0.04]}>
          <meshStandardMaterial
            color="#fbfdff"
            roughness={0.88}
            metalness={0.02}
            transparent
            opacity={Math.min(config.opacity + 0.08, 1)}
          />
        </mesh>
      ))}
    </group>
  );
}

function HeroDepthScene() {
  const stageRef = useRef(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const targetCameraX = 0.42 + state.mouse.x * 0.32;
    const targetCameraY = 0.18 + state.mouse.y * 0.12;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetCameraX, 0.03);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetCameraY, 0.03);
    state.camera.lookAt(1.15, -0.18, 0);

    if (stageRef.current) {
      stageRef.current.position.y = -0.28 + Math.sin(time * 0.22) * 0.05;
    }
  });

  return (
    <>
      <fog attach="fog" args={['#f4f8fb', 5, 13]} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[-6, 4, 5]} intensity={1.45} color="#f4fbff" />
      <pointLight position={[-7, 1, 4]} intensity={1.25} color="#bfe1ef" />
      <pointLight position={[5, -1, 3]} intensity={0.35} color="#7fb6cf" />

      <group ref={stageRef} position={[1.18, -0.28, 0]}>
        {layerConfigs.map((config) => (
          <MountainLayer key={config.id} config={config} />
        ))}
      </group>
    </>
  );
}

export default function HeroArtwork({ className = '' }) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-[linear-gradient(180deg,#e8f3f8_0%,#f2f7fa_52%,#f8f9fa_100%)] ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_20%,rgba(255,255,255,0.96),transparent_22%),radial-gradient(circle_at_14%_22%,rgba(180,218,233,0.3),transparent_34%)]" />

      <Canvas
        dpr={[1, 1.4]}
        camera={{ position: [0.42, 0.18, 6.4], fov: 30 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="absolute inset-0 h-full w-full"
      >
        <HeroDepthScene />
      </Canvas>

      {mistBands.map((band) => (
        <motion.div
          key={band.top}
          animate={{ x: [0, band.offset, 0], y: [0, -4, 0] }}
          transition={{ duration: band.duration, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute rounded-full blur-3xl"
          style={{
            top: band.top,
            left: band.left,
            right: band.right,
            height: band.height,
            opacity: band.opacity,
            background:
              'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.88), rgba(255,255,255,0))'
          }}
        />
      ))}

      <div className="pointer-events-none absolute inset-y-0 left-0 w-[30%] bg-[linear-gradient(90deg,rgba(248,249,250,0.94),rgba(248,249,250,0.58),rgba(248,249,250,0))]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-[-10%] h-[44%] bg-[radial-gradient(ellipse_at_bottom,rgba(248,249,250,0.98),rgba(248,249,250,0.78)_36%,rgba(248,249,250,0)_72%)]" />
      <div className="pointer-events-none absolute right-[6%] top-[10%] h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(191,225,238,0.32),transparent_72%)] blur-3xl" />
    </div>
  );
}
