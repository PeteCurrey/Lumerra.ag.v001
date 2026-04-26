import { Metadata } from 'next';
import Image from 'next/image';
import { ChevronLeft, Maximize, Share, MapPin, Trees } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return {
    title: `Inspiration: ${params.slug.replace('-', ' ')} | Grove`,
    description: 'Cinematic garden room projects and architectural sanctuaries.',
  };
}

export default function InspirationPage({ params }: { params: { slug: string } }) {
  return (
    <article className="bg-forest-wash text-forest min-h-screen">
      {/* Immersive Header */}
      <header className="relative h-screen w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           <Image 
             src="/images/categories/saunas.jpg" 
             alt="Case Study" 
             fill 
             className="object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-forest-wash/90 via-forest-wash/40 to-transparent" />
        </div>
        
        <div className="container-lumerra relative z-10">
           <Link 
             href="/grove"
             className="inline-flex items-center gap-2 text-caption text-forest hover:text-forest-light transition-colors mb-12"
           >
             <ChevronLeft size={16} />
             Inspiration Gallery
           </Link>
           
           <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-8">
                 <div className="px-3 py-1 bg-forest text-white text-[9px] font-bold tracking-widest uppercase">
                   PROJECT 08/12
                 </div>
                 <div className="flex items-center gap-2 text-[9px] font-bold tracking-widest uppercase text-forest-light">
                   <MapPin size={12} />
                   COTSWOLDS, UK
                 </div>
              </div>
              <h1 className="display-96 mb-8 leading-none">
                The Glass <br /><span className="italic text-forest-light">Observatory.</span>
              </h1>
              <p className="text-xl text-forest max-w-xl leading-relaxed mb-12">
                A 32m² sanctuary designed for a writer in the heart of the Cotswolds. Integrated with an ancient oak landscape using cantilevering foundations and charcoal cedar.
              </p>
              
              <div className="flex gap-12">
                 <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-forest-light mb-1">Architecture</span>
                    <span className="text-sm font-bold uppercase tracking-widest">Grove Bespoke</span>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-forest-light mb-1">Year</span>
                    <span className="text-sm font-bold uppercase tracking-widest">2025</span>
                 </div>
              </div>
           </div>
        </div>
      </header>

      {/* Masonry Image Grid */}
      <section className="section-padding">
        <div className="container-lumerra">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 aspect-[16/10] relative overflow-hidden group">
                 <Image src="/images/categories/saunas.jpg" alt="Detail 1" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                 <div className="absolute inset-0 bg-forest/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize className="text-white" size={32} />
                 </div>
              </div>
              <div className="lg:col-span-4 aspect-square relative overflow-hidden group">
                 <Image src="/images/categories/saunas.jpg" alt="Detail 2" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
              </div>
              
              <div className="lg:col-span-4 aspect-square relative overflow-hidden group">
                 <Image src="/images/categories/saunas.jpg" alt="Detail 3" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
              </div>
              <div className="lg:col-span-8 aspect-[16/10] relative overflow-hidden group">
                 <Image src="/images/categories/saunas.jpg" alt="Detail 4" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
              </div>
           </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="section-padding bg-white border-y border-forest/5">
        <div className="container-lumerra">
           <div className="max-w-4xl mx-auto">
              <h2 className="display-64 mb-12 text-forest">Dissolving <br /><span className="italic text-forest-light">the Wall.</span></h2>
              <div className="grid md:grid-cols-2 gap-16">
                 <p className="text-lg text-forest leading-relaxed font-light">
                   The challenge for this project was the preservation of a 200-year-old oak tree. Instead of standard foundations, we utilized a screw-pile system that bridges over the root network, allowing the structure to "hover" above the forest floor.
                 </p>
                 <p className="text-lg text-forest leading-relaxed font-light">
                    Internal finishes were kept minimal—oaked floors and slate surfaces—to ensure the external landscape remained the primary focus. Full-height sliding doors allow the entire south-facing wall to vanish.
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-24 bg-forest text-white">
         <div className="container-lumerra text-center">
            <h3 className="display-48 mb-8">Ready to Architect Your Sanctuary?</h3>
            <div className="flex justify-center gap-6">
               <Link href="/configurator/grove" className="btn bg-white text-forest px-10 py-4 text-xs tracking-widest font-bold hover:bg-forest-light hover:text-white">
                 LAUNCH SITE PLANNER
               </Link>
               <button className="btn border-white/20 text-white px-10 py-4 text-xs tracking-widest font-bold hover:bg-white/10">
                 DOWNLOAD PORTFOLIO
               </button>
            </div>
         </div>
      </footer>
    </article>
  );
}
