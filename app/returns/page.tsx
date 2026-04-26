export default function ReturnsPage() {
  return (
    <div className="pt-40 pb-24">
      <div className="container-lumerra max-w-3xl">
        <p className="text-caption mb-4">Lumerra Promise</p>
        <h1 className="display-64 mb-12">Returns & The 30-Day Wet Test</h1>
        
        <div className="prose prose-ink max-w-none space-y-8 text-[var(--color-ink-soft)] leading-relaxed">
           <section className="bg-[var(--color-bronze-wash)]/10 p-8 border border-[var(--color-bronze)]/20">
              <h2 className="font-display text-2xl text-[var(--color-bronze)]">The 30-Day Guarantee</h2>
              <p>
                We are the only UK wellness retailer to offer a full 30-day in-home wet test. 
                If your chosen model does not meet your expectations, we will collect it, 
                dismantle it, and provide a full refund.
              </p>
           </section>

           <section>
              <h2 className="font-display text-2xl text-[var(--color-ink)]">Uplift Requirements</h2>
              <p>
                To qualify for the 30-day return:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                 <li>The product must be in its original structural condition.</li>
                 <li>The water must be drained prior to our team&apos;s arrival.</li>
                 <li>Clear access for uplift must be maintained (as per original delivery).</li>
              </ul>
           </section>

           <section>
              <h2 className="font-display text-2xl text-[var(--color-ink)]">Small Items & Accessories</h2>
              <p>
                Standard accessories (covers, filters, chemicals) may be returned within 14 days 
                provided the packaging is unopened and the seal is intact.
              </p>
           </section>
        </div>
      </div>
    </div>
  );
}
