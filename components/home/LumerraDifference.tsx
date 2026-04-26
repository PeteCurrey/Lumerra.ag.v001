import { Shield, Award, Droplets } from 'lucide-react';

const pillars = [
  {
    icon: Award,
    title: 'Curated, Not Stocked',
    description: 'We don&apos;t sell everything. We sell the best. Every product in the Lumerra collection has passed a rigorous audit of engineering, efficiency, and aesthetic endurance.',
  },
  {
    icon: Droplets,
    title: 'Wellness, Engineered',
    description: 'Every hot tub and swim spa is hydrotherapy-tuned to the body&apos;s pressure points. Our manufacturers work with physiotherapists to ensure the water does more than just warm.',
  },
  {
    icon: Shield,
    title: 'Direct, Without Compromise',
    description: 'By operating as a digital-first retailer, we remove the showroom markup without removing the service. UK-wide delivery, installation, and manufacturer-backed warranties.',
  },
];

export function LumerraDifference() {
  return (
    <section className="section-padding bg-[var(--color-bone)]">
      <div className="container-lumerra">
        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="flex flex-col">
              <div className="w-12 h-12 rounded-full bg-[var(--color-paper)] flex items-center justify-center mb-6 shadow-sm border border-[var(--color-mist)]">
                <pillar.icon size={24} className="text-[var(--color-amber)]" />
              </div>
              <h3 className="font-display text-2xl text-[var(--color-ink)] mb-4">
                {pillar.title}
              </h3>
              <p className="text-[var(--color-graphite)] leading-relaxed text-sm">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
