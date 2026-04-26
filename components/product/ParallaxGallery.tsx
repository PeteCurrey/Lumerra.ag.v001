'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxGalleryProps {
  productImage: string;
  backgroundImage: string;
}

export function ParallaxGallery({ productImage, backgroundImage }: ParallaxGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Scroll-driven parallax
    const layers = containerRef.current.querySelectorAll('.parallax-layer');
    const velocities = [0.3, 0.7, 1.1, 1.3, 0]; // Y-translation speeds

    layers.forEach((layer, i) => {
      gsap.to(layer, {
        y: (i === 2 ? -100 : 100) * velocities[i], // Steam (index 2) moves upward
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // Mouse-driven 3D tilt (Desktop only)
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(layersRef.current, {
        rotateY: x * 6,
        rotateX: -y * 6,
        duration: 0.8,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[120vh] overflow-hidden bg-paper-sunken perspective-1000"
    >
      <div ref={layersRef} className="relative w-full h-full transform-style-3d">
        {/* Layer 1: Background */}
        <div className="parallax-layer absolute inset-0 z-0 scale-110">
          <Image 
            src={backgroundImage} 
            alt="Environment" 
            fill 
            className="object-cover opacity-60"
          />
        </div>

        {/* Layer 2: Product */}
        <div className="parallax-layer absolute inset-0 z-10 flex items-center justify-center p-24">
          <div className="relative w-full h-full max-w-5xl">
            <Image 
              src={productImage} 
              alt="Product" 
              fill 
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Layer 3: Steam Particles (Animated) */}
        <div className="parallax-layer absolute inset-0 z-20 pointer-events-none opacity-40">
          <div className="w-full h-full bg-[url('/images/fx/steam.png')] bg-repeat-x animate-steam-drift" />
        </div>

        {/* Layer 4: Foreground Rim */}
        <div className="parallax-layer absolute inset-x-0 bottom-0 h-1/3 z-30 bg-gradient-to-t from-paper to-transparent" />

        {/* Layer 5: Vignette Gradient */}
        <div className="absolute inset-0 z-40 pointer-events-none bg-radial-vignette opacity-40" />
      </div>

      {/* Floating Product Name */}
      <div className="absolute bottom-12 right-12 z-50 text-right">
        <p className="text-caption tracking-[0.3em] mb-2">DETAILED VIEW</p>
        <p className="display-48 text-ink">PORTOFINO</p>
      </div>
    </div>
  );
}
