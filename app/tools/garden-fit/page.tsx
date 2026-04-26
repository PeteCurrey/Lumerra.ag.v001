'use client';

import { useState } from 'react';
import { Upload, Camera, Ruler, Info } from 'lucide-react';
import Image from 'next/image';

export default function GardenFitPage() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState('Portofino');

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-paper)] pt-32 pb-16">
      <div className="container-lumerra max-w-5xl">
        <div className="mb-16">
           <p className="text-caption mb-4">Garden Fit (v1.0)</p>
           <h1 className="display-64 text-[var(--color-ink)]">Visualise your <br /><span className="italic">evening.</span></h1>
        </div>

        <div className="grid lg:grid-cols-[1fr_350px] gap-16 items-start">
           {/* Visualiser Area */}
           <div className="aspect-[16/10] bg-[var(--color-paper-sunken)] border border-[var(--color-ink-rule)] relative flex flex-col items-center justify-center overflow-hidden">
              {photo ? (
                <>
                  <Image src={photo} alt="Garden" fill className="object-cover" />
                  {/* Calibration Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-48 h-48 border-2 border-[var(--color-bronze)] flex items-center justify-center bg-[var(--color-bronze)]/10 backdrop-blur-sm relative">
                        <span className="font-mono text-[10px] text-[var(--color-bronze)] uppercase font-bold">{selectedProduct}</span>
                        {/* Drag handles (mock) */}
                        <div className="absolute -top-1 -left-1 w-2 h-2 bg-[var(--color-bronze)]" />
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--color-bronze)]" />
                        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[var(--color-bronze)]" />
                        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[var(--color-bronze)]" />
                     </div>
                  </div>
                  <div className="absolute bottom-8 right-8 bg-white/90 p-4 shadow-xl border border-[var(--color-ink-rule)] max-w-xs">
                     <div className="flex gap-3 mb-2">
                        <Info size={16} className="text-[var(--color-bronze)]" />
                        <p className="text-[10px] uppercase tracking-widest font-bold">Calibration</p>
                     </div>
                     <p className="text-[10px] text-[var(--color-ink-muted)] leading-relaxed italic">
                        Move the {selectedProduct} into position. Ensure a 1m clearance from boundaries.
                     </p>
                  </div>
                </>
              ) : (
                <div className="text-center p-12">
                   <Upload size={48} className="mx-auto mb-6 text-[var(--color-ink-quiet)]" />
                   <p className="text-xl mb-8">Upload a photo of your garden space.</p>
                   <label className="btn btn-outline cursor-pointer">
                      Choose Photo
                      <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                   </label>
                   <p className="mt-8 text-[10px] uppercase tracking-widest text-[var(--color-ink-quiet)]">
                      Tip: Stand 3–5m away from the proposed installation site.
                   </p>
                </div>
              )}
           </div>

           {/* Controls */}
           <div className="space-y-12">
              <div className="space-y-4">
                 <label className="text-[10px] uppercase tracking-widest font-bold">Select Model</label>
                 <select 
                   value={selectedProduct} 
                   onChange={(e) => setSelectedProduct(e.target.value)}
                   className="w-full bg-transparent border-b border-[var(--color-ink-rule)] py-3 focus:border-[var(--color-bronze)] outline-none"
                 >
                    <option>Portofino</option>
                    <option>Calma</option>
                    <option>Lounge Divine</option>
                    <option>Chronos Mini Pool</option>
                    <option>Hekla Cube</option>
                 </select>
              </div>

              <div className="space-y-6 pt-8 border-t border-[var(--color-ink-rule)]">
                 <button className="btn btn-primary w-full py-5 flex items-center justify-center gap-3 text-sm uppercase tracking-[0.2em]">
                   Download Report
                 </button>
                 <button className="w-full flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors">
                    <Camera size={14} /> Send to Concierge
                 </button>
              </div>

              <div className="p-6 bg-[var(--color-paper-sunken)] space-y-4">
                 <div className="flex items-center gap-2 text-[var(--color-bronze)]">
                    <Ruler size={16} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Technical Spec</span>
                 </div>
                 <p className="text-[10px] text-[var(--color-ink-muted)] leading-relaxed">
                   The {selectedProduct} requires a level 100mm reinforced concrete base and a 32A dedicated power supply.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
