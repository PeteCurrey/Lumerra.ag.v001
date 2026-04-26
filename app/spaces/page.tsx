'use client';

import { motion } from 'framer-motion';
import { lumerraSpaces } from '@/data/spaces';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function SpacesPage() {
  return (
    <main className="min-h-screen pt-32 bg-[var(--color-paper)] pb-24">
      <div className="container-lumerra">
        <div className="mb-20 text-center">
          <p className="text-caption text-[var(--color-bronze)] mb-4">Design Lookbook</p>
          <h1 className="display-80 italic">Lumerra Spaces.</h1>
          <p className="text-sm text-[var(--color-ink-muted)] max-w-xl mx-auto mt-6 italic">
            A curated collection of complete outdoor wellness environments. From urban terraces to expansive country estates.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {lumerraSpaces.map((space, i) => (
            <Link 
              key={space.slug}
              href={`/spaces/${space.slug}`}
              className="group block"
            >
              <div className="aspect-[4/5] relative bg-[var(--color-ink)] overflow-hidden mb-8">
                 <img 
                   src={space.heroImageUrl} 
                   alt={space.title} 
                   className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                 <div className="absolute bottom-8 left-8">
                    <p className="text-[10px] uppercase tracking-widest text-white/60 mb-2 font-bold">{space.category}</p>
                    <h2 className="text-3xl font-display text-white italic">{space.title}</h2>
                 </div>
              </div>
              <div className="flex justify-between items-center px-2">
                 <span className="text-[10px] uppercase tracking-widest font-bold">View The Space</span>
                 <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
