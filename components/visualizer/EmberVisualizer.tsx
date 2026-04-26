'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  ContactShadows, 
  PerspectiveCamera,
  Stage,
  Bounds,
  useGLTF
} from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

interface Module {
  id: string;
  type: 'grill' | 'prep' | 'fridge' | 'sink' | 'storage';
  position: number; // 0, 1, 2, etc.
}

function KitchenModule({ type, position }: { type: string, position: number }) {
  // In a real scenario, we'd load different GLBs based on type
  // For now, we simulate with a box primitive
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <group position={[position * 1.2, 0, 0]}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[1.1, 0.9, 0.7]} />
        <meshStandardMaterial color="#1E1E1E" roughness={0.1} metalness={0.8} />
      </mesh>
      
      {/* Countertop */}
      <mesh position={[0, 0.46, 0]} castShadow>
        <boxGeometry args={[1.12, 0.04, 0.72]} />
        <meshStandardMaterial color="#C4C0BB" roughness={0.4} />
      </mesh>

      {/* Label */}
      <mesh position={[0, 0, 0.36]}>
        <planeGeometry args={[0.4, 0.1]} />
        <meshBasicMaterial color="#D98C5F" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

export function EmberVisualizer({ modules }: { modules: Module[] }) {
  return (
    <div className="w-full h-full relative bg-[#121212]">
      <Suspense fallback={null}>
        <Canvas shadows dpr={[1, 2]}>
          <PerspectiveCamera makeDefault fov={35} position={[0, 2, 6]} />
          
          <ambientLight intensity={0.4} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          
          <group position={[-(modules.length - 1) * 0.6, 0, 0]}>
            {modules.map((module) => (
              <KitchenModule 
                key={module.id} 
                type={module.type} 
                position={module.position} 
              />
            ))}
          </group>

          <ContactShadows 
            position={[0, -0.45, 0]} 
            opacity={0.6} 
            scale={10} 
            blur={2} 
            far={4.5} 
          />
          
          <Environment preset="night" />

          <OrbitControls 
            enableDamping 
            minPolarAngle={Math.PI / 4} 
            maxPolarAngle={Math.PI / 2.1} 
            makeDefault 
          />
        </Canvas>
      </Suspense>

      {/* Stats Overlay */}
      <div className="absolute top-8 left-8 z-10">
        <p className="text-[10px] uppercase tracking-[0.3em] text-ember-bronze mb-1">Configuration Active</p>
        <p className="text-xl font-bold text-white uppercase">{modules.length} Modules Connected</p>
      </div>
    </div>
  );
}
