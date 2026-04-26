'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowRight, RefreshCcw } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ConciergePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [finished, setFinished] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial greeting
    if (messages.length === 0) {
      setMessages([{ 
        role: 'assistant', 
        content: 'Welcome to the Lumerra Wellness Concierge. Tell us about your space, your evenings, and your vision for stillness.' 
      }]);
    }
  }, []);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Mocking Claude API response for now
    setTimeout(() => {
      const assistantMessage: Message = { 
        role: 'assistant', 
        content: 'That sounds like a wonderful sanctuary. How many people will typically be sharing this hour of stillness with you?' 
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      
      // For demo, finish after 3 user messages
      const userMessageCount = messages.filter(m => m.role === 'user').length + 1;
      if (userMessageCount >= 3) {
        setFinished(true);
        setRecommendations([
          { slug: 'portofino', name: 'Portofino', brand: 'Platinum Spas', image: '/images/products/portofino-hero.jpg', reason: 'Matches your desire for high-performance recovery and aesthetic restraint.' },
          { slug: 'calma', name: 'Calma', brand: 'AquaSolus', image: '/images/products/calma-hero.jpg', reason: 'The perfect choice for a whisper-quiet, architectural garden installation.' }
        ]);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[var(--color-ink)] text-white pt-48 pb-32">
      <div className="container-lumerra max-w-4xl relative z-10">
        <div className="text-center mb-24">
           <p className="text-caption text-[var(--color-bronze-light)] mb-4">Wellness Concierge</p>
           <h1 className="display-64 italic mb-8">Guided selection.</h1>
        </div>

        <div className="space-y-16 mb-24">
           {messages.map((msg, i) => (
             <div 
               key={i}
               className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
             >
               <div className={`max-w-2xl ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <p className={`font-display text-2xl lg:text-4xl leading-relaxed ${msg.role === 'user' ? 'text-[var(--color-bronze-light)]' : 'text-white'}`}>
                    {msg.content}
                  </p>
               </div>
             </div>
           ))}
           
           {isTyping && (
             <div className="flex gap-2 py-4">
                <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse [animation-delay:0.4s]" />
             </div>
           )}
           <div ref={scrollRef} />
        </div>

        {!finished ? (
          <form onSubmit={handleSend} className="relative group mt-20">
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Your answer..."
              rows={1}
              className="w-full bg-transparent border-b border-white/20 py-8 pr-16 text-2xl font-light italic focus:border-[var(--color-bronze)] outline-none resize-none overflow-hidden"
            />
            <button 
              type="submit"
              disabled={isTyping || !input.trim()}
              className="absolute right-0 bottom-8 w-12 h-12 rounded-full bg-[var(--color-bronze)] flex items-center justify-center text-white hover:scale-110 transition-transform disabled:opacity-30"
            >
              <ArrowRight size={24} />
            </button>
          </form>
        ) : (
          <div className="space-y-24 mt-32">
            <div className="text-center py-12 border-t border-white/10">
               <h2 className="display-48 mb-6">Our Recommendations</h2>
               <p className="text-[var(--color-ink-rule)] max-w-xl mx-auto">Based on your shared vision, we have curated these models for your consideration.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-16">
               {recommendations.map((rec) => (
                 <div key={rec.slug} className="group cursor-pointer">
                    <div className="aspect-[16/10] relative overflow-hidden mb-6 bg-white/5">
                       <Image src={rec.image} alt={rec.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <h3 className="font-display text-2xl mb-4">{rec.brand} {rec.name}</h3>
                    <p className="text-sm text-[var(--color-ink-rule)] leading-relaxed mb-6 italic opacity-80">&quot;{rec.reason}&quot;</p>
                    <Link href={`/products/${rec.slug}`} className="btn btn-outline text-white w-full py-4 text-[10px] uppercase tracking-widest hover:bg-white hover:text-black">
                       View Specification
                    </Link>
                 </div>
               ))}
            </div>

            <div className="flex justify-center pt-20">
               <button 
                 onClick={() => { setMessages([]); setFinished(false); setInput(''); }}
                 className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-[var(--color-bronze-light)] hover:text-white transition-colors"
               >
                 <RefreshCcw size={14} /> Start Over
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
