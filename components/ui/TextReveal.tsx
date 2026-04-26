'use client';

import { useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
}

export function TextReveal({ text, className = '', as: Component = 'h2' }: TextRevealProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  
  const characters = useMemo(() => text.split(''), [text]);

  useGSAP(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.text-reveal-char');
    const total = chars.length;
    const center = total / 2;

    chars.forEach((char, i) => {
      // Cloth-physics: outer characters have higher amplitude/stiffness
      const distFromCenter = Math.abs(i - center) / center;
      const ease = `power${Math.floor(1 + distFromCenter * 2)}.inOut`;
      const delay = distFromCenter * 0.2;

      gsap.fromTo(char, 
        { 
          opacity: 0, 
          y: 40,
          rotateX: -45
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          ease: ease,
          delay: delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <Component 
      ref={containerRef} 
      className={`inline-block overflow-hidden perspective-1000 ${className}`}
    >
      {characters.map((char, i) => (
        <span 
          key={i} 
          className="text-reveal-char inline-block whitespace-pre transition-colors duration-300 hover:text-bronze"
        >
          {char}
        </span>
      ))}
    </Component>
  );
}
