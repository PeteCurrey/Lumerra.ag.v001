'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Character Split Reveal
      const chars = headlineRef.current?.querySelectorAll('.char');
      if (chars) {
        gsap.fromTo(chars, 
          { y: 24, opacity: 0 },
          { 
            y: 0, 
            opacity: 1,
            stagger: 0.012,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: '+=30%',
              scrub: true,
            }
          }
        );
      }

      // 2. Parallax Headlines
      gsap.to(headlineRef.current, {
        yPercent: -40,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      // 3. Subheadline Fade-in (delayed)
      gsap.fromTo(subheadlineRef.current, 
        { opacity: 0 },
        { 
          opacity: 1, 
          delay: 0.8, 
          duration: 1, 
          ease: 'power3.out' 
        }
      );

      // 4. CTA Fade-in
      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 10 },
        { 
          opacity: 1, 
          y: 0, 
          delay: 1, 
          duration: 1, 
          ease: 'power3.out' 
        }
      );

      // 5. Video Parallax
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          yPercent: 40,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char inline-block whitespace-pre">
        {char}
      </span>
    ));
  };

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-[var(--color-ink)]">
      {/* Background Video Layer */}
      <div ref={videoRef} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[var(--color-ink)]/40 z-10" />
        <div className="absolute inset-0 opacity-5 z-10 pointer-events-none" style={{ backgroundImage: 'url("/images/noise.png")' }} />
        
        {/* Placeholder for Mux Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/video/hero-loop.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content Layer */}
      <div className="relative z-20 text-center px-6">
        <h1 ref={headlineRef} className="display-96 text-white mb-8">
          {splitText("Light. Water. Stillness.")}
        </h1>
        <p ref={subheadlineRef} className="text-xl text-[var(--color-ink-quiet)] max-w-xl mx-auto mb-12 opacity-0">
          The UK&apos;s first showroom-grade wellness retailer, online.
        </p>
        <div ref={ctaRef} className="flex flex-wrap justify-center gap-12 opacity-0">
          <Link href="/hot-tubs" className="btn btn-bronze-underline text-white uppercase tracking-widest text-xs">
            Explore Hot Tubs
          </Link>
          <Link href="/concierge" className="btn btn-bronze-underline text-white uppercase tracking-widest text-xs">
            Begin with the Concierge
          </Link>
        </div>
      </div>

      {/* Scroll Cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/60 font-medium">Continue</span>
        <div className="w-px h-16 bg-white/20 relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 64] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-[var(--color-bronze)]"
          />
        </div>
      </div>
    </section>
  );
}
