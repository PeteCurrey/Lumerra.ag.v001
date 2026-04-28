'use client';

import { useState } from 'react';
import { EmberVisualizer } from '@/components/visualizer/EmberVisualizer';
import { ModulePicker } from '@/components/ember/ModulePicker';
import { motion } from 'framer-motion';
import { ChevronLeft, Share2, Download, Save } from 'lucide-react';
import Link from 'next/link';

import { Module, ModuleType } from '@/lib/types';

export default function EmberConfigurator() {
  const [modules, setModules] = useState<Module[]>([
    { id: '1', type: 'grill', position: 0 }
  ]);

  const addModule = (type: ModuleType) => {
    const newModule = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      position: modules.length
    };
    setModules([...modules, newModule]);
  };

  const removeModule = (id: string) => {
    setModules(modules.filter(m => m.id !== id).map((m, i) => ({ ...m, position: i })));
  };

  const handleReorder = (newOrder: Module[]) => {
    setModules(newOrder.map((m, i) => ({ ...m, position: i })));
  };

  const totalInvestment = modules.reduce((acc, m) => {
    const prices: Record<string, number> = { grill: 450000, prep: 120000, fridge: 280000, sink: 180000 };
    return acc + (prices[m.type] || 0);
  }, 0);

  return (
    <main className="h-screen w-full flex flex-col lg:flex-row bg-charcoal overflow-hidden text-white">
      <title>Ember | 3D Modular Kitchen Architect</title>
      {/* 3D Visualizer Area (65%) */}
      <div className="relative flex-1 h-[50vh] lg:h-full">
        {/* Navigation Overlay */}
        <div className="absolute top-8 left-8 z-20 flex items-center gap-6">
          <Link 
            href="/ember"
            className="flex items-center gap-2 text-caption text-stone hover:text-white transition-colors"
          >
            <ChevronLeft size={16} />
            Back to Ember
          </Link>
          <div className="w-[1px] h-4 bg-white/10" />
          <p className="text-caption text-white">Architectural Kitchen Builder</p>
        </div>

        {/* The 3D Scene */}
        <EmberVisualizer modules={modules} />

        {/* Bottom Label */}
        <div className="absolute bottom-12 left-12 z-20 flex items-center gap-4">
           <div className="w-12 h-[1px] bg-ember-bronze" />
           <p className="text-caption text-white">MODULAR SYSTEM V1.0</p>
        </div>
      </div>

      {/* Configurator Controls (35%) */}
      <aside className="w-full lg:w-[35%] h-full bg-charcoal-raised border-l border-white/5 flex flex-col">
        <div className="p-8 lg:p-12 overflow-y-auto flex-1">
          <header className="mb-12">
            <h2 className="display-48 mb-2">Build</h2>
            <p className="text-stone text-sm">Assemble your bespoke culinary estate module by module.</p>
          </header>

          <ModulePicker 
            modules={modules} 
            onAdd={addModule}
            onRemove={removeModule}
            onReorder={handleReorder}
          />
        </div>

        {/* Sticky Price Footer */}
        <footer className="p-8 lg:p-12 bg-charcoal border-t border-white/5">
          <div className="flex justify-between items-end mb-8">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-stone mb-1">Total Investment</p>
              <p className="display-48 text-white">£{(totalInvestment / 100).toLocaleString()}</p>
            </div>
            <div className="flex gap-2">
               <button className="p-3 border border-white/10 text-white hover:bg-white/5 transition-all">
                 <Save size={18} />
               </button>
               <button className="p-3 border border-white/10 text-white hover:bg-white/5 transition-all">
                 <Download size={18} />
               </button>
            </div>
          </div>

          <button className="btn bg-ember-bronze text-white w-full py-5 text-base tracking-widest hover:bg-ember-bronze/80">
            SAVE SPECIFICATION
          </button>
        </footer>
      </aside>
    </main>
  );
}
