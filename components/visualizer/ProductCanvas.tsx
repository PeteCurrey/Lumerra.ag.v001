'use client';

import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  ContactShadows, 
  PerspectiveCamera,
  Stage,
  Bounds,
  Preload,
  useGLTF
} from '@react-three/drei';
import { 
  EffectComposer, 
  SSAO, 
  Bloom, 
  ToneMapping 
} from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';
import { LoadingVisualizer } from './LoadingVisualizer';
import * as THREE from 'three';

interface ProductCanvasProps {
  modelUrl?: string;
  autoRotate?: boolean;
  environment?: string;
  intensity?: number;
  children?: React.ReactNode;
}

function ProductModel({ url }: { url: string }) {
  const [error, setError] = useState(false);
  
  // Try to load the GLTF, catch errors to prevent whole scene crash
  let scene;
  try {
    const gltf = useGLTF(url, true);
    scene = gltf.scene;
  } catch (e) {
    console.error(`Failed to load model: ${url}`, e);
    if (!error) setError(true);
  }
  
  useEffect(() => {
    if (scene) {
      scene.traverse((node) => {
        if ((node as THREE.Mesh).isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  if (error || !scene) {
    return (
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 1, 1]} />
        <meshStandardMaterial 
          color="#D98C5F" 
          wireframe 
          emissive="#D98C5F" 
          emissiveIntensity={0.2} 
        />
      </mesh>
    );
  }

  return <primitive object={scene} />;
}

export function useMaterialSwap() {
  const { scene } = useThree();

  const swapMaterial = async (meshName: string, textureUrls: { albedo: string, normal: string, mr: string }) => {
    const mesh = scene.getObjectByName(meshName) as THREE.Mesh;
    if (!mesh || !mesh.material) return;

    const loader = new THREE.TextureLoader();
    const [albedo, normal, mr] = await Promise.all([
      loader.loadAsync(textureUrls.albedo),
      loader.loadAsync(textureUrls.normal),
      loader.loadAsync(textureUrls.mr)
    ]);

    // Apply textures
    const material = mesh.material as THREE.MeshStandardMaterial;
    material.map = albedo;
    material.normalMap = normal;
    material.roughnessMap = mr;
    material.metalnessMap = mr;
    material.needsUpdate = true;
  };

  return { swapMaterial };
}

export function ProductCanvas({ 
  modelUrl = '/models/placeholder.glb',
  autoRotate = true,
  environment = 'warehouse',
  intensity = 1,
  children
}: ProductCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const takeSnapshot = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL('image/jpeg', 0.92);
    return dataUrl;
  };

  return (
    <div className="w-full h-full relative">
      <Suspense fallback={<LoadingVisualizer />}>
        <Canvas 
          shadows 
          dpr={[1, 2]} 
          gl={{ preserveDrawingBuffer: true }}
          onCreated={({ gl }) => {
            // @ts-ignore
            canvasRef.current = gl.domElement;
          }}
        >
          <PerspectiveCamera makeDefault fov={35} position={[0, 0.8, 4.5]} />
          
          <ambientLight intensity={0.2} />
          
          <Stage 
            intensity={intensity} 
            environment={environment as any} 
            adjustCamera={false}
            shadows={{ type: 'contact', opacity: 0.35, blur: 2.5 }}
          >
            <Bounds fit clip observe>
              {modelUrl && <ProductModel url={modelUrl} />}
            </Bounds>
            {children}
          </Stage>

          <OrbitControls 
            enableDamping
            dampingFactor={0.05}
            autoRotate={autoRotate}
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
            minDistance={2.5}
            maxDistance={8}
            makeDefault
          />

          <EffectComposer disableNormalPass>
            <SSAO intensity={0.4} radius={0.04} />
            <Bloom intensity={0.12} luminanceThreshold={0.8} />
            <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
          </EffectComposer>

          <Preload all />
        </Canvas>
      </Suspense>
    </div>
  );
}
