'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  ContactShadows, 
  Grid,
  TransformControls,
  PerspectiveCamera,
  useCursor
} from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function GardenRoom({ position, rotation, onUpdate }: { 
  position: [number, number, number], 
  rotation: [number, number, number],
  onUpdate: (pos: THREE.Vector3) => void
}) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHover] = useState(false);
  useCursor(hovered);

  return (
    <group 
      ref={meshRef} 
      position={position} 
      rotation={rotation}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[4, 2.5, 3]} />
        <meshStandardMaterial color="#2C3327" roughness={0.1} metalness={0.8} />
      </mesh>
      
      {/* Glass Front */}
      <mesh position={[0, 0, 1.51]}>
        <planeGeometry args={[3.8, 2.3]} />
        <meshPhysicalMaterial 
          transparent 
          opacity={0.4} 
          roughness={0} 
          metalness={1} 
          transmission={0.8} 
          thickness={0.5} 
        />
      </mesh>

      {/* Label */}
      <mesh position={[0, 1.5, 0]}>
         <sphereGeometry args={[0.05]} />
         <meshBasicMaterial color="#4A5D3F" />
      </mesh>
    </group>
  );
}

export function SitePlanner() {
  const [mounted, setMounted] = useState(false);
  const [roomPos, setRoomPos] = useState<[number, number, number]>([0, 1.25, 0]);
  const [roomRot, setRoomRot] = useState<[number, number, number]>([0, 0, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-full h-full bg-[#F5F7F2]" />;

  return (
    <div className="w-full h-full relative bg-[#F5F7F2]">
      <Suspense fallback={null}>
        <Canvas shadows dpr={[1, 2]}>
          <PerspectiveCamera makeDefault fov={40} position={[10, 10, 10]} />
          
          <ambientLight intensity={0.5} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1} 
            castShadow 
            shadow-mapSize={1024}
          />
          
          <Grid 
            infiniteGrid 
            fadeDistance={30} 
            cellColor="#4A5D3F" 
            sectionColor="#2C3327" 
            sectionThickness={1} 
            cellThickness={0.5} 
          />

          <GardenRoom 
            position={roomPos} 
            rotation={roomRot} 
            onUpdate={(pos) => setRoomPos([pos.x, 1.25, pos.z])} 
          />

          <ContactShadows 
            position={[0, 0, 0]} 
            opacity={0.4} 
            scale={20} 
            blur={2.5} 
            far={4.5} 
          />
          
          <Environment preset="park" />

          <OrbitControls 
            enableDamping 
            makeDefault 
            minDistance={5}
            maxDistance={30}
          />
        </Canvas>
      </Suspense>

      {/* Control Overlay */}
      <div className="absolute top-8 left-8 z-10 space-y-4">
        <div className="bg-white/80 backdrop-blur-md p-6 border border-forest/10 shadow-xl max-w-xs">
           <h3 className="text-caption text-forest mb-4">Site Planner Controls</h3>
           <div className="space-y-4">
              <div>
                 <label className="text-[10px] uppercase font-bold text-forest/40 block mb-2">Rotation</label>
                 <input 
                   type="range" 
                   min="0" 
                   max={Math.PI * 2} 
                   step="0.01"
                   value={roomRot[1]}
                   onChange={(e) => setRoomRot([0, parseFloat(e.target.value), 0])}
                   className="w-full accent-forest"
                 />
              </div>
              <div className="pt-4 border-t border-forest/5 flex justify-between items-center">
                 <span className="text-[10px] uppercase font-bold text-forest">Coordinates</span>
                 <span className="text-[10px] font-mono font-bold text-forest-light">
                   X: {roomPos[0].toFixed(1)} Z: {roomPos[2].toFixed(1)}
                 </span>
              </div>
           </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 z-10">
         <p className="text-[10px] uppercase tracking-[0.3em] text-forest font-bold">
           GROVE SPATIAL ENGINE v1.0
         </p>
      </div>
    </div>
  );
}
