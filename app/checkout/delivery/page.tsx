'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight, MapPin, Truck } from 'lucide-react';
import { useState } from 'react';

export default function DeliveryStep() {
  const router = useRouter();
  const [installOption, setInstallOption] = useState('standard');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/checkout/payment');
  };

  return (
    <div className="max-w-xl space-y-12">
      <div>
        <h1 className="display-48 mb-4">Delivery & Installation</h1>
        <p className="text-[var(--color-ink-muted)]">Choose how you would like your Lumerra wellness sanctuary to arrive.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Address */}
        <div className="space-y-8">
           <div className="space-y-2">
             <label className="text-[10px] uppercase tracking-widest font-medium">Postcode</label>
             <div className="relative">
                <input required type="text" placeholder="e.g. SW1A 1AA" className="w-full bg-transparent border-b border-[var(--color-ink-rule)] py-3 pr-12 focus:border-[var(--color-bronze)] outline-none font-mono" />
                <MapPin className="absolute right-0 top-3 text-[var(--color-ink-quiet)]" size={18} />
             </div>
             <p className="text-[10px] text-[var(--color-ink-quiet)] italic">We deliver UK-wide. Highlands and Islands surcharges apply.</p>
           </div>
           
           <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-medium">Address Line 1</label>
                <input required type="text" className="w-full bg-transparent border-b border-[var(--color-ink-rule)] py-3 focus:border-[var(--color-bronze)] outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-medium">Town / City</label>
                <input required type="text" className="w-full bg-transparent border-b border-[var(--color-ink-rule)] py-3 focus:border-[var(--color-bronze)] outline-none" />
              </div>
           </div>
        </div>

        {/* Installation Options */}
        <div className="space-y-6">
           <p className="text-caption">Installation Service</p>
           <div className="space-y-4">
              <label className={`flex items-start gap-4 p-6 border transition-all cursor-pointer ${installOption === 'standard' ? 'border-[var(--color-bronze)] bg-[var(--color-bronze-wash)]/10' : 'border-[var(--color-ink-rule)] hover:border-[var(--color-ink)]'}`}>
                 <input type="radio" name="install" value="standard" checked={installOption === 'standard'} onChange={() => setInstallOption('standard')} className="mt-1" />
                 <div>
                    <p className="font-medium text-sm">Standard Kerbside Delivery</p>
                    <p className="text-xs text-[var(--color-ink-muted)]">Free — we deliver to the closest accessible point on your property.</p>
                 </div>
              </label>
              <label className={`flex items-start gap-4 p-6 border transition-all cursor-pointer ${installOption === 'whiteglove' ? 'border-[var(--color-bronze)] bg-[var(--color-bronze-wash)]/10' : 'border-[var(--color-ink-rule)] hover:border-[var(--color-ink)]'}`}>
                 <input type="radio" name="install" value="whiteglove" checked={installOption === 'whiteglove'} onChange={() => setInstallOption('whiteglove')} className="mt-1" />
                 <div>
                    <p className="font-medium text-sm">White-Glove & Commissioning</p>
                    <p className="text-xs text-[var(--color-ink-muted)]">£499 — full installation, electrical connection, and initial chemical balance.</p>
                 </div>
              </label>
           </div>
        </div>

        <button type="submit" className="btn btn-primary w-full py-5 flex items-center justify-center gap-3 text-sm uppercase tracking-[0.2em]">
          Continue to Payment <ArrowRight size={18} />
        </button>
      </form>
    </div>
  );
}
