export function TrustPress() {
  const logos = [
    'Good Housekeeping',
    'Ideal Home',
    'Men\'s Health',
    'FT',
    'Channel 5',
    'House & Garden'
  ];

  const badges = [
    'WhatSpa Approved',
    'Trustpilot',
    'Klarna',
    'V12 Finance'
  ];

  return (
    <section className="py-24 bg-[var(--color-paper)] border-t border-[var(--color-ink-rule)]">
      <div className="container-lumerra">
        {/* Badges Ticker */}
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 mb-20 opacity-40">
           {badges.map(badge => (
             <span key={badge} className="text-[10px] tracking-[0.2em] uppercase font-medium text-[var(--color-ink)]">
               {badge}
             </span>
           ))}
        </div>

        {/* Press Logos */}
        <div className="text-center mb-10">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-quiet)] mb-8">As featured in</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-20 grayscale contrast-125">
             {logos.map(logo => (
               <span key={logo} className="font-display text-xl md:text-2xl tracking-widest text-[var(--color-ink)]">
                 {logo}
               </span>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}
