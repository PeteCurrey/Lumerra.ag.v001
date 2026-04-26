'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRefs = useRef<(HTMLDivElement | null)[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [peekImage, setPeekImage] = useState<string | null>(null);

  useGSAP(() => {
    if (typeof window === 'undefined') return;

    const xTo = gsap.quickSetter(cursorRef.current, "x", "px");
    const yTo = gsap.quickSetter(cursorRef.current, "y", "px");
    
    // Setters for ghost rings
    const ringXTo = ringRefs.current.map(ref => gsap.quickSetter(ref, "x", "px"));
    const ringYTo = ringRefs.current.map(ref => gsap.quickSetter(ref, "y", "px"));

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      xTo(clientX);
      yTo(clientY);

      // Delayed rings for motion trail
      ringXTo.forEach((setter, i) => {
        gsap.to({}, {
          onUpdate: () => setter(clientX),
          delay: (i + 1) * 0.02
        });
      });
      ringYTo.forEach((setter, i) => {
        gsap.to({}, {
          onUpdate: () => setter(clientY),
          delay: (i + 1) * 0.02
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Intersection Observer for Product Peek
    const handleProductHover = (e: any) => {
      const img = e.target.getAttribute('data-peek-image');
      if (img) setPeekImage(img);
    };
    
    const handleProductLeave = () => setPeekImage(null);

    const productCards = document.querySelectorAll('[data-peek-image]');
    productCards.forEach(card => {
      card.addEventListener('mouseenter', handleProductHover);
      card.addEventListener('mouseleave', handleProductLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Handle Canvas Drawing for Peek
  useEffect(() => {
    if (!peekImage || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = peekImage;
    img.onload = () => {
      ctx.clearRect(0, 0, 64, 64);
      ctx.save();
      ctx.beginPath();
      ctx.arc(32, 32, 30, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(img, 0, 0, 64, 64);
      ctx.restore();
    };
  }, [peekImage]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
      {/* Main Dot */}
      <div 
        ref={cursorRef}
        className="absolute top-0 left-0 w-1.5 h-1.5 bg-bronze rounded-full -translate-x-1/2 -translate-y-1/2"
      />

      {/* Ghost Rings (Trail) */}
      {[0.8, 0.6, 0.4, 0.2, 0.1].map((opacity, i) => (
        <div
          key={i}
          ref={el => { ringRefs.current[i] = el }}
          className="absolute top-0 left-0 w-8 h-8 border border-bronze rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{ opacity }}
        />
      ))}

      {/* Product Peek Canvas */}
      {peekImage && (
        <div 
          className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
          style={{ 
            transform: `translate(${cursorRef.current?.style.transform})` 
          }}
        >
          <canvas 
            ref={canvasRef} 
            width={64} 
            height={64} 
            className="w-16 h-16 rounded-full border border-bronze bg-white"
          />
        </div>
      )}
    </div>
  );
}
