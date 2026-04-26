import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function ConfiguratorCTA() {
  return (
    <section className="container-lumerra py-12 md:py-16">
      <div className="relative overflow-hidden rounded-2xl bg-[var(--color-mist)] p-12 md:p-24 lg:p-32 flex flex-col items-center text-center">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-amber)]/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl">
          <p className="caption-amber mb-6">Personalised Recommendation</p>
          <h2 className="display-lg text-[var(--color-ink)] mb-8">
            Not sure <br className="hidden md:block" />
            <span className="italic">where to start?</span>
          </h2>
          <p className="text-[var(--color-graphite)] text-lg leading-relaxed mb-10">
            Take our 60-second wellness quiz. We&apos;ll analyze your goals, your space, 
            and your budget to find the three products that match your lifestyle.
          </p>
          
          <Link
            href="/configurator"
            className="btn btn-primary btn-lg inline-flex items-center gap-3 shadow-xl"
          >
            Take the Wellness Quiz <ArrowRight size={18} />
          </Link>
        </div>

        {/* Floating product visual (using a category image as base) */}
        <div className="mt-16 relative w-full max-w-lg aspect-[16/10] opacity-40 grayscale pointer-events-none">
           <Image 
             src="/images/categories/hot-tubs.jpg"
             alt="Luxury Spa"
             fill
             className="object-contain"
           />
        </div>
      </div>
    </section>
  );
}
