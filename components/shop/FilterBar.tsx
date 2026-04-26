'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';

export function FilterBar() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.6;
      setIsSticky(window.scrollY > heroHeight - 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filters = [
    { name: 'Brand', options: ['Platinum Spas', 'AquaSolus', 'Portcril'] },
    { name: 'Range', options: ['Deluxe', 'Premium', 'Luxury', 'Vacation'] },
    { name: 'Size', options: ['3–4 person', '5 person', '6 person', '7+ person'] },
    { name: 'Power', options: ['13A', '32A', 'Hardwired'] },
    { name: 'Price', options: ['Under £7k', '£7k–£10k', '£10k+'] },
  ];

  return (
    <div className={`w-full z-[var(--z-sticky)] transition-all duration-300 ${isSticky ? 'fixed top-20 bg-white/90 backdrop-blur-md border-b border-[var(--color-ink-rule)] shadow-sm' : 'bg-transparent border-b border-[var(--color-ink-rule)]'}`}>
      <div className="container-lumerra py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-[var(--color-ink)] font-medium text-sm">
             <SlidersHorizontal size={16} />
             <span>Filters</span>
          </div>
          
          <nav className="hidden lg:flex items-center gap-6">
            {filters.map((filter) => (
              <button 
                key={filter.name}
                className="flex items-center gap-1 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors group"
              >
                {filter.name}
                <ChevronDown size={14} className="opacity-40 group-hover:opacity-100" />
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
           <span className="text-[10px] uppercase tracking-widest text-[var(--color-ink-quiet)]">Sort by:</span>
           <button className="text-sm font-medium flex items-center gap-1">
             Recommended
             <ChevronDown size={14} />
           </button>
        </div>
      </div>
    </div>
  );
}
