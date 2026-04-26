'use client';

import { useParams } from 'next/navigation';
import { ProductCanvas } from '@/components/visualizer/ProductCanvas';
import { ConfiguratorPanel } from '@/components/visualizer/ConfiguratorPanel';
import { motion } from 'framer-motion';
import { ChevronLeft, Share2, Camera } from 'lucide-react';
import Link from 'next/link';
import { Hotspot } from '@/components/visualizer/Hotspot';

export default function ConfiguratorPage() {
  const { slug } = useParams();

  return (
    <main className="h-screen w-full flex flex-col lg:flex-row bg-[var(--color-paper)] overflow-hidden">
      {/* 3D Visualizer Area (65%) */}
      <div className="relative flex-1 h-[60vh] lg:h-full bg-[#E0D5C3]/20">
        {/* Navigation Overlay */}
        <div className="absolute top-8 left-8 z-20 flex items-center gap-6">
          <Link 
            href={`/products/${slug}`}
            className="flex items-center gap-2 text-caption hover:text-ink transition-colors"
          >
            <ChevronLeft size={16} />
            Back to Details
          </Link>
          <div className="w-[1px] h-4 bg-ink-rule" />
          <p className="text-caption">Configuring Portofino</p>
        </div>

        {/* Action Controls Overlay */}
        <div className="absolute bottom-8 left-8 z-20 flex items-center gap-3">
          <button className="w-12 h-12 bg-white border border-ink-rule flex items-center justify-center hover:bg-paper-sunken transition-colors">
            <Camera size={18} />
          </button>
          <button className="w-12 h-12 bg-white border border-ink-rule flex items-center justify-center hover:bg-paper-sunken transition-colors">
            <Share2 size={18} />
          </button>
        </div>

        {/* The 3D Scene */}
        <ProductCanvas 
          modelUrl="/models/portofino.glb"
          autoRotate={false}
          intensity={1.2}
        >
          {/* Example Hotspots */}
          <Hotspot 
            position={[0.8, 0.5, 0]} 
            label="Massage Jets" 
            description="32 targeted hydrotherapy jets for deep muscle recovery."
          />
          <Hotspot 
            position={[-0.5, 0.8, 0.5]} 
            label="Control Panel" 
            description="Intuitive touchscreen interface with smartphone integration."
          />
        </ProductCanvas>

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-radial-vignette opacity-30" />
      </div>

      {/* Configurator Controls (35%) */}
      <ConfiguratorPanel />
    </main>
  );
}
