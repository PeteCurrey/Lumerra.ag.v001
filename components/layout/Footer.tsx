'use client';

import Link from 'next/link';
import { Camera, Users, Play } from 'lucide-react';

const footerColumns = [
  {
    heading: 'Shop',
    links: [
      { label: 'Hot Tubs', href: '/hot-tubs' },
      { label: 'Swim Spas', href: '/swim-spas' },
      { label: 'Mini Pools', href: '/mini-pools' },
      { label: 'Saunas', href: '/saunas' },
      { label: 'Accessories', href: '/accessories' },
      { label: 'Collections', href: '/collections' },
    ],
  },
  {
    heading: 'Brands',
    links: [
      { label: 'Platinum Spas', href: '/brands/platinum-spas' },
      { label: 'AquaSolus', href: '/brands/aquasolus' },
      { label: 'Portcril', href: '/brands/portcril' },
      { label: 'Hekla', href: '/brands/hekla' },
    ],
  },
  {
    heading: 'Wellness',
    links: [
      { label: 'Wellness Hub', href: '/wellness' },
      { label: 'Hydrotherapy', href: '/wellness/hydrotherapy' },
      { label: 'Sleep & Recovery', href: '/wellness/sleep-recovery' },
      { label: 'Contrast Therapy', href: '/wellness/cold-and-hot-contrast' },
      { label: 'Journal', href: '/journal' },
      { label: 'Configurator', href: '/configurator' },
    ],
  },
  {
    heading: 'Help',
    links: [
      { label: 'Delivery & Installation', href: '/delivery' },
      { label: 'Finance Options', href: '/finance' },
      { label: 'Showroom Finder', href: '/showroom-finder' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'About Lumerra', href: '/about' },
      { label: 'Sustainability', href: '/sustainability' },
      { label: 'Trade Portal', href: '/trade' },
      { label: 'The Lumerra Promise', href: '/the-lumerra-promise' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Returns Policy', href: '/returns' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Accessibility', href: '/accessibility' },
      { label: 'Modern Slavery', href: '/modern-slavery' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-paper)]">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="container-lumerra py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-caption text-[var(--color-bronze-light)] mb-3">The Halcyon List</p>
              <h2 className="font-display text-3xl md:text-4xl font-thin text-[var(--color-paper)] leading-tight mb-3">
                Your first order, considered.
              </h2>
              <p className="text-[var(--color-paper-deep)] text-sm leading-relaxed opacity-70">
                Join the Halcyon List and receive 10% off your first order, early access to new arrivals, and the occasional letter about warmth, wellness, and what we&apos;ve been thinking about.
              </p>
            </div>
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3.5 bg-white/10 border border-white/20 rounded-sm text-[var(--color-paper)] placeholder-[var(--color-ink-quiet)] text-sm focus:outline-none focus:border-[var(--color-bronze)] transition-colors"
                required
              />
              <button type="submit" className="btn btn-primary whitespace-nowrap">
                Join the list
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="container-lumerra py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12">
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <p className="text-caption text-[var(--color-ink-quiet)] mb-5">{col.heading}</p>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-thin text-[var(--color-paper-deep)] hover:text-white transition-colors opacity-70 hover:opacity-100"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-lumerra py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <span className="font-display text-xl font-thin text-[var(--color-paper)]">Lumerra</span>
            <span className="text-[var(--color-ink-quiet)] text-xs hidden md:block">
              © {new Date().getFullYear()} Lumerra Ltd. Registered in England & Wales.
            </span>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-8 text-[10px] uppercase tracking-widest text-[var(--color-ink-quiet)] font-medium">
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[var(--color-bronze)]" />
              WhatSpa? Approved
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[var(--color-bronze)]" />
              5-Year Warranty
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[var(--color-bronze)]" />
              Free UK Delivery
            </div>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/lumerra"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lumerra on Instagram"
              className="text-[var(--color-ink-quiet)] hover:text-white transition-colors"
            >
              <Camera size={18} />
            </a>
            <a
              href="https://facebook.com/lumerra"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lumerra on Facebook"
              className="text-[var(--color-ink-quiet)] hover:text-white transition-colors"
            >
              <Users size={18} />
            </a>
            <a
              href="https://youtube.com/@lumerra"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lumerra on YouTube"
              className="text-[var(--color-ink-quiet)] hover:text-white transition-colors"
            >
              <Play size={18} />
            </a>
          </div>
        </div>

        <div className="container-lumerra pb-6 md:hidden">
          <p className="text-[var(--color-ink-quiet)] text-xs text-center">
            © {new Date().getFullYear()} Lumerra Ltd. Registered in England & Wales.
          </p>
        </div>
      </div>
    </footer>
  );
}
