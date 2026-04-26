import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function ConciergeTeaser() {
  return (
    <section className="section-padding bg-[var(--color-paper-sunken)]">
      <div className="container-lumerra">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-caption mb-8 text-[var(--color-bronze)]">Personalised Selection</p>
          <h2 className="display-48 text-[var(--color-ink)] mb-12">
            Not sure where to start?
          </h2>
          
          <Link href="/concierge" className="block relative group">
            <div className="bg-[var(--color-paper-raised)] border border-[var(--color-ink-rule)] p-8 md:p-12 text-left flex items-center justify-between group-hover:border-[var(--color-bronze)] transition-colors">
              <span className="text-xl md:text-2xl text-[var(--color-ink-quiet)] font-light italic">
                Tell us about your space, your evenings, your people...
              </span>
              <div className="w-12 h-12 rounded-full bg-[var(--color-bronze)] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <ArrowRight size={24} />
              </div>
            </div>
          </Link>

          <p className="mt-12 text-[var(--color-ink-muted)] text-sm">
            Our Wellness Concierge will guide you. Five minutes. No forms.
          </p>
        </div>
      </div>
    </section>
  );
}
