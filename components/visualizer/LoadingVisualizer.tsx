'use client';

import { motion } from 'framer-motion';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';

// Water surface shader for loading state
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float time = uTime * 0.5;
    
    // Slow organic waves
    float wave = sin(uv.x * 10.0 + time) * 0.1;
    wave += sin(uv.y * 12.0 - time * 0.8) * 0.1;
    
    vec3 color1 = vec3(0.98, 0.97, 0.95); // paper
    vec3 color2 = vec3(0.79, 0.85, 0.86); // water-surface
    
    vec3 finalColor = mix(color1, color2, wave + 0.5);
    gl_FragColor = vec4(finalColor, 0.4);
  }
`;

function WaterShader() {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 }
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[10, 10]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

export function LoadingVisualizer() {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[var(--color-paper)] overflow-hidden">
      {/* Background Shader */}
      <div className="absolute inset-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <WaterShader />
        </Canvas>
      </div>

      <div className="relative z-10 text-center">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-caption mb-4 tracking-[0.4em]"
        >
          Preparing the View
        </motion.p>
        
        {/* Bronze Progress Bar */}
        <div className="w-48 h-[1px] bg-[var(--color-ink-rule)] relative overflow-hidden">
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute inset-0 w-full bg-[var(--color-bronze)]"
          />
        </div>
      </div>
    </div>
  );
}
