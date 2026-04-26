'use client';

import { useCartStore } from '@/lib/store';
import { Lock, ShieldCheck } from 'lucide-react';

export default function PaymentStep() {
  const { items } = useCartStore();
  
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deposit = items.reduce((acc, item) => acc + (item.deposit || 0) * item.quantity, 0);
  const balance = subtotal - deposit;
  const hasBigTicket = items.some(item => item.price > 5000);

  return (
    <div className="max-w-xl space-y-12">
      <div>
        <h1 className="display-48 mb-4">Secure Payment</h1>
        <p className="text-[var(--color-ink-muted)]">Encrypted transaction via Stripe. Staged payment applied to high-value items.</p>
      </div>

      <div className="space-y-12">
        {/* Payment Summary */}
        <div className="bg-[var(--color-paper-sunken)] p-8 border border-[var(--color-ink-rule)] space-y-6">
           <div className="flex justify-between items-center">
              <span className="text-caption">Total Order Value</span>
              <span className="font-mono text-lg">£{subtotal.toLocaleString()}</span>
           </div>
           
           {hasBigTicket ? (
             <div className="pt-6 border-t border-[var(--color-ink-rule)] space-y-4">
                <div className="flex justify-between items-center">
                   <span className="font-medium text-[var(--color-success)] uppercase tracking-widest text-[10px]">Due Today (Deposit)</span>
                   <span className="font-display text-2xl">£{deposit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center opacity-40">
                   <span className="text-[10px] uppercase tracking-widest">Balance on Dispatch</span>
                   <span className="font-mono">£{balance.toLocaleString()}</span>
                </div>
             </div>
           ) : (
             <div className="pt-6 border-t border-[var(--color-ink-rule)] flex justify-between items-center">
                <span className="font-medium uppercase tracking-widest text-[10px]">Total Due Today</span>
                <span className="font-display text-2xl">£{subtotal.toLocaleString()}</span>
             </div>
           )}
        </div>

        {/* Stripe Mock */}
        <div className="space-y-6">
           <div className="p-8 border border-[var(--color-ink-rule)] bg-white space-y-6">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-bold">
                 <span>Credit / Debit Card</span>
                 <div className="flex gap-2">
                    <span className="opacity-40">Visa</span>
                    <span className="opacity-40">Mastercard</span>
                    <span className="opacity-40">AMEX</span>
                 </div>
              </div>
              
              {/* Stripe Payment Element Placeholder */}
              <div className="h-12 bg-[var(--color-paper-sunken)] border border-[var(--color-ink-rule)] flex items-center px-4">
                 <span className="text-xs text-[var(--color-ink-quiet)] italic">Stripe Payment Element would render here</span>
              </div>
              
              <div className="flex items-center gap-2 text-[var(--color-ink-muted)]">
                 <Lock size={12} />
                 <span className="text-[10px] uppercase tracking-widest">PCI-DSS Compliant Secure Payment</span>
              </div>
           </div>

           <div className="p-8 border border-[var(--color-ink-rule)] bg-white flex items-center justify-between group cursor-pointer hover:border-[var(--color-bronze)] transition-colors">
              <div className="flex items-center gap-4">
                 <div className="w-4 h-4 rounded-full border border-[var(--color-ink-rule)]" />
                 <span className="font-medium text-sm">Pay with Klarna</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#FFB3C7]">Klarna.</span>
           </div>
        </div>

        <button className="btn btn-primary w-full py-5 flex items-center justify-center gap-3 text-sm uppercase tracking-[0.2em]">
          Place Secure Order
        </button>

        <div className="flex items-center justify-center gap-4 text-[var(--color-ink-quiet)]">
           <ShieldCheck size={20} />
           <span className="text-[10px] uppercase tracking-widest">Manufacturer Backed Warranty Guaranteed</span>
        </div>
      </div>
    </div>
  );
}
