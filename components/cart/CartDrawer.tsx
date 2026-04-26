'use client';

import { useCartStore } from '@/lib/store';
import { X, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCartStore();

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalDeposit = items.reduce((acc, item) => acc + (item.deposit || 0) * item.quantity, 0);
  const hasBigTicket = items.some(item => item.price > 5000);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[var(--z-overlay)] backdrop-blur-sm" onClick={closeCart} />
      <aside className="fixed top-0 right-0 h-full w-full max-w-lg bg-[var(--color-paper-raised)] z-[var(--z-modal)] shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
        
        {/* Header */}
        <div className="p-8 border-b border-[var(--color-ink-rule)] flex items-center justify-between">
          <div className="flex items-center gap-4">
             <ShoppingBag size={24} />
             <h2 className="font-display text-2xl">Your Bag</h2>
          </div>
          <button onClick={closeCart} className="p-2 hover:bg-[var(--color-paper-sunken)] rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
               <ShoppingBag size={48} className="mb-4" />
               <p className="text-sm uppercase tracking-widest">Your bag is empty</p>
               <button onClick={closeCart} className="mt-8 btn btn-outline">Continue Shopping</button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-6">
                <div className="relative w-24 h-24 bg-[var(--color-paper-sunken)] overflow-hidden flex-shrink-0">
                  <Image src={item.image || item.imageUrl || ''} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                       <p className="text-[10px] uppercase tracking-widest text-[var(--color-bronze)] font-medium">{item.brand || item.brandName}</p>
                       <h3 className="font-display text-xl">{item.name}</h3>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-[var(--color-ink-quiet)] hover:text-[var(--color-error)] transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4">
                    <div className="flex items-center border border-[var(--color-ink-rule)]">
                      <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="px-3 py-1 hover:bg-[var(--color-paper-sunken)]">-</button>
                      <span className="px-3 py-1 font-mono text-xs">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 hover:bg-[var(--color-paper-sunken)]">+</button>
                    </div>
                    <p className="font-mono text-sm">£{(item.price * item.quantity).toLocaleString()}</p>
                  </div>

                  {item.price > 5000 && (
                    <div className="pt-2">
                       <p className="text-[10px] uppercase tracking-widest text-[var(--color-success)] font-bold">
                         Deposit: £{((item.deposit || 0) * item.quantity).toLocaleString()}
                       </p>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-8 bg-[var(--color-paper-sunken)] border-t border-[var(--color-ink-rule)] space-y-6">
             <div className="space-y-2">
                <div className="flex justify-between text-sm">
                   <span className="text-[var(--color-ink-muted)]">Subtotal</span>
                   <span className="font-mono">£{subtotal.toLocaleString()}</span>
                </div>
                {hasBigTicket && (
                  <div className="flex justify-between items-center p-4 bg-white border border-[var(--color-success)]/20">
                     <div>
                        <p className="text-xs font-bold text-[var(--color-success)] uppercase tracking-widest">Pay Deposit Today</p>
                        <p className="text-[10px] text-[var(--color-ink-muted)]">Remaining balance on dispatch</p>
                     </div>
                     <p className="font-display text-2xl">£{totalDeposit.toLocaleString()}</p>
                  </div>
                )}
             </div>

             <div className="space-y-3">
                <Link 
                  href="/checkout" 
                  onClick={closeCart}
                  className="btn btn-primary w-full py-5 flex items-center justify-center gap-3 text-sm uppercase tracking-[0.2em]"
                >
                  Checkout <ArrowRight size={18} />
                </Link>
                <div className="flex justify-center gap-6 opacity-40">
                   <span className="text-[10px] uppercase tracking-widest font-medium">Stripe</span>
                   <span className="text-[10px] uppercase tracking-widest font-medium">Klarna</span>
                   <span className="text-[10px] uppercase tracking-widest font-medium">V12 Finance</span>
                </div>
             </div>
          </div>
        )}
      </aside>
    </>
  );
}
