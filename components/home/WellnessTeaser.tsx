import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function WellnessTeaser() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-[600px] lg:min-h-[800px]">
        {/* Image column */}
        <div className="relative h-[400px] lg:h-auto overflow-hidden">
          <Image
            src="/images/wellness-teaser.jpg"
            alt="Wellness Hub"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-[var(--color-ink)]/20" />
        </div>

        {/* Content column */}
        <div className="flex flex-col justify-center bg-[var(--color-ink)] p-12 md:p-24 lg:p-32 text-[var(--color-bone)]">
          <div className="max-w-md">
            <p className="caption-amber mb-6">The Wellness Hub</p>
            <h2 className="display-lg mb-8">
              Your hour, <br />
              <span className="italic">every day.</span>
            </h2>
            <p className="text-[var(--color-stone)] leading-relaxed mb-10 text-lg">
              Hydrotherapy is more than warmth. It is a physiological reset. 
              Explore the science of recovery, the biology of sleep, and the 
              Mediterranean tradition of the long soak.
            </p>
            
            <Link
              href="/wellness"
              className="group inline-flex items-center gap-4 py-4 px-8 border border-[var(--color-stone)] rounded-sm hover:bg-[var(--color-bone)] hover:text-[var(--color-ink)] transition-all"
            >
              <span className="font-mono text-xs uppercase tracking-widest">
                Explore the Science
              </span>
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
