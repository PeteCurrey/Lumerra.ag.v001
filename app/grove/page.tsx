import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Trees, Compass, Ruler, ArrowRight, Shield, Maximize2 } from 'lucide-react';
import { TextReveal } from '@/components/ui/TextReveal';

export const metadata: Metadata = {
  title: 'Grove — Architectural Garden Sanctuaries',
  description: 'Premium garden rooms and studios. Clad in charred cedar, fitted with floor-to-ceiling glass. Integrated with your landscape through bespoke 3D site planning.',
};

export default function GrovePage() {
  return (
    <div className="bg-forest-wash text-forest min-h-screen">
      {/* Immersive Hero */}
      <section className="relative h-screen w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           <Image 
             src="/images/categories/saunas.jpg" 
             alt="Grove Sanctuary" 
             fill 
             className="object-cover"
             priority
           />
           <div className="absolute inset-0 bg-gradient-to-t from-forest-wash via-transparent to-transparent" />
        </div>
        
        <div className="container-lumerra relative z-10">
          <div className="max-w-4xl bg-white/20 backdrop-blur-xl p-12 lg:p-24 border border-white/30 shadow-2xl">
            <p className="text-caption text-forest mb-6 tracking-[0.4em]">GROVE — GARDEN ARCHITECTURE</p>
            <h1 className="display-96 mb-8 text-forest">The Room <br /><span className="italic text-forest-light">in the Wild.</span></h1>
            <p className="text-xl text-forest leading-relaxed mb-12 max-w-xl">
              Bespoke garden sanctuaries that dissolve the boundary between interior luxury and the raw beauty of your landscape. Charred cedar. Full-height glass. Eternal stillness.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
               <Link href="/configurator/grove" className="btn bg-forest text-white px-10 py-5 tracking-widest text-sm hover:bg-forest-light">
                 START YOUR SITE PLAN
               </Link>
               <button className="btn border-forest/20 text-forest px-10 py-5 tracking-widest text-sm hover:bg-white/50">
                 VIEW THE PORTFOLIO
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding bg-white">
        <div className="container-lumerra">
           <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div className="relative aspect-square bg-grove-stone overflow-hidden">
                 <Image 
                   src="/images/categories/saunas.jpg" 
                   alt="Architecture Detail" 
                   fill 
                   className="object-cover opacity-90" 
                 />
                 <div className="absolute inset-0 border-[24px] border-white/20" />
              </div>
              
              <div>
                 <TextReveal 
                   text="Integrated by Design." 
                   className="display-64 mb-8 text-forest"
                 />
                 <p className="text-lg text-forest leading-relaxed mb-12">
                   Grove structures are not merely placed; they are curated. Every sanctuary is orientated to maximize natural light and capture specific viewpoints within your garden. Our charred cedar cladding uses the ancient Japanese technique of Shou Sugi Ban for natural weather resistance and a deep, obsidian aesthetic.
                 </p>
                 
                 <div className="space-y-8">
                    {[
                      { icon: Compass, title: 'Solar Orientation', desc: 'Calculated positioning for optimal thermal performance.' },
                      { icon: Ruler, title: 'Bespoke Footprint', desc: 'Millimetre-perfect sizing to fit your specific garden plot.' },
                      { icon: Shield, title: 'Structural Integrity', desc: 'Fully insulated, multi-layer wall systems for year-round use.' },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-6 items-start">
                         <div className="w-10 h-10 border border-forest/10 flex items-center justify-center flex-shrink-0">
                            <item.icon size={18} className="text-forest" />
                         </div>
                         <div>
                            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-1">{item.title}</h4>
                            <p className="text-sm text-forest/60">{item.desc}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Site Planner Preview */}
      <section className="section-padding bg-forest text-white overflow-hidden">
         <div className="container-lumerra">
            <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-24">
               <div className="max-w-2xl">
                  <h2 className="display-80 mb-6">Visualise <br /><span className="italic text-forest-light">the Placement.</span></h2>
                  <p className="text-forest-light text-lg">
                    Use our 3D Site Planner to move, rotate, and scale your sanctuary on a virtual plot. Understand shadows, sightlines, and scale before we break ground.
                  </p>
               </div>
               <Link href="/configurator/grove" className="btn bg-forest-light text-white px-12 py-5 tracking-widest text-sm hover:bg-white hover:text-forest">
                 LAUNCH SITE PLANNER
               </Link>
            </div>

            <div className="relative aspect-[21/9] bg-forest-light/10 border border-white/5 flex items-center justify-center group cursor-crosshair">
               <div className="absolute inset-0 opacity-20 bg-[url('/images/fx/grid.svg')] bg-[size:60px_60px]" />
               <div className="relative z-10 text-center">
                  <Maximize2 size={48} className="mx-auto mb-6 text-forest-light group-hover:scale-110 transition-transform" />
                  <p className="text-caption text-white tracking-[0.3em]">INTERACTIVE PLOT BUILDER</p>
               </div>
               
               {/* Decorative Plot Elements */}
               <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/10 rounded-full animate-pulse" />
               <div className="absolute bottom-1/4 right-1/3 w-64 h-64 border border-white/10 rotate-45" />
            </div>
         </div>
      </section>
    </div>
  );
}
