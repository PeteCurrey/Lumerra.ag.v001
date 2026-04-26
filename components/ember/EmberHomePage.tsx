'use client';

import { motion } from 'framer-motion';
import { Flame, Utensils, Zap, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function EmberHomePage() {
  return (
    <div className="min-h-screen bg-[#1A1612] text-[#E8E0D4] selection:bg-[#FF6B35]">
      {/* Ember Hero */}
      <section className="relative h-[100vh] w-full flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/ember/hero-fire.jpg')] bg-cover bg-center opacity-40 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A1612]/20 to-[#1A1612]" />
        
        <div className="container-lumerra relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6B35] mb-8 font-bold">The Outdoor Cooking Authority</p>
            <h1 className="text-[120px] font-display italic leading-[0.9] mb-12">Fire. Feast. <br/> Gather.</h1>
            <p className="text-xl max-w-xl italic opacity-70 mb-12 leading-relaxed">
              Precision engineered grills and outdoor kitchens. For the hosts who take the fire seriously.
            </p>
            <div className="flex gap-6">
               <button className="bg-[#FF6B35] text-white py-6 px-16 text-xs uppercase tracking-widest font-bold hover:bg-[#FF8B5E] transition-colors">
                 Explore The Range
               </button>
               <button className="border border-white/20 py-6 px-16 text-xs uppercase tracking-widest font-bold hover:bg-white/5 transition-colors">
                 Design Your Kitchen
               </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
           <span className="text-[10px] uppercase tracking-widest">Scroll to ignite</span>
           <div className="w-px h-12 bg-white" />
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-32 container-lumerra">
        <div className="grid md:grid-cols-3 gap-8">
           {[
             { name: 'Grills & Smokers', slug: 'grills', image: '/images/ember/cat-grills.jpg' },
             { name: 'Pizza Ovens', slug: 'pizza-ovens', image: '/images/ember/cat-pizza.jpg' },
             { name: 'Fire & Heat', slug: 'fire-pits', image: '/images/ember/cat-fire.jpg' },
           ].map((cat, i) => (
             <div key={i} className="group relative aspect-[3/4] bg-[#2A241D] overflow-hidden border border-white/5">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-1000 group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-10 left-10">
                   <h3 className="text-3xl font-display italic mb-4">{cat.name}</h3>
                   <span className="text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 group-hover:text-[#FF6B35] transition-colors">
                     Shop Category <ArrowRight size={14} />
                   </span>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-32 bg-[#2A241D]/50 border-y border-white/5">
         <div className="container-lumerra grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
               <h2 className="text-6xl font-display italic leading-tight">Built to last <br/> a thousand feasts.</h2>
               <div className="grid grid-cols-2 gap-12">
                  <div className="space-y-4">
                     <Utensils size={24} className="text-[#FF6B35]" />
                     <h4 className="text-xs uppercase tracking-widest font-bold">Restaurant Grade</h4>
                     <p className="text-xs opacity-60 leading-relaxed">304 Stainless steel construction for lifetime durability in the British climate.</p>
                  </div>
                  <div className="space-y-4">
                     <Zap size={24} className="text-[#FF6B35]" />
                     <h4 className="text-xs uppercase tracking-widest font-bold">Precision Heat</h4>
                     <p className="text-xs opacity-60 leading-relaxed">Dual-walled insulation and precise vent control for total thermal mastery.</p>
                  </div>
               </div>
            </div>
            <div className="aspect-square bg-black/40 border border-white/5 relative">
               <img src="/images/ember/detail-kamado.jpg" alt="Detail" className="w-full h-full object-cover grayscale opacity-60" />
            </div>
         </div>
      </section>
    </div>
  );
}
