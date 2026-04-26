'use client';

import { useState, useMemo } from 'react';
import { CONFIG_OPTIONS } from '@/data/config-options';
import Configurator3D from '@/components/configurator/Configurator3D';
import ConfiguratorUI from '@/components/configurator/ConfiguratorUI';
import Link from 'next/link';
import { ArrowLeft, Share2 } from 'lucide-react';

export default function ConfiguratorPage({ product }: { product: any }) {
  const [selection, setSelection] = useState<{
    shell: any;
    cabinet: any;
    lighting: any;
    cover: any;
    addons: string[];
  }>({
    shell: CONFIG_OPTIONS.shell[0],
    cabinet: CONFIG_OPTIONS.cabinet[0],
    lighting: CONFIG_OPTIONS.lighting[0],
    cover: CONFIG_OPTIONS.cover[0],
    addons: [],
  });

  const totalPrice = useMemo(() => {
    const basePrice = (product.price / 100); // Convert pence to pounds
    const addonsPrice = selection.addons.reduce((acc, id) => {
      const opt = CONFIG_OPTIONS.addons.find(a => a.id === id);
      return acc + (opt?.price || 0);
    }, 0);
    
    const shellPrice = selection.shell?.price || 0;
    const cabinetPrice = selection.cabinet?.price || 0;
    const coverPrice = selection.cover?.price || 0;
    
    return basePrice + shellPrice + cabinetPrice + coverPrice + addonsPrice;
  }, [selection, product]);

  const handleShare = () => {
    const params = new URLSearchParams({
      shell: selection.shell.id,
      cabinet: selection.cabinet.id,
      lighting: selection.lighting.id,
      addons: selection.addons.join(','),
    });
    navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
    alert('Configuration link copied to clipboard.');
  };

  return (
    <main className="h-screen w-full flex flex-col lg:flex-row overflow-hidden pt-20">
      {/* 3D Viewport (Left/Top) */}
      <div className="flex-1 relative bg-[var(--color-paper-sunken)]">
        {/* Floating Toolbar */}
        <div className="absolute top-8 left-8 z-10 flex items-center gap-4">
          <Link 
            href={`/products/${product.slug}`}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[var(--color-ink)] hover:scale-110 transition-transform shadow-sm"
          >
            <ArrowLeft size={20} />
          </Link>
          <div className="bg-white px-6 py-3 rounded-full shadow-sm">
            <h1 className="text-sm font-medium uppercase tracking-widest">{product.name} Configurator</h1>
          </div>
        </div>

        <div className="absolute top-8 right-8 z-10">
          <button 
            onClick={handleShare}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[var(--color-ink)] hover:scale-110 transition-transform shadow-sm"
          >
            <Share2 size={18} />
          </button>
        </div>

        <Configurator3D 
          shellColor={selection.shell.color}
          cabinetColor={selection.cabinet.color}
          lightingColor={selection.lighting.color}
        />

        {/* Status Indicators */}
        <div className="absolute bottom-12 left-12 flex gap-12">
           <div>
             <p className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] mb-2">Build Duration</p>
             <p className="text-sm font-medium">8–12 Weeks</p>
           </div>
           <div>
             <p className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] mb-2">Delivery & Install</p>
             <p className="text-sm font-medium">Included</p>
           </div>
        </div>
      </div>

      {/* Control Panel (Right) */}
      <div className="w-full lg:w-[400px] xl:w-[480px] h-full">
        <ConfiguratorUI 
          selection={selection} 
          setSelection={setSelection} 
          price={totalPrice}
        />
      </div>
    </main>
  );
}
