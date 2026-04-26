import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Layout, Zap, ShieldCheck } from 'lucide-react';
import { TextReveal } from '@/components/ui/TextReveal';

export const metadata: Metadata = {
  title: 'Ember — The Architecture of Outdoor Living',
  description: 'Premium modular outdoor kitchens. Charcoal cabinetry, dekton stone surfaces, and professional-grade appliances. Designed for the architectural garden.',
};

export default function EmberPage() {
  return (
    <div className="bg-charcoal text-white min-h-screen">
      {/* Cinematic Hero */}
      <section className="relative h-screen w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
           <Image 
             src="/images/categories/kitchens.jpg" 
             alt="Ember Outdoor Kitchen" 
             fill 
             className="object-cover"
             priority
           />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent z-10" />
        
        <div className="container-lumerra relative z-20">
          <div className="max-w-4xl">
            <p className="text-caption text-ember-bronze mb-6 tracking-[0.4em]">EMBER — OUTDOOR KITCHENS</p>
            <h1 className="display-96 mb-8">Fire. Stone. <br /><span className="italic">Refined.</span></h1>
            <p className="text-xl text-stone max-w-2xl leading-relaxed mb-12">
              Bespoke outdoor culinary spaces that bridge the gap between architectural restraint and gastronomic excellence. Modular by design, eternal by nature.
            </p>
            <div className="flex gap-6">
               <Link href="/configurator/ember" className="btn bg-ember-bronze text-white px-10 py-5 tracking-widest text-sm hover:bg-ember-bronze/80">
                 BUILD YOUR SPECIFICATION
               </Link>
               <button className="btn border-white/20 text-white px-10 py-5 tracking-widest text-sm hover:bg-white/5">
                 VIEW THE COLLECTION
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modular Philosophy */}
      <section className="section-padding border-y border-white/5">
        <div className="container-lumerra">
           <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div>
                 <TextReveal 
                   text="A modular system for the modern estate." 
                   className="display-64 mb-8"
                 />
                 <p className="text-lg text-stone leading-relaxed mb-12">
                   The Ember modular system allows for infinite scalability. Start with a flagship grill module and expand into integrated refrigeration, preparation stations, and stone bar seating. Each component is engineered to withstand the British elements without compromising on tactile luxury.
                 </p>
                 
                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <Layout className="text-ember-bronze" size={24} />
                       <h4 className="text-sm font-bold tracking-widest uppercase">Precision Fit</h4>
                       <p className="text-xs text-stone/60">Zero-clearance module snapping for a seamless monolithic look.</p>
                    </div>
                    <div className="space-y-3">
                       <ShieldCheck className="text-ember-bronze" size={24} />
                       <h4 className="text-sm font-bold tracking-widest uppercase">Lifetime Shell</h4>
                       <p className="text-xs text-stone/60">Marine-grade 316 stainless steel cabinetry with charcoal powder-coating.</p>
                    </div>
                 </div>
              </div>
              
              <div className="relative aspect-[4/5] bg-charcoal-raised border border-white/5 group overflow-hidden">
                 <Image 
                   src="/images/products/santorini-hero.jpeg" 
                   alt="Module Detail" 
                   fill 
                   className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent opacity-60" />
                 <div className="absolute bottom-12 left-12">
                    <p className="text-[10px] uppercase tracking-widest text-ember-bronze mb-1">Detail 01</p>
                    <p className="text-xl font-medium">Dekton® Stone Surfaces</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 3D Visualizer CTA */}
      <section className="relative py-48 overflow-hidden">
         <div className="absolute inset-0 bg-[url('/images/fx/grid.svg')] opacity-5" />
         <div className="container-lumerra text-center relative z-10">
            <h2 className="display-80 mb-8">Architect Your Space.</h2>
            <p className="text-stone max-w-xl mx-auto mb-12">
              Use our bespoke 3D configurator to visualize your kitchen in real-time. Select modules, swap stone finishes, and receive a detailed specification in minutes.
            </p>
            <Link 
              href="/configurator/ember" 
              className="inline-flex items-center gap-4 text-ember-bronze text-sm font-bold tracking-widest group"
            >
              LAUNCH 3D VISUALIZER
              <div className="w-12 h-12 rounded-full border border-ember-bronze flex items-center justify-center group-hover:bg-ember-bronze group-hover:text-white transition-all">
                <ChevronRight size={18} />
              </div>
            </Link>
         </div>
      </section>
    </div>
  );
}
