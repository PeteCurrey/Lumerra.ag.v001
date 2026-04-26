'use client';

import { motion } from 'framer-motion';
import { Building2, TrendingUp, HardHat, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const benefits = [
  { icon: Building2, title: 'Trade Pricing', description: 'Exclusive discounts of up to 25% on our premium wellness ranges.' },
  { icon: HardHat, title: 'Project Support', description: 'Dedicated account management and technical installation support.' },
  { icon: TrendingUp, title: 'Revenue Tools', description: 'AI-powered holiday let ROI projectors for property owners.' },
  { icon: ShieldCheck, title: 'Client Ready', description: 'Branded PDF specifications and white-labelled technical drawings.' },
];

export default function TradeLandingPage() {
  return (
    <div className="min-h-screen bg-[var(--color-ink)] text-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center text-center px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-0" />
        <div className="container-lumerra relative z-10">
          <p className="text-caption text-[var(--color-bronze-light)] mb-8 uppercase tracking-widest">B2B Partnership</p>
          <h1 className="display-80 italic mb-10 max-w-4xl mx-auto">Build with Lumerra.</h1>
          <p className="text-xl text-[var(--color-paper-deep)] max-w-2xl mx-auto mb-12 italic opacity-80 leading-relaxed">
            From award-winning landscape architects to luxury holiday let operators, we provide the wellness infrastructure for your projects.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/trade/apply" className="btn btn-primary py-5 px-12 text-xs uppercase tracking-widest">
              Apply for Trade Account
            </Link>
            <button className="btn btn-outline text-white py-5 px-12 text-xs uppercase tracking-widest hover:bg-white hover:text-black">
              View Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-32 bg-white text-[var(--color-ink)]">
        <div className="container-lumerra">
          <div className="grid md:grid-cols-4 gap-12 lg:gap-20">
            {benefits.map((b, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-6"
              >
                <b.icon size={28} className="text-[var(--color-bronze)]" strokeWidth={1.5} />
                <h3 className="text-xs uppercase tracking-widest font-bold">{b.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-ink-muted)] italic">
                  &quot;{b.description}&quot;
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Holiday Let Section */}
      <section className="py-32 bg-[var(--color-paper-sunken)] text-[var(--color-ink)] border-y border-[var(--color-ink-rule)]">
        <div className="container-lumerra grid md:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-caption text-[var(--color-bronze)] mb-6">Commercial Growth</p>
            <h2 className="display-48 italic mb-8">The Holiday Let Revenue Multiplier.</h2>
            <p className="text-lg leading-relaxed text-[var(--color-ink-soft)] mb-10 italic">
              Properties with hot tubs achieve up to 30% higher occupancy and 25% higher nightly rates. Our **Vacation Range** is specifically engineered for high-turnover rental environments.
            </p>
            <Link href="/tools/holiday-let-projector" className="flex items-center gap-3 text-xs uppercase tracking-widest font-bold hover:text-[var(--color-bronze)] transition-colors">
              Try the Revenue Projector <ArrowRight size={16} />
            </Link>
          </div>
          <div className="aspect-square relative bg-white border border-[var(--color-ink-rule)] p-2">
             <div className="relative w-full h-full overflow-hidden">
                <img 
                  src="/images/trade/holiday-let-hero.jpg" 
                  alt="Holiday Let Installation" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
             </div>
          </div>
        </div>
      </section>

      {/* Application Form Placeholder CTA */}
      <section className="py-32 bg-white text-[var(--color-ink)] text-center">
        <div className="container-lumerra max-w-3xl">
           <h2 className="display-48 mb-10">Scale your business.</h2>
           <p className="text-sm text-[var(--color-ink-muted)] mb-16 italic">
             Join 200+ industry professionals specifying Lumerra products into high-end residential and commercial projects across the UK.
           </p>
           <Link href="/trade/apply" className="btn btn-primary py-5 px-16 text-xs uppercase tracking-widest">
             Apply Now
           </Link>
        </div>
      </section>
    </div>
  );
}
