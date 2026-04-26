'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const panels = [
  {
    title: 'Hot Tubs',
    sub: 'Twenty-three models across four ranges. Engineered in the UK.',
    cta: 'Explore the collection →',
    href: '/hot-tubs',
    image: '/images/categories/hot-tubs.jpg',
  },
  {
    title: 'Swim Spas',
    sub: 'Train, recover, restore. A pool, a gym, a sanctuary.',
    cta: 'Discover swim spas →',
    href: '/swim-spas',
    image: '/images/categories/swim-spas.jpg',
  },
  {
    title: 'Mini Pools',
    sub: 'Architectural water. Built into the landscape.',
    cta: 'View mini pools →',
    href: '/mini-pools',
    image: '/images/categories/mini-pools.jpg',
  },
  {
    title: 'Saunas',
    sub: 'Baltic tradition, in your garden.',
    cta: 'Step into Hekla →',
    href: '/saunas',
    image: '/images/categories/saunas.jpg',
    isSauna: true,
  },
  {
    isManifesto: true,
    title: 'We do not sell products. We sell the hour you take back.',
    sub: 'Lumerra is curated by Avorria, Chesterfield.',
  }
];

export function CategorySelector() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

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
          start: 'top top',
          end: `+=${horizontalLength}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-[var(--color-paper)]">
      <div ref={trackRef} className="flex flex-nowrap w-fit h-screen">
        {panels.map((panel, i) => (
          <div 
            key={i} 
            className={`w-screen h-screen flex-shrink-0 flex flex-col lg:flex-row relative ${panel.isManifesto ? 'bg-[var(--color-paper-deep)]' : ''}`}
          >
            {panel.isManifesto ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-center px-24">
                <h2 className="display-80 text-[var(--color-ink)] mb-12 max-w-5xl leading-tight">
                  {panel.title}
                </h2>
                <p className="text-xl text-[var(--color-ink-muted)] max-w-2xl">
                  {panel.sub}
                </p>
              </div>
            ) : (
              <>
                {/* Image Column (60%) */}
                <div className="w-full lg:w-[60%] h-1/2 lg:h-full relative overflow-hidden">
                   <Image 
                     src={panel.image || '/images/placeholder.jpg'} 
                     alt={panel.title || 'Panel'} 
                     fill 
                     className="object-cover"
                     sizes="60vw"
                   />
                </div>

                {/* Content Column (40%) */}
                <div className={`w-full lg:w-[40%] h-1/2 lg:h-full flex flex-col justify-center p-12 md:p-24 lg:p-32 ${panel.isSauna ? 'bg-[var(--color-paper-sunken)]' : 'bg-[var(--color-paper)]'}`}>
                   <span className="text-caption mb-8">0{i+1} / 05</span>
                   <h2 className="display-64 text-[var(--color-ink)] mb-6">
                     {panel.title}
                   </h2>
                   <p className="text-lg text-[var(--color-ink-muted)] mb-12 leading-relaxed">
                     {panel.sub}
                   </p>
                   <Link 
                     href={panel.href || '#'} 
                     className="group flex items-center gap-4 text-sm font-mono uppercase tracking-[0.2em] text-[var(--color-bronze)] hover:text-[var(--color-bronze-deep)] transition-colors"
                   >
                     {panel.cta}
                   </Link>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
