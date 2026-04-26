'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function SpecTheatre({ product }: { product: any }) {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const features = [
    { title: `${product.jets || 64} Jets`, desc: 'Eight zones of hydrotherapy, precision-tuned for muscle recovery.', image: product.heroImageUrl },
    { title: 'LED Multi-zone', desc: 'Eleven preset moods. Architectural light for the water surface.', image: '/images/hero-poster.jpg' },
    { title: '7-Year Warranty', desc: 'Shell, plumbing, and cabinet — backed by UK-wide support.', image: '/images/categories/hot-tubs.jpg' }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const horizontalLength = trackRef.current?.scrollWidth || 0;
      const windowWidth = window.innerWidth;
      
      gsap.to(trackRef.current, {
        x: -(horizontalLength - windowWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: `+=${horizontalLength}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden py-32 border-y border-[var(--color-ink-rule)]">
      <p className="text-caption mb-12">Spec Theatre</p>
      
      <div ref={trackRef} className="flex flex-nowrap gap-12 lg:gap-24">
        {features.map((feature, i) => (
          <div key={i} className="flex-shrink-0 w-[80vw] lg:w-[40vw]">
             <div className="aspect-[16/10] relative overflow-hidden bg-[var(--color-paper-sunken)] mb-8">
                <Image src={feature.image} alt={feature.title} fill className="object-cover" />
             </div>
             <h3 className="font-display text-2xl mb-4">{feature.title}</h3>
             <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed max-w-sm">
               {feature.desc}
             </p>
          </div>
        ))}
      </div>
    </section>
  );
}
