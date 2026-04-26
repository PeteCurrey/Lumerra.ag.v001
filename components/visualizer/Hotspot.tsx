'use client';

import { Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Info } from 'lucide-react';

interface HotspotProps {
  position: [number, number, number];
  label: string;
  description?: string;
  onClick?: () => void;
}

export function Hotspot({ position, label, description, onClick }: HotspotProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <group position={position}>
      <Html center distanceFactor={10}>
        <div className="relative group">
          <motion.button
            onPointerOver={() => setIsHovered(true)}
            onPointerOut={() => setIsHovered(false)}
            onClick={onClick}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.2 }}
            className="w-6 h-6 bg-white border-2 border-bronze rounded-full flex items-center justify-center shadow-lg cursor-pointer"
          >
            <div className="w-2 h-2 bg-bronze rounded-full" />
          </motion.button>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10, x: '-50%' }}
                animate={{ opacity: 1, y: 0, x: '-50%' }}
                exit={{ opacity: 0, y: 10, x: '-50%' }}
                className="absolute bottom-full left-1/2 mb-4 w-48 bg-white p-3 border border-ink-rule shadow-2xl pointer-events-none"
              >
                <p className="text-[10px] uppercase tracking-widest text-ink-quiet mb-1 font-bold">
                  {label}
                </p>
                {description && (
                  <p className="text-[11px] text-ink leading-relaxed">
                    {description}
                  </p>
                )}
                
                {/* Tip arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-b border-r border-ink-rule rotate-45 -translate-y-1" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Html>
    </group>
  );
}
