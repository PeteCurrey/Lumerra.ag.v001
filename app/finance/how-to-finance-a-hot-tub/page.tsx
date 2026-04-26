'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Calculator, Info, CheckCircle2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function FinanceAuthorityPage() {
  return (
    <main className="min-h-screen pt-32 bg-[var(--color-paper)] pb-24">
      <div className="container-lumerra max-w-4xl">
        <div className="mb-20">
          <p className="text-caption text-[var(--color-bronze)] mb-4">Investment Guide</p>
          <h1 className="display-64 italic">How to Finance a Hot Tub.</h1>
          <p className="text-xl text-[var(--color-ink-soft)] mt-8 leading-relaxed italic max-w-2xl">
            A transparent, independent guide to wellness investment. We explain the mechanisms, the risks, and the optimal paths for every financial situation.
          </p>
        </div>

        {/* Quick Answer Block */}
        <div className="bg-[var(--color-ink)] text-white p-12 mb-20 relative overflow-hidden">
           <div className="relative z-10">
              <h2 className="text-xs uppercase tracking-widest font-bold mb-6 text-[var(--color-bronze-light)]">Quick Answer</h2>
              <p className="text-xl leading-relaxed italic font-display opacity-90">
                &quot;Hot tubs can be financed through regulated consumer credit from £99/month with 0% APR on approved applications. Options include buy-now-pay-later, unsecured personal loans, and Lumerra&apos;s own staged payment system requiring a £500 deposit.&quot;
              </p>
           </div>
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -translate-y-1/2 translate-x-1/2 rounded-full" />
        </div>

        <div className="space-y-24">
           {/* Section 1: Options */}
           <section>
              <h2 className="text-2xl font-display italic mb-10 border-b border-[var(--color-ink-rule)] pb-4">01. Financing Mechanisms</h2>
              <div className="grid md:grid-cols-2 gap-12">
                 {[
                   { title: '0% Interest-Free Credit', desc: 'Spread the cost over 12–24 months with no interest. The most efficient path for those with strong credit profiles.' },
                   { title: 'Buy Now, Pay Later', desc: 'Secure your delivery with a small deposit and pay nothing for up to 12 months. Ideal for aligning with property sales or bonuses.' },
                   { title: 'Home Improvement Loans', desc: 'Lower monthly payments over 5–10 years. Often used when the wellness project is part of a larger garden renovation.' },
                   { title: 'Staged Payment (Direct)', desc: 'Lumerra&apos;s non-credit path. 50% on order, 40% on delivery, 10% post-install. No credit check required.' },
                 ].map((item, i) => (
                   <div key={i} className="space-y-4">
                      <h3 className="text-xs uppercase tracking-widest font-bold">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-[var(--color-ink-muted)] italic">{item.desc}</p>
                   </div>
                 ))}
              </div>
           </section>

           {/* Section 2: FCA Regulation */}
           <section className="bg-white p-12 border border-[var(--color-ink-rule)]">
              <div className="flex items-start gap-6">
                 <ShieldCheck size={32} className="text-[var(--color-bronze)] shrink-0" />
                 <div>
                    <h2 className="text-xl font-display mb-4">Regulated & Protected.</h2>
                    <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed italic mb-8">
                      All Lumerra finance partners (V12, Klarna, DivideBuy) are fully regulated by the Financial Conduct Authority (FCA). This ensures your rights are protected under the Consumer Credit Act.
                    </p>
                    <Link href="/terms/finance" className="text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 hover:text-[var(--color-bronze)] transition-colors">
                       View Finance Terms <ChevronRight size={14} />
                    </Link>
                 </div>
              </div>
           </section>

           {/* Section 3: FAQ */}
           <section>
              <h2 className="text-2xl font-display italic mb-10 border-b border-[var(--color-ink-rule)] pb-4">02. Frequently Asked Questions</h2>
              <div className="space-y-8">
                 {[
                   { q: 'Can I finance a hot tub with bad credit?', a: 'While 0% APR options require excellent credit, our partners offer specialized products for various profiles. Additionally, our Staged Payment path does not require a credit check.' },
                   { q: 'What is the maximum loan term?', a: 'Unsecured personal loans via our partners can extend up to 120 months (10 years) for larger installations like swim spas.' },
                   { q: 'Is a deposit required?', a: 'Most finance plans require a minimum 10% deposit, though we occasionally run &quot;Zero Deposit&quot; promotions on specific models.' },
                 ].map((item, i) => (
                   <div key={i} className="p-8 bg-white border border-[var(--color-ink-rule)]">
                      <h3 className="text-sm font-bold mb-4 flex items-center gap-3">
                         <Info size={16} className="text-[var(--color-bronze)]" />
                         {item.q}
                      </h3>
                      <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed italic pl-7">{item.a}</p>
                   </div>
                 ))}
              </div>
           </section>

           {/* Final CTA */}
           <section className="text-center pt-12">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-8">Ready to calculate?</p>
              <Link href="/tools/finance-calculator" className="btn btn-primary py-6 px-16 text-sm uppercase tracking-widest gap-4">
                 Try Finance Calculator
                 <Calculator size={18} />
              </Link>
           </section>
        </div>
      </div>
    </main>
  );
}
