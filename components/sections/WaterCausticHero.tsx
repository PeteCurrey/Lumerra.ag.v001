'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import * as THREE from 'three';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uIntensity;
  varying vec2  vUv;

  float caustic(vec2 uv, float t) {
    vec2 p = uv * 6.0 - 3.0;
    float c = 1.0;
    for(int i = 0; i < 8; i++) {
      float d = length(p - uMouse * 2.0) * 0.5;
      p = abs(p) / dot(p,p) - 0.9;
      c += sin(length(p) * 8.0 - t * 2.0 + float(i)) * 0.1;
    }
    return c;
  }

  void main() {
    float c = caustic(vUv, uTime) * uIntensity;
    gl_FragColor = vec4(0.78, 0.87, 0.89, c * 0.3);
  }
`;

function CausticPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uIntensity: { value: 1.0 }
  }), []);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: "#hero-canvas-container",
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        uniforms.uIntensity.value = 1.0 - self.progress;
      }
    });
  });

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();
      
      // Smoothly track mouse
      const targetX = (state.mouse.x + 1) / 2;
      const targetY = (state.mouse.y + 1) / 2;
      material.uniforms.uMouse.value.x += (targetX - material.uniforms.uMouse.value.x) * 0.05;
      material.uniforms.uMouse.value.y += (targetY - material.uniforms.uMouse.value.y) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

export function WaterCausticHero() {
  return (
    <section id="hero-canvas-container" className="relative h-screen w-full bg-paper overflow-hidden">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover opacity-80"
        >
          <source src="https://stream.mux.com/6fi9013Zxc9U9p4S9E9U9p4S9E/medium.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-ink/10" />
      </div>

      {/* GLSL Overlay Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <CausticPlane />
        </Canvas>
      </div>

      {/* Content Layer */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="container-lumerra"
        >
          <p className="text-caption mb-6 tracking-[0.4em] text-white">LUMERRA EST. 2026</p>
          <h1 className="display-96 text-white mb-8 max-w-4xl mx-auto">
            Light. Water. <br /> Stillness.
          </h1>
          <div className="flex gap-4 justify-center">
            <button className="btn btn-primary bg-white text-ink hover:bg-paper-raised">
              EXPLORE COLLECTION
            </button>
            <button className="btn btn-outline border-white text-white hover:bg-white/10">
              OUR STORY
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Gradient for Smooth Transition */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-paper to-transparent z-10" />
    </section>
  );
}
