'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { AnimatePresence, motion } from 'framer-motion';

const categories = [
  {
    name: 'Hot Tubs',
    href: '/hot-tubs',
    featured: [
      { name: 'Portofino', image: '/images/products/portofino-hero.jpeg' },
      { name: 'Palermo', image: '/images/products/palermo-hero.jpeg' },
    ],
    sections: [
      {
        title: 'BY RANGE',
        links: [
          { name: 'Deluxe (£6,999+)', href: '/hot-tubs/deluxe', image: '/images/products/sicily-hero.jpeg' },
          { name: 'Premium (£7,999+)', href: '/hot-tubs/premium', image: '/images/products/capri-hero.jpeg' },
          { name: 'Luxury (£9,499+)', href: '/hot-tubs/luxury', image: '/images/products/santorini-hero.jpeg' },
          { name: 'Vacation', href: '/hot-tubs/vacation', image: '/images/products/vacation-lounge-hero.jpeg' },
        ],
      },
      {
        title: 'BY SIZE',
        links: [
          { name: '3–4 person', href: '/hot-tubs/by-size/3-4', image: '/images/products/st-tropez-hero.jpeg' },
          { name: '5 person', href: '/hot-tubs/by-size/5', image: '/images/products/capri-hero.jpeg' },
          { name: '6 person', href: '/hot-tubs/by-size/6', image: '/images/products/palermo-hero.jpeg' },
          { name: '7+ person', href: '/hot-tubs/by-size/7-plus', image: '/images/products/santorini-hero.jpeg' },
        ],
      },
      {
        title: 'BY USE',
        links: [
          { name: 'Plug & Play (13A)', href: '/hot-tubs/by-power/13A', image: '/images/products/oslo-hero.jpeg' },
          { name: 'Hardwired (32A)', href: '/hot-tubs/by-power/32A', image: '/images/products/tahiti-hero.jpeg' },
          { name: 'Holiday Lets', href: '/hot-tubs/for/holiday-let', image: '/images/products/calma-hero.jpeg' },
          { name: 'Hydrotherapy', href: '/hot-tubs/by-feature/hydrotherapy', image: '/images/products/aspen-hero.jpeg' },
        ],
      },
    ],
  },
  { name: 'Swim Spas', href: '/swim-spas' },
  { name: 'Mini Pools', href: '/mini-pools' },
  { name: 'Saunas', href: '/saunas' },
  { name: 'Cold Plunge', href: '/cold-plunge' },
  {
    name: 'Wellness Tools',
    href: '#',
    sections: [
      {
        title: 'PLANNING',
        links: [
          { name: 'Wellness ROI Calculator', href: '/tools/wellness-roi', image: '/images/products/hekla-cube-sauna-hero.jpeg' },
          { name: 'Sauna Wellness Plan', href: '/tools/sauna-wellness-plan', image: '/images/products/hekla-barrel-sauna-4-hero.jpeg' },
          { name: 'Garden Visualiser', href: '/tools/garden-visualiser', image: '/images/products/eros-hero.jpeg' },
          { name: 'Holiday Let Projector', href: '/tools/holiday-let-projector', image: '/images/products/vacation-brook-hero.jpeg' },
          { name: 'Wellness Concierge', href: '/concierge', image: '/images/products/chill-tub-original-hero.jpeg' },
          { name: 'Garden Fit Analysis', href: '/tools/garden-fit', image: '/images/products/brook-hero.jpeg' },
        ],
      },
    ],
  },
  {
    name: 'Divisions',
    href: '#',
    sections: [
      {
        title: 'THE OUTDOOR LIVING GROUP',
        links: [
          { name: 'Lumerra — Wellness', href: '/', image: '/images/products/portofino-hero.jpeg' },
          { name: 'Ember — Kitchens', href: '/ember', image: '/images/categories/kitchens.jpg' },
          { name: 'Warmpath — Energy', href: '/warmpath', image: '/images/categories/accessories.jpg' },
          { name: 'Grove — Garden Rooms', href: '/grove', image: '/images/categories/saunas.jpg' },
        ],
      },
    ],
  },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const totalItems = useCartStore((state) => state.totalItems());
  const openCart = useCartStore((state) => state.openCart);

  useEffect(() => {
    const handleScroll = () => {
      // Change color when scrolled past the hero section (100vh minus header height)
      setIsScrolled(window.scrollY > window.innerHeight - 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initialize state
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset hovered image when changing menus
  useEffect(() => {
    setHoveredImage(null);
  }, [activeMenu]);

  const isHome = pathname === '/';
  
  const headerClasses = `
    fixed top-0 left-0 right-0 z-[var(--z-sticky)] transition-all duration-500
    ${isScrolled || !isHome ? 'bg-[var(--color-paper-raised)] border-b border-[var(--color-ink-rule)] py-4' : 'bg-transparent py-6'}
  `;

  const textClasses = isScrolled || !isHome ? 'text-[var(--color-ink)]' : 'text-white';

  return (
    <header className={headerClasses} onMouseLeave={() => setActiveMenu(null)}>
      <div className="container-lumerra flex items-center justify-between">
        {/* Logo Group */}
        <div className="flex flex-col">
          <span className={`text-[8px] uppercase tracking-[0.4em] font-bold mb-1 opacity-50 transition-colors ${textClasses}`}>
            The Outdoor Living Group
          </span>
          <Link href="/" className={`font-display text-2xl tracking-tight transition-colors ${textClasses}`}>
            Lumerra
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="relative py-2"
              onMouseEnter={() => cat.sections && setActiveMenu(cat.name)}
            >
              <Link
                href={cat.href}
                className={`flex items-center gap-1.5 text-sm font-thin tracking-wide uppercase transition-colors hover:text-[var(--color-bronze)] ${textClasses}`}
              >
                {cat.name}
                {cat.sections && <ChevronDown size={14} className="opacity-50" />}
              </Link>
            </div>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <button className={`p-1 hover:text-[var(--color-bronze)] transition-colors ${textClasses}`} aria-label="Search">
            <Search size={20} />
          </button>
          <Link href="/account" className={`p-1 hover:text-[var(--color-bronze)] transition-colors ${textClasses}`} aria-label="Account">
            <User size={20} />
          </Link>
          <button 
            onClick={openCart}
            className={`p-1 relative hover:text-[var(--color-bronze)] transition-colors ${textClasses}`} 
            aria-label="Bag"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--color-bronze)] text-[var(--color-paper-raised)] text-[10px] rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mega Menu */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)', transition: { duration: 0.2 } }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 w-full bg-[var(--color-ink)] text-white border-b border-[var(--color-ink-rule)] shadow-2xl overflow-hidden"
          >
            <div className="container-lumerra py-24 flex gap-16 items-center min-h-[600px]">
              
              {/* Left Side: Links */}
              <div className="flex-1 grid grid-cols-3 gap-12">
                {categories.find(c => c.name === activeMenu)?.sections?.map((section, sectionIdx) => (
                  <motion.div 
                    key={section.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + (sectionIdx * 0.05), ease: "easeOut" }}
                  >
                    <p className="text-caption mb-6 tracking-widest text-[var(--color-ink-quiet)]">{section.title}</p>
                    <ul className="flex flex-col gap-3">
                      {section.links.map((link: any) => (
                        <li key={link.href}>
                          <Link 
                            href={link.href}
                            onMouseEnter={() => setHoveredImage(link.image || null)}
                            className="text-[14px] font-medium tracking-wide text-[var(--color-ink-quiet)] hover:text-white transition-colors block"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              {/* Right Side: Immersive Imagery */}
              <div className="w-[480px] xl:w-[580px] aspect-[4/3] relative overflow-hidden bg-black/20 rounded-sm border border-white/5 shadow-inner">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={hoveredImage || categories.find(c => c.name === activeMenu)?.featured?.[0]?.image || '/images/categories/saunas.jpg'}
                    src={hoveredImage || categories.find(c => c.name === activeMenu)?.featured?.[0]?.image || '/images/categories/saunas.jpg'}
                    alt="Featured Collection"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e: any) => { e.currentTarget.src = '/images/placeholder.svg' }}
                  />
                </AnimatePresence>
                
                {/* Subtle gradient overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/90 via-transparent to-transparent pointer-events-none" />
                
                {/* Dynamic Label */}
                <motion.div 
                  className="absolute bottom-8 left-8 right-8 text-white"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-[9px] uppercase tracking-[0.25em] mb-2 text-white/50">
                    {hoveredImage ? 'Explore Model' : 'Featured Collection'}
                  </p>
                  <p className="font-display text-3xl leading-tight">
                    {hoveredImage 
                      ? categories.find(c => c.name === activeMenu)?.sections?.flatMap(s => s.links).find(l => l.image === hoveredImage)?.name 
                      : categories.find(c => c.name === activeMenu)?.featured?.[0]?.name || 'Lumerra Journal'}
                  </p>
                </motion.div>
              </div>
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
