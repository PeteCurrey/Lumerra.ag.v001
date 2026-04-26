'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Info, Check } from 'lucide-react';
import { useState } from 'react';

interface Option {
  id: string;
  name: string;
  price: number;
  image?: string;
  color?: string;
}

interface OptionGroup {
  id: string;
  title: string;
  options: Option[];
}

const SAMPLE_GROUPS: OptionGroup[] = [
  {
    id: 'shell',
    title: 'Shell Finish',
    options: [
      { id: 'marble', name: 'Midnight Marble', price: 0, color: '#1A1A1A' },
      { id: 'sterling', name: 'Sterling Silver', price: 0, color: '#D4CFC7' },
      { id: 'pearl', name: 'White Pearl', price: 45000, color: '#FAF7F2' },
    ]
  },
  {
    id: 'cabinet',
    title: 'Cabinetry',
    options: [
      { id: 'grey', name: 'Coastal Grey', price: 0, color: '#6B6B6B' },
      { id: 'walnut', name: 'Dark Walnut', price: 25000, color: '#3D3122' },
      { id: 'cedar', name: 'Natural Cedar', price: 45000, color: '#D9C4A3' },
    ]
  },
  {
    id: 'lighting',
    title: 'LED Lighting',
    options: [
      { id: 'standard', name: 'Standard Halo', price: 0 },
      { id: 'premium', name: 'Multi-Zone RGB', price: 35000 },
    ]
  }
];

export function ConfiguratorPanel() {
  const [selections, setSelections] = useState<Record<string, string>>({
    shell: 'marble',
    cabinet: 'grey',
    lighting: 'standard'
  });

  const totalPrice = 1249900 + Object.entries(selections).reduce((acc, [groupId, optionId]) => {
    const group = SAMPLE_GROUPS.find(g => g.id === groupId);
    const option = group?.options.find(o => o.id === optionId);
    return acc + (option?.price || 0);
  }, 0);

  return (
    <aside className="w-full lg:w-[35%] h-full bg-paper-raised border-l border-ink-rule flex flex-col">
      <div className="p-8 lg:p-12 overflow-y-auto flex-1">
        <header className="mb-12">
          <h2 className="display-48 mb-2">Configure</h2>
          <p className="text-ink-muted text-sm">Tailor every detail of your Lumerra Portofino.</p>
        </header>

        <div className="space-y-12">
          {SAMPLE_GROUPS.map((group) => (
            <section key={group.id}>
              <h3 className="text-caption mb-6">{group.title}</h3>
              <div className="grid grid-cols-1 gap-3">
                {group.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelections(prev => ({ ...prev, [group.id]: option.id }))}
                    className={`group flex items-center justify-between p-4 border transition-all duration-300 ${
                      selections[group.id] === option.id 
                        ? 'border-bronze bg-bronze-wash/20' 
                        : 'border-ink-rule hover:border-ink'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {option.color && (
                        <div 
                          className="w-6 h-6 rounded-full border border-ink-rule" 
                          style={{ backgroundColor: option.color }} 
                        />
                      )}
                      <span className="text-sm font-medium">{option.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {option.price > 0 && (
                        <span className="text-xs text-ink-muted">
                          +£{(option.price / 100).toLocaleString()}
                        </span>
                      )}
                      <div className={`w-4 h-4 border border-ink-rule flex items-center justify-center transition-colors ${
                        selections[group.id] === option.id ? 'bg-bronze border-bronze' : ''
                      }`}>
                        {selections[group.id] === option.id && <Check size={10} className="text-white" />}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Sticky Price Footer */}
      <footer className="p-8 lg:p-12 bg-paper-sunken border-t border-ink-rule">
        <div className="flex justify-between items-end mb-8">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-ink-quiet mb-1">Total Investment</p>
            <p className="display-48">£{(totalPrice / 100).toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-ink-quiet mb-1">Monthly</p>
            <p className="font-mono text-xl">£{((totalPrice * 0.012) / 100).toFixed(2)}</p>
          </div>
        </div>

        <button className="btn btn-primary w-full py-5 text-base tracking-widest">
          SAVE SPECIFICATION
        </button>
      </footer>
    </aside>
  );
}
