'use client';

import { ArrowRight, Snowflake, Thermometer } from 'lucide-react';
import Link from 'next/link';

export default function NordicCycleCrossSell() {
  return (
    <div className="bg-[var(--color-ink)] text-white p-12 lg:p-20 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-4xl relative z-10">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-bronze-light)] mb-8 font-bold">Recommended Protocol</p>
        <h2 className="display-48 italic mb-10">Complete the Cycle.</h2>
        
        <div className="grid md:grid-cols-2 gap-16 mb-16">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed italic opacity-80">
              Contrast therapy is the deliberate oscillation between intense heat and intentional cold. It is the gold standard of vascular health and metabolic recovery.
            </p>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                 <Thermometer size={16} className="text-red-400" />
                 <span className="text-xs uppercase tracking-widest font-mono">85°C Sauna</span>
              </div>
              <div className="w-8 h-px bg-white/20" />
              <div className="flex items-center gap-2">
                 <Snowflake size={16} className="text-blue-400" />
                 <span className="text-xs uppercase tracking-widest font-mono">4°C Plunge</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 p-8 space-y-6">
             <h3 className="text-xs uppercase tracking-widest font-bold">The Benefit</h3>
             <p className="text-[11px] leading-relaxed opacity-60">
               Alternating between the sauna and cold plunge triggers &quot;vascular gymnastics&quot; — the rapid expansion and contraction of blood vessels that strengthens the cardiovascular system and flushes the lymphatic system.
             </p>
          </div>
        </div>

        <Link 
          href="/cold-plunge" 
          className="btn btn-primary bg-white text-black hover:bg-[var(--color-bronze-light)] border-none py-5 px-12 text-xs uppercase tracking-widest gap-4"
        >
          Explore Cold Plunge Range
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
