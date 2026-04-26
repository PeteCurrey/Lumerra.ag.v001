'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, Float } from '@react-three/drei';

interface Configurator3DProps {
  shellColor: string;
  cabinetColor: string;
  lightingColor: string;
}

function HotTubModel({ shellColor, cabinetColor, lightingColor }: Configurator3DProps) {
  // Placeholder logic until GLB is loaded
  return (
    <group position={[0, -0.5, 0]}>
      {/* Cabinet (Base) */}
      <mesh castShadow receiveShadow position={[0, 0.4, 0]}>
        <boxGeometry args={[2.5, 0.8, 2.5]} />
        <meshStandardMaterial color={cabinetColor} roughness={0.8} />
      </mesh>

      {/* Shell (Top) */}
      <mesh castShadow receiveShadow position={[0, 0.9, 0]}>
        <boxGeometry args={[2.6, 0.2, 2.6]} />
        <meshStandardMaterial color={shellColor} roughness={0.3} metalness={0.1} />
      </mesh>

      {/* LED Interior Glow Placeholder */}
      <mesh position={[0, 0.95, 0]}>
        <boxGeometry args={[2, 0.01, 2]} />
        <meshStandardMaterial 
          color={lightingColor} 
          emissive={lightingColor} 
          emissiveIntensity={2} 
          transparent 
          opacity={0.3} 
        />
      </mesh>
    </group>
  );
}

export default function Configurator3D(props: Configurator3DProps) {
  return (
    <div className="w-full h-full bg-[var(--color-paper-sunken)]">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[5, 4, 5]} fov={35} />
        <OrbitControls 
          enablePan={false} 
          minDistance={4} 
          maxDistance={12} 
          maxPolarAngle={Math.PI / 2.1} 
          makeDefault 
        />
        
        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <HotTubModel {...props} />
          </Float>
          
          <Environment preset="city" />
          <ContactShadows 
            position={[0, -0.5, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2.5} 
            far={4} 
          />
        </Suspense>

        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow intensity={2} />
      </Canvas>
    </div>
  );
}
