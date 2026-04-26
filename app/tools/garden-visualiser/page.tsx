'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Camera, Sparkles, Download, Share2, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { allProducts } from '@/data/products';

export default function GardenVisualiserPage() {
  const [step, setStep] = useState(0);
  const [image, setImage] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState(allProducts[0]?.slug || '');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
      setStep(1);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    // Mocking Replicate API + Cloudinary
    setTimeout(() => {
      setIsGenerating(false);
      setResult('/images/renders/placeholder-result.jpg'); // Mock result
      setStep(2);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-[var(--color-paper-sunken)] pt-32 pb-24">
      <div className="container-lumerra max-w-5xl">
        <div className="mb-16">
          <p className="text-caption text-[var(--color-bronze)] mb-4">Generative AI Tool</p>
          <h1 className="display-64 italic">Garden Visualiser.</h1>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
          {/* Main Stage */}
          <div className="bg-white border border-[var(--color-ink-rule)] relative overflow-hidden min-h-[500px] flex flex-col">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div 
                  key="upload"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center p-12 text-center"
                >
                  <div className="w-20 h-20 bg-[var(--color-paper-sunken)] rounded-full flex items-center justify-center mb-8">
                     <Camera size={32} className="text-[var(--color-ink-muted)]" />
                  </div>
                  <h2 className="text-xl font-display mb-4">Upload your garden photo</h2>
                  <p className="text-sm text-[var(--color-ink-muted)] max-w-sm mb-10 italic">
                    Capture your space from the angle you intend to place your hot tub. Ensure the ground is clearly visible.
                  </p>
                  <label className="btn btn-primary py-4 px-10 cursor-pointer">
                    Select Photo
                    <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                  </label>
                </motion.div>
              )}

              {step === 1 && image && (
                <motion.div 
                  key="preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 relative"
                >
                  <div className="absolute inset-0">
                    <Image src={image} alt="Garden Preview" fill className="object-cover" />
                  </div>
                  {isGenerating && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white z-20">
                       <div className="w-16 h-16 border-2 border-white/20 border-t-white rounded-full animate-spin mb-8" />
                       <p className="text-xs uppercase tracking-[0.2em] animate-pulse">Analysing depth & lighting...</p>
                    </div>
                  )}
                </motion.div>
              )}

              {step === 2 && result && (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 relative flex flex-col"
                >
                   <div className="flex-1 relative">
                     <Image src={result} alt="Generated Visualization" fill className="object-cover" />
                   </div>
                   <div className="p-6 bg-[var(--color-ink)] text-white flex justify-between items-center">
                      <p className="text-[10px] uppercase tracking-widest opacity-60 italic">AI Generated Preview</p>
                      <div className="flex gap-4">
                        <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest hover:text-[var(--color-bronze)]">
                          <Download size={14} /> Download
                        </button>
                        <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest hover:text-[var(--color-bronze)]">
                          <Share2 size={14} /> Share
                        </button>
                      </div>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="space-y-8">
            <div className="bg-white border border-[var(--color-ink-rule)] p-8">
              <h3 className="text-[10px] uppercase tracking-widest font-bold mb-6">Configuration</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest opacity-50 mb-3">Target Model</label>
                  <select 
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full border border-[var(--color-ink-rule)] p-3 text-xs outline-none focus:border-[var(--color-ink)] bg-white"
                  >
                    {allProducts.filter(p => p.category !== 'accessory').map(p => (
                      <option key={p.slug} value={p.slug}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={handleGenerate}
                    disabled={step === 0 || isGenerating}
                    className="btn btn-primary w-full py-4 gap-3 text-[10px] uppercase tracking-widest"
                  >
                    {isGenerating ? 'Generating...' : 'Render in Garden'}
                    <Sparkles size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-8 bg-[var(--color-paper-sunken)] border border-[var(--color-ink-rule)]">
               <h4 className="text-[10px] uppercase tracking-widest font-bold mb-4">How it works</h4>
               <p className="text-[11px] leading-relaxed text-[var(--color-ink-muted)] italic">
                 Our AI uses MiDaS depth estimation to understand the geometry of your space, then employs Stable Diffusion Inpainting to composite your chosen Lumerra model with photorealistic lighting and shadows.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
