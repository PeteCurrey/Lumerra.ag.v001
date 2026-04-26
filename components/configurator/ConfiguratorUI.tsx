'use client';

import { CONFIG_OPTIONS } from '@/data/config-options';
import { Check } from 'lucide-react';

interface ConfiguratorUIProps {
  selection: any;
  setSelection: (s: any) => void;
  price: number;
}

export default function ConfiguratorUI({ selection, setSelection, price }: ConfiguratorUIProps) {
  const updateSelection = (key: string, value: any) => {
    setSelection({ ...selection, [key]: value });
  };

  return (
    <div className="h-full flex flex-col bg-white border-l border-[var(--color-ink-rule)] overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="p-8 border-b border-[var(--color-ink-rule)] sticky top-0 bg-white z-10">
        <p className="text-caption text-[var(--color-ink-muted)] mb-2">Step-by-step Configuration</p>
        <div className="flex justify-between items-end">
          <h2 className="display-48">Personalise.</h2>
          <p className="font-mono text-xl">£{price.toLocaleString()}</p>
        </div>
      </div>

      <div className="p-8 space-y-12 pb-32">
        {/* Shell Selection */}
        <section>
          <div className="flex justify-between items-baseline mb-6">
            <h3 className="text-xs uppercase tracking-widest font-medium">01. Shell Colour</h3>
            <span className="text-xs text-[var(--color-ink-muted)]">{selection.shell.name}</span>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {CONFIG_OPTIONS.shell.map((opt) => (
              <button
                key={opt.id}
                onClick={() => updateSelection('shell', opt)}
                className={`aspect-square rounded-full border-2 transition-all flex items-center justify-center ${selection.shell.id === opt.id ? 'border-[var(--color-bronze)] p-1' : 'border-transparent'}`}
              >
                <div 
                  className="w-full h-full rounded-full shadow-inner" 
                  style={{ backgroundColor: opt.color }}
                />
              </button>
            ))}
          </div>
          {/* AI Recommendation */}
          <div className="mt-6 p-4 bg-[var(--color-paper-sunken)] rounded-sm flex items-start gap-3">
             <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-bronze)] mt-1.5" />
             <p className="text-[11px] leading-relaxed text-[var(--color-ink-soft)] italic">
               Claude recommends: <span className="font-medium">{selection.shell.id === 'midnight' ? 'Charcoal Black' : 'Pure Platinum'}</span> cabinet for this shell.
             </p>
          </div>
        </section>

        {/* Cabinet Selection */}
        <section>
          <div className="flex justify-between items-baseline mb-6">
            <h3 className="text-xs uppercase tracking-widest font-medium">02. Cabinet Finish</h3>
            <span className="text-xs text-[var(--color-ink-muted)]">{selection.cabinet.name}</span>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {CONFIG_OPTIONS.cabinet.map((opt) => (
              <button
                key={opt.id}
                onClick={() => updateSelection('cabinet', opt)}
                className={`aspect-square border transition-all flex items-center justify-center ${selection.cabinet.id === opt.id ? 'border-[var(--color-ink)]' : 'border-[var(--color-ink-rule)]'}`}
              >
                <div 
                  className="w-full h-full" 
                  style={{ backgroundColor: opt.color }}
                />
              </button>
            ))}
          </div>
        </section>

        {/* Lighting Selection */}
        <section>
          <div className="flex justify-between items-baseline mb-6">
            <h3 className="text-xs uppercase tracking-widest font-medium">03. Lighting Preset</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {CONFIG_OPTIONS.lighting.map((opt) => (
              <button
                key={opt.id}
                onClick={() => updateSelection('lighting', opt)}
                className={`py-3 px-2 border text-[10px] uppercase tracking-widest transition-all ${selection.lighting.id === opt.id ? 'bg-[var(--color-ink)] text-white' : 'hover:border-[var(--color-ink)]'}`}
              >
                {opt.name}
              </button>
            ))}
          </div>
        </section>

        {/* Add-ons */}
        <section>
           <h3 className="text-xs uppercase tracking-widest font-medium mb-6">04. Enhancements</h3>
           <div className="space-y-3">
              {CONFIG_OPTIONS.addons.map((opt) => (
                <label 
                  key={opt.id} 
                  className="flex items-center justify-between p-4 border border-[var(--color-ink-rule)] cursor-pointer hover:border-[var(--color-ink)] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      className="accent-[var(--color-bronze)]"
                      checked={selection.addons.includes(opt.id)}
                      onChange={(e) => {
                        const newAddons = e.target.checked 
                          ? [...selection.addons, opt.id] 
                          : selection.addons.filter((id: string) => id !== opt.id);
                        updateSelection('addons', newAddons);
                      }}
                    />
                    <span className="text-xs font-medium uppercase tracking-wider">{opt.name}</span>
                  </div>
                  <span className="text-xs font-mono text-[var(--color-ink-muted)]">+£{opt.price}</span>
                </label>
              ))}
           </div>
        </section>
      </div>

      {/* Footer / CTA */}
      <div className="mt-auto p-8 border-t border-[var(--color-ink-rule)] bg-[var(--color-paper-sunken)]">
        <button className="btn btn-primary w-full py-4 text-xs uppercase tracking-widest mb-4">
          Reserve this configuration
        </button>
        <button className="w-full text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors">
          Download Specification PDF
        </button>
      </div>
    </div>
  );
}
