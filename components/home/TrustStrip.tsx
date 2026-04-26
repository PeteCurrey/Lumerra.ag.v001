'use client';

import { motion } from 'framer-motion';

export function TrustStrip() {
  return (
    <div className="bg-[var(--color-paper)] relative z-40">
      <div className="container-lumerra py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-wrap justify-center md:justify-between items-center gap-4 md:gap-6"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-[var(--color-ink-muted)] text-center w-full sm:w-auto">WhatSpa? Approved</span>
          <div className="w-1 h-1 rounded-full bg-[var(--color-ink-rule)] hidden lg:block" />
          <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-[var(--color-ink-muted)] text-center w-full sm:w-auto">30-Day In-Home Wet Test</span>
          <div className="w-1 h-1 rounded-full bg-[var(--color-ink-rule)] hidden lg:block" />
          <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-[var(--color-ink-muted)] text-center w-full sm:w-auto">0% Finance Available</span>
          <div className="w-1 h-1 rounded-full bg-[var(--color-ink-rule)] hidden lg:block" />
          <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-[var(--color-ink-muted)] text-center w-full sm:w-auto">Free UK Delivery</span>
        </motion.div>
      </div>
    </div>
  );
}
