import { Metadata } from 'next';
import Image from 'next/image';
import { ChevronLeft, Share2, BookOpen, Clock } from 'lucide-react';
import Link from 'next/link';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Guide: ${slug.replace('-', ' ')} | Ember`,
    description: 'Mastering the art of outdoor living and culinary architecture.',
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  return (
    <article className="bg-charcoal text-white min-h-screen">
      {/* Editorial Header */}
      <header className="relative h-[70vh] w-full flex items-end pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <Image 
             src="/images/categories/kitchens.jpg" 
             alt="Guide Hero" 
             fill 
             className="object-cover opacity-60"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
        </div>
        
        <div className="container-lumerra relative z-10">
          <Link 
            href="/ember"
            className="inline-flex items-center gap-2 text-caption text-stone hover:text-white transition-colors mb-12"
          >
            <ChevronLeft size={16} />
            Ember Resource Hub
          </Link>
          
          <div className="max-w-4xl">
            <div className="flex items-center gap-6 mb-8 text-[10px] uppercase tracking-[0.3em] text-stone">
               <span className="flex items-center gap-2">
                 <BookOpen size={14} />
                 DESIGN PHILOSOPHY
               </span>
               <span className="flex items-center gap-2">
                 <Clock size={14} />
                 12 MIN READ
               </span>
            </div>
            <h1 className="display-80 mb-0 uppercase leading-none">
              The Architecture <br /> of <span className="italic text-ember-bronze">Fire.</span>
            </h1>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <section className="section-padding">
        <div className="container-lumerra">
           <div className="grid lg:grid-cols-[1fr_300px] gap-24">
              {/* Main Content */}
              <div className="space-y-12">
                 <p className="text-2xl text-stone leading-relaxed font-light">
                   To design an outdoor kitchen is to orchestrate a dialogue between the elemental and the architectural. It is not merely about placement, but about the flow of heat, light, and conversation across a landscape.
                 </p>
                 
                 <div className="aspect-video relative overflow-hidden bg-charcoal-raised border border-white/5">
                    <Image src="/images/categories/kitchens.jpg" alt="Process" fill className="object-cover" />
                 </div>

                 <h2 className="display-48">Modular Scalability</h2>
                 <p className="text-lg text-stone/80 leading-relaxed">
                   The modern estate demands flexibility. Our modular approach allows for a kitchen that evolves with the landscape. From a solitary grill station to a full-service culinary wing with integrated stone bar seating and ambient lighting. 
                 </p>

                 <blockquote className="border-l-2 border-ember-bronze pl-8 py-4 my-16">
                    <p className="text-3xl font-display italic text-white mb-4">
                      "Fire is the original architecture of the home. Outdoors, it becomes the anchor for everything else."
                    </p>
                    <cite className="text-[10px] uppercase tracking-widest text-stone font-bold">
                      — ARTHUR DAVIES, LEAD ARCHITECT
                    </cite>
                 </blockquote>

                 <p className="text-lg text-stone/80 leading-relaxed">
                   Materials matter. The choice between Dekton stone and marine-grade stainless steel isn't just aesthetic—it's a commitment to longevity in the British climate. 
                 </p>
              </div>

              {/* Sidebar Info */}
              <aside className="space-y-12">
                 <div className="bg-charcoal-raised border border-white/5 p-8">
                    <h4 className="text-caption text-ember-bronze mb-6">In this guide</h4>
                    <ul className="space-y-4 text-xs uppercase tracking-widest font-bold">
                       <li className="text-white">01. Site Orientation</li>
                       <li className="text-stone hover:text-white transition-colors cursor-pointer">02. Module Selection</li>
                       <li className="text-stone hover:text-white transition-colors cursor-pointer">03. Stone Durability</li>
                       <li className="text-stone hover:text-white transition-colors cursor-pointer">04. Appliance Integration</li>
                    </ul>
                 </div>

                 <div className="bg-ember-bronze/10 border border-ember-bronze/20 p-8">
                    <h4 className="text-caption text-white mb-4">Ember Bespoke</h4>
                    <p className="text-xs text-stone leading-relaxed mb-6">
                      Ready to start your specification? Launch the 3D builder.
                    </p>
                    <Link href="/configurator/ember" className="btn bg-ember-bronze text-white w-full py-3 text-[10px] tracking-[0.2em] uppercase">
                      LAUNCH BUILDER
                    </Link>
                 </div>
              </aside>
           </div>
        </div>
      </section>

      {/* Footer Nav */}
      <footer className="py-24 border-t border-white/5">
         <div className="container-lumerra">
            <div className="flex justify-between items-center">
               <p className="text-[10px] uppercase tracking-widest text-stone">Up Next: The Decadence of Warmth</p>
               <button className="flex items-center gap-3 text-white hover:text-ember-bronze transition-all group">
                 <span className="text-sm font-bold uppercase tracking-widest">Share Guide</span>
                 <Share2 size={16} className="group-hover:rotate-12 transition-transform" />
               </button>
            </div>
         </div>
      </footer>
    </article>
  );
}
