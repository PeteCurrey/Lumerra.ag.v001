'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

export default function ContactStep() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/checkout/delivery');
  };

  return (
    <div className="max-w-xl space-y-12">
      <div>
        <h1 className="display-48 mb-4">Contact Information</h1>
        <p className="text-[var(--color-ink-muted)]">We&apos;ll use this to keep you updated on your delivery and installation.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
           <div className="space-y-2">
             <label className="text-[10px] uppercase tracking-widest font-medium">First Name</label>
             <input required type="text" className="w-full bg-transparent border-b border-[var(--color-ink-rule)] py-3 focus:border-[var(--color-bronze)] outline-none" />
           </div>
           <div className="space-y-2">
             <label className="text-[10px] uppercase tracking-widest font-medium">Last Name</label>
             <input required type="text" className="w-full bg-transparent border-b border-[var(--color-ink-rule)] py-3 focus:border-[var(--color-bronze)] outline-none" />
           </div>
        </div>

        <div className="space-y-2">
           <label className="text-[10px] uppercase tracking-widest font-medium">Email Address</label>
           <input required type="email" className="w-full bg-transparent border-b border-[var(--color-ink-rule)] py-3 focus:border-[var(--color-bronze)] outline-none" />
        </div>

        <div className="space-y-2">
           <label className="text-[10px] uppercase tracking-widest font-medium">Phone Number</label>
           <input required type="tel" className="w-full bg-transparent border-b border-[var(--color-ink-rule)] py-3 focus:border-[var(--color-bronze)] outline-none" />
        </div>

        <div className="flex items-start gap-3 pt-4">
           <input type="checkbox" id="marketing" className="mt-1" />
           <label htmlFor="marketing" className="text-xs text-[var(--color-ink-muted)] leading-relaxed">
             I would like to receive the Lumerra Journal and exclusive wellness invitations.
           </label>
        </div>

        <button type="submit" className="btn btn-primary w-full py-5 flex items-center justify-center gap-3 text-sm uppercase tracking-[0.2em]">
          Continue to Delivery <ArrowRight size={18} />
        </button>
      </form>
    </div>
  );
}
