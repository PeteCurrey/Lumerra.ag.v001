'use client';

import { useState } from 'react';
import { SitePlanner } from '@/components/grove/SitePlanner';
import { motion } from 'framer-motion';
import { ChevronLeft, Share2, Download, Map as MapIcon } from 'lucide-react';
import Link from 'next/link';

export default function GroveConfigurator() {
  return (
    <main className="h-screen w-full flex flex-col lg:flex-row bg-forest overflow-hidden text-white">
      <title>Grove | 3D Spatial Planner</title>
      {/* 3D Site Planner Area (70%) */}
      <div className="relative flex-1 h-[60vh] lg:h-full">
        {/* Navigation Overlay */}
        <div className="absolute top-8 left-8 z-20 flex items-center gap-6">
          <Link 
            href="/grove"
            className="flex items-center gap-2 text-caption text-forest-light hover:text-white transition-colors"
          >
            <ChevronLeft size={16} />
            Back to Grove
          </Link>
          <div className="w-[1px] h-4 bg-white/10" />
          <p className="text-caption text-white">Spatial Garden Architect</p>
        </div>

        {/* The 3D Scene */}
        <SitePlanner />

        {/* Bottom Label */}
        <div className="absolute bottom-12 left-12 z-20 flex items-center gap-4">
           <div className="w-12 h-[1px] bg-forest-light" />
           <p className="text-caption text-forest font-bold">SPATIAL PLANNER V1.0</p>
        </div>
      </div>

      {/* Configurator Controls (30%) */}
      <aside className="w-full lg:w-[30%] h-full bg-white text-forest flex flex-col shadow-2xl">
        <div className="p-8 lg:p-12 overflow-y-auto flex-1">
          <header className="mb-12">
            <h2 className="display-48 mb-2">Plan</h2>
            <p className="text-forest/60 text-sm">Position your sanctuary on the virtual estate.</p>
          </header>

          <div className="space-y-12">
             <section>
                <h3 className="text-caption text-forest/40 mb-6">Selected Model</h3>
                <div className="p-6 border border-forest/10 bg-forest-wash flex items-center gap-4">
                   <div className="w-16 h-16 bg-forest rounded-sm" />
                   <div>
                      <p className="text-sm font-bold uppercase tracking-widest">Observatory V1</p>
                      <p className="text-[10px] text-forest/60">Charred Cedar / Glass</p>
                   </div>
                </div>
             </section>

             <section>
                <h3 className="text-caption text-forest/40 mb-6">Site Orientation</h3>
                <div className="space-y-4">
                   <div className="flex justify-between items-center text-xs">
                      <span className="font-bold uppercase tracking-widest">Solar Path</span>
                      <span className="text-forest-light">S/SW Optimal</span>
                   </div>
                   <div className="h-2 bg-forest-wash rounded-full overflow-hidden">
                      <div className="h-full bg-forest w-[75%]" />
                   </div>
                </div>
             </section>
          </div>
        </div>

        {/* Action Footer */}
        <footer className="p-8 lg:p-12 border-t border-forest/5 bg-forest-wash">
          <div className="flex justify-between items-center mb-8">
            <p className="text-[10px] uppercase tracking-widest text-forest/60">Estimated Build</p>
            <p className="text-2xl font-mono font-bold text-forest">£34,500</p>
          </div>

          <button className="btn bg-forest text-white w-full py-5 text-sm tracking-[0.2em] uppercase hover:bg-forest-light">
            REQUEST SITE SURVEY
          </button>
        </footer>
      </aside>
    </main>
  );
}
