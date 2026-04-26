'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';

const brands = [
  {
    name: 'Platinum Spas',
    slug: 'platinum-spas',
    description: 'British engineering, uncompromised quality.',
  },
  {
    name: 'AquaSolus',
    slug: 'aquasolus',
    description: 'The quiet luxury of the Netherlands.',
  },
  {
    name: 'Portcril',
    slug: 'portcril',
    description: 'European craftsmanship, refined.',
  },
  {
    name: 'Hekla',
    slug: 'hekla',
    description: 'Baltic craft. The sauna as nature intended.',
  },
];

export function BrandMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;

    const ctx = gsap.context(() => {
      const marqueeContent = marqueeRef.current?.querySelector('.marquee-content');
      if (!marqueeContent) return;

      const width = marqueeContent.scrollWidth;
      
      gsap.to(marqueeContent, {
        x: -width / 2,
        duration: 20,
        ease: 'none',
        repeat: -1,
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 bg-[var(--color-paper)] overflow-hidden border-y border-[var(--color-mist)]">
      <div className="container-lumerra mb-16 text-center">
        <p className="caption-amber mb-4">Curated Manufacturers</p>
        <h2 className="display-md text-[var(--color-ink)] mb-6">
          Selected, not stocked.
        </h2>
        <p className="text-[var(--color-graphite)] max-w-2xl mx-auto leading-relaxed">
          Lumerra is the exclusive direct-to-consumer home for Europe&apos;s most considered wellness manufacturers. 
          Each brand is selected for its engineering lineage and aesthetic restraint.
        </p>
      </div>

      <div ref={marqueeRef} className="relative flex whitespace-nowrap">
        <div className="marquee-content flex gap-12 md:gap-24 items-center">
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={`${brand.slug}-${i}`}
              className="group relative flex flex-col items-center gap-4 py-8 px-12 rounded-xl hover:bg-[var(--color-bone)] transition-colors cursor-pointer"
            >
              <span className="font-display text-3xl md:text-5xl text-[var(--color-ink)] opacity-40 group-hover:opacity-100 transition-opacity">
                {brand.name}
              </span>
              
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-[var(--color-ink)] text-[var(--color-bone)] p-6 rounded-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all pointer-events-none z-20 shadow-xl text-center">
                <p className="text-sm font-medium mb-2">{brand.name}</p>
                <p className="text-xs text-[var(--color-stone)] mb-4 leading-relaxed">
                  {brand.description}
                </p>
                <Link
                  href={`/brands/${brand.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--color-amber)]"
                >
                  Discover <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
