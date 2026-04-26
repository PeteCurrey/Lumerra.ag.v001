'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function LoadingSplash() {
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Immersion duration: 8.0 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const getBrandInfo = () => {
    if (pathname.includes('/ember')) return { name: 'Ember', tag: 'Fire. Stone. Refined.', sub: 'Architecting heat...' };
    if (pathname.includes('/warmpath')) return { name: 'Warmpath', tag: 'The Future of Domestic Energy', sub: 'Optimizing thermodynamics...' };
    if (pathname.includes('/grove')) return { name: 'Grove', tag: 'Architectural Sanctuaries', sub: 'Planning your landscape...' };
    return { name: 'Lumerra', tag: 'Light. Water. Stillness.', sub: 'Heating the water...' };
  };

  const brand = getBrandInfo();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-[#FAF7F2] flex items-center justify-center overflow-hidden"
        >
          {/* Organic Water Ripples (Grayscale Blend) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 4, ease: "easeOut" }}
            className="absolute inset-0 overflow-hidden"
          >
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-20 mix-blend-multiply"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-water-ripples-on-a-pool-surface-2070-large.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[#8B6F47]/5 mix-blend-overlay" />
          </motion.div>

          <div className="relative z-10 text-center">
            {/* Brand Logo Reveal */}
            <motion.div
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ delay: 1.2, duration: 2, ease: "easeOut" }}
              className="mb-6"
            >
              <h1 className="text-[96px] font-display italic tracking-tighter text-[var(--color-ink)]">
                {brand.name}
              </h1>
            </motion.div>

            {/* Tagline Breathing */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.0, duration: 1.5 }}
            >
              <p className="text-[10px] uppercase tracking-[0.6em] text-[var(--color-bronze)] font-bold">
                {brand.tag}
              </p>
            </motion.div>

            {/* Thin separating line */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 0.3, scaleX: 1 }}
              transition={{ delay: 4.2, duration: 1.5, ease: "easeOut" }}
              className="h-[1px] w-16 bg-[var(--color-bronze)] mx-auto mt-6"
            />

            {/* Brand-specific subtext */}
            <motion.div
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ delay: 5.0, duration: 1.0 }}
            >
              <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--color-ink-quiet)] mt-5 font-mono">
                {brand.sub}
              </p>
            </motion.div>
          </div>

          {/* Minimalist Progress Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 7.5, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-bronze)] origin-left opacity-10"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
