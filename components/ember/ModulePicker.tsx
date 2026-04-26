'use client';

import { motion, Reorder } from 'framer-motion';
import { Plus, Trash2, GripVertical, Flame, Refrigerator, Layout, Disc } from 'lucide-react';

const MODULE_TYPES = [
  { id: 'grill', label: 'Pro-Fire Grill', icon: Flame, price: 450000 },
  { id: 'prep', label: 'Preparation Station', icon: Layout, price: 120000 },
  { id: 'fridge', label: 'CoolZone Fridge', icon: Refrigerator, price: 280000 },
  { id: 'sink', label: 'Wet Station', icon: Disc, price: 180000 },
];

interface Module {
  id: string;
  type: string;
  position: number;
}

export function ModulePicker({ 
  modules, 
  onAdd, 
  onRemove,
  onReorder
}: { 
  modules: Module[], 
  onAdd: (type: string) => void,
  onRemove: (id: string) => void,
  onReorder: (modules: Module[]) => void
}) {
  return (
    <div className="space-y-12">
      <section>
        <h3 className="text-caption text-stone mb-6">Available Modules</h3>
        <div className="grid grid-cols-2 gap-3">
          {MODULE_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => onAdd(type.id)}
              className="flex flex-col items-center gap-3 p-4 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-ember-bronze transition-all group"
            >
              <type.icon size={20} className="text-stone group-hover:text-ember-bronze transition-colors" />
              <span className="text-[10px] uppercase tracking-widest font-bold">{type.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-end mb-6">
          <h3 className="text-caption text-stone">Your Configuration</h3>
          <span className="text-[10px] font-mono text-ember-bronze uppercase">Drag to Reorder</span>
        </div>
        
        <Reorder.Group 
          axis="y" 
          values={modules} 
          onReorder={onReorder}
          className="space-y-3"
        >
          {modules.map((module) => (
            <Reorder.Item 
              key={module.id} 
              value={module}
              className="flex items-center gap-4 p-4 bg-charcoal-raised border border-white/5 cursor-grab active:cursor-grabbing"
            >
              <GripVertical size={16} className="text-white/20" />
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-widest">
                  {MODULE_TYPES.find(t => t.id === module.type)?.label}
                </p>
                <p className="text-[10px] text-stone/60">Module Ref: {module.id.slice(0, 8)}</p>
              </div>
              <button 
                onClick={() => onRemove(module.id)}
                className="p-2 text-white/20 hover:text-error transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </Reorder.Item>
          ))}
        </Reorder.Group>
        
        {modules.length === 0 && (
          <div className="py-12 border border-dashed border-white/10 text-center">
            <p className="text-xs text-stone/40 uppercase tracking-widest">Select a module to begin</p>
          </div>
        )}
      </section>
    </div>
  );
}
