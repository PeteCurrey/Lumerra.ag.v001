'use client';

import { motion } from 'framer-motion';
import { coldPlungeProducts } from '@/data/products';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { Snowflake, Flame, ArrowRight, Wind } from 'lucide-react';
import Link from 'next/link';

export default function ColdPlungePage() {
  return (
    <main className="min-h-screen pt-32 bg-[var(--color-paper)]">
      {/* Editorial Hero */}
      <section className="container-lumerra mb-32">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-caption text-[var(--color-bronze)] mb-6 uppercase tracking-widest">Contrast Therapy</p>
            <h1 className="display-80 italic mb-8">The Nordic Cycle.</h1>
            <p className="text-xl text-[var(--color-ink-soft)] mb-10 leading-relaxed italic">
              From the frozen lakes of Finland to the modern recovery studio. Cold water immersion is the final, essential step in the wellness protocol. 
            </p>
            <div className="flex gap-12 border-t border-[var(--color-ink-rule)] pt-10">
               <div className="flex flex-col gap-2">
                 <span className="text-[10px] uppercase tracking-widest opacity-50 font-bold">Protocol</span>
                 <span className="text-sm font-display">15 min Heat / 3 min Cold</span>
               </div>
               <div className="flex flex-col gap-2">
                 <span className="text-[10px] uppercase tracking-widest opacity-50 font-bold">Target</span>
                 <span className="text-sm font-display">4°C — 15°C</span>
               </div>
               <div className="flex flex-col gap-2">
                 <span className="text-[10px] uppercase tracking-widest opacity-50 font-bold">Benefit</span>
                 <span className="text-sm font-display">Vascular Flush</span>
               </div>
            </div>
          </motion.div>
          <div className="aspect-[4/5] relative bg-[var(--color-ink)] overflow-hidden">
             <img 
               src="/images/editorial/cold-plunge-hero.jpg" 
               alt="Cold Water Recovery" 
               className="w-full h-full object-cover opacity-80"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </div>
      </section>

      {/* The Protocol Section */}
      <section className="bg-[var(--color-ink)] text-white py-32 mb-32">
        <div className="container-lumerra max-w-4xl text-center">
          <h2 className="display-48 mb-12 italic">Why Cold?</h2>
          <div className="grid md:grid-cols-3 gap-12 text-left">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Wind size={20} className="text-[var(--color-bronze-light)]" />
              </div>
              <h3 className="text-xs uppercase tracking-widest font-bold">Norepinephrine</h3>
              <p className="text-xs leading-relaxed opacity-60">Immersion triggers a 200–300% increase in norepinephrine, improving focus and metabolic rate.</p>
            </div>
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Snowflake size={20} className="text-[var(--color-bronze-light)]" />
              </div>
              <h3 className="text-xs uppercase tracking-widest font-bold">Inflammation</h3>
              <p className="text-xs leading-relaxed opacity-60">Rapid vasoconstriction flushes metabolic waste from muscle tissue, accelerating recovery.</p>
            </div>
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Flame size={20} className="text-[var(--color-bronze-light)]" />
              </div>
              <h3 className="text-xs uppercase tracking-widest font-bold">Mitochondria</h3>
              <p className="text-xs leading-relaxed opacity-60">Cold stress stimulates mitochondrial biogenesis, the engine room of cellular energy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="container-lumerra pb-32">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="display-48">The Recovery Range.</h2>
            <p className="text-sm text-[var(--color-ink-muted)] mt-2">Precision systems for every stage of immersion.</p>
          </div>
        </div>
        
        <ProductGrid products={coldPlungeProducts} />
      </section>

      {/* Cross-Sell: The Sauna Pairing */}
      <section className="bg-[var(--color-paper-sunken)] border-t border-[var(--color-ink-rule)] py-32">
        <div className="container-lumerra flex flex-col md:flex-row gap-20 items-center">
           <div className="flex-1">
             <h2 className="display-48 italic mb-8">Better Together.</h2>
             <p className="text-lg text-[var(--color-ink-soft)] italic mb-10 leading-relaxed">
               The true Nordic experience is the transition from heat to cold. Pair your Hekla sauna with a Polar Recovery tub for the complete physiological cycle.
             </p>
             <Link href="/saunas" className="btn btn-primary py-5 px-12 text-xs uppercase tracking-widest flex items-center gap-3 w-fit">
               Explore Saunas
               <ArrowRight size={16} />
             </Link>
           </div>
           <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="aspect-square bg-white border border-[var(--color-ink-rule)]" />
              <div className="aspect-square bg-white border border-[var(--color-ink-rule)]" />
           </div>
        </div>
      </section>
    </main>
  );
}
