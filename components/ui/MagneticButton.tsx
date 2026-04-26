'use client';

import { useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function MagneticButton({ children, className = '', onClick }: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !contentRef.current) return;

    const xTo = gsap.quickSetter(containerRef.current, "x", "px");
    const yTo = gsap.quickSetter(containerRef.current, "y", "px");
    const contentXTo = gsap.quickSetter(contentRef.current, "x", "px");
    const contentYTo = gsap.quickSetter(contentRef.current, "y", "px");

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 80) {
        // Magnetic pull toward cursor
        xTo(dx * 0.3);
        yTo(dy * 0.3);
        // Counter-translation for the inner content
        contentXTo(dx * -0.1);
        contentYTo(dy * -0.1);
      } else {
        // Snap back
        gsap.to([containerRef.current, contentRef.current], {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)"
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to([containerRef.current, contentRef.current], {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    containerRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className={`inline-block ${className}`}
      onClick={onClick}
    >
      <div ref={contentRef} className="pointer-events-none">
        {children}
      </div>
    </div>
  );
}
