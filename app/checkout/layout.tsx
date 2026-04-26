'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const steps = [
    { name: 'Contact', href: '/checkout/contact' },
    { name: 'Delivery', href: '/checkout/delivery' },
    { name: 'Payment', href: '/checkout/payment' },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-paper)]">
      {/* Header */}
      <header className="py-8 border-b border-[var(--color-ink-rule)] bg-white">
        <div className="container-lumerra flex justify-between items-center">
          <Link href="/" className="font-display text-2xl">Lumerra</Link>
          <div className="flex gap-8">
            {steps.map((step, i) => {
              const isActive = pathname === step.href;
              const isPast = steps.findIndex(s => s.href === pathname) > i;
              return (
                <div key={step.href} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono border ${isActive ? 'border-[var(--color-bronze)] text-[var(--color-bronze)]' : isPast ? 'bg-[var(--color-success)] border-[var(--color-success)] text-white' : 'border-[var(--color-ink-rule)] text-[var(--color-ink-quiet)]'}`}>
                    {isPast ? '✓' : i + 1}
                  </div>
                  <span className={`text-[10px] uppercase tracking-widest font-medium ${isActive ? 'text-[var(--color-ink)]' : 'text-[var(--color-ink-quiet)]'}`}>
                    {step.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </header>

      <main className="container-lumerra py-16">
        <div className="grid lg:grid-cols-[1fr_400px] gap-24 items-start">
          <div>{children}</div>
          
          {/* Order Summary Sidebar */}
          <aside className="sticky top-32 space-y-8 bg-white p-8 border border-[var(--color-ink-rule)]">
             <h2 className="font-display text-2xl">Order Summary</h2>
             <div className="space-y-4">
                <p className="text-xs text-[var(--color-ink-muted)] italic">Reviewing your cinematic wellness selection.</p>
             </div>
             {/* Summary details would go here */}
          </aside>
        </div>
      </main>
    </div>
  );
}
