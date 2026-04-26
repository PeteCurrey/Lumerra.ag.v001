'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <Accordion.Root type="single" collapsible className="w-full space-y-4">
      {items.map((item, i) => (
        <Accordion.Item key={i} value={`item-${i}`} className="border-b border-[var(--color-ink-rule)]">
          <Accordion.Trigger className="flex w-full items-center justify-between py-6 text-left group">
            <span className="font-display text-xl text-[var(--color-ink)] group-hover:text-[var(--color-bronze)] transition-colors">
              {item.q}
            </span>
            <span className="relative block w-4 h-4 text-[var(--color-ink-quiet)]">
              <Plus className="absolute inset-0 transition-transform duration-300 group-data-[state=open]:rotate-90 group-data-[state=open]:opacity-0" size={16} />
              <Minus className="absolute inset-0 transition-transform duration-300 opacity-0 group-data-[state=open]:opacity-100" size={16} />
            </span>
          </Accordion.Trigger>
          <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
            <div className="pb-8 text-[var(--color-ink-soft)] leading-relaxed">
              {item.a}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
