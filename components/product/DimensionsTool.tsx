'use client';

import { useState } from 'react';
import { Ruler, CheckCircle2 } from 'lucide-react';

export function DimensionsTool({ product }: { product: any }) {
  const [gardenW, setGardenW] = useState('');
  const [gardenD, setGardenD] = useState('');
  const [fits, setFits] = useState<boolean | null>(null);

  const checkFit = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseInt(gardenW);
    const d = parseInt(gardenD);
    const prodW = (product.dimensionsMm?.width || 2000) / 1000;
    const prodL = (product.dimensionsMm?.length || 2000) / 1000;
    
    // Check if product fits with 1m clearance on all sides
    if (w >= prodW + 2 && d >= prodL + 2) {
      setFits(true);
    } else {
      setFits(false);
    }
  };

  return (
    <section className="py-24 border-b border-[var(--color-ink-rule)]">
      <div className="grid lg:grid-cols-2 gap-24 items-start">
        {/* SVG Diagram */}
        <div className="bg-[var(--color-paper-sunken)] aspect-square p-12 flex flex-col items-center justify-center relative">
          <p className="absolute top-8 left-8 text-caption">Top-down View (mm)</p>
          <div 
            className="border-2 border-[var(--color-bronze)] relative flex items-center justify-center"
            style={{ 
              width: '70%', 
              aspectRatio: `${product.dimensionsMm?.width || 1} / ${product.dimensionsMm?.length || 1}` 
            }}
          >
             <span className="font-mono text-xs text-[var(--color-bronze)]">
               {product.dimensionsMm?.width || 0} x {product.dimensionsMm?.length || 0}
             </span>
             {/* Dimension lines */}
             <div className="absolute -left-8 top-0 bottom-0 w-px bg-[var(--color-ink-rule)] flex items-center">
                <span className="absolute -left-12 rotate-[-90deg] text-[10px] font-mono">{product.dimensionsMm?.length || 0}mm</span>
             </div>
             <div className="absolute -top-8 left-0 right-0 h-px bg-[var(--color-ink-rule)] flex justify-center">
                <span className="absolute -top-6 text-[10px] font-mono">{product.dimensionsMm?.width || 0}mm</span>
             </div>
          </div>
        </div>

        {/* Fitting Tool */}
        <div className="space-y-12">
          <div>
            <h3 className="display-48 mb-6">Will it fit?</h3>
            <p className="text-[var(--color-ink-soft)] leading-relaxed">
              Enter your available space dimensions below. We recommend at least 1m of clearance on all sides 
              for access, maintenance, and airflow.
            </p>
          </div>

          <form onSubmit={checkFit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-medium">Garden Width (m)</label>
                <input 
                  type="number" 
                  value={gardenW}
                  onChange={(e) => setGardenW(e.target.value)}
                  placeholder="e.g. 5"
                  className="w-full bg-transparent border-b border-[var(--color-ink-rule)] py-3 focus:border-[var(--color-bronze)] outline-none font-mono"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-medium">Garden Depth (m)</label>
                <input 
                  type="number" 
                  value={gardenD}
                  onChange={(e) => setGardenD(e.target.value)}
                  placeholder="e.g. 4"
                  className="w-full bg-transparent border-b border-[var(--color-ink-rule)] py-3 focus:border-[var(--color-bronze)] outline-none font-mono"
                />
              </div>
            </div>
            <button className="btn btn-outline w-full flex items-center gap-2">
              <Ruler size={16} /> Check Clearance
            </button>
          </form>

          {fits !== null && (
            <div className={`p-6 border ${fits ? 'border-[var(--color-success)] bg-[var(--color-success)]/5' : 'border-[var(--color-error)] bg-[var(--color-error)]/5'} flex items-start gap-4 animate-in fade-in slide-in-from-top-4`}>
              {fits ? (
                <>
                  <CheckCircle2 className="text-[var(--color-success)] mt-1" size={20} />
                  <div>
                    <p className="font-medium text-[var(--color-success)]">Architectural fit confirmed.</p>
                    <p className="text-sm text-[var(--color-ink-soft)]">This model fits with the recommended 1m service clearance.</p>
                  </div>
                </>
              ) : (
                <div>
                  <p className="font-medium text-[var(--color-error)]">Clearance limited.</p>
                  <p className="text-sm text-[var(--color-ink-soft)]">You may need to consider a smaller model or custom installation options.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
