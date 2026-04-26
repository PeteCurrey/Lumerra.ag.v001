'use client';

import { ProductCanvas } from '@/components/visualizer/ProductCanvas';

export default function Test3DPage() {
  return (
    <div className="w-full h-screen bg-[var(--color-paper)]">
      <div className="container-lumerra h-full py-24 flex flex-col">
        <header className="mb-12">
          <h1 className="display-64">3D Visualiser Test</h1>
          <p className="text-ink-muted">Verifying production-grade R3F scene and post-processing.</p>
        </header>

        <div className="flex-1 bg-white border border-ink-rule relative">
          <ProductCanvas 
            autoRotate={true}
          />
          
          <div className="absolute bottom-6 left-6 z-10 bg-white/80 backdrop-blur-sm p-4 border border-ink-rule">
            <p className="text-[10px] uppercase tracking-widest text-ink-quiet mb-1">Status</p>
            <p className="text-xs font-mono">Scene initialized. Waiting for GLB asset.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
