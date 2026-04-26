'use client';

import { useRef, useMemo, Suspense, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  Environment, 
  ContactShadows,
  useGLTF,
  Bounds
} from '@react-three/drei';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import * as THREE from 'three';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CINEMA_PANELS = [
  { 
    title: "Sculpted for Stillness", 
    desc: "Every curve is engineered to direct the flow of water around the body, minimizing turbulence and maximizing sensory depth."
  },
  { 
    title: "The Architecture of Heat", 
    desc: "Triple-layered insulation ensures that heat is not just generated, but preserved. An engineering standard that lasts decades."
  },
  { 
    title: "Unrivalled Clarity", 
    desc: "CrystalClear filtration cycles 100% of the water every 15 minutes, maintaining a surgical standard of purity."
  }
];

function CinemaScene() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const [error, setError] = useState(false);
  
  // Define the orbital path
  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(4,  1.5, 0),
    new THREE.Vector3(0,  2,   4),
    new THREE.Vector3(-4, 1.5, 0),
    new THREE.Vector3(0,  1,  -4),
  ]), []);

  let scene;
  try {
    const gltf = useGLTF('/models/portofino.glb', true);
    scene = gltf.scene;
  } catch (e) {
    if (!error) setError(true);
  }

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#cinema-section",
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 0.5,
      }
    });

    tl.to({}, {
      onUpdate: () => {
        if (cameraRef.current) {
          const progress = tl.progress();
          const point = curve.getPoint(progress);
          cameraRef.current.position.copy(point);
          cameraRef.current.lookAt(0, 0.5, 0);
        }
      },
      duration: 1
    });

    // Animate text panels
    CINEMA_PANELS.forEach((_, i) => {
      const panelId = `#cinema-panel-${i}`;
      const start = i * 0.33;
      tl.fromTo(panelId, 
        { opacity: 0, y: 40 }, 
        { opacity: 1, y: 0, duration: 0.1 }, 
        start
      ).to(panelId, 
        { opacity: 0, y: -40, duration: 0.1 }, 
        start + 0.25
      );
    });
  });

  if (error || !scene) {
    return (
      <>
        <PerspectiveCamera ref={cameraRef} makeDefault fov={35} position={[4, 1.5, 0]} />
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[3, 1, 1.5]} />
          <meshStandardMaterial color="#D98C5F" wireframe emissive="#D98C5F" emissiveIntensity={0.2} />
        </mesh>
        <Environment preset="warehouse" />
      </>
    );
  }

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault fov={35} position={[4, 1.5, 0]} />
      <ambientLight intensity={0.5} />
      <Environment preset="warehouse" />
      
      <Bounds fit clip observe>
        <primitive object={scene} />
      </Bounds>

      <ContactShadows opacity={0.4} blur={2} far={10} resolution={256} color="#000000" />
    </>
  );
}

export function ProductCinema() {
  return (
    <section id="cinema-section" className="relative h-screen w-full bg-paper overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Canvas shadows>
            <CinemaScene />
          </Canvas>
        </Suspense>
      </div>

      {/* Overlay Panels */}
      <div className="absolute inset-0 z-10 flex items-center pointer-events-none">
        <div className="container-lumerra">
          <div className="max-w-xl">
            {CINEMA_PANELS.map((panel, i) => (
              <div 
                key={i} 
                id={`cinema-panel-${i}`} 
                className="absolute top-1/2 -translate-y-1/2 opacity-0"
              >
                <h2 className="display-64 mb-6">{panel.title}</h2>
                <p className="text-xl text-ink-soft leading-relaxed">
                  {panel.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Label */}
      <div className="absolute bottom-12 left-12 z-20">
        <p className="text-caption tracking-[0.3em]">ARCHITECTURAL EXPLORATION — PORTOFINO LUXURY</p>
      </div>
    </section>
  );
}
