'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const wellnessPanels = [
  {
    title: 'Sleep',
    body: 'The rapid cooling of core body temperature after a late-evening soak triggers the production of melatonin, the hormone responsible for deep, restorative sleep.',
    citation: 'Mayo Clinic Sleep Study, 2024',
    image: '/images/hero-poster.jpg',
  },
  {
    title: 'Recovery',
    body: 'Warm water immersion at 38°C increases blood flow to muscles by up to 120%, accelerating the removal of lactic acid and reducing post-exercise inflammation.',
    citation: 'Journal of Sports Medicine, 2023',
    image: '/images/categories/swim-spas.jpg',
  },
  {
    title: 'Stillness',
    body: 'The deliberate ritual of the soak reduces cortisol levels by up to 30%, shifting the nervous system from fight-or-flight into the parasympathetic state of rest.',
    citation: 'Harvard Health Publications, 2024',
    image: '/images/wellness-teaser.jpg',
  }
];

export function WellnessStack() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const horizontalLength = trackRef.current?.scrollWidth || 0;
      const windowWidth = window.innerWidth;
      
      // Horizontal Scroll
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

      // Clip Path Reveals
      const images = containerRef.current?.querySelectorAll('.reveal-img');
      images?.forEach((img) => {
        gsap.fromTo(img, 
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            scrollTrigger: {
              trigger: img,
              containerAnimation: gsap.to(trackRef.current, { x: -(horizontalLength - windowWidth) }),
              start: 'left center',
              end: 'right center',
              scrub: true,
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-[var(--color-ink)]">
      <div ref={trackRef} className="flex flex-nowrap w-fit h-screen">
        {wellnessPanels.map((panel, i) => (
          <div 
            key={i} 
            className="w-screen h-screen flex-shrink-0 flex items-center justify-center px-12 md:px-24"
          >
            <div className="grid lg:grid-cols-2 gap-24 items-center max-w-7xl w-full">
               {/* Image with clip-reveal */}
               <div className="relative aspect-[4/5] lg:aspect-square overflow-hidden bg-[var(--color-ink-soft)]">
                  <Image 
                    src={panel.image} 
                    alt={panel.title} 
                    fill 
                    className="reveal-img object-cover"
                    sizes="50vw"
                  />
               </div>

               {/* Text */}
               <div className="text-white">
                 <span className="text-caption text-[var(--color-bronze-light)] mb-8 block">Benefit 0{i+1}</span>
                 <h2 className="display-80 mb-8">{panel.title}</h2>
                 <p className="text-xl text-[var(--color-ink-rule)] leading-relaxed mb-12">
                   {panel.body}
                 </p>
                 <footer className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-quiet)] pt-8 border-t border-white/10">
                   {panel.citation}
                 </footer>
               </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
