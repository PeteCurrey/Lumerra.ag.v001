'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

const BLOB_SHAPES = [
  "M 0,0 Q 50,10 100,0 Q 110,50 100,100 Q 50,90 0,100 Q -10,50 0,0",
  "M 0,0 Q 30,20 100,0 Q 80,60 100,100 Q 40,80 0,100 Q 20,40 0,0",
  "M 0,0 Q 70,15 100,0 Q 120,40 100,100 Q 60,85 0,100 Q -20,60 0,0"
];

export function LiquidTransition() {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!overlayRef.current || !pathRef.current) return;

    const startTransition = () => {
      setIsTransitioning(true);
      const randomShape = (BLOB_SHAPES[Math.floor(Math.random() * BLOB_SHAPES.length)] || BLOB_SHAPES[0]) as string;

      const tl = gsap.timeline({
        onComplete: () => setIsTransitioning(false)
      });

      tl.set(overlayRef.current, { visibility: 'visible', opacity: 1 })
        .fromTo(pathRef.current, 
          { attr: { d: "M 0,0 Q 50,0 100,0 Q 100,0 100,0 Q 50,0 0,0 Q 0,0 0,0" } },
          { attr: { d: randomShape }, duration: 0.35, ease: "power4.in" }
        )
        .to(pathRef.current, 
          { attr: { d: "M 0,100 Q 50,100 100,100 Q 100,100 100,100 Q 50,100 0,100 Q 0,100 0,100" }, 
            duration: 0.35, 
            ease: "power4.out" 
          }
        )
        .set(overlayRef.current, { visibility: 'hidden', opacity: 0 });
    };

    startTransition();
  }, [pathname]);

  return (
    <div 
      ref={overlayRef} 
      className="fixed inset-0 z-[9999] pointer-events-none visibility-hidden"
    >
      <svg 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none" 
        className="w-full h-full fill-[var(--color-ink)]"
      >
        <path ref={pathRef} d="" />
      </svg>
    </div>
  );
}
