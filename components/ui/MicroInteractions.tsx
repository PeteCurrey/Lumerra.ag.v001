'use client';

import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useRef, useEffect } from 'react';

/**
 * 1. Add to Bag Flight
 * Flying thumbnail from product location to cart icon
 */
export function AddToBagFlight({ 
  startX, startY, 
  endX, endY, 
  image, 
  onComplete 
}: { 
  startX: number, startY: number, 
  endX: number, endY: number, 
  image: string, 
  onComplete: () => void 
}) {
  const flightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!flightRef.current) return;

    gsap.fromTo(flightRef.current, 
      { x: startX, y: startY, scale: 1, opacity: 1 },
      { 
        x: endX, 
        y: endY, 
        scale: 0.2, 
        opacity: 0.5, 
        duration: 0.8, 
        ease: "power2.inOut",
        onComplete 
      }
    );
  }, [startX, startY, endX, endY, onComplete]);

  return (
    <div 
      ref={flightRef} 
      className="fixed z-[9999] w-24 h-24 pointer-events-none rounded-lg overflow-hidden border border-bronze"
    >
      <img src={image} className="w-full h-full object-cover" alt="" />
    </div>
  );
}

/**
 * 2. Wishlist Burst
 * SVG heart stroke + radial particle burst
 */
export function WishlistBurst({ active }: { active: boolean }) {
  return (
    <div className="relative w-8 h-8 flex items-center justify-center">
      <motion.svg 
        viewBox="0 0 24 24" 
        className={`w-6 h-6 fill-none stroke-[1.5] ${active ? 'stroke-bronze' : 'stroke-ink-quiet'}`}
      >
        <motion.path 
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          initial={false}
          animate={{ 
            pathLength: active ? 1 : 0.4,
            fill: active ? "rgba(139, 111, 71, 0.2)" : "rgba(0,0,0,0)"
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.svg>

      <AnimatePresence>
        {active && (
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{ 
                  scale: [0, 1, 0],
                  x: Math.cos((i * 45) * Math.PI / 180) * 40,
                  y: Math.sin((i * 45) * Math.PI / 180) * 40
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute left-1/2 top-1/2 w-1 h-1 bg-bronze rounded-full"
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * 3. Numeric Scrub
 * Counting effect for finance prices
 */
export function NumericScrub({ value, duration = 0.8 }: { value: number, duration?: number }) {
  const displayRef = useRef<HTMLSpanElement>(null);
  const prevValue = useRef(value);

  useEffect(() => {
    const obj = { val: prevValue.current };
    gsap.to(obj, {
      val: value,
      duration: duration,
      ease: "power2.out",
      onUpdate: () => {
        if (displayRef.current) {
          displayRef.current.innerText = Math.round(obj.val).toLocaleString();
        }
      }
    });
    prevValue.current = value;
  }, [value, duration]);

  return <span ref={displayRef}>{value.toLocaleString()}</span>;
}

/**
 * 4. Image Zoom
 * Clip-path expansion for gallery images
 */
export function ImageZoom({ src, isOpen, onClose }: { src: string, isOpen: boolean, onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ clipPath: 'inset(10% 10% 10% 10% round 0px)', opacity: 0 }}
          animate={{ clipPath: 'inset(0% 0% 0% 0% round 0px)', opacity: 1 }}
          exit={{ clipPath: 'inset(10% 10% 10% 10% round 0px)', opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[10000] bg-paper-raised flex items-center justify-center p-12"
          onClick={onClose}
        >
          <div className="relative w-full h-full max-w-7xl">
            <img src={src} className="w-full h-full object-contain" alt="Zoomed View" />
          </div>
          <button className="absolute top-8 right-8 text-caption tracking-widest">CLOSE [ESC]</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
